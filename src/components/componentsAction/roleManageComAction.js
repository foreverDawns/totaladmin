// import VDistpicker from 'v-distpicker'
// import { quillEditor, Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

// Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块

import { fileUpdate } from "@/config/api.js"

export default {
  name: 'roleManageCom',
  data() {
    return {
      userDetails: {},
      logoImg: [],
      descriptionImg: [],
      fileUpdate: fileUpdate,
      limit: 1
    }
  },
  // 接收父页面的值
  props: {
    systemDialogVisible: {
      type: Boolean,
      default: false
    },
    addAndEditConFunc: {
      type: Function
    },
    editDetailJson: {
      type: Object,
      default: {}
    },
  },

  methods: {
    // 取消提示
    handleClose() {
      this.$emit('systemHandleShow');
    },
    //上传图片
    // 删除图片 one
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.userDetails.logo = ""
    },
    // 上传图片成功回调 one
    uploaderSuccess(file, fileList) {
      console.log(file, fileList, fileList.url);
      this.userDetails.logo = file.data.url
    },

    // 删除图片 Two
    handleRemoveTwo(file, fileList) {
      console.log(file, fileList);
      this.userDetails.description = ""
    },
    // 上传图片成功回调 Two
    uploaderSuccessTwo(file, fileList) {
      console.log(file, fileList, fileList.url);
      this.userDetails.description = file.data.url
    },
  },
  created() {

  },
  mounted() {
    // console.log(this.$props.editDetailJson)
  },
  watch: {
    editDetailJson(res) {
      console.log(res)
      if (res) {
        this.userDetails = Object.assign({}, res)
      }
    }
  },

  components: {
    // VDistpicker,
    // quillEditor,
  }


}
