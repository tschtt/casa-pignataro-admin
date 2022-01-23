<template>
  <div class="table-container">
    <TableSearch />
    <TableBase
      :columns="columns"
      :length="length"
    >
      <slot />
    </TableBase>
    <TablePagination 
      :pagination="pagination"
    />
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      required: true,
    },
    columns: {
      type: Array,
      default: () => []
    },
    length: {
      type: Number,
      default: 0,
    },
  },
}
</script>
