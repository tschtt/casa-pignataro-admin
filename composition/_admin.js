import { useContext } from '@nuxtjs/composition-api'

export const useAdmin = () => {
  const { $axios } = useContext()

  const findMany = async () => {
    const result = await $axios.$get('/admins')
    return result.items
  }

  return {
    findMany,
  }  
}
