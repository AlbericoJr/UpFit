import axios, { AxiosInstance, AxiosError } from "axios"

import { AppError } from "@utils/AppError"
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "@storage/storageAuthToken"

type SingOut = () => void

type PromiseType = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptToKenManager: (singOut: SingOut) => () => void
}

const api = axios.create({
  baseURL: __DEV__
    ? "http://10.0.0.179:3333" // URL local para desenvolvimento
    : "https://server-dwhaqe1cc-albrico-juniors-projects.vercel.app", // URL de produção
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
}) as APIInstanceProps

// Adicionar interceptor para requisições
api.interceptors.request.use(
  (config) => {
    console.log("Requisição sendo enviada:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    })
    return config
  },
  (error) => {
    console.log("Erro na requisição:", error)
    return Promise.reject(error)
  }
)

// Adicionar interceptor para respostas
api.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", {
      status: response.status,
      data: response.data,
    })
    return response
  },
  (error) => {
    console.log("Erro na resposta:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    })
    return Promise.reject(error)
  }
)

let failedQueue: Array<PromiseType> = []
let isRefreshing = false

api.registerInterceptToKenManager = (singOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        if (
          requestError.response.data.message === "token.expired" ||
          requestError.response.data.message === "token.invalid"
        ) {
          const { refreshToken } = await storageAuthTokenGet()

          if (!refreshToken) {
            singOut()
            return Promise.reject(requestError)
          }
          const originalRequestConfig = requestError.config

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  }
                  resolve(api(originalRequestConfig))
                },
                onFailure: (error: AxiosError) => {
                  reject(error)
                },
              })
            })
          }

          isRefreshing = true

          return new Promise(async (resolve, reject) => {
            try {
              console.log("Tentando refresh token com:", { refreshToken })
              const { data } = await api.post("/sessions/refresh-token", {
                refresh_token: refreshToken,
              })
              console.log("Resposta do refresh token:", data)

              if (!data.token || !data.refresh_token) {
                throw new Error("Token inválido na resposta")
              }

              await storageAuthTokenSave({
                token: data.token,
                refreshToken: data.refresh_token,
              })

              if (
                originalRequestConfig.data &&
                !(originalRequestConfig.data instanceof FormData)
              ) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                )
              }

              originalRequestConfig.headers = {
                ...originalRequestConfig.headers,
                Authorization: `Bearer ${data.token}`,
              }

              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`

              failedQueue.forEach((request) => {
                request.onSuccess(data.token)
              })

              console.log("Token atualizado com sucesso")

              resolve(api(originalRequestConfig))
            } catch (error: any) {
              console.log(
                "Erro no refresh token:",
                error.response?.data || error.message
              )
              failedQueue.forEach((request) => {
                request.onFailure(error)
              })

              singOut()
              reject(error)
            } finally {
              isRefreshing = false
              failedQueue = []
            }
          })
        }
        singOut()
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message))
      } else {
        return Promise.reject(requestError)
      }
    }
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
