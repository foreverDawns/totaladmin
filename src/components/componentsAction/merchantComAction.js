// import VDistpicker from 'v-distpicker'
// import { quillEditor, Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

// Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块

import { fileUpdate } from "@/config/api.js"

export default {
  name: 'merchantCom',
  data() {
    return {
      editCurrentConData: {
        "account": "", //账号
        "address": "",
        "bankAccount": "",
        "bankName": "",
        "description": "https://wanjia-image.oss-cn-beijing.aliyuncs.com/a5246b570a3848a5a49db9fce981a72c.jpg",//营业执照
        "image": "",
        "linkMan": "",
        "logo": "https://wanjia-image.oss-cn-beijing.aliyuncs.com/a5246b570a3848a5a49db9fce981a72c.jpg", //店铺图片
        "password": "", //密码
        "phoneNumber": "", //电话
        "supplierDescribe": "",
        "supplierName": "" //商家名称
      },
      logoImg: [],
      descriptionImg: [],
      fileUpdate: fileUpdate,
      limit: 1
    }
  },
  // 接收父页面的值
  props: {
    addYRConDialogVisible: {
      type: Boolean,
      default: false
    },
    addYRConFunc: {
      type: Function
    },
    editCurrentCon: {
      type: Object,
      default: {}
    },
  },

  methods: {
    // 取消提示
    handleClose() {
      this.$emit('onAddCon');
    },
    //上传图片
    // 删除图片 one
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.editCurrentConData.logo = ""
    },
    // 上传图片成功回调 one
    uploaderSuccess(file, fileList) {
      console.log(file, fileList, fileList.url);
      this.editCurrentConData.logo = file.data.url
    },

    // 删除图片 Two
    handleRemoveTwo(file, fileList) {
      console.log(file, fileList);
      this.editCurrentConData.description = ""
    },
    // 上传图片成功回调 Two
    uploaderSuccessTwo(file, fileList) {
      console.log(file, fileList, fileList.url);
      this.editCurrentConData.description = file.data.url
    },
  },
  created() {

  },
  mounted() {
    // console.log(this.$props.editCurrentCon)
  },
  watch: {

  },

  components: {
    // VDistpicker,
    // quillEditor,
  }


}
