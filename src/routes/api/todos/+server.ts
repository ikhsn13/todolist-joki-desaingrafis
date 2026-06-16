import { json } from '@sveltejs/kit';

import { nanoid } from 'nanoid';
import { getDb } from '$lib/db/turso';

const db = getDb();

export async function GET() {
	try {
		const result = await db.execute(`
			SELECT *
			FROM todos
			ORDER BY created_at DESC
		`);

		return json({
			success: true,
			data: result.rows
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: 'Gagal mengambil data'
			},
			{ status: 500 }
		);
	}
}

export async function POST({ request }) {
	try {
		const body = await request.json();

		const {
			nama_klien,
			nomor_whatsapp,
			deskripsi_pesanan
		} = body;

		if (
			!nama_klien ||
			!nomor_whatsapp ||
			!deskripsi_pesanan
		) {
			return json(
				{
					success: false,
					message: 'Semua field wajib diisi'
				},
				{ status: 400 }
			);
		}

		const id = nanoid();

		await db.execute({
			sql: `
				INSERT INTO todos (
					id,
					nama_klien,
					nomor_whatsapp,
					deskripsi_pesanan,
					status
				)
				VALUES (?, ?, ?, ?, ?)
			`,
			args: [
				id,
				nama_klien,
				nomor_whatsapp,
				deskripsi_pesanan,
				'pending'
			]
		});

		return json({
			success: true,
			message: 'Data berhasil ditambahkan'
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: 'Gagal menyimpan data'
			},
			{ status: 500 }
		);
	}
}