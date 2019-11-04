<template>
	<b-container>
		<h1 class="text-center display-4">Best place to Create/Review an article</h1>
		<div v-if="!auth">
			<p class="text-center">Now you're just one sign in/sign up away from it!</p>
			<b-nav align="center">
				<b-nav-item>
					<b-button to="/signup" active-class="active" exact variant="outline-secondary">Sign Up</b-button>
				</b-nav-item>
				<b-nav-item>
					<b-button to="/signin" active-class="active" exact variant="outline-secondary">Sign In</b-button>
				</b-nav-item>
			</b-nav>
			<p class="text-center">Or browse top articles!</p>
			<b-nav align="center">
				<b-nav-item>
					<b-button
						to="/articles"
						active-class="active"
						exact
						variant="outline-secondary"
					>Browse Articles</b-button>
				</b-nav-item>
			</b-nav>
		</div>
		<div v-else>
			<p class="text-center">Go to the articles page to browse articles or create an article.</p>
			<p class="text-center">Have fun!</p>
			<b-nav align="center">
				<b-nav-item>
					<b-button to="/articles" active-class="active" exact variant="outline-secondary">Browse Articles</b-button>
				</b-nav-item>
				<b-nav-item>
					<b-button to="/articles/createArticle" active-class="active" exact variant="outline-secondary">Create an Article</b-button>
				</b-nav-item>
			</b-nav>
		</div>
		<p
			style="fontSize:14px; marginTop: 300px;"
			class="text-center"
		>A simple MEVN app with Bootstrap-vue and other vue features such as Vuex,VueRouter along with other backend technologies.</p>
	</b-container>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		computed: {
			...mapState(["auth"])
		}
	};
</script>