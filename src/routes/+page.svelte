<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { toast, Toaster } from 'svelte-sonner';

	import {
		ClipboardList,
		CheckCircle,
		BarChart3
	} from '@lucide/svelte';

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
		if (!confirm('Yakin ingin menghapus data?')) return;

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
		const nama = prompt('Nama Klien', todo.nama_klien);
		if (!nama) return;

		const nomor = prompt('Nomor WhatsApp', todo.nomor_whatsapp);
		if (!nomor) return;

		const deskripsi = prompt('Deskripsi', todo.deskripsi_pesanan);
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

	let pendingTodos: Todo[] = [];
	let completedTodos: Todo[] = [];

	$: pendingTodos = todos.filter(
		(item) => item.status === 'pending'
	);

	$: completedTodos = todos.filter(
		(item) => item.status === 'completed'
	);
</script>