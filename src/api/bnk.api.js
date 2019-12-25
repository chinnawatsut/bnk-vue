import httpClient from './httpClient'

const END_POINT = '/bnk'

const getAllMembers = () => httpClient.get(`${END_POINT}/members`)
const getMember = (id) => httpClient.get(`${END_POINT}/members/${id}`)
const updateMember = (id, body) => httpClient.patch(`${END_POINT}/members/${id}`, body)
const removeMember = (id) => httpClient.delete(`${END_POINT}/members/${id}`)

export default {
  getAllMembers,
  getMember,
  updateMember,
  removeMember,
}