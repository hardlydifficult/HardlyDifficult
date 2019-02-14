<template>
  <div v-if="parsedLog">
    <FunctionCall :name="parsedLog.event" :params="parsedLog.params" />
    <div v-if="parsedLog.address != contract" class="details">from <DataField :value="parsedLog.address" type="address" /></div>
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
