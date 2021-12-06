import { reactive } from "@nuxtjs/composition-api"
import useFetch from "./useFetch.js"

const state = reactive({
  admin: null,
  token: null,
})

export default function useSession () {
  const $fetch = useFetch()

  const login = async ({ username, password }) => {
    const { admin, accessToken, refreshToken } = await $fetch.post('/session', { body: { username, password } })
        
    state.admin = admin
    state.token = accessToken
    
    $fetch.setToken(accessToken)
    
    localStorage.setItem('token', refreshToken)
  }
  
  const logout = async () => {
    await $fetch.del('/session')
    
    state.admin = null
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
  
    const { admin, accessToken, refreshToken } = await $fetch.post('/session/refresh')
    
    state.admin = admin
    state.token = accessToken
    
    $fetch.setToken(accessToken)
    
    localStorage.setItem('token', refreshToken)
  }
  
  return {
    login,
    logout,
    refresh,
  }
}