import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import axios from "axios";
import Vuelidate from "vuelidate";
import feather from "vue-icon";
import Vuebar from 'vuebar';

import router from "./router";
import store from "./store";

store.dispatch("autoLogin");

Vue.use(feather, "v-icon");
Vue.use(Vuelidate);
Vue.use(Vuebar);
axios.defaults.baseURL = "http://localhost:8000/api/v1/users";

const reqInterceptor = axios.interceptors.request.use(req => {
	console.log("req: ", req);
	return req;
});

const resInterceptor = axios.interceptors.response.use(res => {
	console.log("res: ", res);
	return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

new Vue({
	el: "#app",
	router,
	store,
	render: h => h(App)
});
