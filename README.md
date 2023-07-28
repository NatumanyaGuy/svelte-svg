# Svelte-SVG - All your svg icons in one place

Svelte SVG is a web app built with SvelteKit that allows users to collect SVG icons from anywhere on the web or downloaded svg files to create a single Svelte component to import from. Each icon in the generated Svelte component extends props such as class, style; making it simple to use and customize.

### Getting Started

- Visit sveltesvg.vercel.app
- Paste your svg texts OR..
- Upload your downloaded SVG files
- Name your Component (initial names are auto generated using `random-words`)
- Click "~ Generate Component ~"
- Copy and paste or download Icons.svelte to $lib folder

### Using your Icons Component

In you main page, Import your Icons component to where you're using it

```html
<script>
	import Icons from '$lib/Icons.svelte';
</script>
<Icons icon="SvelteSVG" class="h-12 w-12 fill-primary-content" style="" />
```

### Props

| Prop  |                                                                |
| :---: | :------------------------------------------------------------: |
| icon  | Icon name (from your input `Uses Typescript for Intellisense`) |
| class |               Pass class (e.g. tailwind classes)               |
| style |                Pass styles (e.g. 'fill: blue;')                |

### Next Steps

[ ] Minify and validate SVG
[ ] Error Handling
[ ] SVG inner CSS styles conflicts
[ ] Allow import previous components
[ ] Export with Icon Guide (click to copy feature)

### Contributing

Contributions are welcome! If you have any ideas, bug fixes, or new features to propose, please open an issue or submit a pull request. Let's make this tool even better together!

### License

This project is licensed under the MIT License.

### Contact

If you have any questions or need assistance, feel free to reach out to me at guynatumanya@gmail.com.

# Svelte is Awesome!
