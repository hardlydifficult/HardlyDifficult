<template>
  <div>
  <div v-for="t in test" v-bind:key="t.name">
    {{t.name}}
  </div>

  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  props: {
    address: undefined,
  },
  apollo: {
    test: gql`query {
      test: brands { name }
      }`
  },
  data: function() {
    return {
      test: undefined
    }
  },
  // async mounted() {
  //     try {
  //       const { data } = await this.$apollo.query({
  //         query: gql`{
  //           brands {name}
  //         }`,
  //       });
  //       this.test = data;
  //     } catch (error) {
  //       console.error("Error while pulling data from the subgraph:", error);
  //     }
  //   },
  components: {
  },
  computed: {

  },
//   asyncComputed: {
//     async hello() {
//       console.log(await this.$apollo.query( {
//         query: gql`{
//   brands {
//     name
//   }
// }
// `
//       }));
//     }
//   }
}
</script>