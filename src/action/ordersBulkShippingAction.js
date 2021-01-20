import { startLoading, endLoading } from '../common/util'
import { orderManagement } from "@/config/api.js"

import OrdersItem from "../components/componentsPages/ordersItem.vue"

export default {
  name: 'ordersBulkShipping',
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      supplierId: 1,//店铺id
      loading: false,
      ordersData: [],
      ordersTotal: 0,
      selectValueArr: [], //选中的值
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
        supplierId: this.supplierId,
        status: 2
      }
      orderManagement(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
         
          if (res.data.list.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还没有待发货订单！'
            })
            return
          }
          this.ordersData = res.data.list
          this.ordersTotal = res.data.total
          this.ordersData.map(item => {
            item.checkboxFlag = false
          })
          console.log(this.goodsLists)
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
          message: '请求失败，请刷新重试！'
        })
      })
    },
    //全部发货按钮 
    onShip() {
      this.$confirm('确定发送所有商品吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '发货成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发货'
        });
      });
    },

    updatedOrderSelectData(data) {
      console.log('选中的值',data)
      this.selectValueArr = data
    },

  },

  created() {
    this.orderManagement()
  },

  mounted() {
    console.log('ordersBulkShipping')
  },

  watch: {
    // checked:function(val) {
    //   console.log(val)
    // }
  },

  components: {
    OrdersItem,
  },
}
