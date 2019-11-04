<template>
	<div id="app">
		<app-header />
		<!-- <b-breadcrumb :items="items"></b-breadcrumb> -->
		<router-view></router-view>
	</div>
</template>

<script>
	import Header from "./components/Header/Header";
	export default {
		name: "app",
		components: {
			"app-header": Header
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
</style>