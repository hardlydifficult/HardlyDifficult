<template>
  <div v-if="count" class="characterCount">
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
<style>
.characterCount {
  font-size: .5em;
}
</style>
