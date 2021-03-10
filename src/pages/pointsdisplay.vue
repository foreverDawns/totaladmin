<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-积分展示</div>
    <div class="m-b-20">
      <div class="my-flex flex-between width-500 mb-20 fw-700">
        <div
          @click="changeModule(1)"
          :class="[
            type == '1' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
        >
          <div class=""></div>
          <div class="color-fff">充值积分</div>
        </div>
        <div
          @click="changeModule(2)"
          :class="[
            type == '2' ? 'bg-blue1' : '',
            'width-135 my-flex flex-j-center flex-l-center fs-13 border-ra-8 height-55 bg-blue',
          ]"
         >
          <div class=""></div>
          <div class="color-fff">非充值积分</div>
        </div>
      </div>
      <div>
        <div v-if="type == 1">
          <el-form ref="ruleForm" :model="ruleForm" label-width="160px">
            <el-form-item  label="充值积分失效天数：">
              <el-input clearable class="width-80"  :disabled="true"  v-model="ruleForm.isoverdueNumber"></el-input> 天
              <!-- <el-button type="primary" class="m-l-50" @click="onSubmit">保存</el-button> -->
            </el-form-item>
          
          </el-form>
        </div>

        <div v-if="type == 2">
           <el-form ref="ruleForm" :model="ruleForm" label-width="160px">
            <el-form-item label="非充值积分失效天数：">
            <el-input clearable class="width-80"   v-model="ruleForm.overdueNumber"></el-input> 天
              <el-button type="primary" class="m-l-50" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>

    <div class="clear"></div>
  </div>
</template>
<script src="../action/pointsdisplayAction.js"></script>
<style lang='scss' scoped>

</style>