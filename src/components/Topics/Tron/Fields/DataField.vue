<template>
  <span v-if="value !== undefined">
    <!-- Arrays -->
    <span v-if="type.endsWith('[]')">[<span v-for="(v, index) in value" :key="index">
      <span v-if="index > 0">, </span>
      <DataField :value='v' :type="type.substr(0, type.length - 2)" />
    </span>]</span>
    <!-- Values -->
    <span v-else>
      <span v-if="type === 'address'">
        <TronAddress :value="value" />
      </span>
      <span v-else-if="type.startsWith('uint')">
        <Int :value="value" />
      </span> 
      <span v-else-if="type === 'bool'">
        <Bool :value="value" />
      </span>
      <span v-else-if="type.startsWith('bytes')">
        <Hex :value="value" />
      </span>
      <span v-else>{{ value }} of {{type}} (currently missing, let Hardly know!)</span> 
    </span>
  </span>
</template>

<script>
import DataField from './DataField.vue';
const BigNumber = require('bignumber.js')
import TronAddress from './Internal/Address.vue';
import Int from './Internal/Int.vue'
import Bool from './Internal/Bool.vue'
import Hex from './Internal/Hex.vue'

export default {
  name: 'DataField',
  components: {
    DataField,
    TronAddress,
    Int,
    Bool,
    Hex,
  },
  props: {
    type: undefined,
    value: undefined
  },
}

</script>