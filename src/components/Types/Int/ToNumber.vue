<template>
  <div>
    <span
      >{{ prefix }}{{ includeCommas ? big.toFormat() : big.toFixed() }}</span
    >
    &nbsp;
    <span>[{{ includeCommas ? shifted.toFormat() : shifted.toFixed() }}]</span>
  </div>
</template>

<script>
const BigNumber = require("bignumber.js");

export default {
  props: {
    big: undefined,
    prefix: undefined,
    includeCommas: undefined,
  },
  computed: {
    shifted() {
      return new BigNumber(this.big).shiftedBy(-18);
    },
  },
};
</script>
