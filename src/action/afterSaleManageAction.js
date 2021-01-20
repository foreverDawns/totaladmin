import { startLoading, endLoading } from '../common/util'
import { afterSaleManagement } from "@/config/api.js"

// import GoodsManage from '../pages/goodsManage.vue'
// status
// all 全部
// toBeProcessed 待处理
// picking 拣货中
// shipped 已发货
// completed 已完成
// closed 已关闭

import OrdersItem from "../components/componentsPages/ordersItem.vue"

export default {
  name: 'afterSaleManage',
  data() {
    return {
      activeName: 'all',
      listDataArr: [],
      evaluationTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      supplierId: 1,//店铺id
      serverStatus: '',//售后状态
      serverStatusArr: [{ //1 退货退款   2只退款  3换货品
        value: '1',
        label: '退款退货'
      }, {
        value: '2',
        label: '仅退款'
      }, {
        value: '3',
        label: '仅换货'
      }],
      serverStatusSearchData: {
        1:'退货退款', 
        2: '只退款',
        3: '换货品'
      },
      refundSn: '',//售后编号
      productName: '',//商品名称
      orderStatus: '',//发货状态
      orderStatusArr: [{ //2：待发货  3：已发货
        value: '2',
        label: '待发货'
      }, {
        value: '3',
        label: '已发货'
      }],
      orderStatusSearchData: {
        2: '待发货',
        3: '已发货',
      },
      paymentMoney: '',//最小退款金额
      endPaymentMoney: '',//最大退款金额
      afterSaleTime: [],
      createTime: '',//申请开始日期
      endCreateTime: '',//申请结束日期
      loading: false,
      searUser: {},
      timeValue: '',
      optionValue: "",
      statusOptions: [{
        value: '0',
        label: '未处理'
      }, {
        value: '1',
        label: '已处理'
      }],
      phoneNumber: '',
      nameStr: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  methods: {
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    
    onSelectTime(e) {
      this.afterSaleTime = e
    },
    // 分页
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.afterSaleManagement();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.afterSaleManagement();
    },

    // 获取评价内容列表
    afterSaleManagement() {
      if (this.paymentMoney > this.endPaymentMoney) {
        this.$message({
          type: 'warning',
          message: '最小金额大于最大金额，请重新输入！'
        })
        return
      }
      startLoading()
      const reqData = {
        supplierId: this.supplierId,
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        serverStatus: this.serverStatus,//售后状态
        refundSn: this.refundSn,//售后编号
        productName: this.productName,//商品名称
        orderStatus: this.orderStatus,//发货状态
        paymentMoney: this.paymentMoney,//最小退款金额
        endPaymentMoney: this.endPaymentMoney,//最大退款金额
        createTime: this.afterSaleTime[0],//申请开始日期
        endCreateTime: this.afterSaleTime[1],//申请结束日期
      }
      afterSaleManagement(reqData).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.listDataArr = res.data.list
          this.evaluationTotal = res.data.total
          console.log(this.listDataArr)
          if (res.data.list.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还没有售后信息！'
            })
            return
          }
          console.log(this.listDataArr)
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

    // 情况条件搜索
    clearConfigData() {
      this.serverStatus= ''//售后状态
      this.refundSn= ''//售后编号
      this.productName= ''//商品名称
      this.orderStatus= ''//发货状态
      this.paymentMoney= ''//最小退款金额
      this.endPaymentMoney= ''//最大退款金额
      this.afterSaleTime= []
      this.createTime= ''//申请开始日期
      this.endCreateTime= ''//申请结束日期
    },

    // 监听tabs 变化
    handleClick(tab, event) {
      console.log(tab.name, event);
    },

  },
  created() {
    this.afterSaleManagement()
  },

  components: {
    OrdersItem,
  },
  mounted() {
    console.log('afterSaleManage')
    // console.log($router.params.checkboxFlg)
  },

  // comments: {
  //   GoodsManage,
  // }
}
