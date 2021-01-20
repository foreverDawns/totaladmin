// import { checkUser } from "@/config/api.js"

// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭


export default {
  name: 'ordersItem',
  data() {
    return {
      data: 'all',
      checked: '1',
      orderStatus: {
        0: '未支付',
        1: '已支付',
        2: '待发货',
        3: '已发货',
        4: '确认收货'
      },
      checkboxAllFlag: false,//全选状态
    }
  },
  // 接收父页面的值
  props: {
    orderItem: {
      type: Array,
      default: []
    },
    checkoutFlg: {
      type: Boolean,
      default: true
    },
  },

  methods: {
    // 时间格式化
    dateFormat(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    onChangeCheckBoxVal(val, orderId) {
      console.log('复选框的值',val);
      console.log('商品id',orderId);
      let selectArr = []
      if (orderId) {
        this.orderItem.map(item => {
          if (item.orderId == orderId) {
            item.checkboxFlag = val
            
          }
        })
      } else {
        this.orderItem.map(item => {
          item.checkboxFlag = val
        })
      }

      this.orderItem.map(item => {
        if (item.checkboxFlag == true) {
          selectArr.push(item.orderId)
        }
      })
      if (this.orderItem.length != selectArr.length) {
        this.checkboxAllFlag = false
      } else {
        this.checkboxAllFlag = true
      }
      this.$forceUpdate()
      this.$emit('updatedOrderSelectData', selectArr)
    }
  },

  created() {

  },

  mounted() {
    console.log('ordersItem')
  },
  
  watch: {
    checked:function(val) {
      console.log(val)
    }
  },

  // comments: {
  //   GoodsManage,
  // }
}
