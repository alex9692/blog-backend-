<template>
	<div class="mt-3">
		<h1>Dashboard!</h1>
		<hr />
		<div class="text-center">
			<div v-if="user && user.role ==='guest'">
				<p
					class="text-danger mb-3"
				>It seems your account is not verified.Click the button down below to verify your account and enjoy full feature.</p>
				<b-button @click="sendMail">Verify Account</b-button>
			</div>
			<div v-else>You account is verified.You can now enjoy full features of this app.</div>
		</div>
		<b-card class="mt-5" no-body>
			<b-card-header header-tag="nav">
				<b-nav card-header tabs>
					<b-nav-item
						@click="selectedComponent='app-user-controls'"
						:active="selectedComponent==='app-user-controls'"
					>Account</b-nav-item>
					<b-nav-item
						@click="selectedComponent='app-article-controls'"
						:active="selectedComponent==='app-article-controls'"
					>My Articles</b-nav-item>
					<b-nav-item
						@click="selectedComponent='app-review-controls'"
						:active="selectedComponent==='app-review-controls'"
					>My Reviews</b-nav-item>
				</b-nav>
			</b-card-header>
		</b-card>
		<b-row class="mr-1">
			<b-col cols="12">
				<keep-alive>
					<component v-if="user" :is="selectedComponent" :prop="setProps"></component>
				</keep-alive>
			</b-col>
		</b-row>
	</div>
</template>


<script>
	import { mapState } from "vuex";
	import UserControls from "../components/User/UserControls/UserControls";
	import ArticleControls from "../components/Articles/ArticleControls/ArticleControls";
	import MyReviews from "../components/Reviews/ReviewsControls/ReviewControls";

	export default {
		beforeRouteEnter(to, from, next) {
			next(vm => {
				vm.prevPath = from.path;
			});
		},
		data() {
			return {
				prevPath: "",
				selectedComponent: "app-user-controls"
			};
		},
		components: {
			"app-user-controls": UserControls,
			"app-article-controls": ArticleControls,
			"app-review-controls": MyReviews
		},
		methods: {
			sendMail() {
				this.$store.dispatch("sendVertificationMail");
			}
		},
		computed: {
			...mapState(["user", "myArticles"]),
			setProps() {
				if (this.selectedComponent === "app-user-controls") {
					return this.user;
				} else if (this.selectedComponent === "app-article-controls") {
					return this.myArticles;
				}
				return null;
			}
		},
		watch: {
			prevPath: function(newVal) {
				if (newVal.includes("/articles/")) {
					this.selectedComponent = "app-article-controls";
				}
			}
		},
		async created() {
			await this.$store.dispatch("getUser");
		}
	};
</script>

<style scoped>
	a {
		color: #495057;
	}
	.nav-item a.active {
		color: #007bff;
	}
</style>