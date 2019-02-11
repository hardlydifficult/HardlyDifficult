<template>
  <div>
    <UserInput />
    <CharacterCount />
    <TronTransaction />
    <DecimalTo />
    <HexTo />
  </div>
</template>

<script>
import UserInput from './components/UserInput.vue'
import TronTransaction from './components/TronTransaction.vue'
import DecimalTo from './components/DecimalTo/DecimalTo.vue'
import HexTo from './components/HexTo/HexTo.vue'
import CharacterCount from './components/CharacterCount.vue'

export default {
  components: {
    UserInput,
    CharacterCount,
    TronTransaction,
    HexTo,
    DecimalTo,
  }
}
</script>