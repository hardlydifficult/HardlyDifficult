<template>
  <div v-if="isDecimal">
    <ToHex :big="big" v-if="!isHex" />
  </div>
</template>

<script>
import ToHex from "./ToHex.vue";
const BigNumber = require("bignumber.js");

export default {
  components: {
    ToHex,
  },
  props: {
    value: undefined,
  },
  computed: {
    big() {
      if (!this.value) return undefined;
      return new BigNumber(this.value);
    },
    isDecimal() {
      if (!this.big) return false;
      return this.big.isInteger();
    },
    isHex() {
      return this.value.startsWith("0x");
    },
  },
};
</script>
