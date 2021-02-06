import { startLoading, endLoading } from '../common/util'
import { auditCommentsList, commentAudit } from "@/config/api.js"

import TotalEvaluationManageCom from "../components/componentsPages/totalEvaluationManageCom.vue"

export default {
  name: 'totalEvaluationManage',
  data() {
    return {
      // 1 提交审核   2审核同意    3   审核拒绝
      evaluationLists: [],
      evaluationTotal: '',
      pageIndex: 1,
      pageSize: 10,
      sellerId: '',
      searUser: {},
      timeValue: [],
      optionValue: "",
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
      },
      moduleFlag: false,
      currentItemData: {},
      styleStatus: '',
    }
  },
  methods: {
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    
    onSelectTime(e) {
      this.timeValue = e
    },
    // 分页
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.auditCommentsList();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.auditCommentsList();
    },

    onEditaction(data, style) {
      console.log(data, style)
      this.currentItemData = data
      this.styleStatus = style
      this.onAddCon()
    },

    onSaveData(data, content) {
      console.log(data, content)
      if (this.styleStatus == 1) {
        if (!content) {
          this.$message({
            type: 'warning',
            message: '请输入拒绝原因！'
          })
        }
        console.log('拒绝')
        this.commentAudit(data.id, 3, content )
      } else {
        console.log('同意')
        this.commentAudit(data.id, 2)
      }
    },

    // 同意或者拒绝
    commentAudit(id, status, content) {
      console.log(content)
      startLoading()
      const reqData = {
        evaluationId: id,
        status: status,
      }
      commentAudit(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.auditCommentsList()
          this.onAddCon()
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

    onAddCon() {
      this.moduleFlag = !this.moduleFlag
    },

    // 获取评价内容列表
    auditCommentsList() {
      startLoading()
      const reqData = {
        // pageSize: this.pageSize,
        // pageNum: this.pageIndex,
        commentState: 0,
        sellerId: this.sellerId,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
      }
      auditCommentsList(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.evaluationLists = res.data.data
          this.evaluationTotal = res.data.total
          if (res.data.data.length <= 0) {
            this.$message({
              type: 'warning',
              message: '没有信息！'
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
      this.timeValue = ''
      this.sellerId = ''
    },


  },
  created() {
    this.auditCommentsList()
  },

  components: {
    TotalEvaluationManageCom,
  },
  mounted() {
    // console.log($router.params.checkboxFlg)
  },

}
