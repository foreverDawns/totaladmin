import { startLoading, endLoading } from '../common/util'
import { adminRoleList, roleDelete, roleUpdate, roleAdd, adminSysUserStatus, updateRole, queryAllByView, menuRoleBind } from "@/config/api.js"

import RoleManageCom from "../components/componentsPages/roleManageCom.vue"

export default {
  name: 'roleManage',
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
      accountName: '',
      dialogVisible: false,
      systemDialogVisible: false,
      editDetailJson: {},
      menuData: [],
      editRoleId: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },

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
      this.adminRoleList();
    },
    // 分页
    pageSizeChange(pageSize) {
      this.pageIndex = 1;
      this.pageSize = pageSize;
      this.adminRoleList();
    },

    // 隐藏模块
    handleClose(done) {
      done();
    },

    // 获取内容列表
    adminRoleList() {
      startLoading()
      const reqData = {
        pageSize: this.pageSize,
        pageNum: this.pageIndex,
        name: this.accountName != '' ? this.accountName : null,
      }
      adminRoleList(reqData).then(res => {
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
      this.adminRoleList()
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
          this.adminRoleList()
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
          this.adminRoleList()
          this.$message({
            type: 'success',
            message: '更新成功！'
          })
        } else {
          this.adminRoleList()
          this.$message({
            type: 'error',
            message: '请求失败，请刷新重试！'
          })
        }
      }).catch(() => {
        endLoading()
        this.adminRoleList()
        this.$message({
          type: 'error',
          message: '请求失败，请刷新重试！'
        })
      })
    },

    // 删除内容
    deleteHHCon(id) {
      this.$confirm('此操作将删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        startLoading()
        this.roleDelete({ roleId: id })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 删除请求
    roleDelete(data) {
      startLoading()
      roleDelete(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminRoleList()
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
      if (!data.name) {
        this.$message({
          type: 'warning',
          message: '请输入角色名称!'
        })
        return
      }
      if (!data.description) {
        this.$message({
          type: 'warning',
          message: '请输入别名!'
        })
        return
      }
      if (!data.sort) {
        this.$message({
          type: 'warning',
          message: '请输入排序!'
        })
        return
      }

      if (data.roleId) {
        this.roleUpdate(data)
      } else {
        this.roleAdd(data)
      }
    },

    // 保存修改请求
    roleUpdate(data) {
      startLoading()
      roleUpdate(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminRoleList()
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
    roleAdd(data) {
      startLoading()
      roleAdd(data).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminRoleList()
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

    


    // 显示隐藏设置角色模块
    handleShow() {
      this.dialogVisible = !this.dialogVisible
      // setTimeout(() => {
      //   this.$refs.tree.setCheckedKeys([2, 5, 6, 9]);
      // }, 100)
      this.$forceUpdate()
    },

    //  获取菜单列表以及角色配置信息
    queryAllByView(id) {
      this.editRoleId = id
      startLoading()
      queryAllByView({roleId: id}).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          console.log(res)
          if (res.data.menuList.length > 0) {
            this.menuData = res.data.menuList[0].children
            setTimeout(() => {this.$refs.tree.setCheckedKeys(res.data.haveMenuList);}, 30)
          }
          this.handleShow()
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
          message: '请求失败，请点击重试！'
        })
      })
    },
    // 获取角色列表 //点击设置角色按钮
    menuRoleBind() {
      const reqData = []
      const sleckRoleIdArr = this.$refs.tree.getCheckedKeys()
      if (sleckRoleIdArr.length > 0) {
        sleckRoleIdArr.map(item => {
          reqData.push({
            roleId: this.editRoleId,
            menuId: item
          })
        })
      } else {
        this.$message({
          type: 'warning',
          message: '请选择权限配置项！'
        })
        return
      }
      startLoading()
      menuRoleBind(reqData).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.$message({
            type: 'success',
            message: "修改成功！"
          })
          this.handleShow()
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
          message: '修改失败，请点击重试！'
        })
      })
    },

    //监听 radio 变化 
    onRadioChange($event) {
      const roleItem = this.roleData.filter(item => item.roleId == $event)
      this.editDetailJson.roleStr = roleItem[0].name
    },

    onSubmitRole(data) {
      if (!data.roleId) {
        this.$message.warning('请选择角色！')
        return
      }
      startLoading()
      updateRole({ "roleId": data.roleId, "userId": data.userId}).then(res => {
        endLoading()
        console.log(res)
        if (res.state === 0) {
          this.adminSysUserList()
          this.handleShow()
          this.$message({
            type: 'success',
            message: '修改成功！'
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
          message: '修改失败！'
        })
      })
    },


  },
  created() {
    this.adminRoleList()

  },

  components: {
    RoleManageCom,
  },
  mounted() {
    console.log('systemManage')
  },

  watch: {
    value1(res) {
      console.log(res)
    }
  }
}
