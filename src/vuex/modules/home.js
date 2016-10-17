import * as types from '../mutation-types'

const state = {   
    popupVisible: false
}

const mutations = {
    [types.CHANGE_POP](state){
        state.popupVisible = !state.popupVisible
    }
}