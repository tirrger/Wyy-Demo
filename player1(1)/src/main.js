import Vue from 'vue'
import App from './App.vue'

//导入路由
import router from './router'
//导入vuex 中的store仓库
import store from './store'

//导入 axios 
import axios from 'axios'
//将 axios 变成vue属性
Vue.prototype.$axios = axios
    // 将api接口设置为默认    
axios.defaults.baseURL = '/api'
    // 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'



// 插件 Element-ui
Vue.use(ElementUI)


// 导入全局初始化样式
import './assets/index.css'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    // 挂载到Vue示例上
    router,
    store,
    beforeCreate() {
        //全局总线
        Vue.prototype.$bus = this
    },

}).$mount('#app')