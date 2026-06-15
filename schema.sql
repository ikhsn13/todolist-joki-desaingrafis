CREATE TABLE IF NOT EXISTS todos (
	id TEXT PRIMARY KEY,
	nama_klien TEXT NOT NULL,
	nomor_whatsapp TEXT NOT NULL,
	deskripsi_pesanan TEXT NOT NULL,
	status TEXT NOT NULL DEFAULT 'pending',
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);