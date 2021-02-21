import { startLoading, endLoading } from '../common/util'
import { integralsetOverdueNumber } from "@/config/api.js"

export default {

    data() {
        return {
            ruleForm: {
                overdueNumber: ''
            },
            type: 1
        }
    },

    methods: {
        changeModule(val) {
            this.type = val
        },
        onSubmit() {
            startLoading();
            integralsetOverdueNumber({
                overdueNumber: this.ruleForm.overdueNumber
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
                        message: '请求失败，请刷新重试！'
                    })
                }

            })
        }












    },

    created() {

    },
    mounted() {

    },



}
