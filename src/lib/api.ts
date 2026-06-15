import type { Todo } from '$lib/types/todo';

export async function getTodos() {
	const res = await fetch('/api/todos');
	return await res.json();
}

export async function createTodo(
	data: Partial<Todo>
) {
	const res = await fetch('/api/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return await res.json();
}

export async function updateTodo(
	id: string,
	data: Partial<Todo>
) {
	const res = await fetch(`/api/todos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	return await res.json();
}

export async function deleteTodo(id: string) {
	const res = await fetch(`/api/todos/${id}`, {
		method: 'DELETE'
	});

	return await res.json();
}