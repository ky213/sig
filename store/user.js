export const state = () => ({
  authenticated: false,
  roles: []
})

export const mutations = {
  login(state, claims) {
    state.authenticated = true
    state.roles = claims.filter(claim => claim.startsWith('ROLE_SIG_'))
  },
  logout(state, payload) {
    state.authenticated = false
    state.roles = []
  }
}
