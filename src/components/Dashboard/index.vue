<template>
  <div style="padding: 1em">
    <span class="bold">NFT Market</span>
    <RecentTransactions network="xdai" address="0xE8Bfc092Df01243A3f8F6990e22454bcaF44C774" />
  </div>
</template>

<script>
import RecentTransactions from './RecentTransactions';

export default {
  components: {
    RecentTransactions
  }
}
</script>

<style scoped>
.bold {
  font-weight: 600;
}
</style>