<template>
  <div class="goods-class">
    <div class="hpc-left-title flex-between p-15">
      <div class="hpc-left-title-img">
        <img src="@/assets/images/homeImg/dotsImg.png" alt="">
      </div>
      <div class="hpc-left-title-con fs-26">商品分类管理</div>
      <div class="flex-1 text-align-r">
        <div class="goods-add float-r "  @click='addClass'>
          <div class="goods-add-img"></div>
          <div class="goods-add-text">添加分类</div>
        </div>
      </div>
    </div>
    <!-- 分割线 -->
    <div class="dividing-line m-b-15"></div>
    <!-- 内容 -->
    <div class="goods-class-edit m-t-20 p-50 m-b-60 flex-between">
      <div class="m-b-30 goods-list m-r-20 my-flex" v-for="(item, index) in goodsClassArr" :key="index">
        <div class="goods-list-item" @mouseenter="item.content = `删除${item.className}分类`"
          @mouseleave="item.content = item.className">
          {{item.content}}{{index}}
        </div>
        <div class="goods-num-box">
          <div class="goods-title">商品</div>
          <div class="goods-content">已有个数</div>
          <div class="goods-num">{{ item.goodsNum }}</div>
        </div>
      </div>
    </div>
    <div class="m-t-20 p-50 m-b-60">
      <el-row class="box-center m-t-40 m-b-60">
        <el-button class="m-r-20" type="primary">提交</el-button>
        <el-button type="info">取消</el-button>
      </el-row>
    </div>

  </div>
</template>

<script src="../action/goodsClassAction.js"></script>

<style lang="scss" scoped>
  .goods-class {
    background: #fff;
    min-height: 100%;
    height: auto;
    border-radius: 15px;

    .goods-add {
      border-left: none;
    }

    /* 商品分类列表 */
    .goods-class-edit {
      flex-wrap: wrap;
    }

    .goods-list {
      width: 210px;
      height: 100px;
      background: #fff;
      align-content: normal;
      text-align: center;
      align-items: center;
      border-radius: 15px;
      border: 2px solid #000;
    }

    .goods-list-item {
      width: 100px;
      height: 100%;
      background: red;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 16px;
      color: #fff;
      border: 2px solid #fff;
    }

    .goods-num-box {
      flex: 1;
      font-weight: 700;
    }

    .goods-title {
      font-size: 20px;
    }

    .goods-content {
      font-size: 12px;
      color: #666;
    }

    .goods-num {
      font-size: 24px;
    }

  }

 
</style>