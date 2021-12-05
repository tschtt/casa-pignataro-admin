<template>
  <main>
    <h2>
      {{ action }} administrador
    </h2>
    <form id="FormAdmin" @submit.prevent="save">
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
      return id.value ? 'Nuevo' : 'Modificar'
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

<style lang="scss">

form {
  > * + * {
    margin-top: var(--space-400);
  }

  input {
    margin-top: var(--space-200);
    padding: var(--space-100) var(--space-300);
    border: none;
    // border: 1px solid var(--clr-grey-500);
    border-radius: 10px;
    box-shadow: var(--shadow-inner-100);
  }

  input:focus {
    outline: 2px solid var(--clr-grey-500);
  }
}

</style>

<style lang="scss" scoped>

main {
  padding: var(--space-400);

  > * + * {
    margin-top: var(--space-300);
  }

  > h2 {
    font-family: var(--font-heading);
    font-size: var(--text-300);
    padding: var(--space-200);
    background-color: var(--clr-grey-100);
    text-align: center;
    font-weight: bold;
    letter-spacing: 1px;
    box-shadow: var(--shadow-200);
    border-radius: 10px;
  }

  > form {
    padding: var(--space-400) var(--space-500);
    background-color: var(--clr-grey-100);
    box-shadow: var(--shadow-200);
    border-radius: 10px;
  }

  > nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: right;
    gap: var(--space-200);
  }
}

</style>