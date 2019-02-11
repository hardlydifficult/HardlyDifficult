<template>
  <div v-if="JSON.stringify(txInfo || {}) != '{}'">
    <div>
      <span v-if="txInfo.receipt.result">
        {{ txInfo.receipt.result | titleCase }}
        --
      </span>
      {{ txInfo.blockTimeStamp | date }}
      -- 
      Fee: {{ txInfo.fee | trx }}
    </div>
    <div>
      Result: {{ txInfo.contractResult }}
    </div>
    <span v-if="txInfo.log">
      <span v-if="txInfo.log.length > 0">
        Logs:
        <ul>
          <li v-for="log in txInfo.log" :key="log.id">
            <TronLog :contract="txInfo.contract_address" :value="log" />
          </li>
        </ul>
      </span>
    </span>
  </div>
</template>

<script>
import TronLog from './TronLog.vue';

export default {
  components: {
    TronLog
  },
  props: {
    tx: undefined,
    txInfo: undefined
  }
}
</script>

<style>
.fullDetails {
  font-size: .75em;
}
</style>
