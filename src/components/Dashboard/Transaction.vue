<template>
  <div class="row">
    <div class="imageBlock">
      <span v-if="metadata">
        <a v-if="tokenId" :href="'https://foundation.app/nft/nft-' + tokenId">
        <video v-if="metadata.image.endsWith('.mp4')" autoplay muted loop class="thumbnail">
          <source :src="metadata.image" />
        </video>
        <img v-else :src="metadata.image" class="thumbnail"/>
        <div v-if="metadata.name" class="label">{{metadata.name}} ({{tokenId}})</div>
        </a>
      </span>
    </div>
    
    <div class="inline">
      <a :href="'https://blockscout.com/poa/xdai/tx/' + tx.hash"><span class="bold">{{ tx.name }}</span><span v-if="params.length > 0 || tx.value > 0" class="small">(<span v-for="(p, index) in params" v-bind:key="p.name">
      <span v-if="index > 0">, </span><span class="label">{{p.name}}:</span> <span v-if="p.name.includes('Bid')">{{p.value | toDai}}</span><span v-else>{{p.value}}</span></span>
      <span v-if="tx.value > 0">
        <span v-if="params.length > 0">, </span>
        <span class="label">value:
        </span> {{tx.value | toDai}}</span>)
      </span>
      </a>
      <div>
      <span class="indent label">0x</span><a :href="'https://blockscout.com/poa/xdai/address/' + tx.from">{{tx.from | address}}</a>
      </div>
      <span v-if="tx.error" class="error">
        {{tx.error}}
      </span>
      <div class="indent label">
        <timeago :datetime="tx.time * 1000" :auto-update="1"></timeago>
      </div>
    </div>
  </div>
</template>

<script>
import { getMetadata } from '../../logic/foundation/NFTMarket';
export default {
  props: {
    tx: undefined,
  },
  computed: {
    params() {
      let params;
      if(this.tx.params[0].name === 'token' && this.tx.params[0].value == "0x86f78cd3f6e6a93b996fede81ed964b0fa1414e1") {
        params = [...this.tx.params.slice(2)]
      } else {
        params = this.tx.params;
      }
      
      if(params.find(p => p.name === "maxBid")?.value?.toString() === this.tx.value?.toString()) {
        params = params.filter(p => p.name !== "maxBid")
      }
      
      return params;
    },
    tokenId() {
      if(this.tx.params[0].name === 'token' && this.tx.params[1].name === "id") {
        return this.tx.params[1].value;
      }
      return undefined
    }
  } ,
  asyncComputed: {
    async metadata() {
      if(this.tx.params[0].name === 'token' && this.tx.params[1].name === "id") {
        return await getMetadata(this.tx.params[0].value, this.tx.params[1].value);
      } else {
        return undefined;
      }
    }
  }
}
</script>

<style scoped>
.label {
  font-size: .5rem;
}
.indent {
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
.error {
  font-size: 2em;
  color: red;
}
.bold {
  font-weight: 600;
}
.small {
  font-size: .8em;
}
</style>