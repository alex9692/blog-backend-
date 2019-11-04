<template>
	<app-reactivate-account-form mode="reactivate"></app-reactivate-account-form>
</template>

<script>
	import Form from "../components/User/UserEmailForm/UserEmailForm";
	export default {
		components: {
			"app-reactivate-account-form": Form
		},
		created() {
			this.$store.dispatch("resetReactivationStatus");
		}
	};
</script>

