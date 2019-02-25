
const getUser = () => {
  const userJSON = window.localStorage.getItem('currentUserJSON')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return user
  }
  return null
}

const getToken = () => {
  const user = getUser()
  if (user) {
    return user.token
  }
  return null
}

const getAuthorizationString = () => {
  const user = getUser()
  if (user) {
    return `bearer ${user.token}`
  }
  return null
}

export default {
  getUser,
  getToken,
  getAuthorizationString
}