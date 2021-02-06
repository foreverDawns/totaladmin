import VDistpicker from 'v-distpicker'

// import { addQuillTitle } from '../../common/quill-title.js';

import { fileUpdate } from "@/config/api.js"

export default {
  name: 'goodsClassManageCom',
  data() {
    return {
      dialogImageUrl: '',
      yellowRiverFlag: false,
      dialogVisible: false,
      limit: 2,
      limitTwo: 1,
      fileUpdate: fileUpdate,
      fileList: [],
      fileListTwo: [],
      detailData: {},
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      defaultProps: {
        children: 'childCategoryList',
        label: 'name'
      },
      dataListArr: [],
      levelName: '',
    }
  },
  // 接收父页面的值
  props: {
    aRDetailJson: {
      type: Object,
      default: {}
    },
    dataList: {//dataList
      type: Object,
    },
    aRModuleDialogVisible: {
      type: Boolean,
      default: false
    },
    addARConFunc: {
      type: Function
    },
  },

  methods: {
    // 取消提示
    handleClose() {
      this.$emit('onAddCon');
    },

    handleNodeClick(data) {
      console.log(data)
      this.levelName = data.name
      this.detailData.parentId = data.id
    },

  },
  created() {
    this.levelName = ''
  },
  mounted() {
    // addQuillTitle()
    // console.log('detailData', this.detailData)
  },

  watch: {
    aRDetailJson(res) {
      this.detailData = Object.assign({}, res)
    },

    dataList(res) {
      this.dataListArr = []
      res.childCategoryList = res.chindList
      this.dataListArr.push(res)
    },

    detailData(res) {
      console.log(res)
    },

    dataListArr(res) {
      console.log(res, 'dataListArr')
      this.levelName = ''
      this.dataListArr.some(item => {
        console.log(item, "item")
        if (item.id == this.detailData.parentId) {
          this.levelName = item.name
          return
        } else {
          if (item.childCategoryList.length > 0) {
            item.childCategoryList.map(cItem => {
              if (cItem.id == this.detailData.parentId) {
                this.levelName = cItem.name
                return
              } else {
                if (cItem.childCategoryList.length > 0) {
                  cItem.childCategoryList.map(ccItem => {
                    if (ccItem.id == this.detailData.parentId) {
                      this.levelName = ccItem.name
                      return
                    }
                  })
                }
              }
            })
          }
        }
      })
    },
  },


  components: {
    VDistpicker,
  }


}
