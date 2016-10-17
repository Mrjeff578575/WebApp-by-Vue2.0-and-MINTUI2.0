import * as types from '../mutation-types'

const state = {
	login_person:'',
    persons: {
        Jeff: {
            'name':'Jeff',
            'position':'总经理',
            'store':'SteelSeries赛睿专卖店',
            'phoneNumber':'13666666666',
            'call':'028-88888888',
            'email':'liu123456789@gmail.com',
            'companyName':'四川XXXX科技有限公司'
        },
        Alice: {
            'name':'Alice',
            'position':'技术总监',
            'store':'SteelSeries赛睿专卖店',
            'phoneNumber':'13666666666',
            'call':'028-88888888',
            'email':'liu123456789@gmail.com',
            'companyName':'四川XXXX科技有限公司'
        },
        Joe: {
            'name':'Joe',
            'position':'执行总裁',
            'store':'SteelSeries赛睿专卖店',
            'phoneNumber':'13666666666',
            'call':'028-88888888',
            'email':'liu123456789@gmail.com',
            'companyName':'四川XXXX科技有限公司'
        }       
    },
    currentName: 'Jeff'
}
const mutations = {
	[types.CHANGE_PERSON](state, name){
        state.currentName = name
    }
}

export default{
	state,
	mutations
}