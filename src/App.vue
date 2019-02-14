<template>
  <div>
    <div style="text-align:center">
      <InputTextArea :value="trimmedInput" />
      <CharacterCount :value="trimmedInput" />
    </div>
    <br>
    <Tron :value="trimmedInput" network="mainnet" />
    <Tron :value="trimmedInput" network="shasta" />
    <div class="topicBox">
      <div class="topicHeader">
        Type conversions
      </div>
      <IntegerTo :value="trimmedInput" />
      <HexTo :value="trimmedInput" />
    </div>
  </div>
</template>

<script>
import InputTextArea from './components/Input/TextArea.vue'
import CharacterCount from './components/Types/String/CharacterCount.vue'
import IntegerTo from './components/Types/Int/IntTo.vue'
import HexTo from './components/Types/Hex/HexTo.vue'
import Tron from './components/Topics/Tron/Tron.vue'

export default {
  components: {
    InputTextArea,
    CharacterCount,
    Tron,
    HexTo,
    IntegerTo,
  },
  computed: {
    trimmedInput() {
      const input = this.$store.state.userInput.trim();
      window.location.hash = input;
      return input;
    }
  },
  mounted: function() {
    const updateHash = () => {
      if(!window.location.hash || window.location.hash.length < 1) return;
      this.$store.state.userInput = window.location.hash.substr(1);
    };
    window.addEventListener('hashchange', updateHash);
  },
}



</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Mono|Open+Sans');
body {
  font-family: 'Open Sans', sans-serif;
}
textarea {
  width: 90%;
  height: 3.4em;
}
ul {
  margin: 0 0 0 0;
}
.elipse {
  font-family: sans-serif;
  font-size: .5em;
}
.details {
  font-size: .6em;
  margin-left: 1em;
}
.topicBox {
  border: 1px solid green;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin-bottom: 1em;
}
.tab {
  margin-left: 1em;
}
.topicHeader {
  font-size: 1.25em;
}
a {
  text-decoration: none;
  color: black;
}
a:hover {
  text-decoration: underline;
  color: blue;
}
a:active {
  color: red;
}


.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
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
