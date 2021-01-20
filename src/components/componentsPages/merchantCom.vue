<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="商家管理-添加/编辑信息" :visible.sync="addYRConDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="">
        <div class="m-b-15 goods-class-box">
          <div class="m-b-15">
            <span class="d-in-b width-120"> 商家名称：</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.supplierName"
              maxlength="24" show-word-limit>
            </el-input>
          </div>

          <!-- 商家头像： -->
          <div class="m-b-15 my-flex m-t-20">
            <span class="d-in-b width-120"><span class="red">* </span>商家头像：</span>
            <el-upload :action="fileUpdate" :limit="limit" list-type="picture-card" :file-list="logoImg"
              :on-remove="handleRemove" :on-success='uploaderSuccess'>
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>联系方式：</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.phoneNumber"
              maxlength="11" show-word-limit>
            </el-input>
          </div>
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>商家账号：</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.account">
            </el-input>
          </div>
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>商家密码：</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.password">
            </el-input>
          </div>

          <div class="m-b-15 flex-h-center">
            <span class="d-in-b width-120"><span class="red">* </span>营业执照：</span>
            <el-upload :action="fileUpdate" :limit="limit" list-type="picture-card" :file-list="descriptionImg"
              :on-remove="handleRemoveTwo" :on-success='uploaderSuccessTwo'>
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addYRConFunc(editCurrentConData)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/merchantComAction.js"></script>

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