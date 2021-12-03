<template>
  <main>
    <h1>
      {{ action }} administrador
    </h1>
    <form id="FormAdmin" @submit.prevent="save">
      <FieldText 
        id="InputUsuario" 
        v-model="username" 
        label="Usuario" 
        required   
      />
      <FieldText 
        id="InputEmail" 
        v-model="email" 
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
import { computed, onMounted, ref, useRoute } from '@nuxtjs/composition-api'
import { useAxios } from '~/composition'

export default {
  setup() {
    const $route = useRoute()
    const $axios = useAxios()
    
    const username = ref('')
    const email = ref('')
    
    const id = computed(() => {
      return parseInt($route.value.params.id)
    })
    
    const action = computed(() => {
      return id.value ? 'Nuevo' : 'Modificar'
    })
    
    const save = () => {

    }

    const cancel = () => {

    }
    
    const loadData = async () => {
      const result = await $axios.$get(`/admins/${id.value}`)
      username.value = result.item.username
      email.value = result.item.email
    }
    
    onMounted(() => {
      loadData()
    })

    return {
      username,
      email,
      action,
      save,
      cancel,
    }
  }  
}

</script>