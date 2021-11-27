<template>
  <div class="reel">
    <table class="table interactive">
      <thead>
        <tr>
          <th class="column-select" />
          <th v-for="(column, index) in columns" :key="index">
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!items.length">
          <td :colspan="columnCount">
            Sin datos
          </td>
        </tr>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    columnCount() {
      return this.columns.length + 1
    }
  }
}
</script>

<style scoped>

/* .column-select {
  width: 50px;
} */

</style>
