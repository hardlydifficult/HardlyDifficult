<template>
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script>

export default {
  props: {
    value: ''
  }
}
</script>