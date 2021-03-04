import { replaceParamTitleList, disableTitle, addGoodsTitle, updateParamTitle, deleteTitle } from "@/config/api.js"
import { startLoading, endLoading } from '../common/util'
import OrderDetailsItem from "../components/componentsPages/orderDetailsItem.vue"
import ParameterCom from "../components/componentsPages/parameterCom.vue"
// 1 店铺参数标题  2 主要参数标题   3 次要参数标题   4 商品一级标题  5商品说明标题',

export default {
  name: 'companyManagement',
  data() {
    return {
      shopParamList: {},
      mainParamList: {},
      secondParamList: {},
      supTitleList: {},
      shopModuleFlag: false,
      goodsList: [],
      content: '',
      orderActiveName: "0",
      sellerId: "", //商家id
      titleType: '1', //1：店铺参数管理 2.商品参数管理 
      titleArr: {
        1: "店铺参数管理",
        2: "商品参数管理",
      },
      titleCon: '',
      shopDetailJson: {},
      dataType: 1, //1 店铺参数标题  2 主要参数标题   3 次要参数标题   4 商品一级标题  5商品说明标题
    }
  },
  // props: ['changeValue'],
  methods: {

    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },
    //获取时间间隔
    onSelectTime(e) {
      this.timeValueOne = e
    },

    // 初始化数据
    initPage() {
      startLoading()
      Promise.all([this.replaceParamTitleList(1), this.replaceParamTitleList(2), this.replaceParamTitleList(3), this.replaceParamTitleList(4),]).then(() => {
        endLoading()
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      });
    },
    // 获取商家信息 
    // 1 店铺参数标题  2 主要参数标题   3 次要参数标题   4 商品一级标题  5商品说明标题',
    replaceParamTitleList(type) {
      return new Promise((resolve, reject) => {
        replaceParamTitleList({ paramType: type }).then(res => {
          if (res.state === 0) {
            if (type == 1) {
              this.shopParamList = res.data
            }
            if (type == 2) {
              this.mainParamList = res.data
            }
            if (type == 3) {
              this.secondParamList = res.data
            }
            if (type == 4) {
              this.supTitleList = res.data
            }
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

    // 冻结/解冻标题
    onPublishGoods(status, id) { //status: 0禁止，1启用
      console.log(id, status)
      if (status === 0) {
        this.content = '启用'
      } else {
        this.content = '禁用'
      }
      this.$confirm(`此操作将${this.content}当前参数, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.disableTitle({ "id": id , 'delFlag': status})
      }).catch(() => {
        this.replaceParamTitleList(this.dataType)
        this.$message({
          type: 'info',
          message: `已取消${this.content}`
        });
      });
    },

    // 启用禁止参数标题
    disableTitle(data) {
      disableTitle(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.replaceParamTitleList(this.dataType)
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
    // 删除标题
    onDeleteTitle(id) {
      console.log(id)
      this.$confirm(`此操作将删除当前项, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.deleteTitle({ "id": [id] })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: `已取消删除！`
        });
      });
    },

    // 启用禁止参数标题
    deleteTitle(data) {
      deleteTitle(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.replaceParamTitleList(this.dataType)
          this.$message({
            type: 'success',
            message: `删除成功！`
          })
        } else {
          this.$message({
            type: 'error',
            message: `删除失败！`
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: `删除失败！`
        })
      })
    },


    // 监听tabs 变化
    handleClick(tab) {
      console.log(tab.name, '123');
      this.dataType = tab.name
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


    // 切换模块
    changeModule(type) {
      this.titleCon = this.titleArr[type]
      this.titleType = `${type}`
      this.dataType = `${type}`
    },



    // 添加编辑店铺参数弹框切换
    onShopToggleCon() {
      this.shopModuleFlag = !this.shopModuleFlag
    },
    // 添加编辑店铺参数内容
    shopEditAndAddCon(data) {
      this.shopDetailJson = {}
      if (data) {
        this.shopDetailJson = JSON.parse(JSON.stringify(data))
      } else {
        this.shopDetailJson = {"delFlag": 0}
        
      }
      this.onShopToggleCon()
    },



    // 店铺参数添加&编辑
    onShopAddAndEditfunc(data) {
      console.log(data)
      if (!data.paramName) {
        this.$message({
          type: 'warning',
          message: '请补参数标题！'
        })
        return
      }

      let submitFlag = true
      data.canshuPOS.some(item => {
        if (this.dataType != 2 && this.dataType != 3) {
          if (!item.content) {
            submitFlag = false
          }
        }
        if (!item.paramValue) {
          submitFlag = false
        }
      })
      if (!submitFlag) {
        this.$message({
          type: 'warning',
          message: '请补齐参数！'
        })
        return
      }
      data.addValuesVOS = data.canshuPOS
      data.updateValueVO = data.canshuPOS
      data.id = data.titleId
      if (data.titleId) {
        this.updateParamTitle(data)
      } else {
        this.addGoodsTitle(data)
        console.log(data)
      }
    },

    // 添加参数
    addGoodsTitle(data) {
      data.paramType = this.dataType
      startLoading()
      addGoodsTitle(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.replaceParamTitleList(this.dataType)
          this.onShopToggleCon()
          this.$message({
            type: 'success',
            message: `保存成功！`
          })
        } else {
          this.$message({
            type: 'error',
            message: `保存失败！`
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: `保存失败！`
        })
      })
    },
    // 修改参数
    updateParamTitle(data) {
      data.paramType = this.dataType
      startLoading()
      updateParamTitle(data).then(res => {
        console.log(res)
        endLoading()
        if (res.state === 0) {
          this.onShopToggleCon()
          this.replaceParamTitleList(this.dataType)
          this.$message({
            type: 'success',
            message: `保存成功！`
          })
        } else {
          this.$message({
            type: 'error',
            message: `保存失败！`
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: `保存失败！`
        })
      })
    },

  },

  created() {
    this.changeModule(this.titleType)
    this.initPage()
  },

  mounted() {

    console.log('companyManagement')

  },
  components: {
    OrderDetailsItem,
    ParameterCom,
  }


}