import { captureEvent } from './sentry';
import { logger } from './logger';

export const trackBusinessEvent = (
  eventName: string,
  data: Record<string, unknown> = {},
) => {
  captureEvent({
    message: eventName,
    level: 'info',
    extra: data,
  });
  logger.info(eventName, data);
};

export const trackExternalService = (
  service: string,
  statusCode?: number,
  durationMs?: number,
  data: Record<string, unknown> = {},
) => {
  const extras = {
    service,
    statusCode,
    durationMs,
    ...data,
  };
  captureEvent({
    message: `external_service.${service}`,
    level: statusCode && statusCode >= 500 ? 'error' : 'info',
    extra: extras,
  });
  logger.info(`external_service.${service}`, extras);
};

export const trackPerformance = (
  name: string,
  durationMs: number,
  data: Record<string, unknown> = {},
) => {
  captureEvent({
    message: `performance.${name}`,
    level: 'info',
    extra: {
      durationMs,
      ...data,
    },
  });
  logger.debug(`performance.${name}`, { durationMs, ...data });
};
