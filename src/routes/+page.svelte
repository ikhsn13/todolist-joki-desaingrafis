<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';

	import { toast, Toaster } from 'svelte-sonner';

	import {
		ClipboardList,
		CheckCircle,
		BarChart3
	} from 'lucide-svelte';

	import StatsCard from '$lib/components/StatsCard.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';
	import TodoList from '$lib/components/TodoList.svelte';
	import CompletedList from '$lib/components/CompletedList.svelte';

	import type { Todo } from '$lib/types/todo';

	let todos: Todo[] = [];

	let loading = false;

	async function loadTodos() {
		try {
			const res = await fetch('/api/todos');
			const data = await res.json();

			todos = data.data || [];
		} catch {
			toast.error('Gagal mengambil data');
		}
	}

	onMount(loadTodos);

	async function createTodo(event: CustomEvent) {
		loading = true;

		try {
			const res = await fetch('/api/todos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(event.detail)
			});

			const data = await res.json();

			if (!data.success) {
				toast.error(data.message);
				return;
			}

			toast.success('Pesanan berhasil ditambahkan');

			await loadTodos();
		} catch {
			toast.error('Terjadi kesalahan');
		}

		loading = false;
	}

	async function deleteTodo(id: string) {
		const confirmDelete = confirm(
			'Yakin ingin menghapus data?'
		);

		if (!confirmDelete) return;

		try {
			await fetch(`/api/todos/${id}`, {
				method: 'DELETE'
			});

			toast.success('Data berhasil dihapus');

			await loadTodos();
		} catch {
			toast.error('Gagal menghapus');
		}
	}

	async function completeTodo(todo: Todo) {
		try {
			await fetch(`/api/todos/${todo.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...todo,
					status: 'completed'
				})
			});

			toast.success('Pekerjaan selesai');

			await loadTodos();
		} catch {
			toast.error('Gagal update');
		}
	}

	async function editTodo(todo: Todo) {
		const nama = prompt(
			'Nama Klien',
			todo.nama_klien
		);

		if (!nama) return;

		const nomor = prompt(
			'Nomor WhatsApp',
			todo.nomor_whatsapp
		);

		if (!nomor) return;

		const deskripsi = prompt(
			'Deskripsi',
			todo.deskripsi_pesanan
		);

		if (!deskripsi) return;

		try {
			await fetch(`/api/todos/${todo.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...todo,
					nama_klien: nama,
					nomor_whatsapp: nomor,
					deskripsi_pesanan: deskripsi
				})
			});

			toast.success('Data diperbarui');

			await loadTodos();
		} catch {
			toast.error('Gagal update');
		}
	}

	$: pendingTodos = todos.filter(
		(item) => item.status === 'pending'
	);

	$: completedTodos = todos.filter(
		(item) => item.status === 'completed'
	);
</script>

<svelte:head>
	<title>TodoList Joki Desain Grafis</title>
</svelte:head>

<Toaster richColors position="top-right" />

<div class="min-h-screen bg-slate-100 p-5">

	<div class="max-w-7xl mx-auto">

		<h1
			class="text-3xl font-bold mb-6"
		>
			TodoList Joki Desain Grafis
		</h1>

		<div
			class="grid md:grid-cols-3 gap-5 mb-6"
		>

			<StatsCard
				title="Total Pesanan"
				value={todos.length}
				icon={BarChart3}
			/>

			<StatsCard
				title="Sedang Dikerjakan"
				value={pendingTodos.length}
				icon={ClipboardList}
			/>

			<StatsCard
				title="Selesai"
				value={completedTodos.length}
				icon={CheckCircle}
			/>

		</div>

		<div
			class="grid xl:grid-cols-3 gap-5"
		>

			<div>
				<TodoForm
					loading={loading}
					on:submit={createTodo}
				/>
			</div>

			<div>
				<TodoList
					todos={pendingTodos}
					onDelete={deleteTodo}
					onComplete={completeTodo}
					onEdit={editTodo}
				/>
			</div>

			<div>
				<CompletedList
					todos={completedTodos}
					onDelete={deleteTodo}
				/>
			</div>

		</div>

	</div>

</div>