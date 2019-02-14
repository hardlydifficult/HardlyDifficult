<template>
  <div v-if="recentEvents && recentEvents.length > 0">
    Recent Events:
    <div class="tab">
      <div v-for="(event, index) in recentEvents" :key="index">
        <Event :event="event" :next="index < recentEvents.length - 1 ? recentEvents[index + 1] : undefined" />
      </div>
    </div>
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
  },
  asyncComputed: {
    async recentEvents() {
      if(!this.base58) return undefined;
      return await this.tronExplorer.getRecentEvents(this.base58);
    },
  }
}
</script>