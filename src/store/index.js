import Vue from 'vue'
import Vuex from 'vuex'
import errorHandle from './errorHandle'
import pictureStage from './pictureStage'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default (/* { ssrContext } */) => {
  const Store = new Vuex.Store({
    modules: {
      errorHandle,
      pictureStage,
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  })

  return Store
}