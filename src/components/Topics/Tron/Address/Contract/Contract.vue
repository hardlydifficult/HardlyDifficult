<template>
  <div>
    <div class="dataGroup">
      Latest Events:
      <div class="dataGroup">
        <div class="tab dataGroup">
          <RecentEvents count="25" :base58="base58" :tronExplorer="tronExplorer" />
        </div>
        Latest Event By Type:
        <div class="tab dataGroup">
          <div v-for="(type, index) in eventTypes" :key="index">
            Event {{ type }}:
            <div class="tab dataGroup">        
              <RecentEvents count="1" :eventName="type" :base58="base58" :tronExplorer="tronExplorer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecentEvents from './RecentEvents.vue';

export default {
  components: {
    RecentEvents,
  },
  props: {
    tronExplorer: undefined,
    base58: undefined,
  },
  asyncComputed: {
    async abi() {
      if(!this.base58) return undefined;
      return (await this.tronExplorer.getAbi(this.base58)).abi;
    },
  },
  computed: {
    eventTypes() {
      if(!this.abi) return undefined;
      const types = [];
      for(let i = 0; i < this.abi.entrys.length; i++)
      {
        const entry = this.abi.entrys[i];
        if(entry.type != 'Event') continue;
        types.push(entry.name);
      }
      types.sort();
      return types;
    }
  }
}
</script>