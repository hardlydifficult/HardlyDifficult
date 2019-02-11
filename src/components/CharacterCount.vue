<template>
  <div v-if="count">
    {{ count }} characters
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      if(this.$store.state.userInput)
      {
        return this.$store.state.userInput.trim().length;
      }
    },
  }
}
</script>