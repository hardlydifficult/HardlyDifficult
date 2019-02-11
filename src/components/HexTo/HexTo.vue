<template>
  <div v-if="isHex">
    <HexToDecimal />
  </div>
</template>

<script>
import HexToDecimal from './HexToDecimal.vue'
const BigNumber = require('bignumber.js');

export default {
  components: {
    HexToDecimal,
  },
  computed: {
    isHex() {
      if(this.$store.state.userInput)
      {
        return new BigNumber(this.$store.state.userInput, 16).isInteger();
      }
    },
  }
}
</script>