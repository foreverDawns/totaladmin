import { startLoading, endLoading } from '../common/util'
import { integralnewUserManagement, queryRegisterList } from "../config/api";

export default {
    name: "newusersget",
    data() {
        return {
            totalNum: '0',
            pageIndex: 1,
            pageSize: 10,
            levelIntegral: '',
            listDataArr: [],
        };
    },
    methods: {
          // 时间格式化
          dateFormat(val, format) {
            return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
        },
        
        // 分页
        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.userList();
        },
        // 分页
        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.userList();
        },
        // 新用户获得数保存
        userSave() {
            console.log('保存')
            if (!this.levelIntegral) {
                this.$message({
                    type: 'warning',
                    message: '请输入新用户积分获得数！',
                })
                return
            }
            startLoading()
            const reqData = {
                "getAwy": 2,
                "levelIntegral": this.levelIntegral,
                "signNumber": ''
            }
            integralnewUserManagement(reqData).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.levelIntegral = ''
                    this.$message({
                        type: 'success',
                        message: '新用户积分获得数保存成功！'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败,请刷新重试！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败,请刷新重试！'
                })
            })
        },
        // 新用户列表详情
        userList() {
            console.log('新用户列表详情')
            startLoading()
            queryRegisterList({
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize,
            }).then(res => {
                endLoading()
                if (res.state == 0) {
                    this.listDataArr = res.data.data;
                    this.totalNum = res.data.count;
                    if (this.listDataArr.length < 1) {
                        this.$message.warning('无新用户获得列表详情！')
                    }
                } else {
                    this.$message.error('请求失败，请刷新重试！')
                }

            }).catch(() => {
                endLoading()
                this.$message.error('请求失败，请刷新重试！')
            })
        }
    },
    created() {
        this.userList()
    },

};