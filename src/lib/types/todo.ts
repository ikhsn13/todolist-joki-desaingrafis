export interface Todo {
	id: string;
	nama_klien: string;
	nomor_whatsapp: string;
	deskripsi_pesanan: string;
	status: 'pending' | 'completed';
	created_at: string;
}