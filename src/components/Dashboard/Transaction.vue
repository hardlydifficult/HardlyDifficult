<template>
  <div class="row">
    <div class="imageBlock">
      <a v-if="image && params.length > 0 && params[0].name === 'id'" :href="'https://foundation.app/nft/nft-' + params[0].value">
      <video v-if="image.endsWith('.mp4')" autoplay muted loop class="thumbnail">
        <source :src="image" />
      </video>
      <img v-else :src="image" class="thumbnail"/>
      </a>
    </div>
    
    <div class="inline">
      <a :href="'https://blockscout.com/poa/xdai/tx/' + tx.hash">{{ tx.name }}(<span v-for="(p, index) in params" v-bind:key="p.name">
      <span v-if="index > 0">, </span><span class="label">{{p.name}}:</span> <span v-if="p.name.includes('Bid')">{{p.value | toDai}}</span><span v-else>{{p.value}}</span></span>)</a>
      &nbsp;
      <span v-if="tx.value > 0">
        <span class="label">value:</span> {{tx.value | toDai}}
      </span>
      <div>
      <span class="label">from: 0x</span><a :href="'https://blockscout.com/poa/xdai/address/' + tx.from">{{tx.from | address}}</a>
      </div>
      <span v-if="tx.error">
        {{tx.error}}
      </span>
      <div class="time">
        <timeago :datetime="tx.time * 1000" :auto-update="1"></timeago>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUri } from '../../logic/foundation/NFTMarket';
export default {
  props: {
    tx: undefined,
  },
  computed: {
    params() {
      let params;
      if(this.tx.params[0].name === 'token' && this.tx.params[0].value == "0x86f78cd3f6e6a93b996fede81ed964b0fa1414e1") {
        params = [{name: "id", value: this.tx.params[1].value}, ...this.tx.params.slice(2)]
      } else {
        params = this.tx.params;
      }
      
      if(params.find(p => p.name === "maxBid")?.value?.toString() === this.tx.value?.toString()) {
        params = params.filter(p => p.name !== "maxBid")
      }
      
      return params;
    },
  } ,
  asyncComputed: {
    async image() {
      if(this.tx.params[0].name === 'token' && this.tx.params[1].name === "id") {
        return await getImageUri(this.tx.params[0].value, this.tx.params[1].value);
      } else {
        return undefined;
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-size: .5em;
}
.time {
  font-size: .5em;
  padding-left: 2em;
}
.thumbnail {
  height: 3em;
}
.imageBlock {
  display: inline-block;
  width: 6em;
  text-align: center;
  padding-left: 1em;
  padding-right: 0.5em;
  vertical-align: middle;
  height: 100%;
}
.inline {
  display: inline-block;
  height: 100%;
  vertical-align: top;
}
.row {
  border-bottom: 1px solid;
  padding: 0.5em;
}
</style>