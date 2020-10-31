<template>
  <span v-if="test">
  <span class="small">
    -- {{test.fetchedCoinBalance | toDai }} TVL
  </span>
  <br />
  <div v-for="t in transactions" v-bind:key="t.hash">
    <Transaction :tx="t" />
  </div>
  </span>
</template>

<script>
import gql from 'graphql-tag'
import {toTx} from '../../logic/foundation/NFTMarket'
import Transaction from './Transaction';

export default {
  props: {
    address: undefined,
  },
  components: {
    Transaction
  },
  apollo: {
    test: {
      query: gql`query($address: AddressHash!) {
      test: address(hash: $address) {
        fetchedCoinBalance,
        transactions (first: 10) {
          edges {
            node {
              error
              input
              value
              fromAddressHash
              hash
              blockNumber
            }
          }
        }
      }
    }`,
    pollInterval: 5000, variables() {
      return {
        address: this.address
      }
    }
    }
  },
  data: function() {
    return {
      test: undefined
    }
  },
  asyncComputed: {

    transactions() {
      if(!this.test) return [];
      return Promise.all(this.test.transactions.edges.map((t) => toTx(t)));
        //return this.test.transactions.edges.map(toTx);
    }
  }
}
</script>

<style scoped>
.small {
  font-size: .75em;
}
.inline {
  display: inline-block;
}
</style>