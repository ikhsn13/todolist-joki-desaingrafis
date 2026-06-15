<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let nama_klien = '';
	let nomor_whatsapp = '';
	let deskripsi_pesanan = '';

	export let loading = false;

	function submit() {
		dispatch('submit', {
			nama_klien,
			nomor_whatsapp,
			deskripsi_pesanan
		});

		nama_klien = '';
		nomor_whatsapp = '';
		deskripsi_pesanan = '';
	}
</script>

<div class="bg-white rounded-2xl p-6 shadow-sm">
	<h2 class="font-bold text-xl mb-5">
		Create Pesanan
	</h2>

	<div class="space-y-4">

		<input
			bind:value={nama_klien}
			placeholder="Nama Klien"
			class="w-full border rounded-xl p-3"
		/>

		<input
			bind:value={nomor_whatsapp}
			placeholder="Nomor WhatsApp"
			class="w-full border rounded-xl p-3"
		/>

		<textarea
  rows="5"
  bind:value={deskripsi_pesanan}
></textarea>

		<button
			on:click={submit}
			disabled={loading}
			class="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
		>
			{loading ? 'Menyimpan...' : 'Tambah Data'}
		</button>

	</div>
</div>