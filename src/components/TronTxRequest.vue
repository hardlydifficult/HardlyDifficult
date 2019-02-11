<template>
  <div>
    <div>
      From: {{ tx.raw_data.contract[0].parameter.value.owner_address | address }}
    </div>
    <div v-if="tx.raw_data.contract[0].parameter.value.contract_address">
      Call contract: {{ tx.raw_data.contract[0].parameter.value.contract_address | address }}
      <TronContractAuthor :contract="tx.raw_data.contract[0].parameter.value.contract_address" />
    </div>
    <div v-if="call">
      <FunctionCall :name="call.function" :params="call.params" />
    </div>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import TronContractAuthor from './TronContractAuthor.vue';
import FunctionCall from './FunctionCall.vue';

export default {
  components: {
    TronContractAuthor,
    FunctionCall,
  },
  props: {
    tx: undefined
  },
  asyncComputed: {
    async call() {
      if(this.tx)
      {
        return await tronExplorer.parseCall(this.tx.raw_data.contract[0].parameter.value.contract_address, this.tx.raw_data.contract[0].parameter.value.data)
      }
    }
  }
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
