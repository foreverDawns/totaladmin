import { startLoading, endLoading } from '../common/util'
import { sysBlindBoxList, sysBlindBoxUpdate, sysBlindBoxAdd, sysBlindBoxDel} from "@/config/api.js"
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
            orderSnEnd: '',  //默认区间值
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
        deletePoint(id) {
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
          // 删除
          deleteSpec(data) {
            startLoading();
            sysBlindBoxDel(data).then(res => {
                endLoading();
                if (res.state === 0) {
                    this.$message({
                        type: 'success',
                        message: '邀请盲池盒删除成功！'
                    })
                    this.specList()
                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败,请刷新重试！'
                    })
                }

            }).catch(()=>{
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败,请刷新重试！'
                }) 
            })
        },


        // addARConFunc
        addARConFunc(data) {
            console.log(data)
            if (!data.inviteNum) {
                this.$message({
                    type: 'warning',
                    message: '请输入邀请人数！'
                })
                return
            }
            if (!data.integralNum) {
                this.$message({
                    type: 'warning',
                    message: '请输入获得积分！'
                })
                return
            }
            if (!data.probability) {
                this.$message({
                    type: 'warning',
                    message: '请输入概率！'
                })
                return
            }
            if (!data.validHour) {
                this.$message({
                    type: 'warning',
                    message: '请输入有效时间！'
                })
                return
            }

            if(data.zhoubianIds){
                if(JSON.stringify(data.zhoubianIds) == "{}" ){
                    data.zhoubianIds=''
                }else{
                    data.zhoubianIds= data.zhoubianIds.toString()
                }
            }
            if(data.quanbaoIds){
                if(JSON.stringify(data.quanbaoIds) == "{}" ){
                    data.quanbaoIds=''
                }else{
                    data.quanbaoIds= data.quanbaoIds.toString()
                }
            }
            if(data.quanbaoMenpiaoIds){
                if(JSON.stringify(data.quanbaoMenpiaoIds) == "{}" ){
                    data.quanbaoMenpiaoIds=''
                }else{
                    data.quanbaoMenpiaoIds= data.quanbaoMenpiaoIds.toString()
                }
            }
            if(data.shibaoIds){
                if(JSON.stringify(data.shibaoIds) == "{}" ){
                    data.shibaoIds=''
                }else{
                    data.shibaoIds= data.shibaoIds.toString()
                }
            }
            if(data.giftIds){
                if(JSON.stringify(data.giftIds) == "{}" ){
                    data.giftIds=''
                }else{
                    data.giftIds= data.giftIds.toString()
                }
            }
            if(data.jingquMenpiaoIds){
                if(JSON.stringify(data.jingquMenpiaoIds) == "{}" ){
                    data.jingquMenpiaoIds=''
                }else{
                    data.jingquMenpiaoIds= data.jingquMenpiaoIds.toString()
                }
            }

            if (data.id) {
                //  修改
                this.sysBlindBoxUpdate(data)
            } else {
                // 添加
                this.sysBlindBoxAdd(data)
            }
        },
        sysBlindBoxUpdate(data) {
            startLoading()
            sysBlindBoxUpdate(data).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.$message({
                        type: 'success',
                        message: '邀请盲池盒编辑成功！'
                    })
                    this.specList()
                    this.onAddCon()
                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败,请刷新重试!'
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
        sysBlindBoxAdd(data) {
            startLoading();
            sysBlindBoxAdd(data).then(res => {
                endLoading();
                if (res.state === 0) {
                    this.$message({
                        type: 'success',
                        message: '邀请盲池盒保存成功！'
                    })
                    this.specList()
                    this.onAddCon()

                } else {
                    this.$message({
                        type: 'error',
                        message: '请求失败,请刷新重试！'
                    })
                }

            }).catch(()=>{
                endLoading()
                this.$message({
                    type: 'error',
                    message: '请求失败,请刷新重试！'
                }) 
            })
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
                    console.log('详情', this.listDataArr)
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
