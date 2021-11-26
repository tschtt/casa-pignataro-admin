import { reactive, useContext, useRouter } from '@nuxtjs/composition-api'

const state = reactive({
  admin: null,
  token: null,
})

export function useSession() {
  const { $axios } = useContext()

  const $router = useRouter()

  const setState = ({ admin, accessToken, refreshToken }) => {
    state.admin = admin
    state.token = accessToken
    localStorage.setItem('token', refreshToken)
    $axios.setToken(`Bearer ${accessToken}`)
  }
  
  const login = async (username, password) => {
    const result = await $axios.$post('/session', { username, password })
    setState(result)      
  }

  const refresh = async () => {
    const token = localStorage.getItem('token')
  
    if(!token) {
      $router.push('/sesion/iniciar')
    }
  
    $axios.setToken(token)
  
    const result = await $axios.$post('/session/refresh')
    setState(result)      
  }

  return {
    login,
    refresh,
  }
}