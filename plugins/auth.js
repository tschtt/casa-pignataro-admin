
export default async function({ $axios, store }) {
  try {
    await store.dispatch('session/refresh')
  } catch {
    window.onNuxtReady(() => { window.$nuxt.$router.push('/sesion/iniciar') })
  }
}