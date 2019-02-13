<template>
  <span v-if="hex">
    <span v-if="hex == 0">0</span>
    <span v-else v-tooltip="hex" v-on:click="$clipboard(hex)">
      <span v-if="hex.length < 8">{{ hex }}</span>
      <span v-else>{{ shortHexPrefix }}<span class="elipse">...</span>{{ shortHexSuffix }}</span>
    </span>
  </span>
</template>

<script>
export default {
  components: {
  },
  props: {
    value: undefined
  },
  computed: {
    hex() {
      if(!this.value) return '';
      if(!this.value.startsWith('0x'))
      {
        return '0x' + this.value;
      }
      return this.value;
    },
    shortHexPrefix() {
      return this.hex.substr(0, 3);
    },
    shortHexSuffix() {
      return this.hex.substr(this.hex.length-6);
    },
  },
}

</script>
