import * as types from './mutation-types'

export const changePerson = ({commit}, name) => {
	commit(types.CHANGE_PERSON, name)
}

export const changePop = ({commit}) => {
	commit(types.CHANGE_POP)
}

export const changeOrder = ({commit}, item) => { //改变订单
    commit(types.CHANGE_ORDER, {item})
}

export const changeStatus = ({commit}, item) => { //改变订单的入库和未入库状态
    commit(types.CHANGE_STATUS, item)
}

export const changeSelected = ({commit}, item) => {
    commit(types.CHANGE_SELECTED, item)
}

export const synchroOrder = ({commit}, that) => {
    const url = 'http://apis.baidu.com/txapi/weixin/wxhot?num=10&rand=1&word=%E7%9B%97%E5%A2%93%E7%AC%94%E8%AE%B0&page=1&src=%E4%BA%BA%E6%B0%91%E6%97%A5%E6%8A%A5'
    const options = {
        'url': url,
        'method':'GET',
        'params':{
            'num': 50,
            'rand': 1,
            'word': '大疆',
            'src' : '人民日报'
        },
        'headers':{
            'apikey':'2ff8a937112606bdb6b2f56dcc509900'
        }
    }
    that.$http.get(url, options).then(function(response){
        let newslist = response.data.newslist
        commit(types.SYNCHRO_ORDER, newslist)
    }, function(){
        commit(types.SYNCHRO_ORDER, '')
        console.log('同步失败')
    })
}