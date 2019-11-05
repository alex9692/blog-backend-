<template>
	<div v-if="articles.length>0">
		<b-row v-for="article in articles" :key="article._id" class="mb-3">
			<b-col cols="10" offset-md="1">
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
						<small>Created At: {{new Date(article.createdAt).toLocaleDateString()}}</small>
					</div>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	export default {
		props: ["articles"],
		methods: {
			showArticle(slug, id) {
				const path = `/articles/${id}`;
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
</style>