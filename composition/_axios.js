import { useContext } from '@nuxtjs/composition-api'

export const useAxios = () => {
  const { $axios } = useContext()
  return $axios
}