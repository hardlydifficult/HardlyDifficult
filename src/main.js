import Vue from 'vue'
import App from './App.vue'
import store from './store'
const BigNumber = require('bignumber.js');
import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed);
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import Clipboard from 'v-clipboard'
Vue.use(Clipboard)
Vue.config.productionTip = false

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

Vue.filter('hexToString', function (value) {
  if (!value) return ''
  let result = '';
  let charCount = 0;
  for(var i = 0; i < value.length; i += 2)
  {
    let code = parseInt(value.substr(i, 2), 16);
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
  }
  return result;
})

Vue.filter('percent', function (value) {
  if (!value) return ''
  return `${new BigNumber(value).times(100).toFormat(2)}%`;
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
