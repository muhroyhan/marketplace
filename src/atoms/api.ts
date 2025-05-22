import axios, { AxiosHeaders } from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
})

const getHeaders = (headers?: AxiosHeaders) => {
  return {
    Accept: 'application/json',
    Type: 'application/json',
    ...headers,
  }
}

export const apiGet = <T>(
  url: string,
  params?: object,
  headers?: AxiosHeaders,
) =>
  axiosInstance.get<T>(url, {
    headers: getHeaders(headers),
    params,
  })

export const apiPost = <T>(url: string, data?: object) =>
  axiosInstance.post<T>(url, data, {
    headers: getHeaders(),
  })

export const apiPut = <T>(url: string, data?: object) =>
  axiosInstance.put<T>(url, data, {
    headers: getHeaders(),
  })

export const apiPatch = <T>(url: string, data?: object) =>
  axiosInstance.patch<T>(url, data, {
    headers: getHeaders(),
  })

export const apiDelete = (url: string, params?: object) =>
  axiosInstance.delete(url, {
    headers: getHeaders(),
    params,
  })
