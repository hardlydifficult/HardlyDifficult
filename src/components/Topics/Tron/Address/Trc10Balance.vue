<template>
  <span v-if="hasBalance">
    Trc10 #{{ unconfirmedToken.key | number }}: {{ unconfirmedToken.value | number }}
    <span v-if="confirmedToken && confirmedToken.value != unconfirmedToken.value">
      {{ confirmedToken.value | number }} ({{ confirmedDelta | number }}) confirmed
    </span>
  </span>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  components: {
  },
  props: {
    unconfirmedToken: undefined,
    confirmedToken: undefined,
    tronExplorer: undefined,
  },
  computed: {
    hasBalance() {
      if(!this.unconfirmedToken) return false;
      return new BigNumber(this.unconfirmedToken.value).gt(0) || new BigNumber((this.confirmedToken || {}).value).gt(0);
    },
    confirmedDelta() {
      if(!this.hasBalance) return undefined;
      return new BigNumber(this.confirmedToken.value).minus(this.unconfirmedToken.value).toFixed();
    }
  }
}
</script>


