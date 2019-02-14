<template>
  <span>
    <FunctionCall :name="event.event_name" :params="params" />
    <span v-if="!next || next.event_index == 0">
      <div class="details">
        from tx <DataField :value="event.transaction_id" type="bytes32" />
          @ {{ event.block_timestamp | date }} ({{ timePassed | msDuration }} ago)
      </div>
    </span>
  </span>
</template>

<script>
const BigNumber = require('bignumber.js');
import FunctionCall from '../Fields/FunctionCall.vue';
import DataField from '../Fields/DataField.vue';

export default {
  components: {
    FunctionCall,
    DataField,
  },
  props: {
    event: undefined,
    next: undefined
  },
  computed: {
    params() {
      if(!this.event || !this.event.result) return undefined;
      let result = [];
      for(let r in this.event.result)
      {
        result.push({
          type: this.event.result_type[r],
          value: this.event.result[r]
        });
      }
      return result;
    },
    timePassed() {
      if(!this.event) return undefined;
      return new BigNumber(Date.now()).minus(this.event.block_timestamp);
    }
  }
}
</script>


