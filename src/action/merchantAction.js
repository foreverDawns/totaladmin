import { sellerList, sellerAdd, sellerDetail, sellerState } from "@/config/api.js"
import MerchantCom from '../components/componentsPages/merchantCom.vue'
import { startLoading, endLoading } from '../common/util'
export default {
  name: 'merchant',
  data() {
    return {
      addYRConDialogVisible: false,
      queryListArr: [],
      editCurrentCon: {},
      totalNum: '0',
      pageIndex: 1,
      pageSize: 10,
      content: '',
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
      this.sellerList();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.sellerList();
    },
    // 添加黄河专题内容
    editHHCon(id) {
      console.log(id)
      this.onAddCon()
    },

    // 冻结/解冻商家
    deleteHHCon(id, status) { //status: 0禁止，1启用
      console.log(id, status)
      if (status === 0) {
        this.content = '解冻'
      } else {
        this.content = '冻结'
      }
      this.$confirm(`此操作将${this.content}当前商家, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.sellerState({ "sellerId": id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消${this.content}`
        });
      });
    },

    // addYRConFunc
    addYRConFunc(data) {
      console.log(data)
      if (!data.account) {
        this.$message({
          type: 'warning',
          message: '请输入账号！',
        })
        return
      }
      if (!data.description) {
        this.$message({
          type: 'warning',
          message: '请输入营业执照！',
        })
        return
      }
      if (!data.logo) {
        this.$message({
          type: 'warning',
          message: '请输入店铺图片！',
        })
        return
      }
      if (!data.password) {
        this.$message({
          type: 'warning',
          message: '请输入密码！',
        })
        return
      }
      if (!data.phoneNumber) {
        this.$message({
          type: 'warning',
          message: '请输入电话！',
        })
        return
      }
      if (!data.supplierName) {
        this.$message({
          type: 'warning',
          message: '请输入商家名称！',
        })
        return
      }
      this.sellerAdd(data)
    },

    // 获取的列表
    sellerList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
      }
      sellerList(reqData).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.queryListArr = res.data.data
          this.totalNum = res.data.count
          console.log(this.queryListArr)
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

    // 获取的详情
    sellerDetail(id) {
      sellerDetail({ sellerId: id }).then(res => {
        endLoading()
        if (res.state === 0) {
          this.editCurrentCon = Object.assign({}, res.data)
          this.onAddCon()
        } else {
          this.$message({
            type: 'error',
            message: '获取详情失败！'
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '获取详情失败！'
        })
      })
    },

    // 增加的列表
    sellerAdd(data) {
      sellerAdd(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.sellerList()
          this.onAddCon()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: '添加失败'
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '添加失败'
        })
      })
    },
    // 冻结/解冻请求
    sellerState(data) {
      sellerState(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.sellerList()
          this.$message({
            type: 'success',
            message: `${this.content}成功`
          })
        } else {
          this.$message({
            type: 'error',
            message: `${this.content}失败`
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: `${this.content}失败`
        })
      })
    },
    // // 跳转页面
    // goToNext(id, pageType) {
    //   console.log(id, pageType)
    //   this.$router.push({name: 'test', params: {id: id, pageType: pageType}})
    // }

  },

  created() {

  },
  mounted() {
    console.log('merchant')
    console.log(this.$route.params.id)
    this.sellerList()
  },
  components: {
    MerchantCom,
  }


}

