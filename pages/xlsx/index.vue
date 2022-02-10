<template>
  <main class="card">
    <h2 class="title">
      Importar / Exportar
    </h2>
    <p class="text">
      Descargá o cargá un excel con los datos de todos los artículos, secciones y categorias.
    </p>
    <nav class="flex flex-center">
      <button class="button icon-before" name="file_download" @click="exportar">
        Exportar
      </button>
      <button class="button icon-before" name="file_upload" @click="exportar">
        Importar
      </button>
    </nav>
  </main>
</template>

<script>
import download from 'downloadjs'
import { useFetch, useSession, useNotification } from "~/composition/index.js"
import { onMounted } from '@vue/composition-api'
export default {
  setup() {
    const $fetch = useFetch()
    const $session = useSession()
    const $notification = useNotification()

    async function exportar() {
      try {
        $notification.insert({ message: 'Descargando el archivo...' })
        const result = await $fetch.get('/xlsx', { type: 'blob' })
        download(result, 'listado.xlsx')   
      } catch {
        $notification.insert('Se produjo un error al descargar el archivo')
      }
    }

    onMounted(async () => {
      await $session.onlyAuthed()
    })
    
    return {
      exportar
    }
  },
}
</script>

<style>

</style>