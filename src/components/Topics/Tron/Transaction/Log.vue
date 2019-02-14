<template>
  <div v-if="parsedLog">
    <FunctionCall :name="parsedLog.event" :params="parsedLog.params" />
    <span v-if="parsedLog.address != contract" class="small">from <DataField :value="parsedLog.address" type="address" /></span>
  </div>
</template>

<script>
import FunctionCall from '../Fields/FunctionCall.vue';
import DataField from '../Fields/DataField.vue';

export default {
  components: {
    FunctionCall,
    DataField,
  },
  props: {
    contract: undefined,
    value: undefined,
    tronExplorer: undefined
  },
  asyncComputed: {
    async parsedLog()
    {
      if(!this.value) return '';
      return await this.tronExplorer.parseLog(this.value);
    }
  },
}
</script>
