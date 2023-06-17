import { createRouter, createWebHistory } from 'vue-router';
import Table from '../components/Table.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Table,
		},
	],
});

export default router;
