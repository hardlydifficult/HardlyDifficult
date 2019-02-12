<template>
  <div>
    Decimal to hex: {{ value }}
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  computed: {
    value() {
      return '0x' + new BigNumber(this.$store.state.userInput).toString(16);
    }
  }
}
</script>