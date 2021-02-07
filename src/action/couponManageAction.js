import { startLoading, endLoading } from '../common/util'
import { couponList } from "@/config/api.js"
import CouponManageCom from '../components/componentsPages/couponManageCom.vue'
export default {
  name: 'couponManage',
  data() {
    return {
      aRModuleDialogVisible: false,
      listDataArr: [],
      aRDetailJson: {},
      supplierId: '1',
      pageIndex: 1,
      pageSize: 10,
      listTotal: 0,
    }
  },
  // props: ['changeValue'],
  methods: {
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.couponList();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.couponList();
    },

    onChangeModule(index) {
      this.listDataArr[index].select = !this.listDataArr[index].select
      this.$forceUpdate()
    },

    // 时间格式化
    dateFormat(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
    },

    // 添加Ar内容弹框切换
    onAddCon() {
      this.aRModuleDialogVisible = !this.aRModuleDialogVisible
    },
    // 添加Ar内容
    editARCon(data) {
      this.aRDetailJson = Object.assign({}, data)
      this.onAddCon()
    },

    // 获取商品参数内容列表
    couponList() {
      startLoading()
      const reqData = {
        sellerId: '',
      }
      couponList(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.listDataArr = res.data

          // this.listTotal = res.data.count
          if (this.listDataArr.length < 0) {
            this.$message({
              type: 'warning',
              message: '无优惠券！'
            })
            return
          }
          this.listDataArr.map(item => {
            item.select = false
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
          message: '请求失败，请刷新重试！'
        })
      })
    },

    

  },

  created() {
    this.couponList()
  },
  mounted() {
    console.log('couponManage')
    // console.log(this.$route.params.id)
  },
  components: {
    CouponManageCom,
  }


}
