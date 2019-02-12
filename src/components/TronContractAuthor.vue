<template>
  <span v-if="author">
    (created by <DataField :value="author" type="address" />)
  </span>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import DataField from './DataField.vue';

export default {
  components: {
    DataField,
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