<template>
  <span v-if="author">
    (by {{ author }})
  </span>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();

export default {
  components: {
  },
  props: {
    contract: undefined
  },
  asyncComputed: {
    async author()
    {
      if(this.contract)
      {
        return tronExplorer.toBase58((await tronExplorer.getAbi(this.contract)).origin_address);
      }
    }
  },
}
</script>

<style>
.eventName {
  font-weight: bold;
}
.params {
}
</style>
