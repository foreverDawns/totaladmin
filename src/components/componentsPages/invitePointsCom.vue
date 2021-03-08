<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      center
      :title="title"
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
        <el-form-item label="邀请人数" prop="inviteNum">
          <el-input class="width-500" v-model="ruleForm.inviteNum"></el-input>
        </el-form-item>
        <el-form-item label="获得积分" prop="integralNum">
          <el-input class="width-500" v-model="ruleForm.integralNum"></el-input>
        </el-form-item>
        <el-form-item label="概率" prop="probability">
          <el-input class="width-500" v-model="ruleForm.probability"></el-input>
        </el-form-item>
        <el-form-item label="获得奖励" >
          <div class="m-b-10">
            <span> 纪念品：</span>
            <el-select v-model="ruleForm.zhoubianIds" multiple placeholder="请选择" @change="onTest" >
              <el-option
                  v-for="(item, index) in jinianpin "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <span class="m-l-40"> 卷包：</span>
            <el-select v-model="ruleForm.quanbaoIds" multiple placeholder="请选择">
                <el-option
                  v-for="(item, index) in juanbao "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
              <span class="m-l-40">门票券包：</span>
            <el-select v-model="ruleForm.quanbaoMenpiaoIds" multiple placeholder="请选择">
               <el-option
                  v-for="(item, index) in menjuanbao "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
            <div class="">
                <span > 十宝卡：</span>
            <el-select v-model="ruleForm.shibaoIds" multiple placeholder="请选择">
              <el-option
                  v-for="(item, index) in shibai "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
           

            <span class="m-l-40"> 礼品：</span>
            <el-select v-model="ruleForm.giftIds" multiple placeholder="请选择">
               <el-option
                  v-for="(item, index) in lipin "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
             <span class="m-l-40" >免费门票：</span>
            <el-select v-model="ruleForm.jingquMenpiaoIds" multiple placeholder="请选择">
               <el-option
                  v-for="(item, index) in mianmenpiao "
                :key="index"
                 :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
           
          </div>
        </el-form-item>
        <el-form-item label="有效时间" prop="validHour">
          <el-input class="width-500" v-model="ruleForm.validHour"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addARConFunc(ruleForm)"
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