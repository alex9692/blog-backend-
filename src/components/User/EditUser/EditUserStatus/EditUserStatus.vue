<template>
	<div v-if="user">
		<h1 class="display-4">Your account is active.</h1>
		<p>Click "Deactivate me" button to temporarily deactivate your account. You can reactivate your account later.</p>
		<p>Thank you for joining us.</p>
		<b-button style="width: 40%;" @click="deactivateUser">
			<span v-if="!loading">Deactivate Me</span>
			<span v-else>
				<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Deactivating...
			</span>
		</b-button>
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		props: ["user"],
		computed: {
			...mapState(["loading"])
		},
		methods: {
			deactivateUser() {
				this.$store.dispatch("deactivateAccount");
			}
		}
	};
</script>