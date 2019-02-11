import Vue from 'vue'
import App from './App.vue'
import store from './store'
import AsyncComputed from 'vue-async-computed'
const BigNumber = require('bignumber.js');
import TronExplorer from './logic/tron/TronExplorer.js';
const tronExplorer = new TronExplorer();

Vue.config.productionTip = false

Vue.use(AsyncComputed);

Vue.filter('trx', function (value) {
  if (!value) return ''
  return new BigNumber(value).div(1000000).toFormat() + ' TRX';
})

Vue.filter('address', function (value) {
  if (!value) return ''
  return tronExplorer.toBase58(value);
})

Vue.filter('date', function (value) {
  if (!value) return ''
  value = new Date(value);
  return `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
})

Vue.filter('titleCase', function (value) {
  if (!value) return ''
  return value.replace(
      /\w\S*/g,
      function(value) {
          return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
      }
  );
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
