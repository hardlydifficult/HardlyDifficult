<template>
  <div v-if="JSON.stringify(tx || {}) != '{}' && JSON.stringify(txInfo || {}) != '{}'">
    <div>
      {{ tx.ret[0].contractRet | titleCase }}
      @ {{ txInfo.blockTimeStamp | date }} (mined in {{ txInfo.blockTimeStamp - tx.raw_data.timestamp | msDuration }}).
      <span v-if="txInfo.fee">
        Fee: {{ txInfo.fee | trx }} 
        <span v-if="feeOverLimit">
          ({{ feeOverLimit | percent }} of limit)
        </span>
        <span v-if="txInfo.receipt.energy_fee">
          [{{ txInfo.receipt.energy_fee | trx }} energy / {{ txInfo.receipt.net_fee | trx }} network]
        </span>
      </span>
    </div>
    <div v-if="txInfo.resMessage">
      Message: {{ txInfo.resMessage | hexToString }}
    </div>
    <div v-if="tx.ret[0].contractRet !== 'SUCCESS'">
      Result: <DataField :value="txInfo.contractResult[0]" type="bytes" />
      ("<HexToString :hex="txInfo.contractResult[0]" />")
    </div>
    <div v-else-if="!(txInfo.contractResult.length === 1 && txInfo.contractResult[0] === '') 
        && tx.raw_data.contract[0].type !== 'CreateSmartContract'">
      Result: <DataField :value="txInfo.contractResult[0]" type="bytes" />
    </div>
    <span v-if="txInfo.log && txInfo.log.length > 0">
      Logs:
      <ul>
        <li v-for="(log, index) in txInfo.log" :key="index">
          <TronLog :contract="txInfo.contract_address" :value="log" />
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import TronLog from './TronLog.vue';
const BigNumber = require('bignumber.js');
import HexToString from './HexTo/HexToString.vue';
import DataField from './DataField.vue';

export default {
  components: {
    TronLog,
    HexToString,
    DataField,
  },
  props: {
    tx: undefined,
    txInfo: undefined
  },
  computed: {
    feeOverLimit() {
      if(!this.tx || !this.txInfo || !this.tx.raw_data.fee_limit) return '';
      return new BigNumber(this.txInfo.fee).div(this.tx.raw_data.fee_limit);
    }
  }
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
