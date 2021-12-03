import { reactive, useContext } from "@nuxtjs/composition-api"

const state = reactive({
  token: null,
})

export default function useFetch() {
  const { env } = useContext()
  
  const base = env.BACKEND_URL

  const request = async ({ route, query = {}, method, headers = {}, body } = {}) => {
    let url, init

    url = new URL(route, base)
    
    Object.entries(query).forEach(([field, value]) => {
      url.searchParams.set(field, value)
    })

    init = {}
    
    init.method = method
    
    init.headers = {
      'Authorization': state.token && `Bearer ${state.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers
    }

    if(body) {
      init.body = JSON.stringify(body)
    }

    let result

    result = await fetch(url, init)
    result = await result.json()

    return result
  }

  return {
    get: (route, { body, query } = {}) => {
      return request({ route, method: 'GET', body, query })
    },
    post: (route, { body, query } = {}) => {
      return request({ route, method: 'POST', body, query })
    },
    put: (route, { body, query } = {}) => {
      return request({ route, method: 'PUT', body, query })
    },
    patch: (route, { body, query } = {}) => {
      return request({ route, method: 'PATCH', body, query })
    },
    del: (route, { body, query } = {}) => {
      return request({ route, method: 'DELETE', body, query })
    },

    setToken: (token) => {
      state.token = token
    }
  }
}