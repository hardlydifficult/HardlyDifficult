<template>
  <span v-if="bool !== undefined">{{ bool }}</span>
</template>

<script>
export default {
  components: {
  },
  props: {
    value: undefined
  },
  computed: {
    bool() {
      if(this.value === undefined) return undefined;
      if(typeof this.value === 'boolean')
      {
        return this.value;
      }
      return this.value.includes('1');
    }
  },
}
</script>
