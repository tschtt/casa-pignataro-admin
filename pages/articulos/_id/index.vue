<template>
  <main>
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
        :step="0.01"
        label="Valor" 
        name="value"
        required
      />
      <FieldSelect
        id="InputCategorie" 
        v-model="item.fkCategorie" 
        :options="categories"
        option-label="full"
        label="Categoría" 
        name="fkCategorie"
        required 
      />
      <FieldTextarea
        id="InputDescription" 
        v-model="item.description" 
        label="Descripción" 
        name="description"
      />
      <div>
        <label for="InputImages">Imágenes</label>
        <input type="file" name="images" id="InputImages" accept="image/*" multiple>
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
import { useResource, useSession, useFetch, useHandler } from '~/composition'

export default {
  setup() {
    const $session = useSession();
    const $fetch = useFetch();
    const $route = useRoute();
    const $router = useRouter();
    
    const $articles = useResource("/articles");
    const $categories = useResource('/categories?flat')
    
    const { handle } = useHandler();
    
    const item = ref({
      code: 'uno',
      name: 'dos',
      value: 3,
      fkCategorie: 4,
      description: 'cinco'
    });
    const categories = ref([]);
    
    const id = computed(() => {
      return parseInt($route.value.params.id);
    });
    
    const action = computed(() => {
      return id.value ? "Modificar" : "Nuevo";
    });
    
    const submit = handle(async (event) => {
      const formData = new FormData(event.target)
      if (id.value) {
        await $articles.updateOne(id.value, formData);
      }
      else {
        await $articles.insertOne(formData);
      }
      $router.back();
    });
    
    const cancel = () => {
      $router.back();
    };

    const loadCategories = async () => {
      categories.value = await $categories.findMany()
    }
    
    const loadItem = async () => {
      item.value = await $articles.findOne(id.value) || {}
    };
    
    onMounted(async () => {
      try {
        await $session.refresh();
        $fetch.setRefreshCallback($session.refresh);
        await loadCategories();
        await loadItem();
      }
      catch (error) {
        $router.push("/sesion/iniciar");
      }
    });
    
    return {
      item,
      categories,
      action,
      submit,
      cancel,
    };
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