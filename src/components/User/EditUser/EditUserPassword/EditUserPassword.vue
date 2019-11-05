<template>
	<b-row class="mt-3">
		<b-col cols="8">
			<b-form @submit.prevent="onSubmit">
				<b-form-group id="input-group-1" label-for="password-current" label="Current password">
					<b-form-input
						id="password-current"
						type="password"
						v-model="currentPassword"
						placeholder="Enter your current password"
					></b-form-input>
				</b-form-group>
				<b-form-group
					id="input-group-2"
					label-for="password-new"
					description="Password should be atleast 8 characters long"
					label="New password"
				>
					<b-form-input
						id="password-new"
						type="password"
						v-model="newPassword"
						placeholder="Enter your new password"
					></b-form-input>
				</b-form-group>
				<b-form-group id="input-group-3" label-for="password-confirm" label="Confirm password">
					<b-form-input
						id="password-confirm"
						type="password"
						v-model="confirmPassword"
						placeholder="Confirm your current password"
					></b-form-input>
				</b-form-group>
				<div class="text-center">
					<b-button type="submit" variant="success" style="width: 60%;" :disabled="!allowSubmit">
						<span v-if="!loading">Submit</span>
						<span v-else>
							<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Submitting...
						</span>
					</b-button>
				</div>
			</b-form>
		</b-col>
	</b-row>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				currentPassword: "",
				newPassword: "",
				confirmPassword: ""
			};
		},
		computed: {
			...mapState(["loading"]),
			allowSubmit() {
				return (
					this.currentPassword &&
					this.newPassword &&
					this.confirmPassword &&
					this.newPassword.trim().length > 7 &&
					this.confirmPassword === this.newPassword
				);
			}
		},
		methods: {
			onSubmit() {
				this.$store.dispatch("updatePassword", {
					currentPassword: this.currentPassword,
					newPassword: this.newPassword,
					confirmNewPassword: this.confirmPassword
				});
				this.currentPassword = "";
				this.newPassword = "";
				this.confirmPassword = "";
			}
		}
	};
</script>