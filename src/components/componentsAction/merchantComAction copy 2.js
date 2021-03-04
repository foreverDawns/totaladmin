// import VDistpicker from 'v-distpicker'
// import { quillEditor, Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

// Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块

import { fileUpdate } from "@/config/api.js"

export default {
    name: 'merchantCom',
    data() {
        return {
            editCurrentConData: {},
            fileListTwo: [],
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

        handleRemoveTwo(file, fileList) {
            console.log('handleRemoveTwo--file', file);
            console.log('handleRemoveTwo--fileList', fileList);
            let imagesDataStr = ''
            fileList.map(item => {
                if (!imagesDataStr) {
                    imagesDataStr += item.url
                } else {
                    imagesDataStr += ',' + item.url
                }
            })
            this.editCurrentConData.companyAptitude = imagesDataStr
        },

        //上传图片
        uploaderSuccessTwo(files, fileList) {
            console.log('uploaderSuccessTwo--file', files);
            console.log('uploaderSuccessTwo--fileList', fileList);
            if (!this.editCurrentConData.companyAptitude) {
                this.editCurrentConData.companyAptitude = files.data.url
            } else {
                this.editCurrentConData.companyAptitude += ',' + files.data.url
            }
        },

        // handleExceedTwo
        handleExceedTwo(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limitTwo} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
    },
    created() {
        console.log(this.$props.editCurrentCon, '12345789')
    },
    mounted() {
        // console.log(this.editCurrentConData, '88888888')
    },
    watch: {
        editCurrentCon(res) {
            console.log(res, '接收到的值')

            if (res) {
                this.editCurrentConData = res
                this.fileListTwo = []
                if (res.companyAptitude) {
                    res.companyAptitude.split(',').map(item => {
                        item && this.fileListTwo.push({ 'url': item })
                    })
                }
            }
        }
    },

    components: {
        // VDistpicker,
        // quillEditor,
    }


}