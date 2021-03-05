<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="系统设置-用户管理-添加/编辑信息" :visible.sync="systemDialogVisible" width="60%"
      :before-close="handleClose">
      <div class="m-b-15 goods-class-box">
        <div class="m-t-20">
          <div class="m-b-10 my-flex">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>账号</span>
              <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.account" show-word-limit
                clearable>
              </el-input>
            </div>
            <div class="">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>姓名</span>
              <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.name" show-word-limit
                clearable>
              </el-input>
            </div>
          </div>
          <div class="m-b-10 my-flex">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>出生日期</span>
              <el-date-picker v-model="userDetails.birthday" class="width-200" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>邮箱</span>
              <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.email" show-word-limit
                clearable>
              </el-input>
            </div>
          </div>
          <div class="m-b-10 my-flex" v-if="!userDetails.userId">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>密码</span>
              <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.password" show-word-limit
                clearable>
              </el-input>
            </div>
            <!-- <div class="">
                <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>确认密码</span>
                <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.password" show-word-limit
                  clearable>
                </el-input>
              </div> -->
          </div>
          <div class="m-b-10 my-flex">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>电话</span>
              <el-input class="width-200" type="text" placeholder="请输入" v-model="userDetails.phone" maxlength="11"
                show-word-limit clearable>
              </el-input>
            </div>
          </div>
          <div class="m-b-30 my-flex">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-10"><span class="red">*</span>性别</span>
              <el-radio-group v-model="userDetails.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="m-b-30 my-flex">
            <div class="m-r-50">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>状态</span>
              <el-switch v-model="userDetails.status" active-value="1" inactive-value="2" active-color="#13ce66" inactive-color="red">
                </el-switch>
            </div>
          </div>

          <div slot="footer" class="dialog-footer" style="text-align: right;">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="addAndEditConFunc(userDetails)">确 定</el-button>
          </div>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script src="../componentsAction/systemManageComAction.js"></script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>