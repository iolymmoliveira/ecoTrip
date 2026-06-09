import * as Sentry from '@sentry/nextjs';
import type {
  Breadcrumb,
  BreadcrumbHint,
  ErrorEvent,
  Event,
  EventHint,
  SeverityLevel,
} from '@sentry/core';

import {
  AppError,
  BusinessError,
  ExternalApiError,
  ValidationError,
  InfrastructureError,
} from '@/lib/errors';

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN;

const tracesSampleRate = Number(process.env.SENTRY_TRACES_SAMPLE_RATE ?? 0.2);

const sessionRate = Number(
  process.env.SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? 0.05,
);

const errorReplayRate = Number(
  process.env.SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? 1.0,
);

function sanitizeHeaders(
  headers?: Record<string, string>,
): Record<string, string> | undefined {
  if (!headers) {
    return headers;
  }

  const filteredHeaders = { ...headers };

  [
    'authorization',
    'cookie',
    'set-cookie',
    'x-api-key',
    'x-forwarded-for',
  ].forEach((key) => {
    delete filteredHeaders[key];
  });

  return filteredHeaders;
}

function sanitizeUrl(url?: string): string | undefined {
  if (!url) {
    return url;
  }

  return url.replace(
    /(\?|&)(token|key|access_token|api_key)=([^&]+)/gi,
    '$1$2=[FILTERED]',
  );
}

function sanitizeEvent(
  event: ErrorEvent,
  _hint?: EventHint,
): ErrorEvent | null {
  if (event.request) {
    event.request = {
      ...event.request,
      headers: sanitizeHeaders(event.request.headers),
      url: sanitizeUrl(event.request.url),
    };
  }

  if (event.user) {
    const {
      ip_address: _ipAddress,
      email: _email,
      username: _username,
      ...rest
    } = event.user;

    event.user = { ...rest };
  }

  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
      if (!breadcrumb.data) {
        return breadcrumb;
      }

      const sanitizedData: Record<string, unknown> = {
        ...breadcrumb.data,
      };

      ['password', 'token', 'api_key', 'access_token'].forEach((key) => {
        if (key in sanitizedData) {
          sanitizedData[key] = '[FILTERED]';
        }
      });

      return {
        ...breadcrumb,
        data: sanitizedData,
      };
    });
  }

  return event;
}

function getErrorSeverity(error: unknown): SeverityLevel {
  if (error instanceof ValidationError || error instanceof BusinessError) {
    return 'warning';
  }

  if (error instanceof ExternalApiError) {
    return 'error';
  }

  if (error instanceof InfrastructureError) {
    return 'fatal';
  }

  if (error instanceof AppError) {
    return 'error';
  }

  return 'error';
}

Sentry.init({
  dsn,
  enabled: Boolean(dsn),
  environment: process.env.NODE_ENV,
  release:
    process.env.NEXT_PUBLIC_SENTRY_RELEASE ||
    process.env.SENTRY_RELEASE ||
    process.env.VERCEL_GIT_COMMIT_SHA,
  tracesSampleRate: Number.isFinite(tracesSampleRate) ? tracesSampleRate : 0.2,
  replaysSessionSampleRate: Number.isFinite(sessionRate) ? sessionRate : 0.05,
  replaysOnErrorSampleRate: Number.isFinite(errorReplayRate)
    ? errorReplayRate
    : 1.0,
  beforeSend: sanitizeEvent,
  beforeBreadcrumb(
    breadcrumb: Breadcrumb,
    _hint?: BreadcrumbHint,
  ): Breadcrumb | null {
    return breadcrumb;
  },
});

export type CaptureContext = {
  level?: SeverityLevel;
  extras?: Record<string, unknown>;
  tags?: Record<string, string>;
};

export const captureException = (
  error: unknown,
  context: CaptureContext = {},
): string | undefined => {
  const severity = context.level ?? getErrorSeverity(error);

  if (error instanceof Error) {
    Sentry.captureException(error, {
      level: severity,
      extra: context.extras,
      tags: context.tags,
    });

    return error.message;
  }

  const message = String(error);

  Sentry.captureMessage(message, {
    level: severity,
    extra: context.extras,
    tags: context.tags,
  });

  return message;
};

export const captureMessage = (
  message: string,
  level: SeverityLevel = 'info',
  context: CaptureContext = {},
): void => {
  Sentry.captureMessage(message, {
    level,
    extra: context.extras,
    tags: context.tags,
  });
};

export const captureEvent = (
  event: Omit<Event, 'level'> & {
    level?: SeverityLevel;
  },
): void => {
  Sentry.captureEvent({
    ...event,
    level: event.level ?? 'info',
  });
};

export const traceAsync = async <T>(
  _name: string,
  fn: () => Promise<T>,
  context: Record<string, unknown> = {},
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    captureException(error, {
      level: getErrorSeverity(error),
      extras: context,
    });

    throw error;
  }
};

export const traceSync = <T>(
  _name: string,
  fn: () => T,
  context: Record<string, unknown> = {},
): T => {
  try {
    return fn();
  } catch (error) {
    captureException(error, {
      level: getErrorSeverity(error),
      extras: context,
    });

    throw error;
  }
};
