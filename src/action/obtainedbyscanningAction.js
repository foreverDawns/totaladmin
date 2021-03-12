import { startLoading, endLoading } from '../common/util'
import { integralSave, integralQuery} from "@/config/api.js"

export default {

    data() {
        return {
            aRModuleDialogVisible: false,
            listDataArr: [],
            aRDetailJson: {},
            supplierId: '1',
            pageIndex: 1,
            pageSize: 10,
            listTotal: 0,
            levelIntegral:"",
        }
    },

    methods: {
        // 查询积分默认值
        IntegralQuery(){
            startLoading()
            const reqData = {
                type : '4',
            }
            integralQuery(reqData).then(res => {
                endLoading()
                console.log(res)
                if (res.state === 0) {
                    this.levelIntegral = res.data
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
        scanSave() {
            if (!this.levelIntegral) {
                this.$message({
                    type: 'warning',
                    message: '请输入扫描积分获得数！',
                })
                return
            }
            startLoading();
            integralSave({
                type: '4',
                length: this.levelIntegral
            }).then(res => {
                endLoading();
                if (res.state === 0) {
                    this.$message({
                        type: 'success',
                        message: '默认积分数量添加成功'
                    })
                    this.IntegralQuery()
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    })
                }

            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试'
                })
            })
        }

    },

    created() {
        this.IntegralQuery()

    },
    mounted() {

    },



}
