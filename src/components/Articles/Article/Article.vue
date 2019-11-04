<template>
	<vue-custom-scrollbar class="scroll-area" :settings="settings">
		<div v-if="article">
			<b-button variant="dark" class="ml-5 mt-3" @click="goBack">
				<v-icon name="arrow-left" class="arrow-left-icon mb-1 mr-1"></v-icon>Back
			</b-button>
			<b-container>
				<b-row class="my-3">
					<b-col cols="12">
						<b-card class="py-4 px-2" :title="article.title">
							<b-card-text>{{article.content}}</b-card-text>
						</b-card>
					</b-col>
				</b-row>
				<b-row class="mt-4">
					<b-col cols="1" offset-md="1">
						<h5>Reviews:</h5>
					</b-col>
				</b-row>
				<hr />
				<app-reviews></app-reviews>
				<hr />
				<app-create-review class="mb-5"></app-create-review>
			</b-container>
		</div>
	</vue-custom-scrollbar>
</template>

<script>
	import { mapState } from "vuex";
	import Reviews from "../../Reviews/Reviews";
	import CreateReview from "../../Reviews/CreateReview/CreateReview";
	import vueCustomScrollbar from "vue-custom-scrollbar";

	export default {
		components: {
			"app-reviews": Reviews,
			"app-create-review": CreateReview,
			vueCustomScrollbar
		},
		props: ["id"],
		data() {
			return {
				article: null,
				settings: {
					maxScrollbarLength: 200,
					tagname: "div"
				}
			};
		},
		methods: {
			goBack() {
				this.$router.go(-1);
			}
		},
		computed: {
			...mapState({ selectedArticle: "article" })
		},
		async created() {
			await this.$store.dispatch("setSelectedArticle", this.id);
			this.article = this.selectedArticle;
			await this.$store.dispatch("getReviews");
		},
		destroyed() {
			this.$store.dispatch("unsetSelectedArticle");
		}
	};
</script>

<style scoped>
	.arrow-left-icon {
		width: 1.1rem;
		color: #fff;
		transition: color 300ms;
		cursor: pointer;
	}
	.scroll-area {
		height: 75vh;
	}
</style>