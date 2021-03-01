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
                logoImg: [],
                descriptionImg: [],
            },

            fileUpdate: fileUpdate,
            limit: 1,
            limitTwo: 3
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
            // this.editCurrentConData.logo = ""
        },
        // 上传图片成功回调 one
        uploaderSuccess(file, fileList) {
            console.log(file, fileList, fileList.url);
            // this.editCurrentConData.logo = file.data.url
        },

        // 删除图片 Two
        handleRemoveTwo(file, fileList) {
            console.log(file, fileList);
            // this.editCurrentConData.description = ""
        },
        // 上传图片成功回调 Two
        uploaderSuccessTwo(file, fileList) {
            console.log(file, fileList, fileList.url);
            this.editCurrentConData.description = file.data.url
        },
    },
    created() {
        // console.log(this.$props.editCurrentCon,'12345789')

    },
    mounted() {

    },
    watch: {
        editCurrentCon(res) {
            console.log(res,'接收到的值')
            if (res) {
                this.editCurrentConData = res
                if (res.companyAptitude) {
                    res.descriptionImg = []
                    res.companyAptitude.split(',').map(item => {
                        item && res.descriptionImg.push({'url': item})
                    })
                } else {
                    res.descriptionImg = []
                }
            }
        }
    },

    components: {
        // VDistpicker,
        // quillEditor,
    }


}