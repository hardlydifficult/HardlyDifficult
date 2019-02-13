<template>
  <span v-if="author">{{ prefix }}<DataField :value="author" type="address" /></span>
</template>

<script>
import DataField from '../Fields/DataField.vue';

export default {
  components: {
    DataField,
  },
  props: {
    abi: undefined,
    prefix: undefined
  },
  asyncComputed: {
    async author()
    {
      if(!this.abi) return '';
      return this.abi.origin_address;
    }
  },
}
</script>