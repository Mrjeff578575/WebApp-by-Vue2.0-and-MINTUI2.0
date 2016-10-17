import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
// import createLogger from '../../../src/plugins/logger'

import persons from './modules/persons'
import orders from './modules/orders'
import news from './modules/news'
import home from './modules/home'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        persons,
        orders,
        news,
        home
    },
    trict: debug
    // plugins: debug ? [createLogger()] : []
})