// external dependencies
import axios from 'axios'
// internal dependencies
import { API_BASE_URL, API_KEY } from '../constants';

const axiosClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
        Authorization: `Bearer ${API_KEY}`
	},
})

export default axiosClient;