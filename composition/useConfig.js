import { computed, onMounted, reactive } from "@nuxtjs/composition-api";

const state = reactive({
  theme: 'orange'
})

export default function useConfig() {
  
  const theme = computed({
    get() { return state.theme },
    set(value) { 
      window.localStorage.setItem('theme', value)
      state.theme = value 
    },
  })

  const loadTheme = () => {
    const theme = window.localStorage.getItem('theme')
    if(theme) {
      state.theme = theme
    }
  }

  onMounted(() => {
    loadTheme()
  })
  
  return {
    theme
  }
}