<template>
  <div v-if="recentEvents && recentEvents.length > 0">
    <div v-for="(event, index) in recentEvents" :key="index">
      <Event :event="event" :previousTx="index > 0 ? recentEvents[index - 1].transaction_id : undefined" />
    </div>
    <button v-if="loadCount < 200" v-on:click="loadCount=200">
      View More
    </button>
  </div>
  <div v-else>
    none
  </div>
</template>

<script>
import Event from './Event.vue';

export default {
  components: {
    Event,
  },
  props: {
    tronExplorer: undefined,
    base58: undefined,
    eventName: undefined,
    count: undefined,
  },
  data() {
    return {
      loadCount: this.count
    }
  },
  asyncComputed: {
    async recentEvents() {
      if(!this.base58) return undefined;
      return await this.tronExplorer.getRecentEvents(this.base58, this.eventName, this.loadCount);
    },
  }
}
</script>