
const setToken = token => {
  localStorage.setItem("token", token)
}

const removeToken = () => {
  localStorage.removeItem("token")
}

export default {
  setToken,
  removeToken,
}