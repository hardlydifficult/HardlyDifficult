<template>
  <div>
    <span>
      <DataField :value="tx.raw_data.contract[0].parameter.value.owner_address" type="address" />
    </span>
    <span v-if="tx.raw_data.contract[0].parameter.value.contract_address">
      call contract <DataField :value="tx.raw_data.contract[0].parameter.value.contract_address" type="address" />
      <TronContractAuthor :contract="tx.raw_data.contract[0].parameter.value.contract_address" />
    </span>
    <span v-if="tx.raw_data.contract[0].parameter.value.to_address">
      <span v-if="tx.raw_data.contract[0].type.startsWith('Transfer')">
        transfer
      </span>
      to <DataField :value="tx.raw_data.contract[0].parameter.value.to_address" type="address" />
    </span>
    <span v-if="tx.raw_data.timestamp">
      @ {{ tx.raw_data.timestamp | date }}
      (expires {{ tx.raw_data.expiration - tx.raw_data.timestamp | msDuration }} later)
    </span>
    <span v-if="tx.raw_data.fee_limit">
      Max fee: {{ tx.raw_data.fee_limit | trx }}.
    </span>
    <div v-if="call">
      <FunctionCall :name="call.function" :params="call.params" />
    </div>
    <div v-else-if="tx.raw_data.contract[0].type.startsWith('Transfer')">
      Send 
      <span v-if="tx.raw_data.contract[0].parameter.value.asset_name">
        {{ tx.raw_data.contract[0].parameter.value.amount | number }} 
        Trc10 #{{ tx.raw_data.contract[0].parameter.value.asset_name | hexToString }}
      </span>
      <span v-else>
        {{ tx.raw_data.contract[0].parameter.value.amount | trx }} 
      </span>
    </div>
    <div v-else-if="tx.raw_data.contract[0].type === 'CreateSmartContract'">
      Deploy contract <DataField :value="tx.contract_address" type="address" />
    </div>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import TronContractAuthor from './TronContractAuthor.vue';
import FunctionCall from './FunctionCall.vue';
import DataField from './DataField.vue';

export default {
  components: {
    TronContractAuthor,
    FunctionCall,
    DataField,
  },
  props: {
    tx: undefined
  },
  asyncComputed: {
    async call() {
      if(this.tx && this.tx.raw_data.contract[0].parameter.value.data)
      {
        return await tronExplorer.parseCall(this.tx.raw_data.contract[0].parameter.value.contract_address, this.tx.raw_data.contract[0].parameter.value.data)
      }
      return '';
    }
  }
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
