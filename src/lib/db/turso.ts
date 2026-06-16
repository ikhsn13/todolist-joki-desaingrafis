import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export function getDb() {
	if (!env.DATABASE_URL) {
		throw new Error('DATABASE_URL tidak ditemukan');
	}

	return createClient({
		url: env.DATABASE_URL,
		authToken: env.DATABASE_AUTH_TOKEN
	});
}