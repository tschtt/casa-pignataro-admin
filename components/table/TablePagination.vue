<template>
  <nav class="table-pagination">
    <nuxt-link class="link-previous button" v-if="previous" :to="previous">
      Anterior
    </nuxt-link>
    <nuxt-link class="link-next button" v-if="next" :to="next">
      Siguiente
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      step: 5
    }
  },
  computed: {
    limit() {
      return parseInt(this.$route.query.limit) || this.step
    },
    offset() {
      return parseInt(this.$route.query.offset) || 0
    },
    previous() {
      if(this.offset > 0) {
        return { path: '/articulos', query: { ...this.$route.query, offset: this.offset - this.step } }
      }
      return null
    },
    next() {
      if(this.offset < this.count - this.step) {
        return { path: '/articulos', query: { ...this.$route.query, offset: this.offset + this.step } }
      }
      return null
    },
  }
}
</script>

<style lang="scss" scoped>

.table-pagination {
  padding: var(--space-500);
  display: flex;
  justify-content: center;
  gap: var(--space-500);
  border: none;
  border-bottom: 1px solid var(--clr-grey-400);
}

</style>