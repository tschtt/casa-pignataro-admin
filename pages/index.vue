<template>
  <main>
  </main>
</template>

<script setup>
import { ref, onMounted, useContext } from '@nuxtjs/composition-api'

const { $axios } = useContext()

const items = ref([])

const loadItems = async () => {
  const result = await $axios.$get('/admins')
  items.value = result.items
}

onMounted(() => {
  loadItems()
})

</script>
