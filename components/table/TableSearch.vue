<template>
  <form class="search-form" @submit.prevent="search">
    <label class="hide-visually" for="InputSearch">Buscar</label>
    <input v-model="value" id="InputSearch" type="text" placeholder="Buscar...">
  </form>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    load() {
      const { search } = this.$route.query
      if(search) {
        this.value = search
      }
    },
    search() {
      this.$router.replace({
        path: this.$route.path,
        query: {
          search: this.value
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.search-form input {
  font-size: var(--text-300);
  padding: var(--space-200) var(--space-500);
  
  background-color: transparent;
  
  border: none;
  border-top: 1px solid var(--clr-grey-400);
}

</style>