<template>
	<b-row class="mt-3">
		<b-col cols="10" offset-md="1">
			<div>
				<b-tabs pills card vertical>
					<b-tab title="My Articles" active>
						<vue-custom-scrollbar class="scroll-area" :settings="settings">
							<app-my-articles :articles="prop"></app-my-articles>
						</vue-custom-scrollbar>
					</b-tab>
					<b-tab title="Manage Articles">
						<vue-custom-scrollbar class="scroll-area" :settings="settings">
							<app-manage-articles-controls></app-manage-articles-controls>
						</vue-custom-scrollbar>
					</b-tab>
				</b-tabs>
			</div>
		</b-col>
	</b-row>
</template>

<script>
	import MyArticles from "../MyArticles/MyArticles";
	import ManageArticlesControls from "../MangeArticles/ManageArticleControls";
	import vueCustomScrollbar from "vue-custom-scrollbar";

	export default {
		components: {
			"app-my-articles": MyArticles,
			"app-manage-articles-controls": ManageArticlesControls,
			vueCustomScrollbar
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 200,
					tagname: "div"
				}
			};
		},
		props: ["prop"],
		created() {
			this.$store.dispatch("getMyArticles");
		}
	};
</script>

<style scoped>
	.scroll-area {
		height: 50vh;
		width:60vw;
		position: absolute;
	}
</style>