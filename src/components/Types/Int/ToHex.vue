<template>
  <div>
    Decimal to hex: {{ hex }}
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  props: {
    big: undefined
  },
  computed: {
    hex() {
      if(!this.big) return undefined;
      return '0x' + this.big.toString(16);
    }
  }
}
</script>