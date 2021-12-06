import { reactive, computed } from '@nuxtjs/composition-api'

const state = reactive({
  messages: [],
  duration: 2500,
})

const useNotification = () => {
  
  const messages = computed(() => {
    return state.messages
  })

  const last = computed(() => {
    if (state.messages.length) {
      return state.messages[state.messages.length - 1]
    }
    return null
  })

  const findIndex = (id) => {
    return state.messages.findIndex(message => message.id === id)
  }

  const insert = ({ title, text, icon = 'check' } = {}) => {
    const id = last.value?.id + 1 || 1
    state.messages.push({ id, title, text, icon })
    setTimeout(() => remove({ id }), state.duration)
  }

  const remove = ({ id }) => {
    const index = findIndex(id)
    if (index !== -1) {
      state.messages.splice(index, 1)
    }
  }

  return {
    messages,
    last,
    insert,
    remove,
  }
}

export default useNotification
