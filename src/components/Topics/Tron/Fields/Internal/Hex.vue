<template>
  <span v-if="hex">
    <span v-if="hex == 0">0</span>
    <span v-else v-tooltip="hex">
      <a :href="`#${hex}`">
        <span class="small">0x</span>
        <span v-if="hex.length < 8">{{ hex }}</span>
        <span v-else>{{ shortHexPrefix }}<span class="elipse">...</span>{{ shortHexSuffix }}</span>
      </a>
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
      if(this.value.startsWith('0x'))
      {
        return this.value.substr(2);
      }
      return this.value;
    },
    shortHexPrefix() {
      return this.hex.substr(0, 2);
    },
    shortHexSuffix() {
      return this.hex.substr(this.hex.length-4);
    },
  },
}

</script>
