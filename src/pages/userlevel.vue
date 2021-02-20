<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-用户等级</div>
    <div class="m-b-20">
      <el-card class="box-card">
        <el-row class="m-b-20" type="flex" justify="space-between">
          <el-col :span="12">
            <h3
              style="
                font-size: 23px;
                font-family: Microsoft YaHei UI;
                font-weight: bold;
                color: #333333;
                line-height: 4px;
              "
            >
              黄金会员
            </h3>
          </el-col>
          <el-col :span="1">
            <span
              style="
                display: inline-block;
                width: 50px;
                height: 24px;
                background: #9698d6;
                border-radius: 12px;
                text-align: center;
                color: #fff;
              "
              >编辑</span
            >
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="20" justify="space-between">
          <el-col :span="8">
            <p style="color: #999eb4; font-size: 20px">连续消费天数：8</p>
          </el-col>
          <el-col :span="8">
            <p style="color: #999eb4; font-size: 20px">充值多少钱:500</p>
          </el-col>
          <el-col :span="8">
            <p style="color: #999eb4; font-size: 20px">消费多少钱:20</p>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-row type="flex" justify="center">
      <el-col :span="4">
        <el-button
          style="
            width: 190px;
            height: 80px;
            background: #becbf7;
            border-radius: 8px;
            font-size: 24px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #4d4cac;
            line-height: 28px;
            margin: 0 auto;
          "
          @click="aRModuleDialogVisible = true"
          >添加</el-button
        ></el-col
      >
    </el-row>

    <div>
      <el-dialog
        :close-on-click-modal="false"
        center
        title="积分管理-添加用户"
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
          <el-form-item label="消费钱数" prop="consume">
            <el-input class="width-500" v-model="ruleForm.consume"></el-input>
          </el-form-item>
          <el-form-item label="消费天数" prop="consumeNum">
            <el-input
              class="width-500"
              v-model="ruleForm.consumeNum"
            ></el-input>
          </el-form-item>
          <el-form-item label="充值钱数" prop="recharge">
            <el-input class="width-500" v-model="ruleForm.recharge"></el-input>
          </el-form-item>
          <el-form-item label="会员等级" prop="levelSign">
            <el-select
              v-model="ruleForm.levelSign"
              class="width-500"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right">
          <el-button @click="aRModuleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addARConFunc()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { startLoading, endLoading } from "@/common/util";
import { membersSetmembersSet } from "@/config/api.js";
export default {
  name: "",
  data() {
    return {
      aRModuleDialogVisible: false,
      ruleForm: {
        consume: "",
        consumeNum: "",
        recharge: "",
        levelSign: "",
      },
      rules: {
        consume: [{ required: true, message: "请输入内容", trigger: "blur" }],
        consumeNum: [
          { required: true, message: "请输入内容", trigger: "blur" },
        ],
        recharge: [{ required: true, message: "请输入内容", trigger: "blur" }],
        levelSign: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      options: [
        { value: 1, label: "普通" },
        { value: 2, label: "黄金" },
        { value: 3, label: "皇冠" },
      ],
    };
  },
  methods: {
    addARConFunc() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          startLoading();
          membersSetmembersSet(this.ruleForm)
            .then((res) => {
              endLoading();
              if (res.state === 0) {
                this.$message({
                  type: "success",
                  message: "添加用户成功！",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "请求失败，请刷新重试！",
                });
              }
              this.aRModuleDialogVisible = false;
            })
            .catch(() => {
              endLoading();
              this.$message({
                type: "error",
                message: "请求失败，请刷新重试！",
              });
            });
        }
      });
    },
    handleClose() {
      this.aRModuleDialogVisible = false;
    },
  },
};
</script>

<style lang='scss' scoped>
</style>