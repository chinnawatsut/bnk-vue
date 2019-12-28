import axios from 'axios'
import LocalStorage from './localStorage'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_BASE_ENDPOINT,
  timeout: 1000,
});

httpClient.interceptors.request.use(configAuth)

function configAuth(config) {
  let token = LocalStorage.getToken()
  if (token) {
    config.headers['Authorization'] = "Bearer " + token
  }
  return config
}


export default httpClient