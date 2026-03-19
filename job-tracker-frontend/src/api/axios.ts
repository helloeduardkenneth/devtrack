import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: false,
})

api.interceptors.request.use(
  (config) => {
    const match = document.cookie.match(new RegExp('(?:^|; )token=([^;]*)'))
    const token = match ? decodeURIComponent(match[1]) : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default api
