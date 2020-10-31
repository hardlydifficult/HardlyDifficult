<template>
  <div v-if="test">
  <div>
  {{test.fetchedCoinBalance | toDai }} TVL
  </div>
  <br />
  <div v-for="t in transactions" v-bind:key="t.hash">
  <Transaction :tx="t" />
  </div>

  </div>
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