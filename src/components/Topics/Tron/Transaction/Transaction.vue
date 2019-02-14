<template>
  <div v-if="JSON.stringify(tx || {}) != '{}'" class="topicBox">
    <div class="topicHeader">
      TRON <strong>{{ tronExplorer.network | titleCase }}</strong> transaction
    </div>
    <TronTxRequest :tx="tx" :tronExplorer="tronExplorer" />
    <TronTxReceipt :tx="tx" :txInfo="txInfo" :tronExplorer="tronExplorer" />
  </div>
</template>

<script>
import TronTxRequest from './TxRequest.vue';
import TronTxReceipt from './TxReceipt.vue';

export default {
  components: {
    TronTxRequest,
    TronTxReceipt,
  },
  props: {
    value: undefined,
    tronExplorer: undefined,
  },
  computed: {
    txHash() {
      if(!this.value) return undefined;
      if(this.value.startsWith('0x'))
      {
        return this.value.substring(2);
      }
      return this.value;
    }
  },
  asyncComputed: {
    async tx () 
    {
      if(!this.txHash) return '';
      try 
      {
        return await this.tronExplorer.getTx(this.txHash);
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
        return await this.tronExplorer.getTxInfo(this.txHash);
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
