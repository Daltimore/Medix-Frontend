import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

interface AxiosRequestConfigAuth extends AxiosRequestConfig {
  requireAuth?: boolean
  data?: any
}

class AxiosWrapper {
  private axios: AxiosInstance
  private baseURL: string = 'https://api.yourdomain.com'

  constructor() {
    this.axios = axios.create({ baseURL: this.baseURL })

    this.axios.interceptors.request.use((config: AxiosRequestConfigAuth) => {
      if (config.requireAuth) {
        const token = localStorage.getItem('access_token')
        if (!token) {
          throw new Error('Unauthorized access to secured route')
        }
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    })

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) {
          await this.refreshToken()
          const config = error.config
          config.headers['Authorization'] =
            'Bearer ' + localStorage.getItem('access_token')
          return this.axios.request(config)
        }
        return Promise.reject(error)
      }
    )
  }

  private async refreshToken() {
    // code to refresh the token
  }

  public async get<T = any>(httpReq: AxiosRequestConfigAuth): Promise<T> {
    const config = {
      url: httpReq.url,
      method: 'get',
      requireAuth: httpReq.requireAuth,
    }
    return this.request(config)
  }

  public async post<T = any>(httpReq: AxiosRequestConfigAuth): Promise<T> {
    const config = {
      url: httpReq.url,
      method: 'post',
      data: httpReq.data,
      requireAuth: httpReq.requireAuth,
    }
    return this.request(config)
  }

  public async put<T = any>(httpReq: AxiosRequestConfigAuth): Promise<T> {
    const config = {
      url: httpReq.url,
      method: 'put',
      data: httpReq.data,
      requireAuth: httpReq.requireAuth,
    }
    return this.request(config)
  }

  public async delete<T = any>(httpReq: AxiosRequestConfigAuth): Promise<T> {
    const config = {
      url: httpReq.url,
      method: 'delete',
      requireAuth: httpReq.requireAuth,
    }
    return this.request(config)
  }

  public async request<T = any>(config: AxiosRequestConfigAuth): Promise<T> {
    config.url = this.baseURL + config.url
    return this.axios.request<T>(config)
  }
}
