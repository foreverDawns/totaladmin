import { startLoading, endLoading } from '../common/util'
import { goodsEvaluationInfo, evaluationSubmit } from "@/config/api.js"

export default {
  name: 'evaluationDetails',
  data() {
    return {
      totalNum: 100,
      switchFlag: false, //切换 switch 的值
      id: '', //订单 id
      representationFlag: false,
      representationContent: '',
      evaluationDetails: '',
      supplierId: '1', //店铺id
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
    onRepresentationFlag() {
      this.representationFlag = !this.representationFlag
    },
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },

    // 获取评价内容列表
    goodsEvaluationInfo() {
      startLoading()
      goodsEvaluationInfo({ id: this.id }).then(res => {
        endLoading()
        if (res.state === 0) {
          console.log(res.data)
          this.evaluationDetails = res.data
          console.log(this.evaluationDetails)
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

    // 获取评价内容列表
    evaluationSubmit() {
      startLoading()
      const reqJson = {
        "commitContent": this.representationContent,
        "evaluationId": this.evaluationDetails.id,
        "supplierId": this.supplierId,
      }
      evaluationSubmit(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          console.log(res.data)
          this.commitContent = ''
          this.$router.go(-1)
          this.$message({
            type: 'success',
            message: '申述提交成功，平台正在处理！'
          })
        } else {
          this.$message({
            type: 'error',
            message: '提交，请点击提交重试！'
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
    this.id = this.$route.params.id
    this.goodsEvaluationInfo()
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
