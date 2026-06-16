import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export function getDb() {
  return createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN
  });
}