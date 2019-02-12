<template>
  <div>
    <div style="text-align:center">
      <UserInput />
      <CharacterCount />
    </div>
    <br>
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

<style lang="scss">
textarea {
  width: 90%;
  height: 3.4em;
}
ul {
  margin: 0 0 0 0;
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: rgb(206, 200, 200);
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
  }

  &[x-placement^="top"] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="bottom"] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^="right"] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^="left"] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity .15s, visibility .15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity .15s;
  }
}
</style>
