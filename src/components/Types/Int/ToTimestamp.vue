<template>
  <span v-if="time">
    {{ time | date }}
    <span v-if="delta">
      {{ deltaPrefix }}{{ this.delta | msDuration }}{{ deltaSuffix }}
    </span>
  </span>
</template>

<script>
const BigNumber = require("bignumber.js");

export default {
  props: {
    time: undefined,
    compareTo: undefined,
    deltaTemplate: undefined,
  },
  computed: {
    delta() {
      if (!this.compareTo) return undefined;
      return new BigNumber(this.compareTo).minus(this.time).abs().toFixed();
    },
    deltaPrefix() {
      if (!this.deltaTemplate) return undefined;
      return this.deltaTemplate.substring(0, this.deltaTemplate.indexOf("%0"));
    },
    deltaSuffix() {
      if (!this.deltaTemplate) return undefined;
      return this.deltaTemplate.substring(this.deltaTemplate.indexOf("%0") + 2);
    },
  },
};
</script>
