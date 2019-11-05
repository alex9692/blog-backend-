<template>
	<div>
		<b-row v-for="article in articles" :key="article._id" class="mb-3">
			<b-col cols="10" offset-md="1">
				<b-card class="card-custom">
					<div class="d-flex w-100 justify-content-between">
						<b-card-text>{{article.title}}</b-card-text>
						<div v-if="user.role !=='guest'">
							<div v-if="!loading">
								<span @click="updateArticle(article._id)">
									<v-icon name="edit-3" class="edit-icon mr-4"></v-icon>
								</span>
								<span @click="deleteArticle(article._id)">
									<v-icon name="x-circle" class="delete-icon"></v-icon>
								</span>
							</div>
							<div v-else>
								<b-spinner small label="Small Spinner" variant="dark" class="mr-1"></b-spinner>
							</div>
						</div>
						<div v-else>
							<small>You need to be verified to update or delete your articles.</small>
						</div>
					</div>
					<div class="d-flex w-100 justify-content-between">
						<p class="mb-1">
							Ratings:
							<span v-for="(rating, i) in article.ratingsAverage" :key="i">
								<v-icon name="star" class="star-icon"></v-icon>
							</span>
						</p>
						<small>Created At: {{new Date(article.createdAt).toLocaleDateString()}}</small>
					</div>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		computed: {
			...mapState({
				articles: "myArticles",
				loading: "loading",
				user: "user"
			})
		},
		methods: {
			updateArticle(id) {
				this.$router.push(`/articles/edit/${id}`);
			},
			deleteArticle(id) {
				this.$store.dispatch("deleteArticle", id);
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

	.edit-icon {
		width: 1.5rem;
		color: #343a40;
		transition: color 300ms;
		fill: #343a40;
	}

	.delete-icon {
		width: 1.5rem;
		color: #343a40;
		transition: color 300ms;
	}

	.card-custom {
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
	.card-custom:hover .edit-icon:hover {
		cursor: pointer;
		color: #fff;
	}
	.card-custom:hover .delete-icon:hover {
		cursor: pointer;
		color: #fff;
	}
</style>