import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export function getDb() {
  return createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
  });
}