<template>
  <div class="inline">
    <span class="title fnd"
      ><a :href="'https://blockscout.com/poa/xdai/address/' + address">{{
        title.toUpperCase()
      }}</a></span
    >
    <span v-if="contractTransactions">
      <span
        class="small"
        style="padding-left: 0.8em"
        v-if="contractTransactions.fetchedCoinBalance != '0'"
      >
        {{ contractTransactions.fetchedCoinBalance | toDai }}
      </span>
      <br />
      <div v-for="t in transactions" v-bind:key="t.hash">
        <Transaction :tx="t" />
      </div>
    </span>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { toTx } from "../../logic/foundation/ToTx";
import Transaction from "./Transaction";

export default {
  props: {
    address: undefined,
    title: undefined,
  },
  components: {
    Transaction,
  },
  apollo: {
    contractTransactions: {
      query: gql`
        query($address: AddressHash!) {
          contractTransactions: address(hash: $address) {
            fetchedCoinBalance
            transactions(first: 20) {
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
        }
      `,
      pollInterval: 15000,
      variables() {
        return {
          address: this.address,
        };
      },
      client: "xdai",
    },
  },
  data: function () {
    return {
      contractTransactions: undefined,
    };
  },
  asyncComputed: {
    transactions() {
      if (!this.contractTransactions) return [];
      return Promise.all(
        this.contractTransactions.transactions.edges.map((t) => toTx(t))
      );
    },
  },
};
</script>

<style scoped>
.small {
  font-size: 0.8em;
}
</style>
