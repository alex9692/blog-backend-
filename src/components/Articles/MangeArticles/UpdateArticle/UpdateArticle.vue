<template>
	<app-update-article-form v-if="article" :article="article" mode="update"></app-update-article-form>
</template>

<script>
	import Form from "../../ArticleEditForm/ArticleEditForm";
	import { mapState } from "vuex";

	export default {
		components: {
			"app-update-article-form": Form
		},
		computed: {
			...mapState(["article"])
		},
		props: ["id"],
		created() {
			this.$store.dispatch("setSelectedArticle", this.id);
		}
	};
</script>