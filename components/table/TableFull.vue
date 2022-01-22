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
      :count="count"
    />
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
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
