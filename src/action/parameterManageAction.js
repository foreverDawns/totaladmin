import { startLoading, endLoading } from '../common/util'
import { specList, addBySupplierId, specDetail, updateSpec, deleteBySupplierId } from "@/config/api.js"
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
      this.specList();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.specList();
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
          this.specList()
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
    //       this.specList()
    //       this.$message({
    //         type: 'success',
    //         message: '更新成功！'
    //       })
    //     } else {
    //       this.specList()
    //       this.$message({
    //         type: 'error',
    //         message: '请求失败，请刷新重试！'
    //       })
    //     }
    //   }).catch(() => {
    //     endLoading()
    //     this.specList()
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
    editARCon(id) {
      if (id) {
        // 获取详情
        this.specDetail({ 'id': id })
      } else {
        this.aRDetailJson = Object.assign({},{})
        this.onAddCon()
      }
    },

    // 获取商品规格详情
    specDetail(reqJson) {
      reqJson.supplierId = this.supplierId
      specDetail(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.aRDetailJson = Object.assign({}, res.data)
          this.onAddCon()
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
          message: '获取商品规格详情失败!'
        });
      })
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
      if (!data.specName) {
        this.$message({
          type: 'warning',
          message: '请输入属性分类！'
        })
        return
      }
      if (!data.specValues.length) {
        this.$message({
          type: 'warning',
          message: '参数值不能为空！'
        })
        return
      }
      // if (data.parmContent) {
      //   // data.parmContent = data.parmContent.replace('，', ',')
      //   data.parmContent = data.parmContent.replace(new RegExp('，', 'g'), ',')
      // }
      let reqData = {
        "specId": "string",
        "specName": "string",
        "specValueList": []
      }

      let newArr = []
      data.specValues.map(item => {
        newArr.push({
          specValueName: item.specValue,
          specValueId: item.valueId
        })
      })
      reqData.specId = data.id
      reqData.specName = data.specName
      reqData.specValueList = newArr
      if (reqData.specId) {
        console.log(reqData)
        this.updateSpec(reqData)
      } else {
        this.addBySupplierId(reqData)
      }
    },

    //替换数组中的 key 
    changeKey (arr, key) {
      let newArr = [];
      arr.forEach(item => {
        let newObj = {};
        for (var i = 0; i < key.length; i++) {
          newObj[key[i]] = item[Object.keys(item)[i]]
        }
        newArr.push(newObj);
      })
      console.log(newArr)
      return newArr;
    },

    // 获取商品参数内容列表
    specList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        'supplierId': this.supplierId,
      }
      specList(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.listDataArr = res.data.data
          this.listTotal = res.data.count
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

    // 添加商品规格内容详情
    addBySupplierId(reqJson) {
      reqJson.supplierId = this.supplierId
      startLoading()
      addBySupplierId(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.specList()
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
    updateSpec(reqJson) {
      startLoading()
      updateSpec(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.specList()
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
          this.specList()
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
    this.specList()
  },
  mounted() {
    console.log('souvenirs')
    // console.log(this.$route.params.id)
  },
  components: {
    ParameterManageCom,
  }


}
