<template>
  <div>
  <div>
    <a :href="'https://blockscout.com/poa/xdai/tx/' + tx.hash">{{ tx.name }}(<span v-for="(p, index) in params" v-bind:key="p.name">
    <span v-if="index > 0">, </span><span class="label">{{p.name}}:</span> <span v-if="p.name.includes('Bid')">{{p.value | toDai}}</span><span v-else>{{p.value}}</span></span>)</a>
    &nbsp;
    <span v-if="tx.value > 0">
      <span class="label">value:</span> {{tx.value | toDai}}
    </span>
    <span class="label">from: 0x</span>{{tx.from | address}} 
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
export default {
  props: {
    tx: undefined,
  },
  computed: {
    params() {
      console.log(this.tx.params[0])
      if(this.tx.params[0].name === 'token' && this.tx.params[0].value == "0x86f78cd3f6e6a93b996fede81ed964b0fa1414e1") {
        return [{name: "tokenId", value: this.tx.params[1].value}, ...this.tx.params.slice(2)]
      } else {
        return this.tx.params;
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
</style>