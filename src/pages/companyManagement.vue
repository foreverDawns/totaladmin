<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">置换-置换公司管理</div>
    <table
      cellspacing="0"
      cellpadding="0"
      border="0"
      width="100%"
      class="orderC-tb"
    >
      <thead class="orderC-th">
        <tr style="height: 60px" class="fs-14 fw-700">
          <th width="5%">序号</th>
          <th width="10%">公司头像</th>
          <th width="10%">公司名称</th>
          <th width="15%">联系方式</th>
          <th width="15%">公司账号</th>
          <th width="15%">营业执照</th>
          <th width="15%">创建时间</th>
          <th width="15%" @click="aRModuleDialogVisible = true">添加</th>
        </tr>
      </thead>
      <tbody class="table-tbody">
        <tr class="fs-12" v-for="(i, index) in listDataArr" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ i.productName }}</td>
          <td>{{ i.productName }}</td>
          <td>{{ i.productName }}</td>
          <td>{{ i.productName }}</td>
          <td class="p-t-10 p-b-10">{{ i.updateTime }}</td>
          <td>
            <el-switch
              v-model="i.status"
              disabled
              active-value="0"
              inactive-value="1"
            >
            </el-switch>
          </td>
          <td>
            <el-button type="info" round @click="details(i.id)">详情</el-button>
            <el-button type="primary" round @click="editARCon(i.id)"
              >编辑</el-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <div class="clear"></div>
    <div class="fenye" v-if="listDataArr.length > 0">
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageChange"
        :current-page="pageIndex"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
      >
      </el-pagination>
    </div>
    <div>
      <el-dialog
        :close-on-click-modal="false"
        center
        title="置换-置换商品管理-详情"
        :visible.sync="aRModuleDialogVisible"
        width="60%"
        
      >
      <!-- :before-close="handleClose" -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
        >
          <el-form-item label="商家名称" prop="consume">
            <el-input class="width-500" v-model="ruleForm.consume"></el-input>
          </el-form-item>
          <el-form-item label="商家头像" prop="consume">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="联系方式" prop="consume">
            <el-input class="width-500" v-model="ruleForm.consume"></el-input>
          </el-form-item>
          <el-form-item label="商家账号" prop="consume">
            <el-input class="width-500" v-model="ruleForm.consume"></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="consume">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { startLoading, endLoading } from "@/common/util";
import { replaceProductPriceNumReplaceProductPriceNumList } from "@/config/api.js";
export default {
  name: "",
  data() {
    return {
      ruleForm: {},
      rules: {},

      aRModuleDialogVisible: false,
      listDataArr: [],
      imageUrl: "1",
      pageIndex: 1,
      pageSize: 10,
      listTotal: 1,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    pageChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    getList() {
      startLoading();
      replaceProductPriceNumReplaceProductPriceNumList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      }).then((res) => {
        endLoading();
        this.listDataArr = res.data;
        this.listTotal = res.data.length;
      }).catch(() => {
        endLoading()
      })
    },
  },
};
</script>
<style lang='scss' scoped>
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