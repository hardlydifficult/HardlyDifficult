<template>
  <span v-if="value !== undefined">
    <span v-if="!isZero" v-tooltip="`${base58} (${hex})`">
      <a :href="`#${base58}`">{{ shortAddressPrefix }}<span class="elipse">...</span>{{ shortAddressSuffix }}</a>
    </span>
    <span v-else>0</span>
  </span>
</template>

<script>
export default {
  props: {
    value: undefined
  },
  computed: {
    address() {
      if (!this.value) return '';
      if(this.value.length > 40)
      {
        return this.value.substring(this.value.length - 40);
      }
      return this.value;
    },
    hex() {
      if(!this.address) return '';
      return this.tronLibrary.toHex(this.address);
    },
    base58() {
      if(!this.address) return '';
      return this.tronLibrary.toBase58(this.address);
    },
    isZero() {
      return this.base58 === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb';
    },
    shortAddressPrefix() {
      return this.base58.substr(0, 1);
    },
    shortAddressSuffix() {
      return this.base58.substr(34-4);
    },
  },
}

</script>
