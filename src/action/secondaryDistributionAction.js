import { startLoading, endLoading } from '../common/util'
import { distrList, distrState, distrAdd, distrUpdate, distrDel, integralQuery, integralSave } from "@/config/api.js"
import SecondaryDistributionCom from '../components/componentsPages/secondaryDistributionCom.vue'
export default {
    name: 'secondaryDistribution',
    data() {
        return {
            aRModuleDialogVisible: false,
            listDataArr: [],
            aRDetailJson: {},
            pageIndex: 1,
            pageSize: 10,
            listTotal: 0,
            oneorderSn: "",
            twoorderSn: "",
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
            this.aRModuleDialogVisible = !this.aRModuleDialogVisible
        },

        // 点击添加或编辑事件
        onChangeModule(data) {
            if (JSON.stringify(data) == '{}') {
                data.titleName = '积分管理-二级分销-新增配比'
            } else {
                data.titleName = '积分管理-二级分销-编辑配比'
            }
            console.log('详情的值', data)
            this.aRDetailJson = Object.assign({}, data)
            this.onAddCon()
        },
            //一级默认区间值 查询
            oneIntegralQuery(){
                startLoading()
                const reqData = {
                    type : '0',
                }
                integralQuery(reqData).then(res => {
                    endLoading()
                    console.log(res)
                    if (res.state === 0) {
                        this.oneorderSn = res.data
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
                      //二级默认区间值 查询
                      twoIntegralQuery(){
                        startLoading()
                        const reqData = {
                            type : '1',
                        }
                        integralQuery(reqData).then(res => {
                            endLoading()
                            console.log(res)
                            if (res.state === 0) {
                                this.twoorderSn = res.data
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
            // 一级保存区间值
            oneDistribution(){
                if (!this.oneorderSn ) {
                    this.$message({
                        type: 'warning',
                        message: '请输入一级默认区间值！'
                    })
                    return
                }
         
                const data = {
                    type : '0',
                    length:this.oneorderSn
                }
                startLoading()
                integralSave(data).then(res => {
                    endLoading()
                    if (res.state === 0) {
                        this.$message({
                            type: 'success',
                            message: '一级默认区间值保存成功！'
                        })
                        this.specList()
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
                // 二级保存区间值
                twoDistribution(){
                    if (!this.twoorderSn ) {
                        this.$message({
                            type: 'warning',
                            message: '请输入二级默认区间值！'
                        })
                        return
                    }
             
                    const data = {
                        type : '1',
                        length:this.twoorderSn
                    }
                    startLoading()
                    integralSave(data).then(res => {
                        endLoading()
                        if (res.state === 0) {
                            this.$message({
                                type: 'success',
                                message: '二级默认区间值保存成功！'
                            })
                            this.specList()
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

        // 获取列表
        specList() {
            startLoading()
            distrList({
                // "getAwy": 6,
                "pageIndex": this.pageIndex,
                "pageSize": this.pageSize,
            }).then(res => {
                endLoading()
                if (res.state == 0) {
                    this.listDataArr = res.data.data;
                    this.listTotal = res.data.count;
                    if (this.listDataArr.length < 1) {
                        this.$message.warning('无二级分销积分列表！')
                    }
                } else {
                    this.$message.error('请求失败，请刷新重试！')
                }

            }).catch(() => {
                endLoading()
                this.$message.error('请求失败，请刷新重试！')
            })
        },
        // 禁用启用请求
        whetherToEnable( status,id) {
    
            if (status === 1) { //1 启用 2 禁用
                // 提示
                this.$confirm('此操作将禁用当前商品, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.onWhetherToEnable( status,id)
                }).catch(() => {
                  this.specList()
                  this.$message({
                    type: 'info',
                    message: '已取消'
                  });
                });
              } else {
                // 不需要提示
                this.onWhetherToEnable( status,id)
              }
            
        },
        // 是否启用
        onWhetherToEnable( status,id){
            startLoading()
            distrState({ "id": id, 'status': status }).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.$message({
                        type: 'success',
                        message: '更新成功！'
                    })
                } else {
                    this.specList()
                    this.$message({
                        type: 'error',
                        message: '请求失败，请刷新重试！'
                    })
                }
            }).catch(() => {
                endLoading()
                this.specList()
                this.$message({
                    type: 'error',
                    message: '请求失败，请刷新重试！'
                })
            })
        },
      

        // 子传父
        addARConFunc(data) {
            console.log('54654')
            console.log(data)
            if (!data.supplierName) {
                this.$message({
                    type: 'warning',
                    message: '请输入活动店铺！'
                })
                return
            }
            if (!data.productName) {
                this.$message({
                    type: 'warning',
                    message: '请输入活动产品！'
                })
                return
            }
            if (!data.distributionOne) {
                this.$message({
                    type: 'warning',
                    message: '请输入一级分销！'
                })
                return
            }
            if (!data.distributionTwo) {
                this.$message({
                    type: 'warning',
                    message: '请输入二级分销！'
                })
                return
            }
            if (data.id) {
                this.distrUpdate(data)
              
            } else {
                this.distrAdd(data)
                
            }
        },
        // 添加
        distrAdd(data) {
            startLoading()
            distrAdd(data).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.onAddCon()
                    this.$message({
                        type: 'success',
                        message: '二级分销新增配比保存成功'
                    })
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
        // 修改
        distrUpdate(data) {
            startLoading()
            distrUpdate(data).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.onAddCon()
                    this.$message({
                        type: 'success',
                        message: '二级分销编辑配比保存成功'
                    })
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
        // 删除方法
        deleteHHCon(id) {
            this.$confirm('此操作将删除内容, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                startLoading()
                this.delMatchingInfo({ id: id })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        delMatchingInfo(reqJson) {
            distrDel(reqJson).then(res => {
                endLoading()
                if (res.state === 0) {
                    this.specList()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            }).catch(() => {
                endLoading()
                this.$message({
                    type: 'error',
                    message: '删除失败!'
                });
            })
        },
    },





    created() {
        this.specList()
        this.oneIntegralQuery()
        this.twoIntegralQuery()
    },
    mounted() {

    },
    components: {
        SecondaryDistributionCom,
    }


}
