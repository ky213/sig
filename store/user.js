export const state = () => ({
  authenticated: false
})

export const mutations = {
  login(state, payload) {
    state.authenticated = true
  },
  logout(state, payload) {
    state.authenticated = false
  }
}
