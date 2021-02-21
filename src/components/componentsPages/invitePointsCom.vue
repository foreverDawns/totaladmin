<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      center
      title="积分管理-邀请盲盒池-添加"
      :visible.sync="aRModuleDialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="邀请人数" prop="name">
          <el-input class="width-500" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="获得积分" prop="name">
          <el-input class="width-500" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="概率" prop="name">
          <el-input class="width-500" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="获得奖励" prop="name">
          <el-cascader
            class="width-500"
            v-model="ruleForm.name"
            :options="options"
            :props="{ multiple: true }"
            filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="获得奖励时间" prop="name">
          <el-input class="width-500" v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="aRModuleDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addARConFunc(detailData, deleteValueArr)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/invitePointsComAction.js"></script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>