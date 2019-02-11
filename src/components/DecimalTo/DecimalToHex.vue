<template>
  <div>
    {{ value }}
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  computed: {
    value() {
      return new BigNumber(this.$store.state.userInput).toString(16);
    }
  }
}
</script>