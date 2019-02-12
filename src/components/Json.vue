<template>
  <div>
    <textarea v-model="json"></textarea>
  </div>
</template>

<script>

export default {
  props: {
    value: undefined
  },
  computed: {
    json() {
      if(!this.value) return '';
      return JSON.stringify(this.value, null, 2);
    }
  }
}
</script>