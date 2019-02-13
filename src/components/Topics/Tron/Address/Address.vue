<template>
  <span v-if="base58">
    <strong>TRON {{ tronExplorer.network | titleCase }}</strong> address    
    {{ base58 }} ({{ hex }})
  </span>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  components: {
  },
  props: {
    value: undefined,
    tronExplorer: undefined,
  },
  computed: {
    hex() {
      if(!this.value || this.value.length != 34 || !this.value.startsWith('T')) return '';
      try {
        const big = new BigNumber(this.tronLibrary.toHex(this.value), 16);
        if(!big.isInteger()) return '';
        return '0x' + big.toString(16).substr(2);
      } catch(e) {
        return '';
      }
    },
    base58() {
      if(!this.hex) return '';
        return this.tronLibrary.toBase58('41' + this.hex.substr(2));
    }
  },
}
</script>
