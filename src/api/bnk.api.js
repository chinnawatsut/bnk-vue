import httpClient from './httpClient'

const END_POINT = '/bnk'

const getAllMembers = () => httpClient.get(`${END_POINT}/members`)
const getMember = (id) => httpClient.get(`${END_POINT}/members/${id}`)

export default {
  getAllMembers,
  getMember,
}