<template>
  <div class="messages-container">
    <transition-group name="fade">
      <article
        v-for="(message) in messages"
        :key="message.id"
        class="message"
      >
        <!-- <header>
          <h3>{{ message.title }}</h3>
        </header>
        <i class="material-icons i-title">
          {{ message.icon }}
        </i> -->
        <p>{{ message.text }}</p>
        <!-- <button class="button material-icons" @click="remove(message)">
          close
        </button> -->
      </article>
    </transition-group>
  </div>
</template>

<script>
import { useNotification } from '~/composition/index.js'

export default {
  setup() {
    const $notification = useNotification()
    return {
      messages: $notification.messages,
      remove: $notification.remove,
    }
  },
}
</script>

<style lang="scss" scoped>

.messages-container {
  position: fixed;
  bottom: 1em;
  right: 1em;
  z-index: 100000;
}

.message + .message {
  margin-top: 1em;
}

.message {
  max-width: 40ch;
  max-height: 80vh;
  overflow-y: auto;
  text-overflow: ellipsis;
  
  font-size: var(--text-200);
  padding: var(--space-400) var(--space-700);
  
  background-color: var(--clr-main-200);
  color: var(--clr-main-800);

  font-weight: var(--weight-bold);
  letter-spacing: .15em;
  
  border-radius: 25px;
  box-shadow: var(--shadow-200);
}

.fade-enter-active, .fade-leave-active {
  transition: transform 350ms ease-out, opacity 350ms ease-out;
}

.fade-enter, .fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

</style>
