<template>
  <div>
    <span>
      <DataField :value="tx.raw_data.contract[0].parameter.value.owner_address" type="address" />
    </span>
    <span v-if="tx.raw_data.contract[0].parameter.value.contract_address">
      call contract <DataField :value="tx.raw_data.contract[0].parameter.value.contract_address" type="address" />
    </span>
    <span v-else-if="tx.raw_data.contract[0].parameter.value.to_address">
      <span v-if="tx.raw_data.contract[0].type.startsWith('Transfer')">
        transfer
      </span>
      to <DataField :value="tx.raw_data.contract[0].parameter.value.to_address" type="address" />
    </span>
    <div v-if="call">
      <FunctionCall :name="call.function" :params="call.params" />
      <span v-if="this.tx.raw_data.contract[0].parameter.value.call_token_value || this.tx.raw_data.contract[0].parameter.value.call_value">
        with 
        <span v-if="this.tx.raw_data.contract[0].parameter.value.call_value">
          {{ this.tx.raw_data.contract[0].parameter.value.call_value | trx }} 
        </span>
        <span v-if="this.tx.raw_data.contract[0].parameter.value.call_token_value">
          {{ this.tx.raw_data.contract[0].parameter.value.call_token_value | number }} 
          Trc10 #{{ this.tx.raw_data.contract[0].parameter.value.token_id }}
        </span>
      </span>
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
    <div class="details">
      <span v-if="tx.raw_data.timestamp">
        {{ tx.raw_data.timestamp | date }}
        (expires {{ tx.raw_data.expiration - tx.raw_data.timestamp | msDuration }} later)
      </span>
      <span v-if="tx.raw_data.fee_limit">
        max fee: {{ tx.raw_data.fee_limit | trx }}
      </span>
    </div>
  </div>
</template>

<script>
import TronContractAuthor from '../Contract/Author.vue';
import FunctionCall from '../Fields/FunctionCall.vue';
import DataField from '../Fields/DataField.vue';

export default {
  components: {
    TronContractAuthor,
    FunctionCall,
    DataField,
  },
  props: {
    tx: undefined,
    tronExplorer: undefined
  },
  asyncComputed: {
    async call() {
      if(!this.tx || !this.tx.raw_data || !this.tx.raw_data.contract || this.tx.raw_data.contract.length <= 0 || !this.tx.raw_data.contract[0].parameter || !this.tx.raw_data.contract[0].parameter.value || !this.tx.raw_data.contract[0].parameter.value.data) return '';
      return await this.tronExplorer.parseCall(this.tx.raw_data.contract[0].parameter.value.contract_address, this.tx.raw_data.contract[0].parameter.value.data)
    },
    async abi() {
      if(!this.tx) return '';
      return await this.tronExplorer.getAbi(this.tx.raw_data.contract[0].parameter.value.contract_address);
    }
  }
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
