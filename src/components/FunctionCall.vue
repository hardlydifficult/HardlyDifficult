<template>
  <div v-if="name">
    <span class="eventName">{{ name }}</span>
    (<span v-for="(param, index) in params" :key="param.value"><span v-if="index > 0">, </span>{{ param.value }}</span>)
  </div>
</template>

<script>
export default {
  props: {
    name: undefined,
    params: undefined
  },
}
</script>

<style>
.eventName {
  font-weight: bold;
}
</style>
