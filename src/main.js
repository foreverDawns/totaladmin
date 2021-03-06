import Vue from 'vue'
import App from './App.vue';
import router from './router'
import ElementUI from 'element-ui';
import echarts from 'echarts'
import SkuForm from 'vue-sku-form'
import moment from 'moment' //时间插件

// 富文本编辑器 css
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 引入css
import './assets/css/reset.scss'
import './assets/css/common.scss'
// import './assets/css/mouseFollow.scss'

Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment;//赋值使用
Vue.use(SkuForm)

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  next()
})

// 注册路由全局守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('totaladmintoken')
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")