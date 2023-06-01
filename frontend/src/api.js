import axios from "axios";
import React from "react";

const baseURL = "http://localhost:3001";

export const getTodayImage = () => {
	return axios.get(`${baseURL}/`)
		.catch(error => console.log(error))
}
