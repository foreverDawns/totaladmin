import { startLoading, endLoading } from '../../common/util'
import { commentAudit } from "@/config/api.js"


export default {
  name: 'evaluationDetailsItem',
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
    operation: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    // 同意或者拒绝
    commentAudit(id, status) {
      startLoading()
      const reqData = {
        evaluationId: id,
        status: status,
      }
      commentAudit(reqData).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.$message({
            type: 'success',
            message: '提交成功！'
          })
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
          message: '请求失败,请刷新重试！'
        })
      })
    },
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
    },
    // 拒绝/同意
    onOperation(id, status) { //status: 3拒绝，2同意
      console.log(id, status)
      if (status === 2) {
        this.content = '同意'
      } else {
        this.content = '拒绝'
      }
      this.$confirm(`此操作将${this.content}当前商家的申述, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        endLoading()
        this.commentAudit(id, status)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${this.content}`
        });
      });
    },
  },

  created() {

  },

  mounted() {
    console.log('evaluationDetailsItem')
  },
  
  watch: {
    checked:function(val) {
      console.log(val)
    },
    orderItem:function(val) {
      console.log(val,12312323123)
    },
  },

  // comments: {
  //   GoodsManage,
  // }
}
