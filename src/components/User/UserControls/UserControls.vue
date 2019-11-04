<template>
	<b-row class="mt-3">
		<b-col cols="10" offset-md="1">
			<div>
				<b-tabs pills card vertical>
					<b-tab title="User Details" active>
						<app-account-details :user="prop"></app-account-details>
					</b-tab>
					<b-tab title="Edit Account">
						<app-account-edit :user="prop"></app-account-edit>
					</b-tab>
				</b-tabs>
			</div>
		</b-col>
	</b-row>
</template>

<script>
	import AccountDetails from "../UserDetails/UserDetails";
	import AccountEdit from "../EditUser/EditUser";
	export default {
		components: {
			"app-account-details": AccountDetails,
			"app-account-edit": AccountEdit
		},
		props: ["prop"]
	};
</script>

<style scoped>
	.test {
		background: #272b2e;
	}
</style>