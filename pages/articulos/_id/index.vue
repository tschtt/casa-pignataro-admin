
<template>
  <main class="card">
    <h2>
      Artículo
    </h2>
    <div>
      {{ article }}
      {{ fkSection }}
    </div>
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
      <!-- <FieldImage 
        id="InpuImages"
        label="Imágenes nuevas"
        name="files"
      /> -->
      <!-- <div v-if="images && images.length" class="stack stack-200">
        <p>Imágenes guardadas</p>
        <ImageReel 
          :images="images"
          @remove="removeImage"
        />
      </div> -->
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
/* eslint-disable */
import { computed, onMounted, reactive, ref, toRef, toRefs, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useHandler } from '~/composition'


export default {
  // ssetup() {
    
  //   // Composables

  //   const $session = useSession()
  //   const $route = useRoute()
  //   const $router = useRouter()
    
  //   const $articles = useResource("/articles")
  //   const $sections = useResource('/sections')

  //   const state = reactive({
  //     sections: [],
  //     article: {
  //       id: 0,
  //       active: true,
  //       code: '',
  //       name: '',
  //       value: '',
  //       description: '',
  //       shortDescription: '',
  //       fkCategory: 0,
  //       fkSection: 0,
  //       images: [],
  //       attributes: [],
  //     },
  //   })
    
  //   const { handle } = useHandler()

  //   const item = ref({})

  //   const id = computed(() => parseInt($route.value.params.id))
    
  //   // Actions
    
  //   const submit = handle(async () => {
  //     const formData = new FormData()

  //     formData.append('item', JSON.stringify(item.value))

  //     if (id.value) {
  //       await $articles.updateOne(id.value, formData)
  //     }
  //     else {
  //       await $articles.insertOne(formData)
  //     }

  //     $router.back()
  //   })
    
  //   const cancel = () => {
  //     $router.back()
  //   }

  //   const removeImage = (index) => {
  //     item.value.images.splice(index, 1)
  //   }

  //   // Data Loading    

  //   const loadSections = async () => {
  //     sections.value = await $sections.findMany()
  //   }
    
  //   const loadItem = async () => {
  //     item.value = await $articles.findOne(id.value) || {}
  //   }

  //   // Lifecycle
    
  //   onMounted(async () => {
  //     await $session.onlyAuthed()
  //     await loadSections()
  //     await loadItem()
  //   })
    
  //   return {
  //     item,
  //     section,
  //     category,
      
  //     sections,
  //     categories,
      
  //     removeImage,
  //     submit,
  //     cancel,
  //   }
  // },
  setup() {
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
        value: '',
        description: '',
        shortDescription: '',
        fkCategory: 0,
        images: [],
        attributes: [],
      },
      fkSection: 0,
      sections: []
    })

    // computed

    const sections = computed(() => {
      return state.sections || []
    })

    const categories = computed(() => {
      if(state.fkSection === 0) {
        return []
      }
      const section = state.sections.find(section => section.id === state.fkSection) || {}
      return section.categories || []
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

    // actions

    async function submit() {
      try {
        const formData = new FormData()
  
        formData.append('item', JSON.stringify(state.article))
  
        const result = id
          ? await $articles.updateOne(id, formData)
          : await $articles.insertOne(formData)
  
        alert(JSON.stringify(result))        
      } catch (error) {
        alert(JSON.stringify(error))
      }

    }

    function cancel() {
      $router.back()
    }

    // data loading

    async function loadArticle() {
      if(id !== 0) {
        state.article = await $articles.findOne(id)
      }
    }

    async function loadSections() {
      state.sections = await $sections.findMany()
    }

    // init

    onMounted(async () => {
      await $session.onlyAuthed()
      await loadArticle()
      await loadSections()
    })

    return {
      article: state.article,

      sections,
      categories,
      
      code,
      name,
      value,
      fkSection,
      fkCategory,
      shortDescription,
      description,
      images,

      submit,
      cancel,
    }
  }
}

</script>

<style lang="scss" scoped>

main {
  margin: 0 auto;
  max-width: 50ch;
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
