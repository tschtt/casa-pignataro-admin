
const useHandler = (callback) => async (args) => {
  try {
    return await callback(args)
  } catch (error) {
    console.log(error)
  }
}

export default useHandler