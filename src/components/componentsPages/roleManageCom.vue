<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="系统设置-角色管理-添加/编辑信息" :visible.sync="systemDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="m-b-15 goods-class-box">
        <div class="m-t-20">
          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">* </span>角色名称</span>
            <el-input class="width-300" type="text" placeholder="请输入" v-model="userDetails.name" show-word-limit
              clearable>
            </el-input>
          </div>
          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">* </span>别名</span>
            <el-input class="width-300" type="text" placeholder="请输入" v-model="userDetails.description" show-word-limit
              clearable>
            </el-input>
          </div>
          <div class="m-b-10 my-flex">
            <div class="">
              <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">* </span>排序</span>
              <el-input class="width-300" type="text" placeholder="请输入" v-model="userDetails.sort" show-word-limit
                clearable>
              </el-input>
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

<script src="../componentsAction/roleManageComAction.js"></script>

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