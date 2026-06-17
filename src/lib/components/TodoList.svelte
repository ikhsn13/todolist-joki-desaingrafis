<script lang="ts">
	import type { Todo } from '$lib/types/todo';

	export let todos: Todo[] = [];
	export let onDelete: any;
	export let onComplete: any;
	export let onEdit: any;

	let search = '';

	$: filtered = todos.filter((item) =>
		(item.nama || '')
			.toLowerCase()
			.includes(search.toLowerCase())
	);
</script>

<div class="bg-white rounded-2xl p-6 shadow-sm">
	<div class="flex justify-between mb-4">
		<h2 class="font-bold text-xl">
			List Pekerjaan
		</h2>

		<input
			bind:value={search}
			placeholder="Cari klien..."
			class="border px-3 py-2 rounded-lg"
		/>
	</div>

	<div class="space-y-3">
		{#if filtered.length === 0}
			<div class="text-center text-slate-400 py-10">
				Belum ada pekerjaan
			</div>
		{/if}

		{#each filtered as todo}
			<div class="border rounded-xl p-4 hover:shadow-lg transition">
				<h3 class="font-semibold">
					{todo.nama}
				</h3>

				<p class="text-sm">
					{todo.nomor}
				</p>

				<p class="mt-2 text-sm">
					{todo.deskripsi}
				</p>

				<div class="flex gap-2 mt-4">
					<button
						on:click={() => onEdit(todo)}
						class="bg-yellow-500 text-white px-3 py-2 rounded-lg"
					>
						Edit
					</button>

					<button
						on:click={() => onDelete(todo.id)}
						class="bg-red-500 text-white px-3 py-2 rounded-lg"
					>
						Hapus
					</button>

					<button
						on:click={() => onComplete(todo)}
						class="bg-green-600 text-white px-3 py-2 rounded-lg"
					>
						Selesai
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>