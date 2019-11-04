<template>
	<div v-if="user">
		<h1 class="display-4">Your account is active.</h1>
		<p>Click "Deactivate me" button to temporarily deactivate your account. You can reactivate your account later.</p>
		<p>Thank you for joining us.</p>
		<b-button style="width: 40%;" @click="deactivateUser">Deactivate Me</b-button>
	</div>
</template>

<script>
	export default {
		props: ["user"],
		methods: {
			deactivateUser() {
				this.$store.dispatch("deactivateAccount");
			}
		}
	};
</script>