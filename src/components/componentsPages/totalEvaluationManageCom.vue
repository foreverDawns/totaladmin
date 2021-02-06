<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="申诉处理" :visible.sync="moduleFlag" width="60%"
      :before-close="handleClose">
      <div class="tree-box">
        <div class="m-b-15 goods-class-box">
          <div class="fw-700 fs-32 color-000 text-align-c m-t-105" v-if="styleStatus == 2">
            同意该条申诉审核内容通过,审核成功后确定即删除该条评论!
          </div>
          <div v-else class="text-align-c">
            <div class="fs-16 text-align-c m-b-20">拒绝申诉原因</div>
            <div class="m-t-40 width-360 margin-auto">
              <el-input v-model="textAreaCon" rows="10" type="textarea" placeholder="请输入拒绝原因"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSaveData(detailData, textAreaCon)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/totalEvaluationManageComAction.js"></script>

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

  .el-tag+.el-tag {
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

  .tree-box {
    height: 500px;
    overflow: auto;
  }
</style>