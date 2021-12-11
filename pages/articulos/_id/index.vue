<template>
  <main>
    <h2>
      Artículo
    </h2>
    <form id="MainForm" class="form" @submit.prevent="save">
      <FieldText 
        id="InputCode"
        v-model="item.code"
        label="Código"
        required
      />
      <FieldText 
        id="InputName" 
        v-model="item.name" 
        label="Nombre" 
        required   
      />
      <FieldNumber
        id="InputValue" 
        v-model="item.value" 
        :step="0.01"
        label="Valor" 
        required
      />
      <FieldSelect
        id="InputCategorie" 
        v-model="item.fkCategorie" 
        :options="categories"
        option-label="full"
        label="Valor" 
        required 
      />
      <FieldTextarea
        id="InputDescription" 
        v-model="item.description" 
        label="Descripción" 
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
    
    const item = ref({});
    const categories = ref([]);
    
    const id = computed(() => {
      return parseInt($route.value.params.id);
    });
    
    const action = computed(() => {
      return id.value ? "Modificar" : "Nuevo";
    });
    
    const save = handle(async () => {
      if (id.value) {
        await $articles.updateOne(item.value);
      }
      else {
        await $articles.insertOne(item.value);
      }
      $router.back();
    });
    
    const cancel = () => {
      $router.back();
    };
    
    const loadItem = async () => {
      item.value = await $articles.findOne(id.value);
      categories.value = await $categories.findMany();
    };
    
    onMounted(async () => {
      try {
        await $session.refresh();
        $fetch.setRefreshCallback($session.refresh);
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
      save,
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