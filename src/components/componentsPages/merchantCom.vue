<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="公司管理-添加/详情信息" :visible.sync="addYRConDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="">
        <div class="m-b-15 goods-class-box">
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>公司名称：</span>
            <el-input  :disabled="editCurrentConData.id ? true : false" class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.companyName"
              maxlength="24" show-word-limit>
            </el-input>
          </div>

          <!-- 商家头像： -->
          <!-- <div class="m-b-15 my-flex m-t-20">
            <span class="d-in-b width-120"><span class="red">* </span>公司头像：</span>
            <el-upload :action="fileUpdate" :limit="limit" list-type="picture-card" :file-list="editCurrentConData.logoImg"
              :on-remove="handleRemove" :on-success='uploaderSuccess'>
              <i class="el-icon-plus"></i>
            </el-upload>
          </div> -->
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>联系方式：</span>
            <el-input :disabled="editCurrentConData.id ? true : false" class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.headPhone"
              maxlength="11" show-word-limit>
            </el-input>
          </div>
          <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>公司账号：</span>
            <el-input class="width-500" :disabled="editCurrentConData.id ? true : false" type="text" placeholder="请输入" v-model="editCurrentConData.loginName">
            </el-input>
          </div>
          <!-- <div class="m-b-15">
            <span class="d-in-b width-120"><span class="red">* </span>公司密码：</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="editCurrentConData.password">
            </el-input>
          </div> -->

          <div class="m-b-15 flex-h-center">
            <span class="d-in-b width-120"><span class="red">* </span>营业执照：</span>
            <el-upload :action="fileUpdate" :disabled="editCurrentConData.id ? true : false" :limit="limitTwo" list-type="picture-card" multiple :file-list="fileListTwo"
              :on-remove="handleRemoveTwo" :on-success='uploaderSuccessTwo' :on-exceed="handleExceedTwo">
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="!editCurrentConData.id" type="primary" @click="addYRConFunc(editCurrentConData)">确 定</el-button>
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