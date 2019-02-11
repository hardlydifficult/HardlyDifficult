import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userInput: '686f2d184dd8107500bc9128a74c0f85b4a1b64b47876275d0bf136bc963297e'
}

const store = new Vuex.Store({
  state
});

export default store;