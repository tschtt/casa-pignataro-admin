
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
        id="InputCategorie" 
        v-model="item.fkCategorie" 
        label="Categoría" 
        name="fkCategorie" 
        required 
        :options="categories" 
        option-label="full" 
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
    const $categories = useResource('/categories?flat=true')
    
    const { handle } = useHandler()

    // Data
    
    const item = ref({})
    const categories = ref([])

    // Computed
    
    const id = computed(() => parseInt($route.value.params.id))
    
    // Actions
    
    const submit = handle(async (event) => {
      const formData = new FormData(event.target)

      if(item.value.images) {
        item.value.images.forEach((image, index) => {
          formData.append(`images[${index}]`, image)
        })
      }

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

    const loadCategories = async () => {
      categories.value = await $categories.findMany()
    }
    
    const loadItem = async () => {
      item.value = await $articles.findOne(id.value) || {}
    }

    // Lifecycle
    
    onMounted(async () => {
      await $session.onlyAuthed()
      await loadCategories()
      await loadItem()
    })
    
    return {
      item,
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
