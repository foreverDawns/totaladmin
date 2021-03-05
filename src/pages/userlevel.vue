<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-用户等级</div>
    <div class="m-b-20 text-align-r">
      <el-button type="primary" class="fw-700" @click="onChangeModule({})">+ 添加会员</el-button>
    </div>
    
    <div class="m-b-10 " v-for="(item, index) in listDataArr" :key="index">
      <el-card class="box-card border-ra-8">
        <el-row  
               class="m-b-20" type="flex" justify="space-between">
          <el-col :span="12">
            <h3 class="fs-18 fw-700">
              {{item.dengji}}会员
            </h3>
          </el-col>
          <el-col :span="2" class="p-r-20">
            <el-button type="primary"  @click="onChangeModule(item)" round size="mini">编辑</el-button>
          </el-col>
        </el-row>

        <el-row type="flex" :gutter="20" justify="space-between">
          <el-col :span="8">
            <p class="fs-14 color-999">连续消费天数：<span class="color-000"> {{item.consumeNum}}</span></p>
          </el-col>
          <el-col :span="8">
            <p class="fs-14 color-999">充值多少钱:<span class="color-000"> {{item.recharge}}</span></p> 
          </el-col>
          <el-col :span="8">
            <p class="fs-14 color-999">消费多少钱:<span class="color-000"> {{item.consume}}</span></p>
          </el-col>
        </el-row>
      </el-card>
    </div>
    
     <UnerleverlCom ref="integralConsumption" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
    :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" ></UnerleverlCom>
    
  </div>
</template>

<script src="../action/userlevel.js"></script>


<style lang='scss' scoped>
/deep/ .el-card__body {
  padding: 15px;
}
</style>