import VDistpicker from 'v-distpicker'

// import { addQuillTitle } from '../../common/quill-title.js';

import { fileUpdate } from "@/config/api.js"

export default {
  name: 'CouponManageComManageCom',
  data() {
    return {
      fileUpdate: fileUpdate,
      detailData: {},

    }
  },
  // 接收父页面的值
  props: {
    aRDetailJson: {
      type: Object,
      default: {}
    },
    huangHeProjectFistListArr: {
      type: Array,
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

    // 时间格式化
    dateFormat(val) {
      return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
    },

  },
  created() {
    this.deleteValueArr = []
  },
  mounted() {
    // addQuillTitle()
    console.log('detailData', this.detailData)
  },

  watch: {
    aRDetailJson(res) {
      this.detailData = Object.assign({}, res)
      console.log(this.detailData)

    },

    detailData(res) {
      console.log(res, "detailData")
    },
  },

  components: {
    VDistpicker,
  }


}
