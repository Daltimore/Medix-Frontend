import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { ref } from 'vue'

interface AxiosRequestConfigWithAuth extends AxiosRequestConfig {
  requireAuth?: boolean
}

const instance: AxiosInstance = axios.create({
  baseURL: 'https://your-base-url.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

const accessToken = ref(localStorage.getItem('access_token'))
const refreshToken = ref(localStorage.getItem('refresh_token'))

instance.interceptors.request.use((config: AxiosRequestConfigWithAuth) => {
  if (!config.headers) {
    config.headers = {}
  }
  if (config.requireAuth) {
    config.headers = Object.assign(config.headers, {
      Authorization: `Bearer ${accessToken.value}`,
    })
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const { data } = await instance.post('/refresh-token', {
        refresh_token: refreshToken.value,
      })

      accessToken.value = data.access_token
      localStorage.setItem('access_token', data.access_token)
      originalRequest.headers.Authorization = `Bearer ${data.access_token}`

      return instance(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default {
  async get(url: string, options?: AxiosRequestConfigWithAuth) {
    return instance.get(url, options)
  },
  async post(url: string, data?: any, options?: AxiosRequestConfigWithAuth) {
    return instance.post(url, data, options)
  },
  async put(url: string, data?: any, options?: AxiosRequestConfigWithAuth) {
    return instance.put(url, data, options)
  },
  async delete(url: string, options?: AxiosRequestConfigWithAuth) {
    return instance.delete(url, options)
  },
  async request(config: AxiosRequestConfigWithAuth) {
    if (config.url && !config.baseURL) {
      config.baseURL = 'https://your-base-url.com'
    }
    return instance(config)
  },
}

// axiosWrapper.post(
//   '/data',
//   { data: 'some data' },
//   {
//     requireAuth: true,
//   }
// )
