<template>
  <nav class="table-pagination">
    <h3 class="hide-visually">
      Paginación
    </h3>
    <div class="flex justify-center">
      <button class="link-previous button" :disabled="!previous_active" @click="previous">
        Página anterior
      </button>
      <span class="button">
        {{ page }}
      </span>
      <button class="link-next button" :disabled="!next_active" @click="next">
        Página siguiente
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      step: 5
    }
  },
  computed: {
    
    page() {
      return this.pagination.page_current || 1
    },
    page_first() {
      return this.pagination.page_first || 1
    },
    page_last() {
      return this.pagination.page_last || 1
    },

    previous_active() {
      return this.page - 1 >= this.page_first
    },
    next_active() {
      return this.page + 1 <= this.page_last
    }
  },
  methods: {

    previous() {
      if(this.previous_active) {
        this.$router.replace({ 
          path: '/articulos', 
          query: { 
            ...this.$route.query, 
            page: this.page - 1 
          } 
        })
      }
    },
   
    next() {
      if(this.next_active) {
        this.$router.replace({ 
          path: '/articulos', 
          query: { 
            ...this.$route.query, 
            page: this.page + 1 
          } 
        })
      }
    },
   
  }
}
</script>

<style lang="scss" scoped>

.table-pagination {
  padding: var(--space-500);
  // display: flex;
  // justify-content: center;
  // gap: var(--space-500);
  border: none;
  border-bottom: 1px solid var(--clr-grey-400);
}

</style>