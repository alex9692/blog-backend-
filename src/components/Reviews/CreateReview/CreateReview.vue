<template>
	<div>
		<b-row class="mt-4" v-if="auth">
			<b-col cols="8" offset-md="1">
				<div>
					<h5>Write your review:</h5>
					<b-form-textarea id="textarea-rows" placeholder="Tall textarea" v-model="review" rows="6"></b-form-textarea>
					<b-button class="mt-1" :disabled="!allowPost" @click="submitReview">Post</b-button>
				</div>
			</b-col>
			<b-col cols="2">
				<div class="mt-5 ml-3 text-center">
					<h5 class="mb-1">Rate the article</h5>
					<span @click="setRatings(i)" v-for="(rating, i) in 5" :key="i">
						<v-icon name="star" :class="`mr-1 star-icon star-icon-${i+1}`"></v-icon>
					</span>
					<p v-if="ratings" class="text-center">Ratings: {{ratings}} stars</p>
				</div>
			</b-col>
		</b-row>
		<b-row v-else>
			<b-col cols="6" offset-md="3">
				<h1 class="text-center">Please Signin to review articles</h1>
			</b-col>
		</b-row>
	</div>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				ratings: "",
				review: ""
			};
		},
		methods: {
			setRatings(i) {
				this.ratings = i + 1;
			},
			async submitReview() {
				await this.$store.dispatch("addReview", {
					ratings: this.ratings,
					review: this.review
				});
				this.ratings = "";
				this.review = "";
			}
		},
		watch: {
			ratings(val, old) {
				for (let c = 1; c <= old; c++) {
					const el = document.querySelector(`.star-icon-${c}`);
					el.style.fill = "#abb6bdd5";
				}
				for (let c = 1; c <= val; c++) {
					const el = document.querySelector(`.star-icon-${c}`);
					el.style.fill = "#343a40";
				}
			}
		},
		computed: {
			...mapState(["auth"]),
			allowPost() {
				return (
					this.review &&
					this.ratings &&
					this.review.trim().length > 0 &&
					this.ratings > 0
				);
			}
		}
	};
</script>

<style scoped>
	.star-icon {
		width: 1.1rem;
		color: #343a40;
		transition: color 300ms;
		cursor: pointer;
	}
</style>