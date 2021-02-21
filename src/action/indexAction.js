import { checkUser } from "@/config/api.js"

export default {
  name: 'index',
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      currentPage: '/',
      isCollapse: false,
      tableData: Array(20).fill(item),
      menuData: [
        { id: '1', icon: 'homeIcon', authName: '首页', path: '/' },
        { id: '10', icon: 'homeIcon', authName: '商家管理', path: '/merchant' },
        { id: '9', icon: 'homeIcon', authName: '参数管理', path: '/parameterManage', children: [{ id: '9-1', authName: 'index', path: '/index22' }] },
        { id: '2', icon: 'commodityIcon', authName: '商品管理', path: '/commoditys', children: [{ id: '2-1', authName: 'index', path: '/index11' }] },
        { id: '3', icon: 'homeIcon', authName: '订单管理', path: '/orders', children: [{ id: '3-1', authName: 'index', path: '/index22' }] },
        { id: '4', icon: 'homeIcon', authName: '评价管理', path: '/evaluation', children: [{ id: '7-1', authName: 'index', path: '/index22' }] },
        { id: '5', icon: 'homeIcon', authName: '售后管理', path: '/afterSale', children: [{ id: '8-1', authName: 'index', path: '/index22' }] },
        { id: '6', icon: 'homeIcon', authName: '财务管理', path: '/home3', children: [{ id: '4-1', authName: 'index', path: '/index33' }] },
        { id: '7', icon: 'homeIcon', authName: '数据分析', path: '/home4', children: [{ id: '5-1', authName: 'index', path: '/index44' }] },
        { id: '8', icon: 'homeIcon', authName: '系统设置', path: '/home5', children: [{ id: '6-1', authName: 'index', path: '/index55' }] },

        {
          id: '11', icon: 'homeIcon', authName: '积分管理', hsaChildren: true, children: [
            { id: '11-1', icon: 'homeIcon', authName: '邀请积分', path: '/invitePoints', },
            { id: '11-2', icon: 'homeIcon', authName: '签到积分', path: '/signPoints', },
            { id: '11-3', icon: 'homeIcon', authName: '二级分销', path: '/secondaryDistribution', },
            { id: '11-4', authName: '积分消费', icon: 'homeIcon', path: '/integralConsumption' },
            { id: '11-5', authName: '用户等级', icon: 'homeIcon', path: '/userlevel' },
            { id: '11-6', authName: '新用户获得', icon: 'homeIcon', path: '/newusersget' },
            { id: '11-7', authName: '扫描获得', icon: 'homeIcon', path: '/obtainedbyscanning' },
            { id: '11-8', authName: '积分展示', icon: 'homeIcon', path: '/pointsdisplay' }]
        },
        {
          id: '12', icon: 'homeIcon', authName: '置换', hsaChildren: true, children: [
            { id: '12-1', icon: 'homeIcon', authName: '置换商品', path: '/replacementList', },
            { id: '12-2', icon: 'homeIcon', authName: '置换公司管理', path: '/companyManagement', },
            { id: '12-3', icon: 'homeIcon', authName: '置换参数管理', path: '/parameterManagement', },
          ]
        },
      ],
      currentTime: new Date().toLocaleString()
    }
  },
  
  mounted() {
    const that = this
    setInterval(function () {
      that.getCurrentTime()
    }, 1000)
  },
  methods: {
    // handleOpen(key, keyPath) {
    // },
    // handleClose(key, keyPath) {
    // },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    test() {
      console.log(this.title)
      checkUser().then((res) => {
        console.log(res)
      }).catch(res => {
        console.log(res, 123)
        this.title = '错误'
      })
    },
    // 获取当前的时间
    getCurrentTime() {
      this.currentTime = new Date().toLocaleString()
    }

  },

  computed: {
    key() {
      return this.$route.fullPath;
    },
  },

  created() {
    this.currentPage = this.$route.path
    console.log(this.currentPage)
    console.log(this.$route)
  },

}

console.log(process.env.NODE_ENV)