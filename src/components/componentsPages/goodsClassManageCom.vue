<template>
  <div>
    <el-dialog :close-on-click-modal="false" center title="商城管理-商品分类-添加/编辑" :visible.sync="aRModuleDialogVisible"
      width="60%" :before-close="handleClose">
      <div class="min-height-60vh tree-box">
        <div class="m-b-15 goods-class-box">

          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>分类名称</span>
            <el-input class="width-500" type="text" placeholder="请输入" v-model="detailData.name" maxlength="24"
              show-word-limit clearable>
            </el-input>
          </div>
          <div class="">
            <span class="d-in-b width-120 fs-14 m-b-30"><span class="red">*</span>父级编号</span>
            <el-input class="width-500" type="text" rows="5" placeholder="请选择层级" disabled="" v-model="levelName" show-word-limit
              clearable>
            </el-input>
          </div>
          <div>
            <span class="d-in-b width-120 fs-14 m-b-30">层级选择</span>
            <div class="" v-if="dataListArr.length > 0">
              <el-tree :data="dataListArr" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addARConFunc(detailData)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/goodsClassManageComAction.js"></script>

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