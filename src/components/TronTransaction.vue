<template>
  <div v-if="JSON.stringify(tx || {}) != '{}'">
    <TronTxRequest :tx="tx" />
    <TronTxReceipt :tx="tx" :txInfo="txInfo" />
    <div class="fullDetails">
      <hr>
      Request:
      <Json :value="tx" />
      <span v-if="JSON.stringify(txInfo || {}) != '{}'">
        Response:
        <Json :value="txInfo" />
      </span>
    </div>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();

import TronTxRequest from './TronTxRequest.vue';
import TronTxReceipt from './TronTxReceipt.vue';
import Json from './Json.vue';

export default {
  components: {
    TronTxRequest,
    TronTxReceipt,
    Json,
  },
  asyncComputed: {
    async tx () 
    {
      return await tronExplorer.getTx(this.$store.state.userInput);
    },
    async txInfo () 
    {
      return await tronExplorer.getTxInfo(this.$store.state.userInput);
    },
  },
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
