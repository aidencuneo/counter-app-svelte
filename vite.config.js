import { sveltekit } from '@sveltejs/kit/vite';
import JSBB from './jsbb.js';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [JSBB(), sveltekit()]
});
