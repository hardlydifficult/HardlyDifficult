<template>
  <div v-if="value && value.isString">{{ prefix }}{{ value.result.trim() }}</div>
</template>

<script>
const BigNumber = require('bignumber.js');

export default {
  props: {
    hex: undefined,
    prefix: undefined
  },
  computed: {
    value() {
      if(!this.hex) return '';
      let result = '';
      let maxCharCount = 0;
      let charCount = 0;
      for(var i = 0; i < this.hex.length; i += 2)
      {
        let code = parseInt(this.hex.substr(i, 2), 16);
        if(code >= 32 && code <= 126)
        {
          result += String.fromCharCode(code);
          charCount++;
        }
        else if(charCount > 0)
        {
          result += String.fromCharCode(0);
          charCount = 0;
        }
        maxCharCount = Math.max(maxCharCount, charCount);
      }
      return {isString: maxCharCount >= 3 || maxCharCount >= result.length - 1, result};
    }
  }
}
</script>