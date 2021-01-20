import { startLoading, endLoading } from '../common/util'
import { orderDetails, queryExpress } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭

export default {
  name: 'ordersDetails',
  data() {
    return {
      totalNum: 100,
      switchFlag: false, //切换 switch 的值
      orderId: '', //订单 id
      ordersDetailsData: '',
      orderStatus: {//订单状态
        0: "未支付",
        1: "已支付",
        2: "待发货",
        3: "已发货",
        4: "确认收货",
        6: "退款中",
        7: "退款失败",
        8: "退款成功",
      },
      paymentMethod: {//支付方式
        1: "现金",
        2: "余额",
        3: "网银",
        4: "支付宝",
        5: "微信",
      },
      queryExpressData: '',//物流信息
    }
  },
  // 接收父页面的值
  props: {
    // orderItem: {
    //   type: Array,
    //   default: []
    // },
  },

  methods: {
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },

    // 获取内容列表
    orderDetails() {
      startLoading()
      const reqData = {
        orderId: this.orderId,
      }
      orderDetails(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.ordersDetailsData = res.data
          // if (res.data.list.length <= 0) {
          //   this.$message({
          //     type: 'warning',
          //     message: '您还没有订单！'
          //   })
          // }
          this.queryExpress(this.ordersDetailsData.shippingSn, this.ordersDetailsData.shippingCompName)
          console.log(this.ordersDetailsData)
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

    // 获取物流信息
    queryExpress(expCode, expNo) {
      // startLoading()
      const reqData = {
        "expCode": expCode,
        "expNo": expNo
      }
      queryExpress(reqData).then(res => {
        // endLoading()
        if (res.state === 0) {
          this.queryExpressData = res.data
          console.log(this.queryExpressData)
        } else {
          this.$message({
            type: 'error',
            message: '获取物流失败，请刷新重试！'
          })
        }
      }).catch(() => {
        // endLoading()
        this.$message({
          type: 'error',
          message: '获取物流失败，请刷新重试！'
        })
      })
    },
  },

  created() {
    this.orderId = this.$route.params.id
    this.orderDetails()
  },

  mounted() {
    console.log('ordersDetails')
    console.log(this.$route.params.id)

  },

  watch: {
    // checked:function(val) {
    //   console.log(val)
    // }
  },

  components: {

  },
}
