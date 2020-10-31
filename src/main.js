import Vue from 'vue'
import App from './App.vue'
import store from './store'
const BigNumber = require('bignumber.js');
import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed);
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import Clipboard from 'v-clipboard'
import { createProvider } from './vue-apollo'
Vue.use(Clipboard)
Vue.config.productionTip = false

import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'en', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    ja: require('date-fns/locale/ja')
  }
})

Vue.filter('number', function (value) {
  if (!value) return ''
  return new BigNumber(value).toFormat();
})

Vue.filter('date', function (value) {
  if (!value) return ''
  value = new Date(value);
  return `${value.toLocaleDateString()} ${value.toLocaleTimeString()}`;
})

Vue.filter('msDuration', function (value) {
  if (!value) return ''
  value = new BigNumber(value);
  if(value > 1000 * 60 * 60 * 24 * 2.5) // > 2.5 days
  {
    value = value.div(1000 * 60 * 60 * 24);
    return `${value.toFormat(2)} days`;
  } 
  else if(value > 1000 * 60 * 60 * 2.5) // > 2.5 hours
  {
    value = value.div(1000 * 60 * 60);
    return `${value.toFormat(2)} hrs`;
  }
  else if(value > 1000 * 60 * 2.5) // > 2.5 minutes
  {
    value = value.div(1000 * 60);
    return `${value.toFormat(2)} mins`;
  }
  else if(value > 1000 * 2.5) // > 2.5 seconds
  {
    value = value.div(1000);
    return `${value.toFormat(2)} secs`;
  }
  else if(value > 0)
  {
    return `${value.toFormat(0)} ms`;
  }
  else
  {
    return '0';
  }
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

Vue.filter('lowercase', function (value) {
  if (!value) return ''
  return value.toLowerCase();
})

Vue.filter('percent', function (value) {
  if (!value) return ''
  return `${new BigNumber(value).times(100).toFormat(2)}%`;
})

Vue.filter('toDai', function (value) {
  if (!value) return ''
  return `$${new BigNumber(value).shiftedBy(-18).toFormat(2)}`;
})

Vue.filter('address', function (value) {
  if (!value) return ''
  return `${value.substr(2, 4)}..${value.substr(value.length - 4)}`;
})

new Vue({
  store,
  // TODO add https://api.thegraph.com/subgraphs/name/f8n/f8n-xdai
  apolloProvider: createProvider({httpEndpoint: "https://blockscout.com/poa/xdai/graphiql"}),
  render: h => h(App)
}).$mount('#app')
