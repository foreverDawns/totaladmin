import { startLoading, endLoading } from '../common/util'
import { sysBlindBoxList } from "@/config/api.js"
import InvitePointsCom from '../components/componentsPages/invitePointsCom.vue'
export default {
    name: 'invitePoints',
    data() {
        return {
            aRModuleDialogVisible: false,
            listDataArr: [],
            aRDetailJson: {},
            supplierId: '1',
            pageIndex: 1,
            pageSize: 10,
            listTotal: 0,
            orderSnSter: '',  //默认区间值
            orderSnEnd: ''  //默认区间值
        }
    },

    methods: {

        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.specList();
        },
        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.specList();
        },

        // 时间格式化  
        dateFormat(val) {
            return this.$moment(val).format('YYYY-MM-DD HH:mm:ss')
        },

        // 弹框切换
        onAddCon() {
            this.aRModuleDialogVisible = !this.aRModuleDialogVisible;
        },
        // 添加 / 编辑内容
        editPoint(data) {
            if (JSON.stringify(data) == '{}') {
                data.titleName = '积分管理-邀请盲盒池-添加'
            } else {
                data.titleName = '积分管理-邀请盲盒池-编辑'
            }
            this.aRDetailJson = Object.assign({}, data)
            this.onAddCon()
        },

        // 删除内容
        deleteHHCon(id) {
            this.$confirm('此操作将删除内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 加载提示
                startLoading()
                this.deleteSpec({ id: id })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        deleteSpec(){

        },

        // addARConFunc
        addARConFunc(data, arr) {
            console.log(data)
            console.log(arr)

            if (!data.specName) {
                this.$message({
                    type: 'warning',
                    message: '请输入属性分类！'
                })
                return
            }
            if (!data.specValues.length) {
                this.$message({
                    type: 'warning',
                    message: '参数值不能为空！'
                })
                return
            }
     
            let reqData = {
                "specId": "string",
                "specName": "string",
                "specValueList": []
            }

            let newArr = []
            data.specValues.map(item => {
                newArr.push({
                    specValueName: item.specValue,
                    specValueId: item.valueId
                })
            })
            reqData.specId = data.id
            reqData.specName = data.specName
            reqData.specValueList = newArr
            if (reqData.specId) {
                console.log(reqData)
                if (arr.length > 0) {
                    this.deleteSpecValue(arr, reqData)
                } else {
                    this.updateSpec(reqData)
                }
            } else {
                this.addSpecAndValue(reqData)
            }
        },



        // 积分管理列表详情
        specList() {
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            sysBlindBoxList(reqData).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.listDataArr = res.data.data
                    this.listTotal = res.data.count
                    console.log('详情',this.listDataArr)
                    if (this.listDataArr.length < 0) {
                        this.$message({
                            type: 'warning',
                            message: '您还没有盲盒池列表参数！'
                        })
                    }
                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            })
        },
    },

    created() {
        this.specList()
    },
    mounted() {

    },
    components: {
        InvitePointsCom,
    }


}
