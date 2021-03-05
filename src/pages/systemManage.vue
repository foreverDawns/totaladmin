<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">系统设置-用户管理</div>
    <div class="order-manage-box bg-white border-ra-15 min-height-100">
      <div class="my-flex m-b-20">
        <div class="flex-1">
          <div class="my-flex">
            <div class="bg-blue p-5 border-ra-6 m-r-10">
              <span class="fs-13 blue m-r-10">账号</span>
              <el-input type="text" placeholder="请输入" class="width-135" v-model="accountNum" show-word-limit clearable>
              </el-input>
            </div>
            <div class="bg-blue p-5 border-ra-6 m-r-10">
              <span class="m-b-10 fs-13 blue m-r-10">姓名</span>
              <el-input type="text" placeholder="请输入" class="width-135" v-model="accountName" show-word-limit clearable>
              </el-input>
            </div>
            <div class="bg-blue p-5 border-ra-6 m-r-10">
              <span class="m-b-10 fs-13 blue m-r-10">手机号</span>
              <el-input type="text" placeholder="请输入" class="width-135" v-model="accountPhone" show-word-limit
                clearable>
              </el-input>
            </div>
            <!-- <div class="bg-blue p-5 border-ra-6 m-r-10">
              <span class="m-b-10 fs-13 blue m-r-10">注册时间</span>
              <el-date-picker v-model="registrationTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
              </el-date-picker>
            </div> -->

          </div>


        </div>
        <div class="my-flex flex-l-center width-200">
          <el-button class="" type="info" @click="clearConfigData">重置</el-button>
          <el-button type="primary" @click="adminSysUserList">搜索</el-button>
        </div>
      </div>

      <div class="">
        <table cellspacing="0" cellpadding="0" border="0" width="100%" class="orderC-tb">
          <thead class="orderC-th">
            <tr style="height: 60px;" class="fs-14 fw-700">
              <th width="5%">排序</th>
              <th width="10%">账号</th>
              <th width="5%">姓名</th>
              <th width="5%">性别</th>
              <th width="10%">角色</th>
              <th width="10%">邮箱</th>
              <th width="10%">电话</th>
              <th width="10%">创建时间</th>
              <th width="10%">状态</th>
              <!-- <th width="30%">操作</th> -->
              <th width="25%" class="blue fw-700" @click="onSystemBtn({})">+ 添加用户</th>
            </tr>
          </thead>
          <tbody class="table-tbody">
            <tr v-for="(item, index) in listDataArr" :key="index" class="fs-12">
              <td class="fw-700">{{ index+1 }}</td>
              <td class="p-t-10 p-b-10">{{item.account}}</td>
              <td>{{ item.name }}</td>
              <td>{{ sexArr[item.sex] ? sexArr[item.sex] : '未知' }}</td>
              <td>{{ item.roleStr }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.createTime ? dateFormat(item.createTime) : '--' }}</td>
              <td>
                <el-switch v-model="item.status" active-value="1" inactive-value="2"
                  @change="whetherToEnable($event, item.userId)" active-color="#13ce66" inactive-color="red">
                </el-switch>
              </td>

              <td class="p-t-10 p-b-10">
                <el-button class="m-b-10 m-r-5" type="danger" round @click="deleteHHCon(item.userId)">删除</el-button>
                <el-button class="m-b-10 m-r-5" type="warning" round @click="onSystemBtn(item)">修改</el-button>
                <el-button class="m-b-10 " type="primary" round @click="handleShow">分配角色</el-button>
                <!-- <el-button class="m-b-10" type="info" round @click="handleShow">修改密码</el-button> -->
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
      <el-dialog title="分配角色" center :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <div class="">
          <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
            :props="defaultProps">
          </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleShow">取 消</el-button>
          <el-button type="primary" @click="handleShow">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <SystemManageCom ref="SystemManageCom" :systemDialogVisible="systemDialogVisible" @systemHandleShow="systemHandleShow"
    :addAndEditConFunc="addAndEditConFunc" :editDetailJson="editDetailJson" ></SystemManageCom>
  </div>

</template>


<script src="../action/systemManageAction.js"></script>


<style lang="scss" scoped>

</style>