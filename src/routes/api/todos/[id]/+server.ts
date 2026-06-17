import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db/turso';

export async function PUT({ params, request, platform }) {
	const db = getDb(platform?.env);

	try {
		const body = await request.json();

		await db.execute({
			sql: `
				UPDATE todos
				SET
					nama = ?,
					nomor = ?,
					deskripsi = ?,
					completed = ?
				WHERE id = ?
			`,
			args: [
				body.nama,
				body.nomor,
				body.deskripsi,
				body.completed,
				params.id
			]
		});

		return json({
			success: true
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: String(error)
			},
			{ status: 500 }
		);
	}
}

export async function DELETE({ params, platform }) {
	const db = getDb(platform?.env);

	try {
		await db.execute({
			sql: `
				DELETE FROM todos
				WHERE id = ?
			`,
			args: [params.id]
		});

		return json({
			success: true
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: String(error)
			},
			{ status: 500 }
		);
	}
}