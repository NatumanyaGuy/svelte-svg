<script>
	// @ts-nocheck

	export let svg = {};

	let classProp = '';
	let styleProp = '';

	export { classProp as class };
	export { styleProp as style };

	// console.log(svg);
</script>

{@html `<svg  ${svg.attributes}  class="${classProp || ''}" style="${styleProp || ''}" > ${
	svg.content
} </svg>`}
