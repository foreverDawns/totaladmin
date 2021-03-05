import VDistpicker from 'v-distpicker'



import { fileUpdate } from "@/config/api.js"

export default {
    name: 'InvitePointsCom',
    data() {
        return {
            ruleForm: {
                name: ""
            },
            options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }],
            rules: [],
            aRModuleDialogVisible: false,
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
            deleteValueArr: [],//删除的参数值 id

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

        addARConFunc: {
            type: Function
        },
       
    },

    methods: {
        // 取消提示
        handleClose() {
            this.$emit('onAddCon');
        },

        handleCloseTwo(tag) {
            console.log(tag)
            if (tag.valueId) {
                this.deleteValueArr.push(tag.valueId)
            }
            this.detailData.specValues.splice(this.detailData.specValues.indexOf(tag), 1);
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            const addData = {
                specValue: inputValue,
                valueId: ''
            }
            if (inputValue) {
                this.detailData.specValues.push(addData);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },






        // 删除图片 one
        handleRemove(file, fileList) {
            console.log(file, fileList);
            let imagesDataStr = []
            let imgUrlIdsStr = ''
            let indexItem = ''

            fileList.map(item => {
                imagesDataStr.push(item.url)
                if (item.response && item.response.data) {
                    if (imgUrlIdsStr) {
                        imgUrlIdsStr += ',' + item.response.data.fileId
                    } else {
                        imgUrlIdsStr = item.response.data.fileId
                    }
                } else {
                    this.detailData.imgUrls.map((iItem, index) => {
                        if (iItem !== item.url) {
                            indexItem = index
                        }
                    })
                    let idS = this.detailData.imgUrlIds.split(',')
                    idS.splice(indexItem, 1)
                    imgUrlIdsStr = idS.join()
                }


            })
            this.detailData.imgUrls = imagesDataStr
            this.detailData.imgUrlIds = imgUrlIdsStr
            console.log(this.detailData)
        },
        //上传图片 one
        uploaderSuccess(file, fileList) {
            console.log(file, fileList, fileList.url);
            if (this.detailData.imgUrls && this.detailData.imgUrls.length > 0) {
                this.detailData.imgUrls.push(file.data.url)
            } else {
                this.detailData.imgUrls = []
                this.detailData.imgUrls.push(file.data.url)

            }
            if (this.detailData.imgUrlIds) {
                this.detailData.imgUrlIds += ',' + file.data.fileId
            } else {
                this.detailData.imgUrlIds = file.data.fileId
            }
        },
        // 查看图片
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        // 删除图片 one
        handleRemoveTwo(file, fileList) {
            console.log(file, fileList);
            this.detailData.fixedImgUrls = []
            this.detailData.fixedImg = ''
        },
        //上传图片 one
        uploaderSuccessTwo(file, fileList) {
            console.log(file, fileList, fileList.url);
            this.detailData.fixedImgUrls = [file.data.url]
            this.detailData.fixedImg = file.data.fileId
        },

        // handleExceed
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        // handleExceed
        handleExceedTwo(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limitTwo} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
            console.log('子元素')
            console.log(res, "aRDetailJson")
            this.fileList = []
            this.fileListTwo = []
            if (res.imgUrls && res.imgUrls[0]) {
                let imagesData = []
                res.imgUrls.map(item => {
                    return imagesData.push({ url: item })
                })
                this.fileList = imagesData
            }

            if (res.fixedImgUrls) {
                this.fileListTwo = [{ url: res.fixedImgUrls[0] }]
            }

            this.detailData = Object.assign({}, res)
            if (!this.detailData.specValues) {
                this.detailData.specValues = []
            }
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
