/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#2292A4',
					'primary-focus': '#235b67',
					'primary-content': '#fff',
					secondary: '#001524',
					'secondary-focus': '#004b7a',
					'secondary-content': '#fff'
					// 'base-200': '#fff'
				}
			},
			{
				dark: {
					...require('daisyui/src/theming/themes')['[data-theme=dark]'],
					primary: '#206f7e',
					'primary-focus': '#214c58',
					'primary-content': '#fff',
					secondary: '#005c95',
					'secondary-focus': '#004b7a',
					'secondary-content': '#fff'
				}
			}
		]
	},
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')]
};
