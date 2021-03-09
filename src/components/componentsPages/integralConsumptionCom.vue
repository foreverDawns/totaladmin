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
        <el-form-item label="活动期限" prop="createTime">
          <el-date-picker
          @focus="clickStartTime"
            :picker-options="startTimeOptions"
            style="width: 500px"
            type="date"
            v-model="ruleForm.createTime"
       
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束" prop="endTime">
          <el-date-picker
          :picker-options="endTimeOptions"
            style="width: 500px"
            type="date"
            v-model="ruleForm.endTime"
           @focus="clickEndTime"
          ></el-date-picker>
          <!-- <el-input class="width-500" v-model="ruleForm.endTime"></el-input> -->
        </el-form-item>
        <el-form-item label="活动店铺" prop="supplierName">
          <!-- <el-input class="width-500" v-model="ruleForm.supplierName"></el-input> -->
          <el-select style="width: 500px" v-model="ruleForm.supplierName" @change="onShop($event)">
            <el-option
              v-for="(item, index) in shop"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动产品" prop="skuName">
          <!-- <el-input class="width-500" v-model="ruleForm.skuName"></el-input> -->
            <el-select style="width: 500px" v-model="ruleForm.skuName" @change="skuNamehange()"  >
            <el-option  
            v-for="(item, index) in product"
              :key="index"
              :label="item.name"
              :value="item.skuId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户等级" prop="membersId">
          <!-- <el-input class="width-500" v-model="ruleForm.membersId"></el-input> -->
          <el-select  style="width: 500px" v-model="ruleForm.membersId" @change="onMembersList()">
            <el-option
              v-for="(item, index) in MembersList"
              :key="index"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="积分配比" prop="integralMatching">
          <el-input
            class="width-500"
            placeholder="1：2000"
            v-model="ruleForm.integralMatching"
          ></el-input>
        </el-form-item>
        <el-form-item label="返还积分" prop="returnsIntegral">
          <el-input
            class="width-500"
            v-model="ruleForm.returnsIntegral"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="addARConFunc(ruleForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/integralConsumptionComAction.js"></script>

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