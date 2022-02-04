<template>
  <main class="card">
    <h2 class="title">Sección</h2>
    <form id="MainForm" class="form" @submit.prevent="submit">
      <FieldSection :name.sync="name" />
      <FieldCategories :categories.sync="categories" />
    </form>
    <nav class="flex flex-wrap justify-end">
      <button class="button" @click="cancel">Cancelar</button>
      <button class="button" form="MainForm" @click="submit" success>Guardar</button>
    </nav>
  </main>
</template>

<script>
import { computed, onMounted, reactive, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useHandler } from '~/composition'
import FieldSection from './-FieldSection.vue'
import FieldCategories from './-FieldCategories.vue'

export default {
  key(route) {
    return route.fullPath
  },
  components: {
    FieldSection,
    FieldCategories
},
  setup() {
    const $session = useSession()
    const $route = useRoute()
    const $router = useRouter()
    const $sections = useResource('/sections')
    
    const { handle } = useHandler()
    
    const id = parseInt($route.value.params.id)
    
    const state = reactive({
      section: {
        id: 0,
        name: '',
        categories: [],
      },
    })
    
    // section data
    
    const name = computed({
      get() {
        return state.section.name
      },
      set(value) {
        state.section.name = value
      }
    })
    
    const categories = computed({
      get() {
        return state.section.categories
      },
      set(value) {
        state.section.categories = value
      }
    })
    
    // actions
    
    const submit = handle(async () => {
      let result
      if (id) result = await $sections.updateOne(id, state.section)
      else result = await $sections.insertOne(state.section)
      alert(JSON.stringify(result))
      $router.back()
    })
    
    const cancel = handle(() => {
      $router.back()
    })
    
    // load data
    
    const loadItem = handle(async () => {
      if(id) state.section = await $sections.findOne(id)
    })
    
    onMounted(async () => {
      await $session.onlyAuthed()
      await loadItem()
    })
    
    return {
      name,
      categories,
      submit,
      cancel
    }
  }
}
</script>

<style lang="scss" scoped>

fieldset {
  border: none;
}

</style>
