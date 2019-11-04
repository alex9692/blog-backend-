<template>
	<b-row class="mt-3">
		<b-col cols="10" offset-md="1">
			<div>
				<b-tabs pills card vertical>
					<b-tab title="My Articles" active>
						<app-my-articles :articles="prop"></app-my-articles>
					</b-tab>
					<b-tab title="Manage Articles">
						<app-manage-articles-controls></app-manage-articles-controls>
					</b-tab>
				</b-tabs>
			</div>
		</b-col>
	</b-row>
</template>

<script>
	import MyArticles from "../MyArticles/MyArticles";
	import ManageArticlesControls from "../MangeArticles/ManageArticleControls";
	export default {
		components: {
			"app-my-articles": MyArticles,
			"app-manage-articles-controls": ManageArticlesControls
		},
		props: ["prop"],
		created() {
			this.$store.dispatch("getMyArticles");
		}
	};
</script>