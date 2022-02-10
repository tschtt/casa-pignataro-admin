<template>
  <article class="notification">
    <p>
      {{ message }}
    </p>
  </article>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss">

.notification {
  overflow-y: auto;
  
  max-width: 40ch;
  max-height: 80vh;
  padding: var(--space-400) var(--space-600);
  
  font-size: var(--text-200);
  font-weight: var(--weight-bold);
  letter-spacing: .15em;
  
  color: var(--clr-main-800);
  background-color: var(--clr-main-200);


  box-shadow: var(--shadow-400);
  
  border-radius: 25px;

  width: 100%;

  > p {
    text-align: center;
  }
}


</style>