// import VDistpicker from 'v-distpicker'
// import { quillEditor, Quill } from "vue-quill-editor";
// import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";

// Quill.register("modules/ImageExtend", ImageExtend); //注册扩展模块

import { fileUpdate } from "@/config/api.js"

export default {
    name: 'parameterComOne',
    data() {
        return {
            editCurrentConData: {
                delFlag: 0
            },
            fileListTwo: [],
            fileUpdate: fileUpdate,
            limit: 1,
            limitTwo: 3,
            addTitle: {
                1: '置换-置换参数管理-店铺参数添加',
                2: '置换-置换参数管理-主要参数添加',
                3: '置换-置换参数管理-次要参数添加',
                4: '置换-置换参数管理-标题参数添加',
            },
            editTitle: {
                1: '置换-置换参数管理-店铺参数修改',
                2: '置换-置换参数管理-主要参数修改',
                3: '置换-置换参数管理-次要参数修改',
                4: '置换-置换参数管理-标题参数修改',
            },
        }
    },
    // 接收父页面的值
    props: {
        shopModuleFlag: {
            type: Boolean,
            default: false
        },
        onShopAddAndEditfunc: {
            type: Function
        },
        shopDetailJson: {
            type: Object,
            default: {}
        },
        dataType: {
            type: String,
        },
    },

    methods: {
        // 取消提示
        handleClose() {
            this.$emit('onShopToggleCon');
        },
        // 更新视图
        inputChange($event) {
            console.log($event)
            this.$forceUpdate();
        },
        //上传图片
        // 删除图片 one
        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.editCurrentConData.canshuPOS[0].paramValue = ""
        },
        // 上传图片成功回调 one
        uploaderSuccess(file, fileList) {
            console.log(file, fileList, fileList.url);
            this.editCurrentConData.canshuPOS[0].paramValue = file.data.url

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

        onDeleteReplaceSupplier(index) {
            this.editCurrentConData.canshuPOS.splice(index, '1')
        },

        onAddReplaceSupplier() {
            this.editCurrentConData.canshuPOS.push({
                "content": "",
                "paramValue": "",
                valueId: null
            })
        },
    },

    created() {

    },
    mounted() {
        // console.log(this.editCurrentConData, '88888888')
    },
    watch: {
        shopDetailJson(res) {
            if (res) {
                console.log(res, '接收到的值')
                // this.editCurrentConData = res
                this.editCurrentConData = Object.assign({}, res)

                if (!this.editCurrentConData.canshuPOS) {
                    this.editCurrentConData.canshuPOS = []
                    console.log(123)
                    this.onAddReplaceSupplier()
                }
                 if (this.dataType == 2 && this.editCurrentConData.canshuPOS.length > 0) {
                    this.editCurrentConData.canshuPOS.map(item => {
                        item.imageArr = []
                        if (item.paramValue) {
                            console.log(item,'456456')
                            item.imageArr.push({'url': item.paramValue.replace(/,/g,""),})
                        }
                    })
                }
                // paramValue
                // this.fileListTwo = []
                // if (res.companyAptitude) {
                //     res.companyAptitude.split(',').map(item => {
                //         item && this.fileListTwo.push({ 'url': item })
                //     })
                // }
            }

        }
    },

    components: {
        // VDistpicker,
        // quillEditor,
    }


}