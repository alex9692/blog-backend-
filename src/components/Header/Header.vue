<template>
	<div>
		<b-navbar toggleable="lg" type="dark" variant="dark">
			<b-navbar-brand to="/">ArticleFeed</b-navbar-brand>
			<b-navbar-nav>
				
					<b-nav-item class="mx-2" to="/articles" active-class="active">Articles</b-nav-item>
			</b-navbar-nav>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="ml-auto">
					<b-nav-item v-if="!authState" class="mx-2" to="/signup" active-class="active" exact>Sign up</b-nav-item>
					<b-nav-item v-if="!authState" class="mx-2" to="/signin" active-class="active" exact>Sign in</b-nav-item>
					<b-nav-text v-if="authState" class="mx-2">Welcome {{user ? user.name.split(' ')[0] : ''}}!</b-nav-text>
					<b-nav-item v-if="authState" class="mx-2" to="/dashboard" active-class="active" exact>Dashboard</b-nav-item>
					<b-nav-item v-if="authState" class="mx-2" @click="logout" active-class="active" exact>Logout</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	export default {
		computed: {
			...mapState({ authState: "auth", user: "user" })
		},
		methods: {
			...mapActions(["signout"]),
			logout() {
				this.signout(this.$router);
			}
		}
	};
</script>

<style scoped>
	.active {
		background-color: #fff;
		color: #343a40 !important;
		border-radius: 5px;
	}
	li:hover {
		background-color: #fff;
		border-radius: 5px;
		transition: background-color 200ms;
	}
	li:hover a {
		color: #343a40 !important;
		transition: color 200ms;
	}
</style>