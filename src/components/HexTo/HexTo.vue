<template>
  <div v-if="isHex">
    <HexToDecimal v-if="big.lte('1000000000000000')" :big="big" />
    <HexToString :hex="this.$store.state.userInput" prefix="Hex to string:" />
  </div>
</template>

<script>
import HexToDecimal from './HexToDecimal.vue'
import HexToString from './HexToString.vue'
const BigNumber = require('bignumber.js');

export default {
  components: {
    HexToDecimal,
    HexToString,
  },
  computed: {
    big() {
      return new BigNumber(this.$store.state.userInput, 16);
    },
    isHex() {
      if(!this.big || this.big == 0) return false;
      return this.big.isInteger();
    },
  }
}
</script>