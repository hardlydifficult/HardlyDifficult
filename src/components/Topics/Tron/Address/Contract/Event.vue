<template>
  <span>
    <div v-if="previousTx != event.transaction_id">
        Tx <DataField :value="event.transaction_id" type="bytes32" />
        <span class="small">
          @ <Timestamp :time="event.block_timestamp" :compareTo="Date.now()" deltaTemplate="(%0 ago)" />
        </span>
    </div>
    <div class="tab">
      <FunctionCall :name="event.event_name" :params="params" />
    </div>
  </span>
</template>

<script>
const BigNumber = require('bignumber.js');
import FunctionCall from '../../Fields/FunctionCall.vue';
import DataField from '../../Fields/DataField.vue';
import Timestamp from '../../../../Types/Int/ToTimestamp.vue';

export default {
  components: {
    FunctionCall,
    DataField,
    Timestamp,
  },
  props: {
    event: undefined,
    previousTx: undefined,
  },
  computed: {
    params() {
      if(!this.event || !this.event.result) return undefined;
      let result = [];
      for(let r in this.event.result)
      {
        let value;
        if(this.event.result_type[r].startsWith('byte'))
        {
          value = this.event.result[r];
        }
        else
        {
          value = new BigNumber(this.event.result[r]).toString(16);
        }
        result.push({
          name: r,
          type: this.event.result_type[r],
          value
        });
      }
      return result;
    },
  }
}
</script>


