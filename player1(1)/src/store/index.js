import Vue from "vue";
import VueX from 'vuex';
import modulesX from './modulesX'

//挂载Vuex
Vue.use(VueX)


//创建Vuex 对象
const store = new VueX.Store({
    modules: {
        modulesX
    }
})
export default store