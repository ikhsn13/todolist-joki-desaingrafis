<script lang="ts">
	import type { Todo } from '$lib/types/todo';

	export let todos: Todo[] = [];
	export let onDelete: any;
</script>

<div class="bg-white rounded-2xl p-6 shadow-sm">
	<h2 class="font-bold text-xl mb-4">
		Completed
	</h2>

	<div class="space-y-3">
		{#if todos.length === 0}
			<div class="text-center py-10 text-slate-400">
				Belum ada pekerjaan selesai
			</div>
		{/if}

		{#each todos as todo}
			<div class="border rounded-xl p-4 hover:shadow-lg transition">
				<div class="flex justify-between">
					<h3 class="font-semibold">
						{todo.nama}
					</h3>

					<span
						class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
					>
						COMPLETED
					</span>
				</div>

				<p class="text-sm mt-2">
					{todo.nomor}
				</p>

				<p class="text-sm mt-1">
					{todo.deskripsi}
				</p>

				<button
					on:click={() => onDelete(todo.id)}
					class="bg-red-500 text-white mt-4 px-3 py-2 rounded-lg"
				>
					Hapus
				</button>
			</div>
		{/each}
	</div>
</div>