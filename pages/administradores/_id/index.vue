<template>
  <main>
    <h2>
      {{ action }}
    </h2>
    <form id="FormAdmin" class="form" @submit.prevent="save">
      <FieldText 
        id="InputUsuario" 
        v-model="item.username" 
        label="Usuario" 
        required   
      />
      <FieldText 
        id="InputEmail" 
        v-model="item.email" 
        label="Email" 
        required 
        email 
      />
    </form>
    <nav>
      <button class="button" @click="cancel">
        Cancelar
      </button>
      <button class="button" form="FormAdmin">
        Guardar
      </button>
    </nav>
  </main>
</template>

<script>
import { computed, onMounted, ref, useRoute, useRouter } from '@nuxtjs/composition-api'
import { useResource, useSession, useFetch } from '~/composition'

export default {
  setup() {
    const $session = useSession()
    const $fetch = useFetch()

    const $route = useRoute()
    const $router = useRouter()
    
    const $admins = useResource('/admins')
    
    const item = ref({})
    
    const id = computed(() => {
      return parseInt($route.value.params.id)
    })
    
    const action = computed(() => {
      return id.value ? 'Modificar' : 'Nuevo'
    })
    
    const save = async () => {
      await $admins.upsertOne(item.value)
      $router.back()
    }

    const cancel = () => {
      $router.back()
    }
    
    const loadItem = async () => {
      item.value = await $admins.findOne(id.value)
    }
    
    onMounted(async () => {
      try {
        await $session.refresh()
        $fetch.setRefreshCallback($session.refresh)
        await loadItem()
      } catch (error) {
        $router.push('/sesion/iniciar')
      }
    })

    return {
      item,
      action,
      save,
      cancel,
    }
  }  
}

</script>

<style lang="scss" scoped>

main {
  margin: 0 auto;
  max-width: 50ch;
  padding: var(--space-400);
  background-color: var(--clr-grey-100);
  border-radius: 25px;
  box-shadow: var(--shadow-300);


  > * + * {
    margin-top: var(--space-500);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    text-align: center;
    font-weight: bold;
  }

  > nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: var(--space-200);
  }

}

</style>