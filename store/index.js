export const state = () => ({
  token: null,
  user: null,
  auth: false,
  modelList: [],
})

export const mutations = {
  SET_MODEL_LIST (state, payload) {
    state.modelList = payload
  },

  SET_USER (state, payload) {
    state.user = payload
  },

  SET_TOKEN (state, payload) {
    state.token = payload
  },

  SET_AUTH (state, payload) {
    state.auth = payload
  },
}

export const actions = {
  async nuxtClientInit({ commit, dispatch }) {
    const token = localStorage.getItem("cms:token");
    // console.log('nuxt client:', token)
    if (token) {
      await dispatch('getUser', token)
      commit('SET_AUTH', true)
    }
  },

  async login({ dispatch, commit, state }, payload) {
    try {
      await dispatch('getToken')
      const { data } = await this.$axios.post('/auth/cms-login',
        payload,
        { headers: { Authorization: `Bearer ${state.token}` }}
      )
      // console.log('login: ', data)
      // console.log('token from login: ', state.token)
      localStorage.setItem('cms:token', data.token)
      await dispatch('getUser', data.token)
      commit('SET_AUTH', true)
      commit('SET_TOKEN', data.token)
      return data
    } catch (error) {
      throw Error(error)
    }
  },

  async logout({ commit }) {
    localStorage.removeItem('cms:token')
    commit('SET_AUTH', false)
    commit('SET_USER', {})
    commit('SET_TOKEN', null)
    return true
  },

  async getToken({ commit }) {
    try {
      const { data } = await this.$axios.get('/auth/get-token?tokenType=cms')
      commit('SET_TOKEN', data.token)
      // console.log('getToken: ', data)
      return data
    } catch (error) {
      throw Error(error)
    }
  },

  async getUser({ commit }, token) {
    // console.log('getUser: ', token)
    try {
      const { data } = await this.$axios.get('/auth/verify-token',
        { headers: { Authorization: `Bearer ${token}` }}
      )
      commit('SET_USER', data.payload)
      commit('SET_AUTH', true)
      commit('SET_TOKEN', token)
      // console.log('getUser: ', data.payload)
      return data
    } catch (error) {
      throw Error
    }
  }
}