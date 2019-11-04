<template>
	<b-container>
		<b-row>
			<b-col cols="6" offset-md="3">
				<b-card class="mt-5">
					<h3>Sign up</h3>
					<hr />
					<b-form @submit.prevent="onSubmit">
						<b-form-group
							id="input-group-1"
							label="Name: "
							label-for="name"
							description="Name must be atleast four characters long."
						>
							<b-form-input
								id="name"
								v-model="name"
								type="text"
								required
								placeholder="Please enter your name"
							></b-form-input>
						</b-form-group>
						<b-form-group
							id="input-group-2"
							label="Email Address:"
							label-for="email"
							description="We will not share your email"
						>
							<b-form-input
								id="email"
								v-model="email"
								type="email"
								required
								placeholder="Please enter your email address"
							></b-form-input>
						</b-form-group>

						<b-form-group
							id="input-group-4"
							label="Your Password:"
							label-for="password"
							description="Password must be atleast 8 characters long"
						>
							<b-form-input
								id="password"
								v-model="password"
								type="password"
								required
								placeholder="Enter your password"
							></b-form-input>
						</b-form-group>
						<b-form-group id="input-group-5" label="Confirm Password:" label-for="confirm-password">
							<b-form-input
								id="confirm-password"
								v-model="confirmPassword"
								type="password"
								required
								placeholder="Confirm your Password"
							></b-form-input>
						</b-form-group>
						<b-form-group id="input-group-3" label="PhoneNumber:" label-for="phone-number">
							<b-form-input
								id="phone-number"
								v-model="phoneNumber"
								type="number"
								required
								placeholder="Enter your Phone Number"
							></b-form-input>
						</b-form-group>

						<b-form-checkbox id="checkbox" v-model="terms" class="my-2">I'm not robot</b-form-checkbox>
						<b-button
							type="submit"
							variant="secondary"
							class="my-1"
							style="width:100%;"
							:disabled="!allowSubmit"
						>
							<span v-if="!loading">Submit</span>
							<span v-else>
								<b-spinner small label="Small Spinner" variant="light" class="mr-1"></b-spinner>Submitting...
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
				name: "",
				email: "",
				phoneNumber: null,
				password: "",
				confirmPassword: "",
				terms: false
			};
		},
		methods: {
			...mapActions(["signUpUser"]),
			async onSubmit() {
				const formData = {
					name: this.name,
					email: this.email,
					phoneNumber: Number(this.phoneNumber),
					password: this.password,
				};
				await this.signUpUser({ formData});
			}
		},
		computed: {
			...mapState([ "loading" ]),
			allowSubmit() {
				return (
					this.name &&
					this.email &&
					this.phoneNumber &&
					this.password &&
					this.terms &&
					regexEmail.test(this.email) &&
					this.name.length > 3 &&
					this.phoneNumber.length === 10 &&
					this.password.trim().length >= 8 &&
					this.password === this.confirmPassword
				);
			}
		}
	};
</script>
