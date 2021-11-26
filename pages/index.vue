<template>
  <main>
    {{ items }}
  </main>
</template>

<script setup>
import { ref, onMounted } from '@nuxtjs/composition-api'
import { useAdmin } from '~/composition/index.js'

const $admin = useAdmin()

const items = ref([])

const loadItems = async () => {
  items.value = await $admin.findMany()
}

onMounted(() => {
  loadItems()
})

</script>
