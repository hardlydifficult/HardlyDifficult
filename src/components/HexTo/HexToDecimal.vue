<template>
  <div>
    Hex to decimal: {{ big.toFormat() }}
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  props: {
    big: undefined
  }
}
</script>