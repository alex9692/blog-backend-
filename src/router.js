import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";
import WelcomePage from "./views/Welcome";
import DashboardPage from "./views/Dashboard";
import SignupPage from "./views/SIgnUp";
import SigninPage from "./views/SignIn";

Vue.use(VueRouter);

const routes = [
	{ path: "/", component: WelcomePage },
	{
		path: "/signup",
		component: SignupPage,
		beforeEnter: (to, from, next) => {
			if (store.state.auth) {
				next("/dashboard");
			} else {
				next();
			}
		}
	},
	{
		path: "/signin",
		component: SigninPage,
		beforeEnter: (to, from, next) => {
			if (store.state.auth) {
				next("/dashboard");
			} else {
				next();
			}
		}
	},
	{
		path: "/dashboard",
		component: DashboardPage,
		beforeEnter: (to, from, next) => {
			if (store.state.auth) {
				next();
			} else {
				next("/");
			}
		}
	},
	{
		path: "/articles",
		component: () => import("./views/Articles.vue"),
		children: [
			{
				path: "",
				component: () => import("./components/Articles/Articles")
			},
			{
				path: "createArticle",
				component: () =>
					import("./components/Articles/CreateArticle/CreateArticle.vue")
			}
		]
	},
	{
		path: "/articles/:id",
		component: () => import("./components/Articles/Article/Article.vue"),
		props: true
	},
	{
		path: "/articles/edit/:id",
		component: () =>
			import(
				"./components/Articles/MangeArticles/UpdateArticle/UpdateArticle.vue"
			),
		props: true
	},
	{
		path: "/forgot-password",
		component: () => import("./views/ForgotPassword.vue")
	},
	{
		path: "/reset-password/:token",
		component: () => import("./views/PasswordReset.vue"),
		props: true
	},
	{
		path: "/reactivate-account",
		component: () => import("./views/ReactivateAccount.vue")
	},
	{
		path: "/reactivate-account/:token",
		component: () => import("./views/ReactivateAccountFinish.vue"),
		props: true
	},
	{
		path: "/verify-email/:token",
		component: () => import("./views/VerifyAccountFinish.vue"),
		props: true
	},
	{
		path: "*",
		component: () => import("./views/Error.vue")
	}
];

export default new VueRouter({ mode: "history", routes });
