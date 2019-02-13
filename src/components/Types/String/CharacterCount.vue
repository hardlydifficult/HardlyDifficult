<template>
  <div v-if="count" class="characterCount">
    {{ count }} characters
  </div>
</template>

<script>
export default {
  props: {
    value: undefined
  },
  computed: {
    count() {
      if(!this.value) return '';
      return this.value.length;
    },
  }
}
</script>
<style>
.characterCount {
  font-size: .5em;
}
</style>
