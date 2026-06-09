import { traceAsync, traceSync } from './sentry';
import { trackPerformance } from './monitoring';

export const traceExecution = async <T>(
  name: string,
  fn: () => Promise<T>,
  context: Record<string, unknown> = {},
): Promise<T> => {
  const startedAt = performance.now();
  try {
    return await traceAsync(name, fn, context);
  } finally {
    trackPerformance(name, performance.now() - startedAt, context);
  }
};

export const traceExecutionSync = <T>(
  name: string,
  fn: () => T,
  context: Record<string, unknown> = {},
): T => {
  const startedAt = performance.now();
  try {
    return traceSync(name, fn, context);
  } finally {
    trackPerformance(name, performance.now() - startedAt, context);
  }
};
