<template>
  <div v-if="unconfirmedBalances">
    <div v-for="(unconfirmedToken, index) in unconfirmedBalances" :key="index">
      <Trc10Balance :unconfirmedToken="unconfirmedToken" :confirmedToken="(confirmedBalances || []).find(t => t.key == unconfirmedToken.key)" :tronExplorer="tronExplorer" />
    </div>
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');
import Trc10Balance from './Trc10Balance.vue'

export default {
  components: {
    Trc10Balance,
  },
  props: {
    tronExplorer: undefined,
    account: undefined,
    unconfirmedAccount: undefined,
  },
  computed: {
    unconfirmedBalances() {
      if(!this.unconfirmedAccount) return undefined;
      return this.unconfirmedAccount.assetV2;
    },
    confirmedBalances() {
      if(!this.account) return undefined;
      return this.account.assetV2;
    }
  }
}
</script>


