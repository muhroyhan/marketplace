import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
})

const getHeaders = () => {
  return {
    Accept: 'application/json',
    Type: 'application/json',
  }
}

export const get = <T>(url: string, params?: object) =>
  axiosInstance.get<T>(url, {
    headers: getHeaders(),
    params,
  })

export const post = <T>(url: string, data?: object) =>
  axiosInstance.post<T>(url, data, {
    headers: getHeaders(),
  })

export const put = <T>(url: string, data?: object) =>
  axiosInstance.put<T>(url, data, {
    headers: getHeaders(),
  })

export const patch = <T>(url: string, data?: object) =>
  axiosInstance.patch<T>(url, data, {
    headers: getHeaders(),
  })

export const remove = (url: string, params?: object) =>
  axiosInstance.delete(url, {
    headers: getHeaders(),
    params,
  })
