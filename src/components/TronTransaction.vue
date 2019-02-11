<template>
  <div>
    <span v-if="JSON.stringify(transactionInfo || {}) != '{}'">
      <div>
        Contract: {{ transactionInfo.contract_address | toBase58 }}
      </div>
      {{ test }}
      <div>
        {{ transactionInfo.receipt.result | titleCase }}
      </div>
      <div>
        result: {{ transactionInfo.contractResult }}
      </div>
      <div>
        {{ transactionInfo.blockTimeStamp | date }}
      </div>
      <div>
        Fee: {{ transactionInfo.fee | trx }}
      </div>
      <div v-for="log in transactionInfo.log" :key="log.id">
        <hr>
        Contract: {{ log.address | toBase58 }}
        <hr>
      </div>
      <Json v-model="transactionInfo" />
    </span>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import Json from './Json.vue';

export default {
  components: {
    Json
  },
  asyncComputed: {
    async transactionInfo () {
      return await tronExplorer.getTx(this.$store.state.txId);
    }, 
    async test()
    {
      return await tronExplorer.getAbi()
    }
  },
}
</script>