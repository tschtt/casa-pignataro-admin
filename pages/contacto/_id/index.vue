<template>
  <main>
    <h2>
      {{ action }}
    </h2>
    <form id="MainForm" class="form" @submit.prevent="save">
      <FieldNumber 
        id="InputOrder"
        v-model="item.order"
        label="Orden"
        required
      />
      <FieldText 
        id="InputIcon" 
        v-model="item.icon" 
        label="Nombre del ícono" 
        required   
      />
      <FieldText 
        id="InputName" 
        v-model="item.name" 
        label="Nombre del dato" 
        required 
      />
      <FieldTextarea
        id="InputValue" 
        v-model="item.value" 
        label="Descripción" 
        required 
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
    const $session = useSession()
    const $fetch = useFetch()
    const $route = useRoute()
    const $router = useRouter()

    const $contact = useResource('/contact')

    const { handle } = useHandler()
    
    const item = ref({})
    
    const id = computed(() => {
      return parseInt($route.value.params.id)
    })
    
    const action = computed(() => {
      return id.value ? 'Modificar' : 'Nuevo'
    })
    
    const save = handle(async () => {
      if(id.value) {
        await $contact.updateOne(id.value, item.value)
      } else {
        await $contact.insertOne(item.value)
      }
      $router.back()
    })

    const cancel = () => {
      $router.back()
    }
    
    const loadItem = async () => {
      item.value = await $contact.findOne(id.value)
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