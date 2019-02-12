<template>
  <span v-if="value !== undefined">
    <!-- Arrays -->
    <span v-if="type.endsWith('[]')">[<span v-for="(v, index) in value" :key="index">
      <span v-if="index > 0">, </span>
      <DataField :value='v' :type="type.substr(0, type.length - 2)" />
    </span>]</span>
    <!-- Values -->
    <span v-else v-on:click="$clipboard(value)">
      <span v-if="type === 'address'"><TronAddress :value="value" /></span>
      <span v-else-if="type.startsWith('uint')">
        <span v-if="value.length <= 42 || value.startsWith('000000000000000000000000')" v-tooltip.top-center="withCommas(value)">{{ value | hexToNumberWithoutComma }}</span>
        <span v-else-if="value.startsWith('800000000000000000000000')" v-tooltip.top-center="value">2<sup>^255</sup> + <TronAddress :value="value.substring(value.length - 40)" /></span>
        <span v-else>{{ value | hex }}</span> 
      </span> 
      <span v-else-if="type === 'bool'">{{ type.includes(1) }}</span>
      <span v-else-if="type.startsWith('bytes')" v-tooltip.top-center="value">{{ value | hex }}</span>
      <span v-else>{{ value }} ({{type}})</span> 
    </span>
  </span>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import DataField from './DataField.vue';
const BigNumber = require('bignumber.js')
import TronAddress from './Tron/TronAddress.vue';

export default {
  name: 'DataField',
  components: {
    DataField,
    TronAddress
  },
  props: {
    type: undefined,
    value: undefined
  },
  filters: {
    hex: function(value) {
      if (!value) return ''
      if(!value.startsWith('0x'))
      {
        value = '0x' + value;
      }
      if(value.length < 10) return value;
      return `${value.substr(0, 3)}..${value.substr(value.length-6)}`;
    }
  },
  methods: {
    withCommas: function(value) {
      if(!value) return '';
      return new BigNumber(value, 16).toFormat();
    }
  }
}

</script>