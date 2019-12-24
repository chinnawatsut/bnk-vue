import httpClient from './httpClient'

const END_POINT = '/bnk/members'

const getAllMembers = () => httpClient.get(END_POINT)

export default {
  getAllMembers,
}