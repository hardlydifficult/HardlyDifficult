import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  txId: 'silly default'
}

export default new Vuex.Store({
  state
})