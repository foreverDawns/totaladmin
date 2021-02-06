import { startLoading, endLoading } from '../common/util'
import { categoryList, categoryAdd, categoryUpdate, categoryDel } from "@/config/api.js"
import GoodsClassManageCom from '../components/componentsPages/goodsClassManageCom.vue'
export default {
  name: 'goodsClassManage',
  data() {
    return {
      aRModuleDialogVisible: false,
      listDataArr: {},
      aRDetailJson: {},
      supplierId: '1',
      pageIndex: 1,
      pageSize: 10,
      listTotal: 0,
      expands: [],
      menuList: {},
      
    }
  },
  // props: ['changeValue'],
  methods: {

    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.categoryList();
    },

    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.categoryList();
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
      this.aRDetailJson = Object.assign({}, data || {})
      this.menuList = {}
      this.menuList = Object.assign({}, this.listDataArr || {})
      this.onAddCon()
    },

    // 删除内容
    deleteHHCon(id) {
      console.log(id)
      this.$confirm('此操作将删除内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.categoryDel({ id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // addARConFunc
    addARConFunc(data) {
      console.log(data,'11111111111111111111')
      if (!data.name) {
        this.$message({
          type: 'warning',
          message: '请输入分类名称！'
        })
        return
      }
      console.log(data.parentId,"22222222222")
      console.log(data.parentId == undefined ,"22222222222")
      console.log(data.parentId === '' ,"22222222222")
      if (data.parentId == undefined || data.parentId === '') {
        this.$message({
          type: 'warning',
          message: '请选择层级！'
        })
        return
      }
      let reqData = {
        "id": data.id || null,
        "name": data.name,
        "parentId": data.parentId
      }

      if (reqData.id) {
        this.categoryUpdate(reqData)
      } else {
        this.categoryAdd(reqData)
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
    categoryList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        'supplierId': this.supplierId,
      }
      categoryList(reqData).then(res => {
        endLoading()
        if (res.state === 0) {
          this.listDataArr = res.data
          // this.listTotal = res.data.count
          if (this.listDataArr.chindList.length < 0) {
            this.$message({
              type: 'warning',
              message: '您还没有商品参数！'
            })
            return
          }
          this.listDataArr.chindList.map((item, index) => {
            if (item) {
              item.index = index + 1
              item.floor = '1'
              item.childCategoryList.map((cItem, cIndex) => {
                if (cItem) {
                  cItem.index = cIndex + 1
                  cItem.floor = '2'
                  cItem.childCategoryList.map((eItem, eIndex) => {
                    if (eItem) {
                      eItem.floor = '3'
                      eItem.index = eIndex + 1
                    }
                  })
                }
              })
            }
          })
          console.log(this.listDataArr)
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

    // 添加内容
    categoryAdd(reqJson) {
      startLoading()
      categoryAdd(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.categoryList()
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
    categoryUpdate(reqJson) {
      startLoading()
      categoryUpdate(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.categoryList()
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
    categoryDel(reqJson) {
      categoryDel(reqJson).then(res => {
        endLoading()
        if (res.state === 0) {
          this.categoryList()
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
    this.categoryList()
  },
  mounted() {
    console.log('souvenirs')
    // console.log(this.$route.params.id)
  },
  components: {
    GoodsClassManageCom,
  }


}
