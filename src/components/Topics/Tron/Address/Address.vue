<template>
  <div v-if="unconfirmedAccount && JSON.stringify(unconfirmedAccount) != '{}'" class="topicBox">
    <div class="topicHeader">
      TRON <strong>{{ tronExplorer.network | titleCase }}</strong>
      <span v-if="unconfirmedAccount.type">
        {{ unconfirmedAccount.type | lowercase }}
      </span>
      address 
      <DataField :value="base58" type="address" />
    </div>
    <div class="details">
      <div v-if="unconfirmedAccount.create_time">
        Created
        <Timestamp :time="unconfirmedAccount.create_time" :compareTo="unconfirmedAccount.create_time" deltaTemplate="(%0 ago)" />
      </div>
      <div v-if="unconfirmedAccount.latest_opration_time">
        Last action
        <Timestamp :time="unconfirmedAccount.latest_opration_time" :compareTo="unconfirmedAccount.latest_opration_time" deltaTemplate="(%0 ago)" />        
      </div>
    </div>
    <div class="dataGroup">
      Tokens:
      <div class="tab">
        <TrxBalance :account="account" :unconfirmedAccount="unconfirmedAccount" :tronExplorer="tronExplorer" />
        <Trc10Balances :account="account" :unconfirmedAccount="unconfirmedAccount" :tronExplorer="tronExplorer" />
      </div>
    </div>
    <RecentTransactions :base58="base58" :tronExplorer="tronExplorer" />
    <span v-if="unconfirmedAccount.type">
      <Contract :base58="base58" :tronExplorer="tronExplorer" />
    </span>
  </div>
</template>

<script>
const BigNumber = require('bignumber.js');
import TrxBalance from './TrxBalance.vue';
import Trc10Balances from './Trc10Balances.vue';
import RecentTransactions from './RecentTransactions.vue';
import DataField from '../Fields/DataField.vue';
import Contract from './Contract/Contract.vue';
import Timestamp from '../../../Types/Int/ToTimestamp.vue';

export default {
  components: {
    TrxBalance,
    Trc10Balances,
    RecentTransactions,
    DataField,
    Contract,
    Timestamp,
  },
  props: {
    value: undefined,
    tronExplorer: undefined,
  },
  computed: {
    hex() {
      if(!this.value) return undefined;
      let big;
      try {
        if(this.value.length == 34 && this.value.startsWith('T'))
        {
          big = new BigNumber(this.tronLibrary.toHex(this.value), 16);
        }
      } catch(e) {}
      try {
        if(!big) 
        {
          if(this.value.length == 42 || (this.value.length == 40 && (this.value.startsWith('0x') || this.value.startsWith('41'))))
          big = new BigNumber(this.tronLibrary.toHex(this.tronLibrary.toBase58(this.value)), 16);
        }
      } catch(e) {}
      
      if(!big || !big.isInteger()) return undefined;
      return '0x' + big.toString(16).substr(2);
    },
    base58() {
      if(!this.hex) return undefined;
      return this.tronLibrary.toBase58('41' + this.hex.substr(2));
    },
  },
  asyncComputed: {
    async unconfirmedAccount() {
      if(!this.base58) return undefined;
      return await this.tronExplorer.getUnconfirmedAccount(this.base58);
    },
    async account() {
      if(!this.unconfirmedAccount) return undefined;
      return await this.tronExplorer.getAccount(this.base58);
    },
  },
}
</script>
