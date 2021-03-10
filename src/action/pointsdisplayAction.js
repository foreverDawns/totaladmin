import { startLoading, endLoading } from '../common/util'
import { integralsetOverdueNumber } from "@/config/api.js"

export default {

    data() {
        return {
            ruleForm: {
                isoverdueNumber: ' 永久',     // 充值积分
                overdueNumber:""   //非充值积分
            },
            type: 1
        }
    },

    methods: {
        changeModule(val) {
            this.type = val
        },
        onSubmit() {
            if (!this.ruleForm.overdueNumber) {
                this.$message({
                    type: 'warning',
                    message: '请输入非充值积分失效天数',
                })
                return
            }
            startLoading();
            integralsetOverdueNumber({
                overdueNumber: this.ruleForm.overdueNumber
            }).then(res => {
                endLoading();
                if (res.state === 0) {
                    // this.ruleForm.overdueNumber=''
                    this.$message({
                        type: 'success',
                        message: '非充值积分失效天数保存成功'
                    })

                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                }

            }).catch(()=>{
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                }) 
            })
        }
    },

    created() {

    },
    mounted() {

    },



}
