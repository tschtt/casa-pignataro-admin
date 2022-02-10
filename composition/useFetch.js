import { reactive, useContext } from "@nuxtjs/composition-api"

const state = reactive({
  token: null,
  refreshCallback: null,
})

export default function useFetch() {
  const { env } = useContext()
  
  const base = env.BACKEND_URL

  const request = async ({ route, query = {}, method, headers = {}, body, type } = {}) => {
    let url, init

    url = new URL(route, base)
    
    Object.entries(query).forEach(([field, value]) => {
      url.searchParams.set(field, value)
    })

    init = {}
    
    init.method = method
    
    init.headers = {}
    init.headers['Authorization'] = state.token && `Bearer ${state.token}`
    
    if(!(body instanceof FormData)) {
      init.headers['Content-Type'] = 'application/json'
    }
    
    init.headers['Accept'] = 'application/json'
    init.headers = {
      ...init.headers,
      ...headers,
    }

    if(body) {
      init.body = body instanceof FormData
        ? body
        : JSON.stringify(body)
    }

    let result, data
    
    result = await fetch(url, init)

    switch (type) {
      case 'blob':
        data = await result.blob()
        break;
      default:
        data = await result.json()
        break;
    }


    if(!result.ok && result.status === 401 && !!state.refreshCallback) {
      await state.refreshCallback()
      init.headers.Authorization = state.token && `Bearer ${state.token}`
      result = await fetch(url, init)
      switch (type) {
        case 'blob':
          data = await result.blob()
          break;
        default:
          data = await result.json()
          break;
      }
    }

    if(!result.ok) {
      throw new RequestError({ status: result.status, message: data.message })
    }
    
    return data
  }

  return {
    get: (route, { body, query, type } = {}) => {
      return request({ route, method: 'GET', body, query, type })
    },
    post: (route, { body, query, type } = {}) => {
      return request({ route, method: 'POST', body, query, type })
    },
    put: (route, { body, query, type } = {}) => {
      return request({ route, method: 'PUT', body, query, type })
    },
    patch: (route, { body, query, type } = {}) => {
      return request({ route, method: 'PATCH', body, query, type })
    },
    del: (route, { body, query, type } = {}) => {
      return request({ route, method: 'DELETE', body, query, type })
    },

    setToken: (token) => {
      state.token = token
    },

    setRefreshCallback: (callback) => {
      state.refreshCallback = callback
    }
  }
}

class RequestError extends Error {
  constructor({ status, message }) {
    super(`${message} (${status})`)
    this.name = 'RequestError'
    this.status = status
    this.message = message
    if(Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError)
    }
  }
}