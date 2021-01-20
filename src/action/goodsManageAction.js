import { startLoading, endLoading } from '../common/util'
import { goodsQueryAll, goodsUpdateStatus, goodsAdd, goodsUpdate, goodsDelete } from "@/config/api.js"

export default {
  name: 'goodsManage',
  data() {
    return {
      loading: false,
      goodsTotal: 0,
      searUser: {},
      goodsListStyle: true,//产品展示类型
      aRModuleDialogVisible: false,
      goodsLists: [],
      aRDetailJson: {},

      pageIndex: 1,
      pageSize: 10,

    }
  },
  props: ['changeValue'],
  methods: {
    // getTableData() {
    //   this.tableData = this.goodsLists.slice((this.pageIndex - 1) * this.pageSize, (this.pageIndex) * this.pageSize)
    // },

    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.goodsQueryAll();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.goodsQueryAll();
    },

    // 上下架
    onOffShelfGoods(status, id) {
      // let uiData = this.boxList.filter(item => item.id === id)[0]
      // console.log(status, id)
      if (status === 0) { //0 下架 1 上架
        // 提示
        this.$confirm('此操作将下架该产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onWhetherToEnable(id, status)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      } else {
        // 不需要提示
        this.onWhetherToEnable(id, status)
      }

    },

    // 上下架请求
    onWhetherToEnable(id, status) {
      // console.log(id, status)
      startLoading()
      goodsUpdateStatus({ "id": id, 'status': status }).then(res => {
        endLoading()
        if (res.state === 0) {
          this.goodsQueryAll()
          this.$message({
            type: 'success',
            message: '更新成功！'
          })
        } else {
          this.goodsQueryAll()
          this.$message({
            type: 'error',
            message: '请求失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.goodsQueryAll()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      })
    },

    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },

    // 添加内容弹框切换
    onAddCon() {
      this.aRModuleDialogVisible = !this.aRModuleDialogVisible
    },
    // 添加内容
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
        this.goodsDelete({ id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // addARConFunc
    addARConFunc(data) {

      if (!data.courierNumber) {
        this.$message({
          type: 'warning',
          message: '请输入物流单号！'
        })
        return
      }
      if (!data.deliveryTime) {
        this.$message({
          type: 'warning',
          message: '请选择发货日期！'
        })
        return
      }
      startLoading()
      if (data.id) {
        data.status = data.statusName === '1' ? 1 : 0
        data.statusName  = data.statusName === '1' ? '已处理' : '未处理'
        console.log(data)
        this.goodsUpdate(data)
      } else {
        data.status = 1
        this.goodsAdd(data)
      }
    },
    // 获取内容列表
    goodsQueryAll() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex
      }
      goodsQueryAll(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.goodsLists = res.data.list
          this.goodsTotal = res.data.total
          if (res.data.list.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还没有产品！'
            })
          }
          console.log(this.goodsLists)
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

    // 添加内容详情
    goodsAdd(reqJson) {
      goodsAdd(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.goodsQueryAll()
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
    // 修改内容详情
    goodsUpdate(reqJson) {
      goodsUpdate(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.goodsQueryAll()
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

    // 删除内容详情
    goodsDelete(reqJson) {
      goodsDelete(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.goodsQueryAll()
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
    this.goodsQueryAll()
  },

  mounted() {
    console.log('goodsManage')
  },

  watch: {
    changeValue: function (val) {
      console.log('切换展示类型', val);   // 接收父组件的值
      this.goodsListStyle = val
      console.log(this.goodsListStyle)
    }
  },
  // getParams

}
