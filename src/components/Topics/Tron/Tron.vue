<template>
  <div>
    <TronTransaction :value="value" :tronExplorer="tronExplorer" />
    <TronAddress :value="value" :tronExplorer="tronExplorer" />
  </div>
</template>

<script>
import TronExplorer from '../../../logic/tron/TronExplorer.js';
import TronTransaction from './Transaction/Transaction.vue'
import TronAddress from './Address/Address.vue'

export default {
  components: {
    TronTransaction,
    TronAddress,
  },
  props: {
    value: undefined,
    network: undefined,
  },
  computed: {
    tronExplorer() {
      return new TronExplorer(this.network);
    }
  },
}
</script>
