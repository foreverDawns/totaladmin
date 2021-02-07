import { startLoading, endLoading } from '../common/util'
import { auditCouponList, addSpecAndValue, updateSpec, deleteSpec, deleteSpecValue } from "@/config/api.js"
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
      this.auditCouponList();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.auditCouponList();
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
          this.auditCouponList()
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
        
      } else {
        this.aRDetailJson = Object.assign({}, {})
        this.onAddCon()
      }
    },

    // 删除内容
    deleteHHCon(id) {
      this.$confirm('此操作将删除内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.deleteSpec({ id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // addARConFunc
    addARConFunc(data, arr) {
      console.log(data)
      console.log(arr)

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
        if (arr.length >0) {
          this.deleteSpecValue(arr, reqData)
        } else {
          this.updateSpec(reqData)
        }
      } else {
        this.addSpecAndValue(reqData)
      }
    },

    //替换数组中的 key 
    changeKey(arr, key) {
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
    auditCouponList() {
      startLoading()
      const reqData = {
        sellerId: 2,
      }
      auditCouponList(reqData).then(res => {
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

    // 添加商品规格内容详情
    addSpecAndValue(reqJson) {
      console.log(reqJson)
      const reqData = {
        specName: reqJson.specName,
        specValueName: []
      }
      reqJson.specValueList.map(item => {
        reqData.specValueName.push(item.specValueName)
      })
      startLoading()
      addSpecAndValue(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.auditCouponList()
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
    // 删除商品参数值
    deleteSpecValue(arr, reqData) {
      startLoading()
      deleteSpecValue({ id: arr }).then(res => {
        if (res.state === 0) {
        this.updateSpec(reqData)
        } else {
          endLoading()
          this.$message({
            type: 'error',
            message: '删除分类值失败!'
          });
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '删除分类值失败!'
        });
      })
    },
    // 修改商品参数内容详情
    updateSpec(reqJson) {
      startLoading()
      updateSpec(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.auditCouponList()
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
    deleteSpec(reqJson) {
      deleteSpec(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.auditCouponList()
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
    this.auditCouponList()
  },
  mounted() {
    console.log('couponManage')
    // console.log(this.$route.params.id)
  },
  components: {
    CouponManageCom,
  }


}
