import { json } from '@sveltejs/kit';
import { getDb } from '$lib/db/turso';


export async function PUT({ params, request }) {
	const db = getDb();
	try {
		const id = params.id;

		const body = await request.json();

		const {
			nama_klien,
			nomor_whatsapp,
			deskripsi_pesanan,
			status
		} = body;

		await db.execute({
			sql: `
				UPDATE todos
				SET
					nama_klien = ?,
					nomor_whatsapp = ?,
					deskripsi_pesanan = ?,
					status = ?
				WHERE id = ?
			`,
			args: [
				nama_klien,
				nomor_whatsapp,
				deskripsi_pesanan,
				status,
				id
			]
		});

		return json({
			success: true,
			message: 'Data berhasil diperbarui'
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: 'Gagal update data'
			},
			{ status: 500 }
		);
	}
}

export async function DELETE({ params }) {
	const db = getDb();
	try {
		const id = params.id;

		await db.execute({
			sql: `
				DELETE FROM todos
				WHERE id = ?
			`,
			args: [id]
		});

		return json({
			success: true,
			message: 'Data berhasil dihapus'
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: 'Gagal menghapus data'
			},
			{ status: 500 }
		);
	}
}