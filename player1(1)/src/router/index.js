//路由管理
import Vue from 'vue'
import Route from 'vue-router'
// view
import discovery from 'views/01.discovery.vue'
import playlists from 'views/02.playlists.vue'
import songs from 'views/03.songs.vue'
import mvs from 'views/04.mvs.vue'
import result from 'views/05.result.vue'
import playlist from 'views/06.playlist.vue'
import mv from 'views/07.mv.vue'
import home from 'components/home.vue'
import counter from 'views/counter.vue'
import login from 'views/MyLogin.vue'

//导入需要登录才能访问的地址 数组paths 
import paths from './paths'

Vue.use(Route)

const router = new Route({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: login
        },

        {
            path: '/home',
            component: home,
            redirect: '/home/discovery',
            children: [{
                    path: 'discovery',
                    component: discovery
                },
                {
                    path: 'playlists',
                    component: playlists
                },
                {
                    path: 'songs',
                    component: songs
                },
                {
                    path: 'mvs',
                    component: mvs
                },
                {
                    path: 'result',
                    component: result
                },
                {
                    path: 'playlist',
                    component: playlist
                },
                {
                    path: 'mv',
                    component: mv
                },
                {
                    path: 'counter',
                    component: counter
                },
            ]
        },



    ]
})

//导航前置守卫
router.beforeEach((to, from, next) => {
    //to.Path：得到当前正在运行的路由地址
    // console.log("to==>", to.path.indexOf('/home'));
    //获取localStorage 的值
    if (paths.indexOf(to.path) != -1) {
        const _token = localStorage.getItem('_token')
            // console.log(_token);
        if (_token) {
            next()
        } else {
            //没有登录，则返回登录界面
            next('/login')
        }
    }
    next()

})

export default router