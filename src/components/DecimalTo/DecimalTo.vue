<template>
  <div v-if="isDecimal">
    <DecimalToHex />
  </div>
</template>

<script>
import DecimalToHex from './DecimalToHex.vue'
const BigNumber = require('bignumber.js');

export default {
  components: {
    DecimalToHex,
  },
  computed: {
    isDecimal() {
      return new BigNumber(this.$store.state.userInput).isInteger();
    },
  }
}
</script>