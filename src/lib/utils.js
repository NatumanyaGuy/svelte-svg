// @ts-nocheck
import { uid } from 'uid';
import { generate, count } from 'random-words';

export function capitalizeFirst(word) {
	if (!word || word.length === 0) return word;
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function invalidSvg(svgString) {
	// Define the regex patterns to match the opening and closing <svg> tags
	const openingTagPattern = /^<svg\s*[^>]*>/i;
	const closingTagPattern = /<\/svg>\s*$/i;

	// Check if the string starts with an opening <svg> tag
	const hasOpeningTag = openingTagPattern.test(svgString);

	// Check if the string ends with a closing </svg> tag
	const hasClosingTag = closingTagPattern.test(svgString);

	// Return true if both opening and closing tags are present, otherwise false
	return hasOpeningTag && hasClosingTag;
}

export function extractSvgContent(svgString) {
	// Define the regex patterns to match the inner content and attributes of the <svg> tag
	const contentPattern = /<svg[^>]*>([\s\S]*?)<\/svg>/;
	const attributesPattern = /<svg([^>]*)>/;

	// Find the matches using the regex patterns
	const contentMatch = svgString.match(contentPattern);
	const attributesMatch = svgString.match(attributesPattern);

	// Create an object to store the result
	const result = {};

	// Extract and store the inner content if a match is found
	if (contentMatch) {
		result.content = `${contentMatch[1].trim()}`;
	} else {
		result.content = null;
	}

	// Extract and store the attributes if a match is found
	if (attributesMatch) {
		let attributes = attributesMatch[1].trim();
		// Remove class attribute or replace with an empty string
		attributes = attributes.replace(/\sclass=".*?"/, '').replace(/\sclass=/, '');
		// Convert width and height attributes from pixel values to '100'
		attributes = attributes
			.replace(/ width=".*?"/, ' width="100"')
			.replace(/ height=".*?"/, ' height="100"');
		result.attributes = attributes;
	} else {
		result.attributes = null;
	}

	let c = { ...result, id: uid(), name: capitalizeFirst(generate({ minLength: 4 })) };
	return c;
}

export function snippet(svgs) {
	let lines = [
		`<script lang="ts">`,
		`// @ts-nocheck`,
		`/*Your Icons: 
        \n${svgs
					.map((s, i) => {
						return i + 1 + ' ' + s.name;
					})
					.join('\n')}
        */
        `,
		`let svgs = ${JSON.stringify(svgs)};`,
		`export let icon: ${svgs
			.map((s, i) => {
				return "'" + s.name + "'";
			})
			.join('|')}; `,
		`function getIcon(id, arrayOfObjects) {`,
		`return arrayOfObjects.find((obj) => obj.name === id);`,
		`}`,
		`$: _icon = getIcon(icon, svgs);`,
		`let classProp = '';`,
		`let styleProp = '';`,
		`export { classProp as class };`,
		`export { styleProp as style };`,
		`</script>`,
		'{@html `<svg ${_icon.attributes} class="${classProp}" style="${styleProp}"> ${_icon.content} </svg>`}'
	];
	return lines.join('\n');
}

export function previewSnippet(svgs) {
	let lines = [
		`<script lang="ts">`,
		`// @ts-nocheck`,
		`/*Your Icons: ${svgs
			.map((s, i) => {
				return i + 1 + ' ' + s.name;
			})
			.join(', ')}*/`,
		`let svgs = [.....];`,
		`export let icon: ${svgs
			.map((s, i) => {
				return "'" + s.name + "'";
			})
			.join('|')}; `,
		`function getIcon(id, arrayOfObjects) {`,
		`return arrayOfObjects.find((obj) => obj.name === id);`,
		`}`,
		`$: _icon = getIcon(icon, svgs);`,
		`let classProp = '';`,
		`let styleProp = '';`,
		`export { classProp as class };`,
		`export { styleProp as style };`,
		`</script>`,
		`\n`,
		'{@html `<svg ${_icon.attributes} class="${classProp}" style="${styleProp}"> \n  ${_icon.content} </svg>`}'
	];
	return lines;
}
