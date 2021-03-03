<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      center
      title="店铺管理-详情信息"
      :visible.sync="shopFlag"
      width="60%"
      :before-close="handleClose"
    >
      <div class="">
        <div class="m-b-15 goods-class-box">
          <div class="color-999 fs-13 m-b-10">
            店铺名称：<span class="color-000">{{
              editCurrentConData.supplierName
            }}</span>
          </div>
          <div class="color-999 fs-13 m-b-10">
            店铺联系人：<span class="color-000">{{
              editCurrentConData.linkMan
            }}</span>
          </div>
          <div class="my-flex m-b-10">
            <div class="color-999 fs-13 flex-1">
              开业时间：<span class="color-000">{{
                dateFormat(editCurrentConData.openingTime)
              }}</span>
            </div>
            <div class="color-999 fs-13 flex-1">
              联系方式：<span class="color-000">{{
                editCurrentConData.phoneNumber
              }}</span>
            </div>
          </div>
          <div class="color-999 fs-13 m-b-10">
            地址：<span class="color-000">{{
              editCurrentConData.address
            }}</span>
          </div>
          <div class="color-999 fs-13 m-b-10">
            店铺介绍：<span class="color-000">{{
              editCurrentConData.supplierDescribe
            }}</span>
          </div>
           <div class="color-999 fs-13 my-flex m-b-20">
            <div class="">店铺资质：</div>
            <div class="flex-1 flex-wrap" v-for="(item, index) in editCurrentConData.description.split(',')" :key="index">
              <img v-if="item" :src="item" class="width-80" />
            </div>
          </div>
       
          <div class="color-999 fs-13 my-flex m-b-20">
            <div class="">店铺照片：</div>
            <div class="flex-1 flex-wrap" v-for="(item, index) in editCurrentConData.image.split(',')" :key="index">
              <img v-if="item" :src="item" class="width-80" />
            </div>
          </div>
          <div class="color-999 fs-13 my-flex m-b-20">
            <div class=""><span class="red">* </span>星级：</div>
            <div class="flex-1">
              <el-rate
                v-model="editCurrentConData.supplierStar"
                show-score
                text-color="#ff9900"
              >
              </el-rate>
            </div>
          </div>
          <div class="color-999 fs-13 my-flex m-b-20">
            <div class=""><span class="red">* </span>店铺备注：</div>
            <div class="flex-1">
              <el-input type="textarea" rows="3" class="width-500" v-model="editCurrentConData.supplierNote" placeholder="输入店铺备注"></el-input>
            </div>
          </div>
          <div class="color-999 fs-13 my-flex m-b-20">
            <div class=""><span class="red">* </span>店铺状态：</div>
            <div class="flex-1">
              <el-radio v-model="editCurrentConData.supplierStatus" :label="0">禁止</el-radio>
              <el-radio v-model="editCurrentConData.supplierStatus" :label="1">开启</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          type="primary"
          @click="editAndAddFunc(editCurrentConData)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/shopComAction.js"></script>

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
</style>
