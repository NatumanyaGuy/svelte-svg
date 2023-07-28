<script>
	import Navbar from '$lib/Navbar.svelte';
	import '../app.postcss';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import toast, { Toaster } from 'svelte-french-toast';

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<Toaster />

<main class="p-4 min-h-screen bg-cool">
	<Navbar />

	<div class="p-8">
		<slot />
	</div>
</main>
