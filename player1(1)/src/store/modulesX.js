const modulesX = {
    namespaced: true,
    state: {
        // temp: 'abcd'
        sum: 0,
        query: '',
        school: '南华',
        class:'移动1班',
        zy: '水产养殖',
        admin: '',
        password:''
    },

    mutations: {
        JIA(state, value) {
            state.sum += value
        },
        JIAN(state, value) {
            state.sum -= value
        },
        JIADD(state, value) {
            if (state.sum % 2 != 0) {
                state.sum += value
            }
        },
        WAITADD(state, value) {
            setTimeout(() => {
                state.sum += value
            }, 500);
        },
        getQuery(state, value) {
            state.query = value
        },
        getAdmin(state, value) {
            state.admin = value
        },
        getpassword(state, value) {
            state.password = value
        },
    },

    actions: {
        JIA(context, value) {
            context.commit('JIA', value)
        },
        JIAN(context, value) {
            context.commit('JIAN', value)
        },
        jiadd(context, value) {
            context.commit('JIADD', value)
        },
        waitadd(context, value) {
            context.commit('WAITADD', value)
        },
        getQuery(context, value) {
            context.commit('getQuery', value)
        },
        getAdmin(context, value) {
            context.commit('getAdmin', value)
        },
        getpassword(context, value) {
            context.commit('getpassword', value)
        },


    },
    getters: {
        changeSum(state) {
            return state.sum * 10
        }
    }
}
export default modulesX