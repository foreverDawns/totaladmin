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
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="addARConFunc(ruleForm, options)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script src="../componentsAction/userlevelCom.js"></script>
