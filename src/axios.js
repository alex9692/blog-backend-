import axios from "axios";

const userInstance = axios.create({
	baseURL: "http://localhost:5000/api/v1/users"
});

const articleInstance = axios.create({
	baseURL: "http://localhost:5000/api/v1/articles"
});

export { userInstance, articleInstance };
