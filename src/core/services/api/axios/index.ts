import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

export default axiosInstance
