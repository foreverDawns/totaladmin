<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="商城管理-商品规格-添加/编辑" :visible.sync="aRModuleDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="">
        <div class="m-b-15 goods-class-box">

          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>属性分类</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="detailData.specName" maxlength="24"
              show-word-limit clearable>
            </el-input>
          </div>
          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>参数值</span>
            <!-- <el-input class="width-500" type="textarea" rows="5" placeholder="请输入" v-model="detailData.specValues"
                show-word-limit clearable>
              </el-input> -->
            <el-tag :key="index" v-for="(item, index) in detailData.specValues" closable :disable-transitions="false"
              @close="handleCloseTwo(item)">
              {{item.specValue}}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 属性值</el-button>

          </div>

          <!-- <div class="m-b-15 my-flex m-t-20">
              <span class="d-in-b width-120"><span class="red">*</span>上传图片：</span>
              <span class="red fs-12">请先上传正面图片，再上传背面图片!</span>
            </div>
            <div class="m-b-15 my-flex m-t-20">
              <span class="d-in-b width-120"></span>
              <el-upload multiple :action="fileUpdate" :limit="limit" list-type="picture-card"
                :file-list="fileList" :on-remove="handleRemove"
                :on-exceed="handleExceed" :on-success='uploaderSuccess'>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>

            <div class="m-b-15 my-flex m-t-20">
              <span class="d-in-b width-120"><span class="red">*</span>固定图片：</span>
              <el-upload multiple :action="fileUpdate" :limit="limitTwo" list-type="picture-card"
                :file-list="fileListTwo" :on-remove="handleRemoveTwo"
                :on-exceed="handleExceedTwo" :on-success='uploaderSuccessTwo'>
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div> -->

        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addARConFunc(detailData, deleteValueArr)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/parameterManageComAction.js"></script>

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