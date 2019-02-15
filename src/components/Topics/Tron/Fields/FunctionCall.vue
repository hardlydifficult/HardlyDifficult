<template>
  <span v-if="name">
    <span class="eventName">{{ name }}</span>(<span
      v-for="(param, index) in params" :key="index"><span v-if="index > 0">, </span><DataField :name="param.name" :value="param.value" :type="param.type" /></span>)
  </span>
</template>

<script>
import DataField from './DataField.vue';

export default {
  components: {
    DataField,
  },
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
