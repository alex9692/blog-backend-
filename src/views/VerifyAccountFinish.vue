<template>
	<b-container>
		<b-row class="mt-5">
			<b-col cols="10" offset-md="1">
				<div v-if="loading" class="text-center">
					<b-spinner style="width: 5rem; height: 5rem;" label="Large Spinner" type="grow"></b-spinner>
				</div>
				<b-card class="text-center" v-if="!loading">
					<h1 class="display-4">Your account has been verified</h1>
					<p>Click the button below to go back to dashboard</p>
					<p class="text-center">
						<b-button style="width: 60%;" @click="redirectPage">Go back to dashboard</b-button>
					</p>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		props: ["token"],
		computed: {
			...mapState(["loading"])
		},
		created() {
			this.$store.dispatch("verifyAccountFinish", this.token);
		},
		methods: {
			redirectPage() {
				this.$router.replace("/dashboard");
			}
		}
	};
</script>