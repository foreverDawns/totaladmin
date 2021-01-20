import {startLoading, endLoading } from '../common/util'
import { shippingManagement, shippingOrder } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭

export default {
  name: 'ordersSend',
  data() {
    return {
      totalNum: 100,
      orderId: '', //订单 id
      supplierId: '1', //商家 id
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
      logisticsValue: '',//物流
      logisticsOption: [{
        value: '1',
        label: '京东'
      }, {
        value: '2',
        label: '顺丰'
      },],
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

    // 获取内容
    shippingManagement() {
      startLoading()
      const reqData = {
        orederIds: [this.orderId],
        supplierId: this.supplierId,
      }
      shippingManagement(reqData).then(res => {
        endLoading()
        console.log(res.data)
        if (res.state === 0) {
          this.ordersDetailsData = res.data
          // if (res.data.list.length <= 0) {
          //   this.$message({
          //     type: 'warning',
          //     message: '您还没有订单！'
          //   })
          // }
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
    // 发货
    shippingOrder() {
      startLoading()
      const reqData = {
        orederIds: [this.orderId],
        shippingCompName: this.logisticsValue,
      }
      shippingOrder(reqData).then(res => {
        endLoading()
        console.log(res.data)
        if (res.state === 0) {
          this.$message({
            type: 'success',
            message: '成功发货！'
          })
          setTimeout(() => {
            this.$router.push({name: 'orders'})
          }, 1000)
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '发货失败，请重试！'
        })
      })
    },
  },

  created() {
    this.orderId = this.$route.params.id
    this.shippingManagement()
  },

  mounted() {
    console.log('ordersSend')
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
