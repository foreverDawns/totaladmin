import { sellerCompanyList, sellerListByCompanyId, sellerAdd, sellerUpdate, sellerDetail, sellerState } from "@/config/api.js"
import MerchantCom from '../components/componentsPages/merchantCom.vue'
import ShopCom from '../components/componentsPages/shopCom.vue'
import { startLoading, endLoading } from '../common/util'
export default {
    name: 'merchant',
    data() {
        return {
            addYRConDialogVisible: false,
            shopFlag: false,
            queryListArr: [],
            editCurrentCon: {},
            editShopCon: {},
            totalNum: '0',
            pageIndex: 1,
            pageSize: 10,
            content: '',
            shopList: [],
        }
    },
    // props: ['changeValue'],
    methods: {
        // 添加黄河专题内容弹框切换
        onAddCon() {
            this.addYRConDialogVisible = !this.addYRConDialogVisible
        },
        onToggleShopModule() {
            this.shopFlag = !this.shopFlag
        },
        // 时间格式化
        dateFormat(val, format) {
            return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
        },
        //获取时间间隔
        onSelectTime(e) {
            this.timeValueOne = e
        },
        // 分页
        pageChange(pageIndex) {
            this.pageIndex = pageIndex;
            this.sellerCompanyList();
        },
        // 分页
        pageSizeChange(pageSize) {
            this.pageIndex = 1;
            this.pageSize = pageSize;
            this.sellerCompanyList();
        },
        // 添加公司
        editHHCon(data) {
            if (data) {
                this.editCurrentCon = Object.assign({}, data)
            }
            this.onAddCon()
        },

        // 冻结/解冻店铺
        deleteHHCon(id, status) { //status: 0禁止，1启用
            console.log(id, status)
            if (status === 0) {
                this.content = '解冻'
            } else {
                this.content = '冻结'
            }
            this.$confirm(`此操作将${this.content}当前店铺, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                startLoading()
                this.sellerState({ "sellerId": id })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: `已取消${this.content}`
                });
            });
        },

        // addYRConFunc
        addYRConFunc(data) {
            console.log(data)
            if (!data.companyName) {
                this.$message({
                    type: 'warning',
                    message: '请输入公司名称！',
                })
                return
            }
            if (!data.headPhone) {
                this.$message({
                    type: 'warning',
                    message: '请输入公司联系电话！',
                })
                return
            }
            if (!data.loginName) {
                this.$message({
                    type: 'warning',
                    message: '请输入公司账号！',
                })
                return
            }
            if (!data.companyAptitude) {
                this.$message({
                    type: 'warning',
                    message: '请上传资质图片图片！',
                })
                return
            }
            this.sellerAdd(data)
        },

        // 获取的列表
        sellerCompanyList() {
            startLoading()
            const reqData = {
                pageSize: this.pageSize,
                pageNum: this.pageIndex,
            }
            sellerCompanyList(reqData).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.queryListArr = res.data.data
                    this.totalNum = res.data.count
                    this.queryListArr.map(item => {
                        item.select = false
                        item.shopList = []
                    })
                    console.log(this.queryListArr)
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
                    message: '请求失败,请刷新重试！'
                })
            })
        },
        // 获取的列表
        sellerListByCompanyId(id) {
            console.log(id)
            startLoading()
            const reqData = {
                companyId: id,
            }
            sellerListByCompanyId(reqData).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.queryListArr.map(item => {
                        if (item.id == id) {
                            item.shopList = res.data
                        }
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
                    message: '请求失败,请刷新重试！'
                })
            })
        },

        onChangeModule(id) {
            this.queryListArr.map(item => {
                console.log(item.id)
                if (item.id == id) {
                    if (!item.select) {
                        this.sellerListByCompanyId(id)
                    }
                    setTimeout(() => {
                        item.select = !item.select
                        this.$forceUpdate()
                    }, 300)

                }
            })
        },

        //点击店铺详情事件
        onChangeShopModule(id) {
            if (Object.assign(id)) {
                this.sellerDetail(id)
            }
        },

        // 获取的详情
        sellerDetail(id) {
            sellerDetail({ sellerId: id }).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.editShopCon = Object.assign({}, res.data)
                    this.onToggleShopModule()
                } else {
                    this.$message({
                        type: 'error',
                        message: '获取详情失败！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '获取详情失败！'
                })
            })
        },

        // 修改店铺判断
        editAndAddFunc(data) {
            console.log(data)
            if (!data.supplierNote) {
                this.$message({
                    type: 'warning',
                    message: '请输入店铺备注！',
                })
                return
            }
            this.sellerUpdate(data)
        },


        // 修改店铺
        sellerUpdate(data) {
            sellerUpdate(data).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.sellerCompanyList()
                    this.onToggleShopModule()
                    this.$message({
                        type: 'success',
                        message: '更新成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '更新失败'
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '添加失败'
                })
            })
        },
        // 添加公司
        sellerAdd(data) {
            sellerAdd(data).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.sellerCompanyList()
                    this.onAddCon()
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '添加失败'
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '添加失败'
                })
            })
        },
        // 冻结/解冻请求
        sellerState(data) {
            sellerState(data).then(res => {
                console.log(res)
                endLoading()
                if (res.state === 0) {
                    this.sellerCompanyList()
                    this.$message({
                        type: 'success',
                        message: `${this.content}成功`
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: `${this.content}失败`
                    })
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: `${this.content}失败`
                })
            })
        },
        // // 跳转页面
        // goToNext(id, pageType) {
        //   console.log(id, pageType)
        //   this.$router.push({name: 'test', params: {id: id, pageType: pageType}})
        // }

    },

    created() {

    },
    mounted() {
        console.log('merchant')
        console.log(this.$route.params.id)
        this.sellerCompanyList()
    },
    components: {
        MerchantCom,
        ShopCom,
    }


}