<template>
  <span v-if="value !== undefined">
    <span v-tooltip="`${base58} (${hex})`">{{ base58 | toShortAddress }}</span>
  </span>
</template>

<script>
import TronExplorer from '../../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
const BigNumber = require('bignumber.js')

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
      return tronExplorer.toHex(this.address);
    },
    base58() {
      if(!this.address) return '';
      return tronExplorer.toBase58(this.address);
    }
  },
  filters: {
    toShortAddress: function(value) {
      if(value === 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb') return '0';
      return `${value.substr(0, 1)}..${value.substr(34-4)}`;
    },
  }
}

</script>