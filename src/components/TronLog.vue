<template>
  <div v-if="parsedLog">
    <FunctionCall :name="parsedLog.event" :params="parsedLog.params" />
    <span v-if="parsedLog.address != contract">from <DataField :value="parsedLog.address" type="address" /></span>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();
import FunctionCall from './FunctionCall.vue';
import DataField from './DataField.vue';

export default {
  components: {
    FunctionCall,
    DataField,
  },
  props: {
    contract: undefined,
    value: undefined
  },
  asyncComputed: {
    async parsedLog()
    {
      if(this.value)
      {
        return await tronExplorer.parseLog(this.value);
      }
    }
  },
}
</script>
