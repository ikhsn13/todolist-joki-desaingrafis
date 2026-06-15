<script lang="ts">
	export let title: string;
	export let value: number;
	export let icon: any;
</script>

<div
	class="bg-white rounded-2xl shadow-sm p-5 border hover:shadow-lg transition-all duration-300"
>
	<div class="flex justify-between items-center">
		<div>
			<p class="text-slate-500 text-sm">
				{title}
			</p>

			<h2 class="text-3xl font-bold mt-2">
				{value}
			</h2>
		</div>

		<svelte:component
			this={icon}
			size={34}
			class="text-blue-600"
		/>
	</div>
</div>