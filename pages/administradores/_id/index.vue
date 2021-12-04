<template>
  <main>
    <h1>
      {{ action }} administrador
    </h1>
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
    <nav class="cluster right">
      <button form="FormAdmin">
        Guardar
      </button>
      <button @click="cancel">
        Cancelar
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