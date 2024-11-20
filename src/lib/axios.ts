import axios from 'axios'
import { useAuthStore } from '../store/auth'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export default axiosInstance 