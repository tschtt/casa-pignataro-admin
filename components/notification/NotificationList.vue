<template>
  <div class="notifications-container">
    <transition-group name="fade" class="stack stack-300">
      <NotificationItem
        v-for="item in items" :key="item.id"
        v-bind="item"
      />
    </transition-group>
  </div>
</template>

<script>
import { useNotification } from '~/composition/index.js'

export default {
  setup() {
    const { items, remove } = useNotification()
    return {
      items,
      remove,
    }
  },
}
</script>

<style lang="scss">

.notifications-container {
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 100000;
}

</style>
