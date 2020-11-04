<template>
  <div v-if="balance">
    <a :href="'https://blockscout.com/poa/xdai/address/' + address">
      <span
        class="small"
        :style="
          'padding-left: 0.8em;' +
          (balance.fetchedCoinBalance != '0' ? '' : 'color: lightgrey;')
        "
      >
        {{ name }}: {{ balance.fetchedCoinBalance | toDai }}
      </span>
    </a>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  props: {
    address: undefined,
    name: undefined,
  },
  apollo: {
    balance: {
      query: gql`
        query($address: AddressHash!) {
          balance: address(hash: $address) {
            fetchedCoinBalance
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
      balance: undefined,
    };
  },
};
</script>

<style scoped>
.small {
  font-size: 0.8em;
}
</style>
