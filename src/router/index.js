/*
* 路由对象模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'


/*引入pages*/
// import HelloWorld from '../components/HelloWorld.vue'
import Index from '@/pages/index.vue'
import Home from '@/pages/home.vue'
import Commoditys from '@/pages/commoditys.vue'
import GoodsManage from '@/pages/goodsManage.vue'
import GoodsAddAndEdit from '@/pages/goodsAddAndEdit.vue'
import GoodsClass from '@/pages/goodsClass.vue'
import GoodsStock from '@/pages/goodsStock.vue'
import OrdersShell from '@/pages/ordersShell.vue'
import OrdersManage from '@/pages/ordersManage.vue'
// import OrdersBulkShipping from '@/pages/ordersBulkShipping.vue'
import OrdersDetails from '@/pages/ordersDetails.vue'
import OrdersSend from '@/pages/ordersSend.vue'
import EvaluationShell from '../pages/evaluationShell.vue'
import EvaluationManage from '../pages/evaluationManage.vue'
import EvaluationDetails from '../pages/evaluationDetails.vue'
import AfterSaleShell from '../pages/afterSaleShell.vue'
import AfterSaleManage from '../pages/afterSaleManage.vue'
import AfterSaleDetails from '../pages/afterSaleDetails.vue'
import ParameterManage from '../pages/parameterManage.vue'
// 商家管理
import Merchant from '../pages/merchant.vue'

//申明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    // { 
    //   name: 'HelloWorld',
    //   path:'/test',
    //   component: HelloWorld,
    //   meta: {
    //     showFooter: true
    //   }
    // },
    {
      name: 'index',
      path: '/',
      component: Index,
      meta: {
        showFooter: true
      },
      children: [

        { name: 'home', path: '/', component: Home, children: [] },
        {
          name: 'commoditys',
          path: '/commoditys',
          component: Commoditys,
          children: [
            { name: 'goodsManage', path: '/commoditys', component: GoodsManage },
            { name: 'goodsAddAndEdit', path: '/goodsEdit/:id', component: GoodsAddAndEdit },
            { name: 'goodsClass', path: '/goodsClass', component: GoodsClass },
            { name: 'goodsStock', path: '/goodsStock', component: GoodsStock },
          ]
        },
        {
          name: 'ordersShell',
          path: '/orders',
          component: OrdersShell,
          children: [
            { name: 'orders', path: '/orders', component: OrdersManage },
            // { name: 'ordersBulkShipping', path: '/ordersShipping', component: OrdersBulkShipping },
            { name: 'ordersDetails', path: '/ordersDetails/:id', component: OrdersDetails },
            { name: 'ordersSend', path: '/ordersSend/:id', component: OrdersSend },
          ]
        },
        {
          name: 'evaluation',
          path: '/evaluation',
          component: EvaluationShell,
          children: [
            { name: 'evaluationManage', path: '/evaluation', component: EvaluationManage },
            { name: 'evaluationDetails', path: '/evaluationDetails/:id', component: EvaluationDetails },
          ]
        },
        {
          name: 'parameterManage',
          path: '/parameterManage',
          component: ParameterManage,
          meta: { title: "商品参数管理" }
        },
        {
          name: 'afterSale',
          path: '/afterSale',
          component: AfterSaleShell,
          children: [
            { name: 'afterSaleManage', path: '/afterSale', component: AfterSaleManage },
            { name: 'afterSaleDetails', path: '/afterSaleDetails/:id', component: AfterSaleDetails },
          ]
        },
        {
          name: 'merchant',
          path: '/merchant',
          component: Merchant,
        },

      ],
    },
    { name: 'Login', path: '/login', component: () => import('@/pages/login'), meta: { title: "登录" } },
    { path: '*', component: () => import('@/components/HelloWorld'), meta: { title: "404" } },
  ],
  mode: "history"    // mode 设置为history ，去掉地址栏上的 # 号
})