<template>
	<div>
		<b-nav small>
			<b-nav-item
				@click="selectedComponent='app-articles'"
				:active="selectedComponent==='app-articles'"
				:to="{path: '/articles'}"
			>Browse Articles</b-nav-item>
			<b-nav-item
				@click="selectedComponent='app-create-article'"
				:active="selectedComponent==='app-create-article'"
				:to="{path: '/articles/createArticle'}"
			>Create Article</b-nav-item>
		</b-nav>
		<!-- <app-articles></app-articles> -->
		<router-view></router-view>
	</div>
</template>

<script>
	import Articles from "../components/Articles/Articles";
	import CreateArticle from "../components/Articles/CreateArticle/CreateArticle";
	export default {
		components: {
			"app-articles": Articles
		},
		data() {
			return {
				selectedComponent: "app-articles"
			};
		},
		created() {
			this.$store.dispatch("fetchArticles");
			if (this.$router.history.current.fullPath.includes("createArticle")) {
				this.selectedComponent = "app-create-article";
			}
		}
	};
</script>

<style scoped>
	a {
		color: #343a40;
	}
	a:hover {
		background: #343a40;
		border-radius: 5px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		color: #fff;
		transition: all 300ms;
	}
	.active {
		background: #343a40;
		border-radius: 5px;
		border-top-left-radius: 0px;
		border-top-right-radius: 0px;
		color: #fff;
		transition: all 300ms;
	}
	.active:hover {
		background: #6c757d;
		color: #fff;
	}
</style>