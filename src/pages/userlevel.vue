<template>
  <div class="pages-box bg-white border-ra-15 min-height-100 p-30 m-20">
    <div class="title-box fs-16 fw-700 mb-20">积分管理-用户等级</div>
    <div class="m-b-20">
      <el-card v-for="(item, index) in listDataArr" :key="index" class="box-card">
        <el-row  
               class="m-b-20" type="flex" justify="space-between">
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
              {{item.dengji}}会员
            </h3>
          </el-col>
          <el-col :span="1">
            <span @click="onChangeModule(item)"
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
            <p style="color: #999eb4; font-size: 20px">连续消费天数：{{item.consumeNum}}</p>
          </el-col>
          <el-col :span="8">
            <p style="color: #999eb4; font-size: 20px">充值多少钱:{{item.recharge}}</p> 
          </el-col>
          <el-col :span="8">
            <p style="color: #999eb4; font-size: 20px">消费多少钱:{{item.consume}}</p>
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
        @click="onChangeModule({})"
          >添加</el-button
        ></el-col
      >
    </el-row>
     <UnerleverlCom ref="integralConsumption" :aRModuleDialogVisible="aRModuleDialogVisible" @onAddCon="onAddCon"
    :addARConFunc="addARConFunc" :aRDetailJson="aRDetailJson" ></UnerleverlCom>
    
  </div>
</template>

<script src="../action/userlevel.js"></script>


<style lang='scss' scoped>
</style>