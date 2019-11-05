import Vue from "vue";
import Vuex from "vuex";
import { articleInstance, userInstance, reviewInstance } from "./axios";
import * as io from "socket.io-client";

import router from "./router";

const socket = io("http://localhost:5001");

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: "",
		userId: "",
		user: null,
		loading: false,
		auth: false,
		articles: [],
		selectedArticleId: "",
		article: null,
		myArticles: [],
		resetUserName: "",
		reactivateAccount: false,
		reviews: [],
		error: false,
		errMessage: {}
	},
	mutations: {
		setTokenAndUserId: (state, payload) => {
			state.token = payload.token;
			state.userId = payload.userId;
		},
		setUser: (state, payload) => {
			state.user = payload.user;
		},
		setAuth: (state, payload) => {
			state.auth = payload;
		},
		setLoading: (state, payload) => {
			state.loading = payload;
		},
		setArticles: (state, payload) => {
			state.articles = payload;
		},
		setArticleId: (state, payload) => {
			state.selectedArticleId = payload;
		},
		unsetArticleId: state => {
			state.selectedArticleId = "";
		},
		setArticle: (state, payload) => {
			state.article = payload;
		},
		unsetArticle: state => {
			state.article = null;
		},
		"setArticlew/oReq": (state, payload) => {
			state.article = state.articles.find(el => el._id === payload);
		},
		updateCurrentUser: (state, payload) => {
			Object.assign(state.user, payload);
		},
		setMyArticles: (state, payload) => {
			state.myArticles = payload;
		},
		addNewArticle: (state, payload) => {
			state.articles.push(payload);
		},
		updateSelectedArticle: (state, payload) => {
			if (state.articles.length > 0) {
				const oldArticle = state.articles.find(el => el._id === payload._id);
				Object.assign(oldArticle, payload);
			}
		},
		deleteSelectedArticle: (state, payload) => {
			const indexInMyArticles = state.myArticles.findIndex(
				el => el._id === payload
			);
			state.myArticles.splice(indexInMyArticles, 1);
			if (state.articles.length > 0) {
				const indexInArticles = state.articles.findIndex(
					el => el._id === payload
				);
				state.articles.splice(indexInArticles, 1);
			}
		},
		setResetUserName: (state, payload) => {
			state.resetUserName = payload;
		},
		reactivateYourAccount: (state, payload) => {
			state.reactivateAccount = payload;
		},
		setReviews: (state, payload) => {
			state.reviews = payload;
		},
		addNewReview: (state, payload) => {
			state.reviews.push(payload);
		},
		setError: (state, payload) => {
			state.error = payload;
		}
	},
	actions: {
		signInUser: async ({ commit, dispatch, state }, payload) => {
			commit("setLoading", true);
			try {
				const response = await userInstance.post("/signin", payload.formData);
				const { token, tokenExpirationDate, userId } = response.data.data;
				localStorage.setItem("expirationDate", tokenExpirationDate);
				localStorage.setItem("token", token);
				commit("setTokenAndUserId", { token, userId });
				commit("setAuth", true);
				commit("setLoading", false);
				dispatch("autoSignout");
				router.push("/dashboard");
			} catch (error) {
				state.error = true;
				if (error.response.data.message.includes("email")) {
					state.errMessage.msg = error.response.data.message;
				}
				if (error.response.data.message.includes("deactivate")) {
					commit("reactivateYourAccount", true);
				}
				setTimeout(() => {
					state.error = false;
				}, 5000);
				commit("setLoading", false);
				commit("setAuth", false);
			}
		},
		signUpUser: async ({ commit, state }, payload) => {
			commit("setLoading", true);
			try {
				await userInstance.post("/signup", payload.formData);
				commit("setLoading", false);
				router.push("/signin");
			} catch (error) {
				state.error = true;
				if (error.response.data.message.includes("email")) {
					state.errMessage.email = "Email already taken";
				}
				if (error.response.data.message.includes("phoneNumber")) {
					state.errMessage.phoneNumber = "Phone Number already taken";
				}
				commit("setLoading", false);
				setTimeout(() => {
					state.error = false;
				}, 5000);
			}
		},
		getUser: async ({ commit, state }) => {
			try {
				const response = await userInstance.get("/getMe", {
					headers: {
						Authorization: `Bearer ${state.token}`
					}
				});
				const { user } = response.data.data;
				localStorage.setItem("user", JSON.stringify(user));
				commit("setUser", { user });

				// socket.emit("startVerification", state.userId);
				// socket.on("sendUpdatedUser", function(data) {
				// console.log(data);
				// commit("setUser", { user });
				// });
			} catch (error) {
				router.replace("/error");
				console.log(error.response);
			}
		},
		signout: ({ commit }) => {
			commit("setAuth", false);
			commit("setUser", { user: null });
			commit("setTokenAndUserId", { token: "", userId: "" });
			commit("setArticles", []);
			commit("setMyArticles", []);
			localStorage.removeItem("token");
			localStorage.removeItem("expirationDate");
			localStorage.removeItem("user");
			router.push("/").catch(error => {});
		},
		autoSignout: ({ dispatch }) => {
			const expirationDate = localStorage.getItem("expirationDate");
			const timeLeft = expirationDate - Date.now();
			setTimeout(() => {
				dispatch("signout");
			}, timeLeft);
		},
		autoLogin: ({ commit, dispatch }) => {
			const expirationDate = localStorage.getItem("expirationDate");
			if (expirationDate) {
				if (Date.now() >= expirationDate) {
					dispatch("signout");
				} else {
					const token = localStorage.getItem("token");
					const user = JSON.parse(localStorage.getItem("user"));
					commit("setAuth", token !== null);
					commit("setUser", { user });
					commit("setTokenAndUserId", { token, userId: user._id });
				}
			}
		},
		sendVertificationMail: async ({ commit, state }) => {
			try {
				state.loading = true;
				await userInstance.get("/verify-email", {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				state.loading = false;
			} catch (error) {
				state.loading = false;
				commit("setError", true);
				state.errMessage.verifyError = "There was an error sending mail";
				console.log(error.response);
				setTimeout(() => {
					commit("setError", false);
				}, 5000);
			}
		},
		fetchArticles: async ({ commit }) => {
			try {
				const response = await articleInstance.get("/");
				commit("setArticles", response.data.data.articles);
			} catch (error) {
				console.log(error.response);
			}
		},
		setSelectedArticle: async ({ commit, state }, payload) => {
			if (state.articles.length === 0) {
				try {
					const response = await articleInstance.get(`/${payload}`);
					commit("setArticle", response.data.data.article);
					commit("setArticleId", payload);
				} catch (error) {
					console.log(error.response);
				}
			} else {
				commit("setArticleId", payload);
				commit("setArticlew/oReq", payload);
			}
		},
		unsetSelectedArticle: ({ commit }) => {
			commit("unsetArticleId");
			commit("unsetArticle");
		},
		updateUser: async ({ commit, state }, payload) => {
			try {
				state.loading = true;
				const response = await userInstance.patch(
					"/update-my-account-data",
					payload,
					{
						headers: { Authorization: `Bearer ${state.token}` }
					}
				);
				const { user } = response.data.data;
				localStorage.setItem("user", JSON.stringify(user));
				commit("updateCurrentUser", user);
				state.loading = false;
			} catch (error) {
				state.loading = false;
				console.log(error.response);
			}
		},
		updatePassword: async ({ dispatch, state }, payload) => {
			try {
				state.loading = true;
				await userInstance.patch("/update-my-account-password", payload, {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				dispatch("signout");
				state.loading = false;
			} catch (error) {
				state.loading = false;
				console.log(error.response);
			}
		},
		getMyArticles: async ({ commit, state }) => {
			try {
				const response = await articleInstance.get("/my-articles", {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				commit("setMyArticles", response.data.data.articles);
			} catch (error) {
				console.log(error.response);
			}
		},
		submitNewArticle: async ({ commit, state }, payload) => {
			try {
				state.loading = true;
				const response = await articleInstance.post("/", payload, {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				commit("addNewArticle", response.data.data.article);
				router.push("/dashboard");
				state.loading = false;
			} catch (error) {
				state.loading = false;
				console.log(error.message);
			}
		},
		updateArticle: async ({ commit, state }, payload) => {
			try {
				state.loading = true;
				const response = await articleInstance.patch(
					`/${payload.id}`,
					payload.newArticle,
					{
						headers: {
							Authorization: `Bearer ${state.token}`
						}
					}
				);
				commit("updateSelectedArticle", response.data.data.article);
				state.loading = false;
				router.push("/dashboard");
			} catch (error) {
				state.loading = false;
				console.log(error.message);
			}
		},
		deleteArticle: async ({ commit, state }, payload) => {
			try {
				state.loading = true;
				await articleInstance.delete(`/${payload}`, {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				commit("deleteSelectedArticle", payload);
				state.loading = false;
			} catch (error) {
				state.loading = false;
				console.log(error);
			}
		},
		deactivateAccount: async ({ dispatch, state }) => {
			try {
				state.loading = true;
				await userInstance.delete("/deactivate-me", {
					headers: { Authorization: `Bearer ${state.token}` }
				});
				state.loading = false;
				dispatch("signout");
			} catch (error) {
				state.loading = false;
				console.log(error);
			}
		},
		sendResetPasswordMail: async ({ state }, payload) => {
			try {
				state.loading = true;
				await userInstance.post("/forgot-password", payload);
				state.loading = false;
				router.push("/signin");
			} catch (error) {
				state.loading = false;
				router.replace("/error");
				console.log(error);
			}
		},
		retrieveUserNameFromToken: async ({ commit }, payload) => {
			try {
				const response = await userInstance.get(`/getUserName/${payload}`);
				commit("setResetUserName", response.data.data.user);
			} catch (error) {
				commit("setResetUserName", "timeout");
				console.log(error);
			}
		},
		resetPassword: async ({ commit, state }, payload) => {
			try {
				state.loading = true;
				await userInstance.patch(
					`/reset-password/${payload.token}`,
					payload.data
				);
				state.loading = false;
				router.push("/signin");
				commit("setResetUserName", "");
			} catch (error) {
				console.log(error);
			}
		},
		resetReactivationStatus: ({ commit }) => {
			commit("reactivateYourAccount", false);
		},
		sendAccountReactivationMail: async ({ state }, payload) => {
			try {
				state.loading = true;
				await userInstance.post("/reactivate-me", payload);
				state.loading = false;
				router.push("/signin");
			} catch (error) {
				state.loading = false;
				router.replace("/error");
				console.log(error);
			}
		},
		reactivateAccountFinish: async ({ state }, payload) => {
			try {
				state.loading = true;
				await userInstance.patch(`/reactivate-me/${payload}`);
				state.loading = false;
			} catch (error) {
				state.loading = false;
				router.push("/error");
				console.log(error);
			}
		},
		verifyAccountFinish: async ({ state }, payload) => {
			try {
				state.loading = true;
				await userInstance.patch(`/verify-email/${payload}`);
				state.loading = false;
			} catch (error) {
				state.loading = false;
				router.push("/error");
				console.log(error);
			}
		},
		getReviews: async ({ commit, state }) => {
			try {
				const response = await articleInstance.get(
					`/${state.selectedArticleId}/reviews`
				);
				commit("setReviews", response.data.data.reviews);
			} catch (error) {
				console.log(error);
			}
		},
		addReview: async ({ commit, state }, payload) => {
			try {
				const response = await articleInstance.post(
					`/${state.selectedArticleId}/reviews`,
					payload,
					{ headers: { Authorization: `Bearer ${state.token}` } }
				);
				commit("addNewReview", response.data.data.review);
			} catch (error) {
				console.log(error);
			}
		}
	},
	getters: {
		getErrorState: state => {
			return state.error;
		}
	}
});
