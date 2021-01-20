import { startLoading, endLoading } from '../common/util'

import { fileUpdate, goodsClassAll, goodsSpecValue, getGoodsDetails, goodsAdd, goodsUpdate } from "@/config/api.js"
// 富文本编辑器
import { quillEditor, Quill } from "vue-quill-editor";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块

export default {
  name: 'goodsAddAndEdit',
  data() {
    return {
      headerTitle: "",
      fileUpdate: fileUpdate,
      goodsId: '',
      goodsDetailsData: {}, //商品详情
      // 商品图片
      fileList: [],
      fileListTwo: [],
      limit: 10,
      limitTwo: 1,
      theme: 1, //1 or 2
      editorOption: {
        placeholder: "编辑文章内容",
        modules: {
          ImageExtend: {
            loading: true,
            name: "file",
            action: fileUpdate,
            response: (res) => {
              console.log(res)
              return res.data.url;
            },
          },
          toolbar: {
            container: container,
            handlers: {
              image: function () {
                QuillWatch.emit(this.quill.id);
              },
            },
          },
        },
      },
      classOptionsArr: [],
      goodsSpecValueArr: [], //规格表
      dialogVisible: false,
      disabled: false,
      // 最大上传数
      limitNum: 2,
      goodsRadio: '1',//商品规格
      textAreaValContent: '',// 富文本内容
      freightModuleVal: '',//快递选择值
      freightModuleArr: [{//快递选择数组
        value: '1',
        label: '韵达'
      }, {
        value: '2',
        label: '京东'
      }, {
        value: '3',
        label: '顺丰'
      }, {
        value: '4',
        label: '圆通'
      }],
      classValue: '',
      quickWayArr: ['平邮', '快递', 'EMS'],//快递方式 数组
      quickWayVal: '平邮',//快递方式 
      checkList7day: ['true'],// 7天无理由退换
      inventoryReduction: ['true'], //买家拍下减库存
      putShelfVal: ["1"], //上架 1.立即上架 2.定时上架 3.放入库存 
      sizeCheckList: [], //规格尺寸复选框
      addSize: '', //规格尺寸复选框
      spanList: [],
      number: 0,
      latticeData: [],//用于规格表
      structure: [
        {
          name: 'price',
          type: 'input',
          label: '原价'
        },
        {
          name: 'salePrice',
          type: 'input',
          label: '现价'
        },
        {
          name: 'num',
          type: 'input',
          label: '库存'
        },
        {
          name: 'name',
          type: 'input',
          label: '名称'
        },
      ],

    }
  },
  methods: {
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },

    // 初始化数据
    initPage() {
      startLoading()
      Promise.all([this.goodsClassAll(), this.goodsSpecValue()]).then(() => {
        if (this.goodsId && this.goodsId !== 'add') {
          this.getGoodsDetails()
        } else {
          endLoading()
        }

      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      });
    },
    // 获取产品分类
    goodsClassAll() {
      // startLoading()
      return new Promise((resolve, reject) => {
        goodsClassAll().then(res => {
          if (res.state === 0) {
            this.classOptionsArr = this.getTreeData(res.data)
            resolve()
          } else {
            // endLoading()
            this.$message({
              type: 'error',
              message: '获取分类失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          // endLoading()
          this.$message({
            type: 'error',
            message: '获取分类失败，请刷新重试！'
          })
          reject()
        })
      });
    },

    // 获取产品规格
    goodsSpecValue() {
      // startLoading()
      return new Promise((resolve, reject) => {
        goodsSpecValue().then(res => {
          console.log(res.data)
          if (res.state === 0) {
            this.goodsSpecValueArr = res.data
            this.goodsSpecValueArr.map(item => {
              item.canAddAttribute = false
            })
            resolve()
          } else {
            // endLoading()
            this.$message({
              type: 'error',
              message: '获取规格失败，请刷新重试！'
            })
            reject()
          }
        }).catch(() => {
          // endLoading()
          this.$message({
            type: 'error',
            message: '获取规格失败，请刷新重试！'
          })
          reject()
        })
      });
    },

    // 清空递归产生的空数组问题
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].children = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].children);
        }
      }
      return data;
    },

    // 获取产品详情
    getGoodsDetails() {
      // console.log(id, status)
      getGoodsDetails({ 'id': this.goodsId }).then(res => {
        endLoading()
        if (res.state === 0) {
          console.log(res.data)
          this.goodsDetailsData = res.data
          if (res.data.images) {
            const images = res.data.images.split(",")
            let imagesData = []
            images.map(item => {
              if (item) {
                return imagesData.push({ url: item })
              }
            })
            this.fileList = imagesData
          }

          if (res.data.introduction) {
            this.fileListTwo = [{ 'url': res.data.introduction }]
          }
          this.$refs.skuForm.init()
        } else {
          this.$message({
            type: 'error',
            message: '获取商品详情失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.$message({
          type: 'error',
          message: '获取商品详情失败，请刷新重试！'
        })
      })
    },

    // 商品图片 
    // 删除图片
    handleRemove(file, fileList) {
      console.log('handleRemove--file', file);
      console.log('handleRemove--fileList', fileList);
      let imagesDataStr = ''
      fileList.map(item => {
        if (!imagesDataStr) {
          imagesDataStr += item.url
        } else {
          imagesDataStr += ',' + item.url
        }
      })
      this.goodsDetailsData.images = imagesDataStr
    },

    //上传图片
    uploaderSuccess(files, fileList) {
      console.log('uploaderSuccess--file', files);
      console.log('uploaderSuccess--fileList', fileList);
      if (!this.goodsDetailsData.images) {
        this.goodsDetailsData.images = files.data.url
      } else {
        this.goodsDetailsData.images += ',' + files.data.url
      }
    },

    // handleExceed
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 商品详情图片 
    // 删除图片
    handleRemoveTwo(file, fileList) {
      console.log('handleRemoveTwo--file', file);
      console.log('handleRemoveTwo--fileList', fileList);
      this.goodsDetailsData.introduction = ""
    },

    //上传图片
    uploaderSuccessTwo(files, fileList) {
      console.log('uploaderSuccessTwo--file', files);
      console.log('uploaderSuccessTwo--fileList', fileList);
      this.goodsDetailsData.introduction = files.data.url
    },

    // handleExceedTwo
    handleExceedTwo(files, fileList) {
      this.$message.warning(`当前限制选择 ${this.limitTwo} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.88
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 0.88MB!',
          type: 'warning'
        });
      }
      return isLt2M
    },

    // 商品规格 Color handleClose showInput handleInputConfirm
    handleCloseColor(tag) {
      this.dynamicTagsColor.splice(this.dynamicTagsColor.indexOf(tag), 1);
    },

    showInputColor() {
      this.inputVisibleColor = true;
      this.$nextTick(() => {
        this.$refs.saveTagInputColor.$refs.input.focus();
      });
    },

    handleInputConfirmColor() {
      let colorInputValue = this.colorInputValue;
      if (colorInputValue) {
        this.dynamicTagsColor.push(colorInputValue);
      }
      this.inputVisibleColor = false;
      this.colorInputValue = '';
    },

    // 商品规格 Size handleClose showInput handleInputConfirm
    handleCloseSize(tag) {
      this.dynamicTagsSize.splice(this.dynamicTagsSize.indexOf(tag), 1);
    },

    showInputSize() {
      this.inputVisibleSize = true;
      this.$nextTick(() => {
        this.$refs.saveTagInputSize.$refs.input.focus();
      });
    },

    handleInputConfirmSize() {
      let sizeInputValue = this.sizeInputValue;
      if (sizeInputValue) {
        this.dynamicTagsSize.push(sizeInputValue);
      }
      this.inputVisibleSize = false;
      this.sizeInputValue = '';
    },

    goBack() {
      this.$router.go(-1);//返回上一层
    },

    goodsDetailsSubmit() {
      if (!this.goodsDetailsData.category) {
        this.$message({
          "type": "warning",
          "message":"请选择商品分类"
        })
        return
      }

      console.log(this.goodsDetailsData)
      if (!this.goodsDetailsData.sku || !this.goodsDetailsData.attribute) {
        this.$message({
          "type": "warning",
          "message":"请选择规格"
        })
        return
      }
      
      if (this.goodsDetailsData.id) { //更新
        this.goodsUpdate(this.goodsDetailsData)
      } else {//添加
        this.goodsAdd(this.goodsDetailsData)
      }
    },

    // 添加商品
    goodsAdd(data) {
      startLoading()
      goodsAdd(data).then(res => {
        endLoading()
        if (res.state === 0) {
          console.log(res.data)
          this.$message({
            type: 'success',
            message: res.data
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
          message: '添加商品失败，请重试！'
        })
      })
    },

    // 更新商品
    goodsUpdate(data) {
      data.id = data.spuId
      startLoading()
      goodsUpdate(data).then(res => {
        endLoading()
        if (res.state === 0) {
          console.log(res.data)
          this.$message({
            type: 'success',
            message: res.data
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
          message: '更新商品失败，请重试！'
        })
      })
    },
  },

  watch: {
    // 监听商品图片上传
    dialogImageUrl(val) {
      console.log(val)
    },
    // 7天无理由退换
    checkList7day(val) {
      console.log(val[0])
    },
    // 上架
    putShelfVal(val) {
      console.log(val)
      console.log(val.length)
    },
    // sku
    sku(val) {
      console.log('sku--------', val)
    },
    // attribute
    goodsDetailsData(val) {
      console.log('goodsDetailsData--------', val)
    },
  },

  created() {
    // 获取产品id
    this.goodsId = this.$route.params.id
    this.initPage()
    this.headerTitle = this.goodsId ? '修改商品' : '添加商品'
  },
  mounted() {
    console.log('goodsAddAndEdit')
    console.log(this.$route.params.id)
    console.log(this.goodsId)


  },

  components: {
    quillEditor
  },


}
