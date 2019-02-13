<template>
  <div v-if="isHex">
    <ToNumber v-if="big.lte('1000000000000000')" :big="big" prefix="Hex to decimal: " />
    <ToString :hex="value" prefix="Hex to string: " />
  </div>
</template>

<script>
import ToNumber from '../Int/ToNumber.vue'
import ToString from './ToString.vue'
const BigNumber = require('bignumber.js');

export default {
  components: {
    ToNumber,
    ToString,
  },
  props: {
    value: undefined,
  },
  computed: {
    big() {
      return new BigNumber(this.value, 16);
    },
    isHex() {
      if(!this.big || this.big == 0) return false;
      return this.big.isInteger();
    },
  }
}
</script>