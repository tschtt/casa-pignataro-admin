import useNotification from "./useNotification.js"

const useHandler = () => {
  const $notification = useNotification()

  const handle = (callback) => async (args) => {
    try {
      return await callback(args)
    } catch (error) {
      $notification.insert({ message: error.message })
    }
  }

  return {
    handle
  }
}


export default useHandler