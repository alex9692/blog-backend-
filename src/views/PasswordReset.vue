<template>
	<b-container>
		<b-row>
			<b-col cols="6" offset-md="3">
				<b-card class="mt-5" v-if="resetUserName==='timeout'">
					<h3>Session Timeout</h3>
					<p>Your session to reset your password has expired.</p>
					<p>Please try again.</p>
					<b-button
						class="mt-3"
						type="submit"
						variant="secondary"
						style="width: 100%;"
						to="/signin"
					>Go back to SignIn</b-button>
				</b-card>
				<b-card class="mt-5" v-if="resetUserName !== 'timeout'">
					<h3>Reset your Password</h3>
					<hr />
					<b-form @submit.prevent="onSubmit">
						<p style="fontWeight: bold;">Change password for : {{resetUserName}}</p>
						<b-form-group id="input-group-1" label="Password:" label-for="password">
							<b-form-input
								id="password"
								v-model="newPassword"
								type="password"
								required
								placeholder="Your password"
							></b-form-input>
						</b-form-group>
						<b-form-group id="input-group-2" label="Confirm Password:" label-for="confirm-password">
							<b-form-input
								id="confirm-password"
								v-model="confirmNewPassword"
								type="password"
								required
								placeholder="Confirm password"
							></b-form-input>
						</b-form-group>
						<b-button
							class="mt-3"
							type="submit"
							variant="secondary"
							style="width: 100%;"
							:disabled="!allowSubmit"
						>
							<span v-if="!loading">Reset your password</span>
							<span v-else>
								<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Wait...
							</span>
						</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapState } from "vuex";

	export default {
		data() {
			return {
				newPassword: "",
				confirmNewPassword: ""
			};
		},
		props: ["token"],
		methods: {
			async onSubmit() {
				this.$store.dispatch("resetPassword", {
					data: {
						newPassword: this.newPassword,
						confirmNewPassword: this.confirmNewPassword
					},
					token: this.token
				});
			}
		},
		computed: {
			...mapState(["loading", "resetUserName"]),
			allowSubmit() {
				return (
					this.newPassword &&
					this.confirmNewPassword &&
					this.newPassword.trim().length > 7 &&
					this.newPassword === this.confirmNewPassword
				);
			}
		},
		created() {
			this.$store.dispatch("retrieveUserNameFromToken", this.token);
		}
	};
</script>

