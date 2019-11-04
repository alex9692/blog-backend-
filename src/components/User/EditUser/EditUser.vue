<template>
	<div v-if="user">
		<b-nav tabs>
			<b-nav-item
				:active="activeComponent==='app-edit-user-data'"
				@click="activeComponent='app-edit-user-data'"
			>Edit User Data</b-nav-item>
			<b-nav-item
				:active="activeComponent==='app-edit-user-password'"
				@click="activeComponent='app-edit-user-password'"
			>Edit User Password</b-nav-item>
			<b-nav-item
				:active="activeComponent==='app-edit-user-status'"
				@click="activeComponent='app-edit-user-status'"
			>Account Status</b-nav-item>
		</b-nav>
		<component :is="activeComponent" :user="user"></component>
	</div>
</template>

<script>
	import EditUserData from "./EditUserData/EditUserData";
	import EditUserPassword from "./EditUserPassword/EditUserPassword";
	import EditUserStatus from "./EditUserStatus/EditUserStatus";

	export default {
		components: {
			"app-edit-user-data": EditUserData,
			"app-edit-user-password": EditUserPassword,
			"app-edit-user-status": EditUserStatus
		},
		props: ["user"],
		data() {
			return {
				activeComponent: "app-edit-user-data"
			};
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