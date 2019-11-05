<template>
	<vue-custom-scrollbar class="scroll-area" :settings="settings">
		<div>
			<h1 class="display-4 ml-2">All Articles:</h1>
			<hr />
			<b-container>
				<b-row v-for="article in articles" :key="article._id" class="mb-3">
					<b-col cols="12">
						<b-card @click="showArticle(article.slug, article._id)" class="card-custom">
							<div class="d-flex w-100 justify-content-between">
								<b-card-text>{{article.title}}</b-card-text>
								<small>Click to view</small>
							</div>
							<div class="d-flex w-100 justify-content-between">
								<p class="mb-1">
									Ratings:
									<span v-for="(rating, i) in article.ratingsAverage" :key="i">
										<v-icon name="star" class="star-icon"></v-icon>
									</span>
								</p>
								<small>Created At: {{article.createdAt}}</small>
							</div>
						</b-card>
					</b-col>
				</b-row>
			</b-container>
		</div>
	</vue-custom-scrollbar>
</template>

<script>
	import { mapState } from "vuex";
	import vueCustomScrollbar from "vue-custom-scrollbar";

	export default {
		components: { vueCustomScrollbar },
		computed: {
			...mapState(["articles"])
		},
		data() {
			return {
				settings: {
					maxScrollbarLength: 200,
					tagname: "div"
				}
			};
		},
		methods: {
			showArticle(slug, id) {
				const path = `${this.$router.currentRoute.path}/${id}`;
				this.$router.push(path);
			}
		}
	};
</script>


<style scoped>
	.star-icon {
		width: 1.5rem;
		color: #343a40;
		transition: color 300ms;
		fill: #343a40;
	}

	.card-custom {
		cursor: pointer;
		color: #343a40;
		transition: all 300ms;
		box-shadow: 1px 2px 3px rgba(0.5, 0.5, 0.5, 0.5);
	}
	.card-custom:hover {
		background: #7b8794;
		color: #fff;
	}
	.card-custom:active {
		transform: translateY(2px);
	}
	.card-custom:hover .star-icon {
		color: #fff;
	}
	.scroll-area {
		height: 75vh;
	}
</style>