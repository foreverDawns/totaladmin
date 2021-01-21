import { sellerDetail, sellerOrderList, commentsList, auditCommentsList } from "@/config/api.js"
import { startLoading, endLoading } from '../common/util'
import OrderDetailsItem from "../components/componentsPages/orderDetailsItem.vue"
import EvaluationDetailsItem from "../components/componentsPages/evaluationDetailsItem.vue"
export default {
  name: 'merchantDetails',
  data() {
    return {
      addYRConDialogVisible: false,
      detailsData: '', //详情
      ordersData: '', // 订单
      evaluationData: '',// 评价
      representationData: '',// 申述
      totalNum: '0',
      pageIndex: 1,
      pageSize: 10,
      pageIndexTwo: 1,
      pageSizeTwo: 10,
      content: '',
      orderActiveName: "0",
      orderStatus: 0,// 订单状态 0 全部 1 待处理 2 已发货 3 已完成 4 已关闭
      commentState: 0,// 订单状态 0 全部 1 好评 2中评 3 差评 4申述
      evaluationActiveName: "0",
      sellerId: "",//商家id
      type: '',//1：详情 2.订单 3：评价
      titleArr: {
        1: "商家信息",
        2: "订单信息",
        3: "评价信息",
      },
      titleCon: '',
    }
  },
  // props: ['changeValue'],
  methods: {
    // 添加黄河专题内容弹框切换
    onAddCon() {
      this.addYRConDialogVisible = !this.addYRConDialogVisible
      console.log(this.addYRConDialogVisible)
    },
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    //获取时间间隔
    onSelectTime(e) {
      this.timeValueOne = e
    },
    // 分页
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      if (this.type == 2) {
        this.sellerOrderList()
      } else {
        this.commentsList()
      }
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      if (this.type == 2) {
        this.sellerOrderList()
      } else {
        this.commentsList()
      }
    },
    // 分页
    pageChangeTwo(pageIndex) {
      this.pageIndexTwo = pageIndex;
      if (this.type == 3 && this.evaluationActiveName != 4) {
        this.commentsList()
      }
      if (this.type == 3 && this.evaluationActiveName == 4) {
        this.auditCommentsList()
      }
    },
    // 分页
    pageSizeChangeTwo(pageSize) {
      this.pageIndexTwo = 1;
      this.pageSizeTwo = pageSize;
      if (this.type == 3 && this.evaluationActiveName != 4) {
        this.commentsList()
      }
      if (this.type == 3 && this.evaluationActiveName == 4) {
        this.auditCommentsList()
      }
    },

    // 初始化数据
    initPage() {
      startLoading()
      Promise.all([this.sellerDetail(), this.sellerOrderList(), this.commentsList(), this.auditCommentsList() ]).then(() => {
        if (this.goodsId && this.goodsId !== 'add') {
          this.getGoodsDetails()
        } else {
          endLoading()
        }

      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      });
    },
    // 获取商家信息
    sellerDetail() {
      return new Promise((resolve, reject) => {
        sellerDetail({ sellerId: this.sellerId }).then(res => {
          if (res.state === 0) {
            this.detailsData = res.data
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取信息失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取信息失败，请刷新重试！'
          })
          reject()
        })
      });
    },

    // 获取商家订单
    sellerOrderList() {
      return new Promise((resolve, reject) => {
        const reqData = {
          pageSize: this.pageSize,
          pageNum: this.pageIndex,
          orderStatus: this.orderStatus,
          sellerId: this.sellerId
        }
        sellerOrderList(reqData).then(res => {
          if (res.state === 0) {
            this.ordersData = res.data
            console.log(this.ordersData)
            resolve()
          } else {
            this.$message({
              type: 'error',
              message: '获取订单失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '获取订单失败，请刷新重试！'
          })
          reject()
        })
      });
    },
    // 获取商家评价列表
    commentsList() {
      // startLoading()
      return new Promise((resolve, reject) => {
        const reqData = {
          pageSize: this.pageSizeTwo,
          pageNum: this.pageIndexTwo,
          commentState: this.commentState,
          sellerId: this.sellerId
        }
        commentsList(reqData).then(res => {
          if (res.state === 0) {
            this.evaluationData = res.data
            resolve()
          } else {
            // endLoading()
            this.$message({
              type: 'error',
              message: '获取评价失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          // endLoading()
          this.$message({
            type: 'error',
            message: '获取评价失败，请刷新重试！'
          })
          reject()
        })
      });
    },
    // 获取商家申述评价列表
    auditCommentsList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSizeTwo,
        pageNum: this.pageIndexTwo,
        commentState: 0,
        sellerId: this.sellerId
      }
      return new Promise((resolve, reject) => {
        auditCommentsList(reqData).then(res => {
          endLoading()
          if (res.state === 0) {
            this.representationData = res.data
            console.log(res.data)
            resolve()
          } else {
            endLoading()
            this.$message({
              type: 'error',
              message: '获取申述评价失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          endLoading()
          this.$message({
            type: 'error',
            message: '获取申述评价失败，请刷新重试！'
          })
          reject()
        })
      });
    },

    // 监听tabs 变化
    handleClick(tab) {
      console.log(tab.name);
      this.pageIndex = 1
      this.pageSize = 10
      this.orderActiveName = tab.name
      this.orderStatus = tab.name
      this.sellerOrderList()
    },

    evaluationHandleClick(tab) {
      console.log(tab.name);
      this.pageIndexTwo = 1
      this.pageSizeTwo = 10
      this.evaluationActiveName = tab.name
      this.commentState = tab.name
      // this.sellerOrderList()
      if (tab.name == 4) {
        this.auditCommentsList()
      } else {
        this.commentsList()
      }
    },







    // 添加黄河专题内容
    editHHCon(id) {
      console.log(id)
      this.onAddCon()
    },

    // 切换模块
    changeModule(type) {
      this.titleCon = this.titleArr[type]
      this.type = type
      console.log(123)
    },

  },

  created() {
    this.sellerId = this.$route.params.id
    this.type = this.$route.params.type
    this.changeModule(this.$route.params.type)
    this.initPage()
  },

  mounted() {

    console.log('merchantDetails')
    console.log(this.$route.params.id)
    console.log(this.$route.params.type)
    // this.sellerList()
  },
  components: {
    OrderDetailsItem,
    EvaluationDetailsItem,
  }


}

