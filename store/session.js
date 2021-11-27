
export const state = () => {
  return {
    admin: null,
    token: null,  
  }
}

export const mutations = {

  setState(state, { admin, accessToken, refreshToken }) {
    state.admin = admin
    state.token = accessToken
    localStorage.setItem('token', refreshToken)
    this.$axios.setToken(`Bearer ${accessToken}`)
  },

  cleanState(state) {
    state.admin = null
    state.token = null
    localStorage.removeItem('token')
    this.$axios.setToken(false)
  }
  
}

export const actions = {

  async login({ commit }, { username, password }) {
    const result = await this.$axios.$post('/session', { username, password })
    commit('setState', result)   
  },

  async refresh({ commit }) {
    const token = localStorage.getItem('token')
  
    if(!token) {
      throw new Error('No hay ningun token guardado')
    }
  
    this.$axios.setToken(`Bearer ${token}`)
  
    const result = await this.$axios.$post('/session/refresh')
    
    commit('setState', result)
  },

  async logout({ commit }) {
    await this.$axios.$delete('/session')
    commit('cleanState')
  }
  
}