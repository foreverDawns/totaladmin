import { startLoading, endLoading } from '../common/util'
import { integralnewUserManagement } from "@/config/api.js"

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
        scanSave() {
            if (!this.levelIntegral) {
                this.$message({
                    type: 'warning',
                    message: '请输入扫描积分获得数！',
                })
                return
            }
            startLoading();
            integralnewUserManagement({
                getAwy: 4,
                levelIntegral: this.levelIntegral
            }).then(res => {
                endLoading();
                if (res.state === 0) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })

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

    },
    mounted() {

    },



}
