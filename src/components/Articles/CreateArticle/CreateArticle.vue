<template>
	<app-create-article-form :article="null" mode="create"></app-create-article-form>
</template>

<script>
	import Form from "../ArticleEditForm/ArticleEditForm";

	export default {
		components: {
			"app-create-article-form": Form
		}
	};
</script>