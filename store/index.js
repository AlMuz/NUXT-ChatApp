export const state = () => ({
  user: {}
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  SOCKET_newMessage(context, data) {
    console.log('message received', data)
  }
}
