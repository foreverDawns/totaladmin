import { startLoading, endLoading } from '../common/util'
import { adminSysUserList, adminSysUserDel, adminSysUserUpdate, adminSysUserAdd, adminSysUserStatus } from "@/config/api.js"

import SystemManageCom from "../components/componentsPages/systemManageCom.vue"

export default {
  name: 'systemManage',
  data() {
    return {
      activeName: 'all',
      listDataArr: [],
      evaluationTotal: 0,
      pageIndex: 1,
      pageSize: 10,
      serverStatus: '',//售后状态
      sexArr: {
        1: '男',
        2: '女',
      },
      accountNum: '',
      accountName: '',
      accountPhone: '',
      registrationTime: '',
      searUser: 0,
      phoneNumber: '',
      nameStr: '',
      dialogVisible: false,
      systemDialogVisible: false,
      editDetailJson: {},
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }

    }
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    // 时间格式化
    dateFormat(val, format) {
      return this.$moment(val).format(format || 'YYYY-MM-DD HH:mm:ss')
    },

    onSelectTime(e) {
      this.registrationTime = e
    },
    // 分页
    pageChange(pageIndex) {
      this.pageIndex = pageIndex;
      this.adminSysUserList();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.adminSysUserList();
    },

    // 显示设置权限模块
    handleShow() {
      this.dialogVisible = !this.dialogVisible
    },

    // 隐藏模块
    handleClose(done) {
      done();
    },

    // 获取内容列表
    adminSysUserList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        accountNum: this.accountNum != '' ? this.accountNum : null ,
        accountName: this.accountName != '' ? this.accountName : null ,
        accountPhone: this.accountPhone != '' ? this.accountPhone : null ,
        // registrationTime: this.registrationTime,//申请开始日期
      }
      adminSysUserList(reqData).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.listDataArr = res.data.data
          this.evaluationTotal = res.data.count
          console.log(this.listDataArr)
          if (res.data.data.length <= 0) {
            this.$message({
              type: 'warning',
              message: '您还相关信息！'
            })
            return
          }
          console.log(this.listDataArr)
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

    // 情况条件搜索
    clearConfigData() {
      this.accountNum = ''//售后编号
      this.accountName = ''//商品名称
      this.accountPhone = ''//发货状态
      this.registrationTime = ''
    },

    // 是否启用
    whetherToEnable($event, id) {
      console.log($event, id)
      if ($event == 2) { //1. 正常 2 禁用
        // 提示
        this.$confirm('此操作将停止启用当前账户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.onWhetherToEnable(id, $event)
        }).catch(() => {
          this.adminSysUserList()
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        // 不需要提示
        this.onWhetherToEnable(id, $event)
      }

    },
    // 禁用启用请求
    onWhetherToEnable(id, status) {
      // console.log(id, status)
      startLoading()
      adminSysUserStatus({ "userId": id, 'status': status }).then(res => {
        endLoading()
        if (res.state === 0) {
          this.adminSysUserList()
          this.$message({
            type: 'success',
            message: '更新成功！'
          })
        } else {
          this.adminSysUserList()
          this.$message({
            type: 'error',
            message: '请求失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.adminSysUserList()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      })
    },

    // 删除内容
    deleteHHCon(id) {
      this.$confirm('此操作将删除账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.adminSysUserDel({ id: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除请求
    adminSysUserDel(data) {
      startLoading()
      adminSysUserDel(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminSysUserList()
          this.$message({
            type: 'success',
            message: '删除成功！'
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
          message: '请求失败，请刷新重试！'
        })
      })
    },

    // 点击修改或添加事件
    onSystemBtn(data) {
      this.editDetailJson = { "status": "1" }
      if (Object.keys(data).length) {
        this.editDetailJson = Object.assign({}, data)
      }
      this.systemHandleShow()
    },

    // 显示添加修改
    systemHandleShow() {
      this.systemDialogVisible = !this.systemDialogVisible
    },
    // 添加 or 修改接收子组件传的值
    addAndEditConFunc(data) {
      console.log(data)
      if (!data.account) {
        this.$message({
          type: 'warning',
          message: '请输入账号！'
        })
        return
      }
      if (!data.name) {
        this.$message({
          type: 'warning',
          message: '请输入姓名！'
        })
        return
      }
      if (!data.birthday) {
        this.$message({
          type: 'warning',
          message: '请选择出生日期！'
        })
        return
      }
      if (!data.email) {
        this.$message({
          type: 'warning',
          message: '请输入邮箱！'
        })
        return
      }
      if (!data.password && data.userId) {
        this.$message({
          type: 'warning',
          message: '请输入密码！'
        })
        return
      }

      if (!data.phone) {
        this.$message({
          type: 'warning',
          message: '请输入电话！'
        })
        return
      }
      if (!data.sex) {
        this.$message({
          type: 'warning',
          message: '请选择性别！'
        })
        return
      }
      if (!data.status) {
        this.$message({
          type: 'warning',
          message: '请选择状态！'
        })
        return
      }
      if (data.userId) {
        this.adminSysUserUpdate(data)
      } else {
        this.adminSysUserAdd(data)
      }
    },

    // 保存修改请求
    adminSysUserUpdate(data) {
      startLoading()
      adminSysUserUpdate(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminSysUserList()
          this.systemHandleShow()
          this.$message({
            type: 'success',
            message: '保存成功！'
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
    // 添加请求
    adminSysUserAdd(data) {
      startLoading()
      adminSysUserAdd(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminSysUserList()
          this.systemHandleShow()
          this.$message({
            type: 'success',
            message: '添加成功！'
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
          message: '请求失败，请刷新重试！'
        })
      })
    },


  },
  created() {
    this.adminSysUserList()
  },

  components: {
    SystemManageCom,
  },
  mounted() {
    console.log('systemManage')
    // this.$notify({
    //   title: '账户/密码',
    //   message: `您的新账户密码：123456`,
    //   duration: 0,
    //   type: 'success'
    // });
  },

  // comments: {
  //   GoodsManage,
  // }
}
