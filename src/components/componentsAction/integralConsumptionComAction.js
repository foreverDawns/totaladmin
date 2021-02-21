import VDistpicker from 'v-distpicker'
import { startLoading, endLoading } from '../../common/util'


import { integralintegralMatching } from "@/config/api.js"

export default {
    name: 'parameterManageCom',
    data() {
        return {
            ruleForm: {
                createTime: "",
                endTime: '',
                supplierId: '',
                skuId: '',
                membersId: '',
                integralMatching: '',
                returnsIntegral: ''
            },

            rules: {
                createTime: [{ required: true, message: '请输入内容', trigger: 'blur' },],
                endTime: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                supplierId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                skuId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                membersId: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                integralMatching: [{ required: true, message: '请输入内容', trigger: 'blur' }],
                returnsIntegral: [{ required: true, message: '请输入内容', trigger: 'blur' }],
            },
            aRModuleDialogVisible: false,
            dialogImageUrl: '',
            yellowRiverFlag: false,
            dialogVisible: false,
            limit: 2,
            limitTwo: 1,

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
    },

    methods: {
        addARConFunc() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    startLoading()
                    integralintegralMatching(this.ruleForm).then(res => {
                        endLoading()
                        if (res.state === 0) {
                            this.$message({
                                type: 'success',
                                message: '添加配比成功！'
                            })
                            this.$parent.specList();
                        } else {
                            this.$message({
                                type: 'error',
                                message: '请求失败，请刷新重试！'
                            })
                        }
                        this.aRModuleDialogVisible = false

                    }).catch(() => {
                        endLoading()
                        this.$message({
                            type: 'error',
                            message: '请求失败，请刷新重试！'
                        })

                    })
                }
            })

        },

        // 取消提示
        handleClose() {
            this.aRModuleDialogVisible = false;
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
