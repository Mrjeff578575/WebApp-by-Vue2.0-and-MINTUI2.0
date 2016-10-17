import * as types from '../mutation-types'

const state = {
	news:{},
    orders_status: '成功',
	selected:'首页'
}

const mutations = {
	[types.SYNCHRO_ORDER](state, items){
        state.news = items
        console.log(state.news.length)
        if(state.news.length != 0){
            state.orders_status = '成功'
        }
        else{
            state.orders_status = '失败'
        }
    },
    [types.CHANGE_SELECTED](state, item){
        state.selected = item
    }
}

export default{
	state,
	mutations
}