<template>
	<b-container>
		<b-row>
			<b-col cols="6" offset-md="3">
				<b-card class="mt-5">
					<h3>Sign In</h3>
					<hr />
					<b-form @submit.prevent="onSubmit">
						<b-form-group id="input-group-1" label="Email:" label-for="email">
							<b-form-input
								id="email"
								v-model="email"
								type="email"
								required
								placeholder="Your email address"
							></b-form-input>
						</b-form-group>
						<b-form-group id="input-group-2" label="Password:" label-for="password">
							<b-form-input
								id="password"
								v-model="password"
								type="password"
								required
								placeholder="Your password"
							></b-form-input>
						</b-form-group>
						<b-link to="/forgot-password" class="forgot-password">Forgot Password?</b-link>
						<p class=" mt-3">
							<b-link
								v-if="reactivateAccount"
								to="/reactivate-account"
								class="reactivation-link"
							>Your account is deactivated.Click to initiate the reactivation process.</b-link>
						</p>
						<b-button
							class="mt-3"
							type="submit"
							variant="secondary"
							style="width: 100%;"
							:disabled="!allowSubmit"
						>
							<span v-if="!loading">Login</span>
							<span v-else>
								<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Logging in...
							</span>
						</b-button>
					</b-form>
				</b-card>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
	import { mapState, mapActions } from "vuex";

	const regexEmail = /\S+@\S+\.\S+/;
	export default {
		data() {
			return {
				email: "",
				password: ""
			};
		},
		methods: {
			...mapActions(["signInUser"]),
			async onSubmit() {
				const formData = {
					email: this.email,
					password: this.password
				};
				await this.signInUser({ formData });
			}
		},
		computed: {
			...mapState(["loading", "reactivateAccount"]),
			allowSubmit() {
				return (
					this.email &&
					this.password &&
					regexEmail.test(this.email) &&
					this.password.trim().length >= 8
				);
			}
		}
	};
</script>

<style scoped>
	.forgot-password {
		background: #a2b1c2;
		padding: 0.3rem;
		border-radius: 5px;
		color: #262b30;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 300ms;
	}
	.forgot-password:hover {
		background: #262b30;
		color: #a2b1c2;
		text-decoration: none;
	}
	.reactivation-link {
		background: #df9683;
		padding: 0.3rem;
		border-radius: 5px;
		color: #262b30;
		cursor: pointer;
		font-size: 0.8rem;
		transition: all 300ms;
	}
	.reactivation-link:hover {
		background: #d45130;
		color: #fff;
		text-decoration: none;
	}
</style>