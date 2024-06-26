import { createMemoryHistory, createRouter, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
	}, {
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
		component: About,
	}, {
		path: "/:pathMatch(.*)",
		redirect: "/",
	},
];

const router = createRouter({
	history: createMemoryHistory(),
	// base: process.env.BASE_URL,
	routes: routes,
});

export default router;
