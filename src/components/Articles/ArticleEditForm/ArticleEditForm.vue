<template>
	<b-container>
		<b-row>
			<b-col cols="8" offset-md="2">
				<div v-if="!auth">
					<h1
						v-if="mode==='create'"
						class="display-4 text-center"
					>You need to be logged in to create an article</h1>
					<h1
						v-if="mode==='update'"
						class="display-4 text-center"
					>You need to be logged in to update an article</h1>
				</div>
				<b-card v-else class="mt-5">
					<h3>{{ mode==='create' ? 'Create': 'Update' }} an Article</h3>
					<hr />
					<b-form @submit.prevent="onSubmit">
						<b-form-group
							id="input-group-1"
							label="Title: "
							label-for="title"
							description="The title should be more than or equal to 10 characters long."
						>
							<b-form-input id="title" v-model="title" type="text" required placeholder="Enter the title."></b-form-input>
						</b-form-group>
						<b-form-group
							id="input-group-2"
							label="Content:"
							label-for="content"
							description="The content should be atleast 1000 characters long"
						>
							<b-form-textarea
								id="content"
								v-model="content"
								rows="10"
								required
								placeholder="Enter the content....."
							></b-form-textarea>
						</b-form-group>
						<b-button
							type="submit"
							variant="secondary"
							class="my-1"
							style="width:100%;"
							:disabled="!allowSubmit"
						>
							<span v-if="!loading">Submit</span>
							<span v-else>
								<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Submitting...
							</span>
						</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		props: ["mode", "article"],
		data() {
			return {
				title: "",
				content: ""
			};
		},
		computed: {
			...mapState(["loading", "auth"]),
			allowSubmit() {
				return (
					this.title &&
					this.content &&
					this.title.trim().length > 10 &&
					this.content.trim().length > 10
				);
			}
		},
		methods: {
			onSubmit() {
				if (this.mode === "create") {
					this.$store.dispatch("submitNewArticle", {
						title: this.title,
						content: this.content
					});
				} else {
					this.$store.dispatch("updateArticle", {
						newArticle: {
							title: this.title,
							content: this.content
						},
						id: this.article._id
					});
				}
			}
		},
		mounted() {
			if (this.article) {
				(this.title = this.article.title),
					(this.content = this.article.content);
			}
		}
	};
</script>