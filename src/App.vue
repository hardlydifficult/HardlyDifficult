<template>
  <div>
    <InputTransaction />
    <h2>{{$store.state.txId}}</h2>
  </div>
</template>

<script>
import InputTransaction from './components/InputTransaction.vue'

export default {
  components: {
    InputTransaction
  }
}
</script>