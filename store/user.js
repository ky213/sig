export const state = () => ({
  authenticated: false,
  role: ''
})

export const mutations = {
  login(state, claims) {
    state.authenticated = true
    if (claims.find(c => c === 'MENU_002_001')) {
      state.role = 'ADMIN'
      return
    }
    if (claims.find(c => c === 'MENU_003_001')) {
      state.role = 'EDIT'
      return
    }
    if (claims.find(c => c === 'MENU_004_001')) {
      state.role = 'VISIT'
      return
    }
  },
  logout(state, payload) {
    state.authenticated = false
    state.role = ""
  }
}
