<template>
  <div>
    <div v-if="parsedLog">
      <span class="eventName">{{ parsedLog.event }}</span>(<span v-for="(param, index) in parsedLog.params" :key="param.value" class="params"><span v-if="index > 0">, </span>{{ param.value }}</span>)
      <span v-if="parsedLog.address != contract">from {{ parsedLog.address }}</span>
      <!-- <pre>{{ JSON.stringify(parsedLog, null, 2) }}</pre> -->
    </div>
  </div>
</template>

<script>
import TronExplorer from '../logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();

export default {
  components: {
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

<style>
.eventName {
  font-weight: bold;
}
.params {
}
</style>
