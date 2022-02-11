<template>
  <main class="card">
    <h2 class="title">
      Importar / Exportar
    </h2>
    <p class="text">
      Descargá o cargá un excel con los datos de todos los artículos, secciones y categorias.
    </p>
    <nav class="flex flex-center">
      <button class="button button-exportar icon-before" name="file_download" @click="exportar">
        Exportar
      </button>
      <div class="button button-importar icon-before" name="file_upload">
        <label for="InputImport">Importar</label>
        <input
          id="InputImport"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          @input="importar"
        >
      </div>
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
        $notification.insert({ message: 'Se produjo un error al descargar el archivo.' })
      }
    }

    async function importar(event) {
      try {
        const body = new FormData()
        body.append('file', event.target.files[0])
        $notification.insert({ message: 'Subiendo el archivo...' })
        await $fetch.post('/xlsx', { body }) 
        $notification.insert({ message: 'Los datos se guardaron con exito.' })
      } catch (error) {
        $notification.insert({ message: 'Se produjo un error al subir el archivo.' })
      }
    }

    onMounted(async () => {
      await $session.onlyAuthed()
    })
    
    return {
      exportar,
      importar,
    }
  },
}
</script>

<style lang="scss" scoped>

.button-importar {
  position: relative;
}

.button-importar > input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer; 
}

</style>