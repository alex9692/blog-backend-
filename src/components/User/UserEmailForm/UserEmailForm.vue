<template>
	<b-container>
		<b-row>
			<b-col cols="6" offset-md="3">
				<b-card class="mt-5">
					<h3 v-if="mode==='forgot'">Forgot Password</h3>
					<h3 v-if="mode==='reactivate'">Reactivate Account</h3>
					<hr />
					<b-form @submit.prevent="onSubmit">
						<p
							v-if="mode==='forgot'"
							style="fontWeight: bold;"
						>Enter your email address and we will send you a link to reset your password.</p>
						<p
							v-if="mode==='reactivate'"
						>Enter your email address and we will send you a link to reactivate your account.</p>
						<b-form-group id="input-group-1" label="Email:" label-for="email">
							<b-form-input
								id="email"
								v-model="email"
								type="email"
								required
								placeholder="Your email address"
							></b-form-input>
						</b-form-group>
						<b-button
							class="mt-3"
							type="submit"
							variant="secondary"
							style="width: 100%;"
							:disabled="!allowSubmit"
						>
							<span v-if="!loading">
								<span v-if="mode==='forgot'">Send password reset email</span>
								<span v-if="mode==='reactivate'">Send reactivation link</span>
							</span>
							<span v-else>
								<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Sending...
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

	const regexEmail = /\S+@\S+\.\S+/;
	export default {
		data() {
			return {
				email: ""
			};
		},
		props: ["mode"],
		methods: {
			async onSubmit() {
				if (this.mode === "forgot") {
					this.$store.dispatch("sendResetPasswordMail", {
						email: this.email
					});
				} else if (this.mode === "reactivate") {
					this.$store.dispatch("sendAccountReactivationMail", {
						email: this.email
					});
				}
			}
		},
		computed: {
			...mapState(["loading"]),
			allowSubmit() {
				return this.email && regexEmail.test(this.email);
			}
		}
	};
</script>

