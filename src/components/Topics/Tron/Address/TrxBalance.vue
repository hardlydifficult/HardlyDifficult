<template>
  <div v-if="unconfirmedBalance !== undefined">
    Balance: {{ unconfirmedBalance | trx }}
    <span v-if="confirmedBalance && confirmedBalance != unconfirmedBalance">
      {{ confirmedBalance | trx }} (delta {{ confirmedDelta | trx }}) confirmed
    </span>
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  components: {
  },
  props: {
    account: undefined,
    unconfirmedAccount: undefined,
    tronExplorer: undefined,
  },
  computed: {
    unconfirmedBalance() {
      if(!this.unconfirmedAccount) return undefined;
      return this.unconfirmedAccount.balance || 0;
    },
    confirmedBalance() {
      if(!this.account) return undefined;
      return this.account.balance;
    },
    confirmedDelta() {
      if(!this.unconfirmedBalance || !this.confirmedBalance) return undefined;
      return new BigNumber(this.unconfirmedBalance).minus(this.confirmedBalance).toFixed();
    }
  }
}
</script>


