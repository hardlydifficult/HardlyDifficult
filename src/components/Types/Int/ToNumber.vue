<template>
  <span>{{ prefix }}{{ includeCommas ? big.toFormat() : big.toFixed() }}</span>
</template>

<script>
export default {
  props: {
    big: undefined,
    prefix: undefined,
    includeCommas: undefined
  }
}
</script>