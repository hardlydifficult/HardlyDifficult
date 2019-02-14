<template>
  <span v-if="value !== undefined">
    <span v-if="value.length == 64 && value.startsWith('800000000000000000000000') && !value.startsWith('80000000000000000000000000')">
      <span v-tooltip="hex">2<sup>^255</sup> + 
      </span>
      <Address :value="value.substring(value.length - 40)" />
    </span>
    <span v-else-if="int.length <= 20">
      <span v-if="couldBeDate" v-tooltip="`${withCommas} -- ${hex} -- ${asDate}`">{{ int }}</span>
      <span v-else v-tooltip="`${withCommas} -- ${hex}`">{{ int }}</span>
    </span>
    <span v-else>
      <Hex :value="value" />
    </span> 
  </span>
</template>

<script>
const BigNumber = require('bignumber.js');
import Address from './Address.vue'
import Hex from './Hex.vue'

export default {
  components: {
    Address,
    Hex,
  },
  props: {
    value: undefined
  },
  computed: {
    hex() {
      if(!this.value) return '';
      if(!this.value.startsWith('0x'))
      {
        return '0x' + this.value;
      }
      return this.value;
    },
    big() {
      return new BigNumber(this.value, 16);
    },
    int() {
      if(!this.big) return 0;
      return this.big.toFixed();
    },
    withCommas() {
      if(!this.big) return 0;
      return this.big.toFormat();
    },
    couldBeDate() {
      if(!this.big) return false;
      if(this.big.gte(Date.now() / 1000 - 60 * 60 * 24 * 365)
        && this.big.lte(Date.now() / 1000 + 60 * 60 * 24 * 365))
      {
        return true;
      }
      return false;
    },
    asDate() {
      if(!this.couldBeDate) return '';
      let value = new Date(this.big.times(1000).toNumber());
      return `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
    }
  },
}

</script>
