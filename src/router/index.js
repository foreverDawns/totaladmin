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
import GoodsClassManage from '../pages/goodsClassManage.vue'

// 商家管理
import Merchant from '../pages/merchant.vue'
import MerchantDetails from '../pages/merchantDetails.vue'
import TotalEvaluationManage from '../pages/totalEvaluationManage.vue'
import CouponManage from '../pages/couponManage.vue'
import Company from '../pages/company.vue'
// 积分管理
import invitePoints from '../pages/invitePoints.vue'
import signPoints from '../pages/signPoints.vue'
import secondaryDistribution from '../pages/secondaryDistribution.vue'
import integralConsumption from '../pages/integralConsumption.vue'
import obtainedbyscanning from '../pages/obtainedbyscanning.vue'
import userlevel from '../pages/userlevel.vue'
import pointsdisplay from '../pages/pointsdisplay.vue'  
import newusersget from '../pages/newusersget.vue'
// 财务管理
import Financial  from '../pages/financial.vue'


// 置换
import replacementList from '../pages/replacementList.vue'
import parameterManagement from '../pages/parameterManagement.vue'
import companyManagement from '../pages/companyManagement.vue' 

// 系统设置
// 用户管理   
import SystemManage from '../pages/systemManage.vue' 
// 角色管理
import RoleManage from '../pages/roleManage.vue' 



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
          meta: { title: "规格管理" }
        },
        {
          name: 'goodsClassManage',
          path: '/goodsClassManage',
          component: GoodsClassManage,
          meta: { title: "商品分类" }
        },
        {
          name: 'totalEvaluationManage',
          path: '/totalEvaluationManage',
          component: TotalEvaluationManage,
          meta: { title: "总评价管理" }
        },
        {
          name: 'couponManage',
          path: '/couponManage',
          component: CouponManage,
          meta: { title: "优惠券" }
        },
        {
          name: 'financial',
          path: '/financial',
          component: Financial,
          meta: { title: "财务管理" }
        },
        
        {
          name: 'signPoints',
          path: '/signPoints',
          component: signPoints,
          meta: { title: "签到积分" }
        }, {
          name: 'secondaryDistribution',
          path: '/secondaryDistribution',
          component: secondaryDistribution,
          meta: { title: "二级分销" }
        },
        {
          name: 'obtainedbyscanning',
          path: '/obtainedbyscanning',
          component: obtainedbyscanning,
          meta: { title: "扫描获得" }
        },
        {
          name: 'pointsdisplay',
          path: '/pointsdisplay',
          component: pointsdisplay,
          meta: { title: "积分展示" }
        },
        {
          name: 'integralConsumption',
          path: '/integralConsumption',
          component: integralConsumption,
          meta: { title: "积分消费" }
        },
        {
          name: 'invitePoints',
          path: '/invitePoints',
          component: invitePoints,
          meta: { title: "积分邀请" }
        },
        {
          name: 'userlevel',
          path: '/userlevel',
          component: userlevel,
          meta: { title: "用户等级" }
        },
        {
          name: 'newusersget',
          path: '/newusersget',
          component: newusersget,
          meta: { title: "新用户获得" }
        },
        {
          name: 'replacementList',
          path: '/replacementList',
          component: replacementList,
          meta: { title: "置换商品" }
        },
        {
          name: 'companyManagement',
          path: '/companyManagement',
          component: companyManagement,
          meta: { title: "置换公司管理" }
        },
        {
          name: 'parameterManagement',
          path: '/parameterManagement',
          component: parameterManagement,
          meta: { title: "置换参数管理" }
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
        { name: 'merchant', path: '/merchant', component: Merchant, meta: { title: "商家管理" } },
        { name: 'merchantDetails', path: '/merchant/:id/:type', component: MerchantDetails, meta: { title: "商家详情" } },
        { name: 'company', path: '/company', component: Company, meta: { title: "置换公司管理" } },
        { name: 'systemManage', path: '/systemManage', component: SystemManage, meta: { title: "用户管理" } },
        { name: 'roleManage', path: '/roleManage', component: RoleManage, meta: { title: "角色管理" } },
      ],
    },
    { name: 'Login', path: '/login', component: () => import('@/pages/login'), meta: { title: "登录" } },
    { path: '*', component: () => import('@/components/HelloWorld'), meta: { title: "404" } },
  ],
  mode: ""    // mode 设置为history ，去掉地址栏上的 # 号
})