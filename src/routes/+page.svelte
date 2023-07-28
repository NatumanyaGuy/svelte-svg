<script>
	// @ts-nocheck
	import Icon from '$lib/Icon.svelte';
	import {
		extractSvgContent,
		invalidSvg,
		previewSnippet,
		capitalizeFirst,
		snippet
	} from '$lib/utils';
	import Drawer from 'svelte-drawer-component';
	import toast from 'svelte-french-toast';

	let open = false;
	let svgFile; //SVG file input
	let svgInput = ''; //SVG input from textarea
	let svgs = []; //SVGs input by user
	let preview = [];
	function addSVG() {
		//Adds SVG from file input to svgs[]
		if (!svgFile.files || svgFile.files.length === 0) {
			console.log('No file selected.');
			return;
		}

		for (let i = 0; i < svgFile.files.length; i++) {
			const file = svgFile.files[i];
			const reader = new FileReader();

			reader.onload = function (event) {
				const svgContent = event.target.result;
				// if (!invalidSvg(svgContent)) {
				svgs = [...svgs, extractSvgContent(svgContent)];
				// } else {
				// 	console.error('Invalid SVG');
				// }
			};

			reader.readAsText(file);
		}
	}

	//Download
	async function download() {
		try {
			var a = window.document.createElement('a');
			a.href = window.URL.createObjectURL(new Blob([snippet(svgs)], { type: 'text/plain' }));
			a.download = 'Icons.svelte';
			// Append anchor to body.
			document.body.appendChild(a);
			a.click();
			// Remove anchor from body
			document.body.removeChild(a);
			return 'success';
		} catch (error) {
			return error;
		}
	}

	//Copy
	async function copy() {
		try {
			let str = snippet(svgs);
			navigator.clipboard.writeText(str);
			return 'success';
		} catch (error) {
			return error;
		}
	}
</script>

<!-- <button
	class="btn btn-primary normal-case"
	on:click={() => {
		console.log(svgs);
	}}>Log SVGs</button
> -->

<button
	disabled={svgs.length == 0}
	class="btn btn-primary right-4 disabled:cursor-not-allowed bottom-4 z-30 fixed normal-case"
	on:click={() => {
		preview = previewSnippet(svgs);
		open = true;
	}}
>
	Generate Component
</button>

<div class="grid grid-cols-none md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
	<div class="card card-compact bg-base-100 w-full shadow max-h-[55vh]">
		<div class="card-body">
			<!-- File Input  -->
			<div class="flex flex-col">
				<label for="" class="label-text mb-2 mx-4">Upload your SVG files</label>
				<input
					multiple
					type="file"
					bind:this={svgFile}
					accept=".svg"
					on:change={() => {
						addSVG();
					}}
					class="file-input file-input-bordered w-full max-w-md mx-auto"
				/>
			</div>
			<div class="divider">OR</div>
			<!-- Textarea  -->
			<div class="flex flex-col">
				<label for="" class="label-text mb-2 mx-4">Enter your SVG code</label>
				<textarea
					bind:value={svgInput}
					class="textarea textarea-bordered resize-none"
					cols="10"
					rows="5"
					placeholder="Enter SVG here"
				/>
				<div class="flex flex-row gap-2 my-2 justify-end">
					<div class="tooltip" data-tip="Paste">
						<button
							class="btn btn-circle btn-secondary"
							on:click={() => {
								navigator.clipboard
									.readText()
									.then((text) => {
										svgInput = text;
										// if (!invalidSvg(svgInput)) {
										svgs = [...svgs, extractSvgContent(svgInput)];
										svgInput = '';
										// } else {
										// 	console.error('Invalid SVG');
										// }
									})
									.catch((err) => {
										console.error(err);
									});
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
								/>
							</svg>
						</button>
					</div>
					<button
						class="btn rounded-full btn-primary normal-case"
						on:click={() => {
							//Validate
							// if (!invalidSvg(svgInput)) {

							if (svgInput.length <= 20) {
								toast.error('Please enter valid SVG');
							} else {
								svgs = [...svgs, extractSvgContent(svgInput)];
								svgInput = '';
							}

							// } else {
							// 	console.error('Invalid SVG');
							// }
						}}
					>
						Add SVG
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Preview SVGs  -->
	<div class="lg:col-span-2 xl:col-span-2">
		<div class="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-5 xlgrid-cols-5 gap-3">
			{#each svgs as svg}
				<div class="card bg-base-100 hover:shadow-md transition shadow">
					<div class="card-body flex items-center justify-center">
						<div class="stack group">
							<div class="w-full h-full hidden justify-center items-center group-hover:flex">
								<div>
									<button
										class="btn btn-error btn-circle"
										on:click={() => {
											svgs = svgs.filter((x) => {
												return x.id != svg.id;
											});
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="w-5 h-5"
										>
											<path
												fill-rule="evenodd"
												d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</div>
							<Icon bind:svg class="h-20 w-20" />
						</div>
						<input
							type="text"
							placeholder="Icon Name"
							bind:value={svg.name}
							on:keyup={() => {
								svg.name = capitalizeFirst(svg.name);
							}}
							class="input w-full max-w-xs text-center"
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Finish Up Drawer  -->
<Drawer
	{open}
	placement="right"
	size="50vw"
	on:clickAway={() => {
		open = false;
	}}
>
	<div class="bg-base-100 px-6 py-4 min-h-screen">
		<div class="py-2 mb-2 flex justify-end">
			<div class="tooltip tooltip-left tooltip-primary tooltip-open" data-tip="Click to Copy">
				<button
					class="btn btn-primary btn-circle shadow-2xl"
					on:click={() => {
						toast.promise(copy(), {
							loading: 'Copying...',
							success: 'Copied!',
							error: 'Could not copy!.'
						});
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
						/>
					</svg>
				</button>
			</div>
		</div>
		<div class="mockup-code cursor-not-allowed">
			<pre><code class="bg-info text-info-content"
					>Copy and Paste Code to $lib/Icons.svelte or Download Icons.svelte</code
				></pre>
			<br />
			{#each preview as p, i}
				<pre data-prefix="" class:text-success={i >= 1 && i <= 2}><code>{p}</code></pre>
			{/each}
		</div>

		<br />
		<div class="divider" />

		<div class="flex flex-row justify-center">
			<button
				class="btn btn-primary btn-lg normal-case"
				on:click={() => {
					toast.promise(download(), {
						loading: 'Downloading...',
						success: 'Downloaded!',
						error: 'Could not download!.'
					});
				}}
				>Download
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="w-5 h-5"
				>
					<path
						d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z"
					/>
					<path
						d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z"
					/>
				</svg>
			</button>
		</div>

		<p class="text-base text-end text-primary mt-8">How to Use?</p>
	</div>
</Drawer>
