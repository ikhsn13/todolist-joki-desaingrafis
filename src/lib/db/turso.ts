import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export function getDb() {
  console.log('DATABASE_URL:', env.DATABASE_URL);

  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL tidak ditemukan');
  }

  return createClient({
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
  });
}