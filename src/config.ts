export type Environment = 'local' | 'development' | 'test' | 'staging' | 'production';

const nodeEnv = process.env.NODE_ENV;
function assertNodeEnv(env: string | undefined): asserts env {
  if (!env) {
    throw Error('NODE ENV must be specified');
  }
}

assertNodeEnv(nodeEnv);

function apiHost(): string {
  return process.env.REACT_APP_API_HOST as string;
}

function brandName(): string {
  return process.env.REACT_APP_BRAND_NAME as string;
}

function environment(): Environment {
  return nodeEnv as Environment;
}

function sentryDsn(): string {
  return process.env.REACT_APP_SENTRY_DSN as string;
}

const config = { apiHost, brandName, environment, sentryDsn };

export { config };
