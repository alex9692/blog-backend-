<template>
	<b-row class="mt-3">
		<b-col cols="8">
			<b-form @submit.prevent="onSubmit">
				<b-form-group
					id="input-group-1"
					label-for="name"
					label="Name"
					description="Your name should be atleast 4 characters"
				>
					<b-form-input id="name" type="text" v-model="updatedName"></b-form-input>
				</b-form-group>
				<b-form-group id="input-group-2" label-for="email" label="Email">
					<b-form-input id="email" type="email" v-model="updatedEmail"></b-form-input>
				</b-form-group>
				<b-form-group id="input-group-3" label-for="phone" label="Phone Number">
					<b-form-input id="phone" type="number" v-model="updatedPhoneNumber"></b-form-input>
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
				updatedName: this.user.name,
				updatedEmail: this.user.email,
				updatedPhoneNumber: this.user.phoneNumber,
				updatedData: {}
			};
		},
		props: ["user"],
		computed: {
			...mapState(["loading"]),
			allowSubmit() {
				const regexEmail = /\S+@\S+\.\S+/;
				return (
					this.updatedName &&
					this.updatedEmail &&
					this.updatedPhoneNumber &&
					this.updatedName.trim().length > 3 &&
					regexEmail.test(this.updatedEmail) &&
					this.updatedPhoneNumber.toString().length === 10 &&
					Object.keys(this.updatedData).length > 0
				);
			}
		},
		methods: {
			onSubmit() {
				const formData = {
					name: this.updatedName,
					email: this.updatedEmail,
					phoneNumber: +this.updatedPhoneNumber
				};
				Object.keys(formData).forEach(key => {
					if (this.user[key] !== formData[key]) {
						this.updatedData[key] = formData[key];
					}
				});
				this.$store.dispatch("updateUser", { ...this.updatedData });
				this.updatedData = {};
			}
		},
		watch: {
			updatedName: function(newVal) {
				if (newVal !== this.user["name"]) {
					this.updatedData["name"] = newVal;
				} else {
					delete this.updatedData["name"];
				}
			},
			updatedEmail: function(newVal) {
				if (newVal !== this.user["email"]) {
					this.updatedData["email"] = newVal;
				} else {
					delete this.updatedData["email"];
				}
			},
			updatedPhoneNumber: function(newVal) {
				if (newVal !== this.user["phoneNumber"]) {
					this.updatedData["phoneNumber"] = newVal;
				} else {
					delete this.updatedData["phoneNumber"];
				}
			}
		}
	};
</script>