import { createClient } from '@libsql/client';
import { env } from '$env/dynamic/private';

export function getDb(platformEnv?: {
	DATABASE_URL?: string;
	DATABASE_AUTH_TOKEN?: string;
}) {
	const databaseUrl =
		platformEnv?.DATABASE_URL || env.DATABASE_URL;

	const authToken =
		platformEnv?.DATABASE_AUTH_TOKEN ||
		env.DATABASE_AUTH_TOKEN;

	if (!databaseUrl) {
		throw new Error(
			'DATABASE_URL tidak ditemukan. Periksa .env atau Cloudflare Secrets.'
		);
	}

	return createClient({
		url: databaseUrl,
		authToken
	});
}