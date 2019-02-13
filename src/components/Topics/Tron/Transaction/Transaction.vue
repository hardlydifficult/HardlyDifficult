<template>
  <div v-if="JSON.stringify(tx || {}) != '{}'">
    <strong>TRON {{ tronExplorer.network | titleCase }}</strong> transaction
    <TronTxRequest :tx="tx" :tronExplorer="tronExplorer" />
    <TronTxReceipt :tx="tx" :txInfo="txInfo" :tronExplorer="tronExplorer" />
    <div class="fullDetails">
      <br><hr><br>
      Request:
      <Json :value="tx" />
      <span v-if="JSON.stringify(txInfo || {}) != '{}'">
        Response:
        <Json :value="txInfo" />
      </span>
    </div>
    <br><hr><hr><hr><br>
  </div>
</template>

<script>
import TronTxRequest from './TxRequest.vue';
import TronTxReceipt from './TxReceipt.vue';
import Json from '../../../Types/String/Json.vue';

export default {
  components: {
    TronTxRequest,
    TronTxReceipt,
    Json,
  },
  props: {
    value: undefined,
    tronExplorer: undefined,
  },
  asyncComputed: {
    async tx () 
    {
      if(!this.value) return '';
      try 
      {
        return await this.tronExplorer.getTx(this.value);
      } 
      catch(e)
      {
        return '';
      }
    },
    async txInfo () 
    {
      if(!this.tx) return '';
      try 
      {
        return await this.tronExplorer.getTxInfo(this.value);
      }
      catch(e)
      {
        return '';
      }
    },
  },
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
