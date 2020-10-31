<template>
  <div style="padding: 1em; display: inline-block">
    <span class="title"
      ><a
        href="https://blockscout.com/poa/xdai/address/0xE8Bfc092Df01243A3f8F6990e22454bcaF44C774"
        >NFT Market</a
      ></span
    >
    <RecentTransactions
      network="xdai"
      address="0xE8Bfc092Df01243A3f8F6990e22454bcaF44C774"
    />
  </div>
</template>

<script>
import RecentTransactions from "./RecentTransactions";

export default {
  components: {
    RecentTransactions,
  },
};
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 1.5em;
}
</style>
