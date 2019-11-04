<template>
	<div id="app">
		<app-header />
		<!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
		<router-view></router-view>
		<app-footer></app-footer>
	</div>
</template>

<script>
	import Header from "./components/Header/Header";
	import Footer from "./components/Footer/Footer";
	export default {
		name: "app",
		components: {
			"app-header": Header,
			"app-footer": Footer
		},
		data() {
			return {
				items: [
					{
						text: "Home",
						to: "/"
					},
					{
						text: "Articles",
						to: "/articles"
					},
					{
						text: "Article",
						to: "/articles/:id",
						active: true
					}
				]
			};
		}
	};
</script>

<style>
	body {
		background: #abb6bdd5;
	}
</style>