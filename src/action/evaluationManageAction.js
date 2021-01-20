import { startLoading, endLoading } from '../common/util'
import { goodsEvaluationList } from "@/config/api.js"

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
  name: 'evaluationManage',
  data() {
    return {
      activeName: 'all',
      evaluationLists: [],
      evaluationTotal: '',
      pageIndex: 1,
      pageSize: 10,
      orderSn: '',
      productName: '',
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
      this.timeValueOne = e
    },
    // 分页
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.goodsEvaluationList();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.goodsEvaluationList();
    },

    // 获取评价内容列表
    goodsEvaluationList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        orderSn: this.orderSn,
        productName: this.productName,
      }
      goodsEvaluationList(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.evaluationLists = res.data.list
          this.evaluationTotal = res.data.total
          if (res.data.list.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还没有产品！'
            })
          }
          console.log(this.evaluationLists)
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
      this.orderSn = ''
      this.productName = ''
    },

    // 监听tabs 变化
    handleClick(tab, event) {
      console.log(tab.name, event);
    },

  },
  created() {
    this.goodsEvaluationList()
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
