import { startLoading, endLoading } from '../common/util'
import { orderManagement } from "@/config/api.js"

// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭

import OrdersItem from "../components/componentsPages/ordersItem.vue"

export default {
  name: 'orders',
  data() {
    return {
      activeName: 'all',
      pageIndex: 1,
      pageSize: 10,
      supplierId: 1,//店铺id
      loading: false,
      searUser: {},
      ordersData: [
        // {
        //   image: 'goodsImg',
        //   checkboxFlag: false,
        //   orderTime: '2020/9/28 下午2:11:42',
        //   orderId: '9898586',
        //   title: '秋冬羊毛帽子女毛线贝雷帽套',
        //   specification: '黑色',
        //   number: '3',
        //   price: '999.9',
        //   status: '发货',//1,2,3
        //   receiptInfo: {
        //     name: '牛牛牛魔王',
        //     phone: '13666666666'
        //   },
        // },
        // {
        //   image: 'goodsImg',
        //   checkboxFlag: true,
        //   orderTime: '2020/9/28 下午2:11:42',
        //   orderId: '98985816',
        //   title: '秋冬羊毛帽子女毛线贝雷帽套',
        //   specification: '黑色',
        //   number: '3',
        //   price: '999.9',
        //   status: '发货',//1,2,3
        //   receiptInfo: {
        //     name: '牛牛牛魔王',
        //     phone: '13666666666'
        //   },
        // }

      ],
      ordersTotal: 0,
    }
  },
  methods: {
    // 时间格式化
    dateFormat(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
    },

    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.orderManagement();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.orderManagement();
    },
    // 获取内容列表
    orderManagement() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        supplierId: this.supplierId
      }
      orderManagement(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.ordersData = res.data.list
          this.ordersTotal = res.data.total
          if (res.data.list.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还没有订单！'
            })
          }
          console.log(this.goodsLists)
        } else {
          this.$message({
            type: 'error',
            message: '请求失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      })
    },
    // 监听tabs 变化
    handleClick(tab, event) {
      console.log(tab.name, event);
    },
    // 分页数据
    select_user() {
      this.loading = true;
      this.searUser.currentPage = this.currentPage;
      this.searUser.pageSize = this.pageSize;
      console.log('分页数据=>', this.searUser)
      // this.$axios.get('/api/users/search', { params: this.searUser })
      //   .then(res => {
      const that = this
      setTimeout(function () {
        that.loading = false;
        console.log('loading status =>', that.loading)

      }, 400)
      //     window.console.log(JSON.stringify(res));

      //     this.tableData = res.data.records;

      //     this.total = res.data.total;

      //   }).catch(err => {
      //     this.loading = false;
      //     this.$message.error(err);
      //   });
    },
    // 每页多少条
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`每页 ${val} 条`);
      this.select_user();
    },
    // 当前页
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`当前页: ${val}`);
      this.select_user();
    },
  },
  created() {
    this.orderManagement()
  },

  components: {
    OrdersItem,
  },
  mounted() {
    console.log('orders')
    // console.log($router.params.checkboxFlg)
  },

  // comments: {
  //   GoodsManage,
  // }
}
