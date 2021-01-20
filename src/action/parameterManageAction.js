import { startLoading, endLoading } from '../common/util'
import { queryAllBySupplierId, addBySupplierId, updateBySupplierId, deleteBySupplierId } from "@/config/api.js"
import ParameterManageCom from '../components/componentsPages/parameterManageCom.vue'
export default {
  name: 'parameterManage',
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
      this.queryAllBySupplierId();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.queryAllBySupplierId();
    },
  
    // 是否启用
    whetherToEnable($event, id) {
      // let uiData = this.boxList.filter(item => item.id === id)[0]
      // console.log($event, id)
      if ($event === 1) { //0 启用 1 禁用
        // 提示
        this.$confirm('此操作将停止启用当前商品参数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onWhetherToEnable(id, $event)
        }).catch(() => {
          this.queryAllBySupplierId()
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        // 不需要提示
        this.onWhetherToEnable(id, $event)
      }

    },
    // // 是否启用
    // onWhetherToEnable(id, status) {
    //   // console.log(id, status)
    //   startLoading()
    //   updateBySupplierIdStatus({ "id": id, 'status': status }).then(res => {
    //     endLoading()
    //     if (res.state === 0) {
    //       this.queryAllBySupplierId()
    //       this.$message({
    //         type: 'success',
    //         message: '更新成功！'
    //       })
    //     } else {
    //       this.queryAllBySupplierId()
    //       this.$message({
    //         type: 'error',
    //         message: '请求失败，请刷新重试！'
    //       })
    //     }
    //   }).catch(() => {
    //     endLoading()
    //     this.queryAllBySupplierId()
    //     this.$message({
    //       type: 'error',
    //       message: '请求失败，请刷新重试！'
    //     })
    //   })
    // },

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
      this.aRDetailJson = Object.assign({}, data || {})
      this.onAddCon()

    },

    // 删除内容
    deleteHHCon(id) {
      this.$confirm('此操作将删除内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.deleteBySupplierId({ id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // addARConFunc
    addARConFunc(data) {
      console.log(data)
      if (!data.parmTitle) {
        this.$message({
          type: 'warning',
          message: '请输入参数标题！'
        })
        return
      }
      if (!data.parmContent) {
        this.$message({
          type: 'warning',
          message: '请输入参数值！'
        })
        return
      }
      if (data.parmContent) {
        // data.parmContent = data.parmContent.replace('，', ',')
        data.parmContent = data.parmContent.replace(new RegExp('，','g'), ',')
      }
      startLoading()
      if (data.id) {
        this.updateBySupplierId(data)
      } else {
        this.addBySupplierId(data)
      }
    },
    // 获取商品参数内容列表
    queryAllBySupplierId() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        'supplierId': this.supplierId,
      }
      queryAllBySupplierId(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.listDataArr = res.data.list
          this.listTotal = res.data.total
          if (this.listDataArr.length < 0) {
            this.$message({
              type: 'warning',
              message: '您还没有商品参数！'
            })
          }
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

    // 添加商品参数内容详情
    addBySupplierId(reqJson) {
      reqJson.supplierId = this.supplierId
      addBySupplierId(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.queryAllBySupplierId()
          this.onAddCon()
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '保存失败!'
        });
      })
    },
    // 修改商品参数内容详情
    updateBySupplierId(reqJson) {
      updateBySupplierId(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.queryAllBySupplierId()
          this.onAddCon()
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '保存失败!'
        });
      })
    },

    // 删除商品参数内容详情
    deleteBySupplierId(reqJson) {
      deleteBySupplierId(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.queryAllBySupplierId()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '删除失败!'
        });
      })
    },

  },

  created() {
    this.queryAllBySupplierId()
  },
  mounted() {
    console.log('souvenirs')
    // console.log(this.$route.params.id)
  },
  components: {
    ParameterManageCom,
  }


}
