<template>
  <div class="dataGroup" v-if="recentTransactions">
    Recent Transactions (only from recent blocks):
    <div v-if="recentTransactions.length > 0" class="tab">
      <div v-for="(tx, index) in recentTransactions" :key="index">
        Tx <DataField :value="tx.hash" type="bytes32" />
        <span v-if="tx.ownerAddress != base58">
          <span class="small">
            from
          </span>
          <DataField :value="tx.ownerAddress" type="address" />
        </span>
        <span v-if="tx.toAddress && tx.toAddress != base58">
          <span class="small">
            to
          </span>
          <DataField :value="tx.toAddress" type="address" />
        </span>
        <span v-if="tx.contractData && tx.contractData.contract_address && tx.contractData.contract_address != base58">
          <span class="small">
            call contract
          </span>
          <DataField :value="tx.contractData.contract_address" type="address" />
        </span>
        <span class="small">
          @ <Timestamp :time="tx.timestamp" :compareTo="Date.now()" deltaTemplate="(%0 ago)" />
        </span>
      </div>
    </div>
    <div v-else class="tab">
      No very recent transactions found.
    </div>
  </div>
</template>

<script>
import DataField from '../Fields/DataField.vue';
import Timestamp from '../../../Types/Int/ToTimestamp.vue'
const BigNumber = require('bignumber.js');

export default {
  components: {
    DataField,
    Timestamp,
  },
  props: {
    tronExplorer: undefined,
    base58: undefined,
  },
  asyncComputed: {
    async recentTransactions() {
      if(!this.base58) return undefined;
      const transactions = await this.tronExplorer.getRecentTransactions();
      if(!transactions || !transactions.data || !transactions.data.data) return undefined;
      let results = [];
      for(let i = 0; i < transactions.data.data.length; i++)
      {
        const entry = transactions.data.data[i];
        if((entry.contractData || {}).contract_address !== this.base58
          && entry.ownerAddress !== this.base58
          && entry.toAddress !== this.base58) continue;
        results.push(entry);
      }
      return results;
    },
  }
}
</script>