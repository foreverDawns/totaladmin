<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">系统设置-角色管理</div>
    <div class="order-manage-box bg-white border-ra-15 min-height-100">
      <div class="my-flex m-b-20">
        <div class="flex-1">
          <div class="my-flex">
            <div class="bg-blue p-5 border-ra-6 m-r-10">
              <span class="m-b-10 fs-13 blue m-r-10">角色名称</span>
              <el-input type="text" placeholder="请输入" class="width-135" v-model="accountName" show-word-limit clearable>
              </el-input>
            </div>
          </div>
        </div>
        <div class="my-flex flex-l-center width-200">
          <el-button class="" type="info" @click="clearConfigData">重置</el-button>
          <el-button type="primary" @click="adminRoleList">搜索</el-button>
        </div>
      </div>

      <div class="">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
          <thead class="orderC-th">
            <tr style="height: 60px;" class="fs-14 fw-700">
              <th width="10%">排序</th>
              <th width="30%">名称</th>
              <th width="30%">别名</th>
              <!-- <th width="30%">操作</th> -->
              <th width="30%" class="blue fw-700" @click="onSystemBtn({})">+ 添加角色</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr v-for="(item, index) in listDataArr" :key="index" class="fs-12">
              <td class="fw-700">{{ index+1 }}</td>
              <td class="p-t-10 p-b-10">{{item.name}}</td>
              <td>{{ item.description }}</td>
              <td class="m-b-10 m-t-10">
                <el-button class="m-r-5" type="danger" round @click="deleteHHCon(item.roleId)">删除</el-button>
                <el-button class="m-r-5" type="warning" round @click="onSystemBtn(item)">修改</el-button>
                <el-button class="" type="primary" round @click="handleShow">权限配置</el-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分页 -->
      <div class="fenye" v-if="listDataArr.length > 0">
        <el-pagination @size-change="pageSizeChange" @current-change="pageChange" :current-page="pageIndex"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="evaluationTotal">
        </el-pagination>
      </div>
      <div style="height: 60px;"></div>
      <el-dialog title="配置权限" center :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <div class="block">
          <span class="demonstration">默认显示所有Tag</span>
          <el-tree
            :data="data"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            @check-change= 'onCheckChange'
            highlight-current
            :props="defaultProps">
          </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleShow">取 消</el-button>
          <el-button type="primary" @click="adminRoleList123456789">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <RoleManageCom ref="SystemManageCom" :systemDialogVisible="systemDialogVisible" @systemHandleShow="systemHandleShow"
    :addAndEditConFunc="addAndEditConFunc" :editDetailJson="editDetailJson" ></RoleManageCom>
   
  </div>

</template>


<script src="../action/roleManageAction.js"></script>


<style lang="scss" scoped>

</style>