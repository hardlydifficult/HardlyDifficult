<template>
  <div>
    <UserInput />
    <TronTransaction />
  </div>
</template>

<script>
import UserInput from './components/UserInput.vue'
import TronTransaction from './components/TronTransaction.vue'

export default {
  components: {
    UserInput,
    TronTransaction
  }
}
</script>