<template>
  <div>
    <span v-if="JSON.stringify(transactionInfo || {}) != '{}'">
      <div v-if="transactionInfo.contract_address">
        Contract: {{ transactionInfo.contract_address | toBase58 }}
        <TronContractAuthor :contract="transactionInfo.contract_address" />
      </div>
       <div>
         <span v-if="transactionInfo.receipt.result">
          {{ transactionInfo.receipt.result | titleCase }}
          --
         </span>
        {{ transactionInfo.blockTimeStamp | date }}
        -- 
        Fee: {{ transactionInfo.fee | trx }}
      </div>
      <div>
        Result: {{ transactionInfo.contractResult }}
      </div>
      <div>
      </div>
      <span v-if="transactionInfo.log">
        <span v-if="transactionInfo.log.length > 0">
        <br>
        Logs:
        <ul>
        <li v-for="log in transactionInfo.log" :key="log.id">
          <TronLog :contract="transactionInfo.contract_address" :value="log" />
        </li>
        </ul>
        </span>
      </span>
      <hr>
      <div class="fullDetails">
        Full request:
        <Json :value="transaction" />
        Full response:
        <Json :value="transactionInfo" />
      </div>
    </span>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import Json from './Json.vue';
import TronLog from './TronLog.vue';
import TronContractAuthor from './TronContractAuthor.vue';

export default {
  components: {
    Json,
    TronLog,
    TronContractAuthor
  },
  asyncComputed: {
    async transactionInfo () {
      const info = await tronExplorer.getTxInfo(this.$store.state.txId);
      return info;
    },
    async transaction () {
      const info = await tronExplorer.getTx(this.$store.state.txId);
      return info;
    }
  },
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
