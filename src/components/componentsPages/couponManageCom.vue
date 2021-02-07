<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="优惠券-详情" :visible.sync="aRModuleDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="fs-16">
        <div class="m-b-15 goods-class-box my-flex flex-between">
          <div class="flex-1">优惠券名称：{{ detailData.name }}</div>
          <div class="flex-1">优惠券额度/元：{{ detailData.money }}</div>
          <div class="flex-1">消费满/元：{{ detailData.fullMoney }}</div>
        </div>
        <div class="m-b-15 goods-class-box my-flex flex-between">
          <div class="flex-1">有效期：{{ dateFormat(detailData.startTime)}} - {{dateFormat(detailData.endTime) }}</div>
          <div class=""></div>
          <div class="flex-1">已使用：{{detailData.useNum}}</div>
        </div>


      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <!-- <el-button type="primary" @click="addARConFunc(detailData, deleteValueArr)">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/couponManageComAction.js"></script>

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