
<template>
  <main class="card">
    <h2>
      Artículo
    </h2>
    <form id="MainForm" class="form" @submit.prevent="submit">
      <FieldText 
        id="InputCode" 
        v-model="code" 
        label="Código" 
        name="code" 
        required 
      />
      <FieldText 
        id="InputName" 
        v-model="name" 
        label="Nombre" 
        name="name" 
        required 
      />
      <FieldNumber 
        id="InputValue" 
        v-model="value" 
        label="Valor" name="value" 
        required 
        :step="0.01" 
      />
      <FieldSelect 
        id="InputSection" 
        v-model="fkSection"
        label="Sección" 
        name="fkSection" 
        required 
        :options="sections" 
        option-label="name" 
      />
      <FieldSelect 
        id="InputCategory" 
        v-if="fkSection"
        v-model="fkCategory"
        label="Categoria" 
        name="fkCategory" 
        required 
        :options="categories" 
        option-label="name" 
      />
      <FieldAttributes 
        v-if="fkCategory"
        v-model="attributes"
        :attributes="categoryAttributes"
      />
      <FieldTextarea 
        id="InputShortDescription" 
        v-model="shortDescription" 
        label="Descripción breve" 
        name="shortDescription" 
        rows="4"
      />
      <FieldTextarea 
        id="InputDescription" 
        v-model="description" 
        label="Descripción" 
        name="description" 
      />
      <FieldFile 
        id="InputImages"
        v-model="files"
        label="Imágenes"
      />
      <ImageReel 
        :images="images"
        @remove="removeImage"
      />
    </form>
    <nav>
      <button class="button" @click="cancel">
        Cancelar
      </button>
      <button class="button" form="MainForm" success>
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { computed, onMounted, reactive, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useHandler, useResource, useSession } from '~/composition'
import FieldAttributes from './-FieldAttributes.vue'


export default {
  components: {
    FieldAttributes,
  },
  setup() {
    const { handle } = useHandler()
    
    const $session = useSession()
    const $router = useRouter()
    const $route = useRoute()
    
    const $articles = useResource('/articles')
    const $sections = useResource('/sections')

    const id = parseInt($route.value.params.id)

    // data

    const state = reactive({
      article: {
        id: 0,
        active: true,
        code: '',
        name: '',
        value: 0,
        description: '',
        shortDescription: '',
        fkCategory: 0,
        images: [],
        attributes: [],
      },
      fkSection: 0,
      sections: [],
      files: [],
    })

    // computed

    const sections = computed(() => {
      return state.sections || []
    })
    
    const section = computed(() => {
      return state.sections.find(section => section.id === fkSection.value) || {}
    })

    const categories = computed(() => {
      return section.value.categories || []
    })

    const category = computed(() => {
      return categories.value.find(category => category.id === state.article.fkCategory) || {}
    })

    const categoryAttributes = computed(() => {
      return category.value.attributes || []
    })

    // article properties

    const code = computed({
      get() { 
        return state.article.code 
      },
      set(value) { 
        state.article.code = value 
      },
    })

    const name = computed({
      get() { 
        return state.article.name
      },
      set(value) { 
        state.article.name = value
      },
    })

    const value = computed({
      get() { 
        return state.article.value
      },
      set(value) { 
        state.article.value = parseFloat(value)
      },
    })

    const fkSection = computed({
      get() {
        return state.fkSection
      },
      set(value) {
        value = parseInt(value)
        if(value !== state.fkSection) {
          state.article.fkCategory = 0
        }
        state.fkSection = value
      }
    })

    const fkCategory = computed({
      get() {
        return state.article.fkCategory
      },
      set(value) {
        state.article.fkCategory = parseInt(value)
      }
    })

    const attributes = computed({
      get() {
        return state.article.attributes
      },
      set(value) {
        state.article.attributes = value
      }
    })

    const shortDescription = computed({
      get() { 
        return state.article.shortDescription
      },
      set(value) { 
        state.article.shortDescription = value
      },
    })

    const description = computed({
      get() { 
        return state.article.description
      },
      set(value) { 
        state.article.description = value
      },
    })

    const images = computed({
      get() { 
        return state.article.images
      },
      set(value) { 
        state.article.images = value
      },
    })

    const files = computed({
      get() {
        return state.files
      },
      set(value) {
        state.files = value
      }
    })

    // actions

    const removeImage = (index) => {
      state.article.images.splice(index, 1)
    }

    const submit = handle(async () => {
      const formData = new FormData()

      formData.append('item', JSON.stringify(state.article))
      
      for (const file of state.files) {
        formData.append('files', file)
      }
      
      if(id) 
        await $articles.updateOne(id, formData)
      else
        await $articles.insertOne(formData)

      $router.back()
    })

    const cancel = handle(() => {
      $router.back()
    })

    // data loading

    async function loadArticle() {
      if(id !== 0) {
        state.article = await $articles.findOne(id)
        if(state.article) {
          state.fkSection = state.article.category.fkSection
        }
      }
    }

    async function loadSections() {
      state.sections = await $sections.findMany({ active: true })
    }

    // init

    onMounted(async () => {
      await $session.onlyAuthed()
      await loadArticle()
      await loadSections()
    })

    return {
      sections,
      categories,
      categoryAttributes,

      section,
      category,
      
      code,
      name,
      value,
      fkSection,
      fkCategory,
      attributes,
      shortDescription,
      description,
      images,
      files,

      removeImage,
      submit,
      cancel,
    }
  }
}

</script>

<style lang="scss" scoped>


.card {
  margin: 0 auto;
  min-width: 70ch;
  padding: var(--space-500);
  background-color: var(--clr-grey-100);
  border-radius: 25px;
  box-shadow: var(--shadow-300);


  > * + * {
    margin-top: var(--space-500);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    font-weight: bold;
    line-height: 1em;
  }

  > nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: var(--space-200);
  }

}

</style>
