import httpClient from './httpClient'

const SIGN_IN = '/auth/login'
const REGIST = '/users'
const PROFILE = '/me'

const SignIn = (data) => httpClient.post(SIGN_IN, data)
const SignUp = (data) => httpClient.post(REGIST, data)
const GetProfile = () => httpClient.get(PROFILE)

export default {
  SignIn,
  SignUp,
  GetProfile,
}