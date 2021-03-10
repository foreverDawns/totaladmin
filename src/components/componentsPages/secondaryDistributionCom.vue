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
        <el-form-item label="活动店铺" prop="supplierName">
             <el-select style="width: 500px" v-model="ruleForm.supplierName" @change="onShop($event)">
            <el-option
              v-for="(item, index) in shop"
              :key="index"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动产品" prop="productName">
             <el-select style="width: 500px" v-model="ruleForm.productName"  @change="productName($event)" >
            <el-option  
            v-for="(item, index) in product"
              :key="index"
              :label="item.value"
              :value="item.key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级分销" prop="distributionOne">
          <el-input class="width-500" v-model="ruleForm.distributionOne"></el-input>
        </el-form-item>
        <el-form-item label="二级分销" prop="distributionTwo">
          <el-input class="width-500" v-model="ruleForm.distributionTwo"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: right">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="addARConFunc(ruleForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/secondaryDistributionComAction.js"></script>

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