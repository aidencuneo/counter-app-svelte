import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapterStatic({
			pages: '/var/www/aidenbc.com.au/apps/counter_svelte',
			fallback: 'index.html',
		}),
		files: {
			appTemplate: 'src/index.html',
		},
		paths: {
			base: '/apps/counter_svelte',
		},
	}
};

export default config;
