import { ACCESS_TOKEN } from '@/store/mutation-types'
export const state = () => ({
    menus: []
})
// getter
const getters = {
    getAllMenu: (state) => {
        let result = []
        state.menus.filter((item) => {
            result.push(item)
        })
        return result
    }
}
// mutation
const mutations = {
    setMenu: (state, payload) => {
        state.menus = payload
    }
}
// action
const actions = {
    async getMenus({ commit }) {
        var axios = require('axios')
        let header = { headers: { Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN) } }
        const data = await axios.get("http://localhost:8080/api/v1/menu-manage/get-all-menu", header)
        commit('setMenu', data.data)
    }
}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
