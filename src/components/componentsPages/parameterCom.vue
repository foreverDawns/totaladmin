<template>
  <div>
    <el-dialog :close-on-click-modal="false" center
      :title="editCurrentConData.titleId ? editTitle[dataType] : addTitle[dataType]" :visible.sync="shopModuleFlag"
      width="60%" :before-close="handleClose">
      <div class="m-b-15 goods-class-box" v-if="dataType == 1 || dataType == 3 || dataType == 4">
        <div class="m-b-15">
          <span class="d-in-b width-120"><span class="red">* </span>是否启用：</span>
          <el-switch v-model="editCurrentConData.delFlag" :active-value="0" :inactive-value="2" active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="m-b-15">
          <span class="d-in-b width-120"><span class="red">* </span>参数标题：</span>
          <el-input class="width-300" type="text" placeholder="请输入" @input="inputChange($event)"
            v-model="editCurrentConData.paramName" maxlength="10" show-word-limit>
          </el-input>
        </div>
        <div class="my-flex flex-l-center m-b-10" v-for="(item, index) in editCurrentConData.canshuPOS" :key="index">
          <div class="m-r-20">
            <div class="m-b-10">
              <span class="d-in-b width-120"><span class="red">* </span>参数选项：</span>
              <el-input class="width-400" type="text" placeholder="请输入" @input="inputChange($event)"
                v-model="item.paramValue" maxlength="30" show-word-limit>
              </el-input>
            </div>
            <div class="m-b-15" v-if="dataType == 1 || dataType == 4">
              <span class="d-in-b width-120"><span class="red">* </span>参数选项：</span>
              <el-input class="width-400" type="text" placeholder="请输入" @input="inputChange($event)"
                v-model="item.content" maxlength="30" show-word-limit>
              </el-input>
            </div>
          </div>
          <div class="width-80 text-align-c">
            <div class="m-b-10" v-if="editCurrentConData.canshuPOS.length != 1">
              <el-button size="mini" type="primary" @click="onDeleteReplaceSupplier(index)">删除</el-button>
            </div>
            <div class="">
              <el-button size="mini" type="danger" v-if="editCurrentConData.canshuPOS.length-1 == index"
                @click="onAddReplaceSupplier()">添加</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="m-b-15 goods-class-box" v-if="dataType == 2">
        <div class="m-b-15">
          <span class="d-in-b width-120"><span class="red">* </span>是否启用：</span>
          <el-switch v-model="editCurrentConData.delFlag" :active-value="0" :inactive-value="2" active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </div>
        <div class="m-b-15">
          <span class="d-in-b width-120"><span class="red">* </span>主要参数：</span>
          <el-input class="width-300" type="text" placeholder="请输入" @input="inputChange($event)"
            v-model="editCurrentConData.paramName" maxlength="10" show-word-limit>
          </el-input>
        </div>
        <div class="m-b-15 my-flex m-t-20">
          <span class="d-in-b width-120"><span class="red">* </span>参数图片：</span>
          <el-upload :action="fileUpdate" :limit="limit" list-type="picture-card"
            :file-list="editCurrentConData.canshuPOS[0].imageArr" :on-remove="handleRemove" :on-success='uploaderSuccess'>
            <i class="el-icon-plus"></i>
          </el-upload>
        </div>
      </div>

      <div slot="footer" class="dialog-footer" style="text-align: right;">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="!editCurrentConData.id" type="primary" @click="onShopAddAndEditfunc(editCurrentConData)">确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="../componentsAction/parameterComAction.js"></script>

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