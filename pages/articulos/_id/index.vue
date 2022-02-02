
<template>
  <main class="card">
    <h2>
      Artículo
    </h2>
    <form id="MainForm" class="form" @submit.prevent="submit">
      <FieldText 
        id="InputCode" 
        v-model="item.code" 
        label="Código" 
        name="code" 
        required 
      />
      <FieldText 
        id="InputName" 
        v-model="item.name" 
        label="Nombre" 
        name="name" 
        required 
      />
      <FieldNumber 
        id="InputValue" 
        v-model="item.value" 
        label="Valor" name="value" 
        required 
        :step="0.01" 
      />
      <FieldSelect 
        id="InputSection" 
        label="Sección" 
        name="fkSection" 
        required 
        :options="sections" 
        option-label="name" 
      />
      <FieldSelect 
        id="InputCategory" 
        label="Categoria" 
        name="fkCategory" 
        required 
        :options="categories" 
        option-label="name" 
      />
      <FieldTextarea 
        id="InputShortDescription" 
        v-model="item.shortDescription" 
        label="Descripción breve" 
        name="shortDescription" 
        rows="4"
      />
      <FieldTextarea 
        id="InputDescription" 
        v-model="item.description" 
        label="Descripción" 
        name="description" 
      />
      <FieldImage 
        id="InpuImages"
        label="Imágenes nuevas"
        name="files"
      />
      <div v-if="item.images && item.images.length" class="stack stack-200">
        <p>Imágenes guardadas</p>
        <ImageReel 
          :images="item.images"
          @remove="removeImage"
        />
      </div>
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
import { computed, onMounted, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useHandler } from '~/composition'

export default {
  setup() {
    
    // Composables

    const $session = useSession()
    const $route = useRoute()
    const $router = useRouter()
    
    const $articles = useResource("/articles")
    const $sections = useResource('/sections')
    
    const { handle } = useHandler()

    const item = ref({})

    const id = computed(() => parseInt($route.value.params.id))

    const sections = ref([])
    
    const section = computed(() => {
      return sections.value?.find(section => section.id === item.value.category?.fkSection) || {}
    })
    
    const categories = computed(() => {
      return section.value.categories || []
    })

    const category = computed(() => {
      return categories.value.find(category => category.id === item.value.fkCategory)
    })
    
    // Actions
    
    const submit = handle(async () => {
      const formData = new FormData()

      formData.append('item', JSON.stringify(item.value))

      if (id.value) {
        await $articles.updateOne(id.value, formData)
      }
      else {
        await $articles.insertOne(formData)
      }

      $router.back()
    })
    
    const cancel = () => {
      $router.back()
    }

    const removeImage = (index) => {
      item.value.images.splice(index, 1)
    }

    // Data Loading    

    const loadSections = async () => {
      sections.value = await $sections.findMany()
    }
    
    const loadItem = async () => {
      item.value = await $articles.findOne(id.value) || {}
    }

    // Lifecycle
    
    onMounted(async () => {
      await $session.onlyAuthed()
      await loadSections()
      await loadItem()
    })
    
    return {
      item,
      section,
      category,
      
      sections,
      categories,
      
      removeImage,
      submit,
      cancel,
    }
  },
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
