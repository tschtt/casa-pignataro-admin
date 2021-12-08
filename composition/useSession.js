import { reactive, computed } from "@nuxtjs/composition-api"
import useFetch from "./useFetch.js"

const state = reactive({
  user: null,
  token: null,
})

export default function useSession () {
  const $fetch = useFetch()

  const user = computed(() => state.user)

  const login = async ({ username, password }) => {
    const { user, accessToken, refreshToken } = await $fetch.post('/session', { body: { username, password } })
        
    state.user = user
    state.token = accessToken
    
    $fetch.setToken(accessToken)
    
    localStorage.setItem('token', refreshToken)
  }
  
  const logout = async () => {
    await $fetch.del('/session')
    
    state.user = null
    state.token = null
    
    $fetch.setToken(false)
    
    localStorage.removeItem('token')
  }
  
  const refresh = async () => {    
    const token = localStorage.getItem('token')

    if(!token) {
      throw new Error('No hay ningun token guardado')
    }
    
    $fetch.setToken(token)
  
    const { user, accessToken, refreshToken } = await $fetch.post('/session/refresh')
    
    state.user = user
    state.token = accessToken
    
    $fetch.setToken(accessToken)
    
    localStorage.setItem('token', refreshToken)
  }
  
  return {
    user,
    login,
    logout,
    refresh,
  }
}