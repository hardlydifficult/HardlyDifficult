<template>
  <pre>
    {{ JSON.stringify(transactionsTo, null, 2) }}
    {{ JSON.stringify(transactionsFrom, null, 2) }}
  </pre>
</template>

<script>
export default {
  props: {
    tronExplorer: undefined,
    base58: undefined,
  },
  asyncComputed: {
    async transactionsTo() {
      if(!this.base58) return undefined;
      //return await this.tronExplorer.getTransactionsTo(this.base58);
    },
    async transactionsFrom() {
      if(!this.base58) return undefined;
      //return await this.tronExplorer.getTransactionsFrom(this.base58);
    },
  }
}
</script>