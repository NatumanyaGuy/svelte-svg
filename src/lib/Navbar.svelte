<script>
	// @ts-nocheck
	import { browser } from '$app/environment';
	import Icons from './Icons.svelte';
	let themeBtn;
	let theme = 'dark';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
		if (browser) {
			theme = document.querySelector('html').getAttribute('data-theme');
		}
	});
</script>

<div class="navbar bg-primary text-primary-content rounded-full shadow-sm px-8">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">
			<Icons icon="SvelteSVG" class="h-12 w-12 fill-primary-content" />
			Svelte-SVG</a
		>
	</div>
	<div class="flex-none gap-1">
		<a href="https://github.com/NatumanyaGuy" target="_blank" class="btn btn-circle btn-ghost">
			<Icons icon="Github" class="h-5 w-5 fill-primary-content" />
		</a>

		<a href="https://twitter.com/GuyNatumanya" target="_blank" class="btn btn-circle btn-ghost">
			<Icons icon="Twitter" class="h-5 w-5 fill-primary-content" />
		</a>

		<a
			href="https://www.youtube.com/@guynatumanya"
			target="_blank"
			class="btn btn-circle btn-ghost"
		>
			<Icons icon="Youtube" class="h-5 w-5 fill-primary-content" />
		</a>

		<!-- Theme Button  -->
		<div class="flex flex-row gap-1 bg-base-300 p-3 rounded-full bg-opacity-10">
			<button class="">
				<Icons icon="Sun" class="h-5 w-5" />
			</button>

			<input
				data-toggle-theme="dark,light"
				data-act-class="ACTIVECLASS"
				type="checkbox"
				class="toggle toggle-sm"
				checked={false}
			/>
			<button class="">
				<Icons icon="Moon" class="h-5 w-5" />
			</button>
		</div>
	</div>
</div>
