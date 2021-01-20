<template>
  <el-container>
    <!-- 商品管理 header -->
    <el-header>
      <div class="order-header">
        <router-link to="/evaluation">
          <div class="order-manage">评价管理</div>
        </router-link>
        <!-- <router-link to="/ordersShipping"> -->
          <div class="order-class-manage">
            <div class="order-class-img"></div>
            <div class="order-class-text">导出</div>
          </div>
        <!-- </router-link> -->
        <div class="order-search-box">
          <!-- <div class="order-search"></div> -->
          <img class="order-search-img" src="../assets/images/goodsImg/goodsSearch.png" alt="">
        </div>
        <el-dropdown class="order-fitter m-r-20">
          <div class="el-icon-setting1" style="margin-right: 15px">
            <img class="order-fitter-img" src="../assets/images/goodsImg/goodsFitter.png" alt="">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>默认排序</el-dropdown-item>
            <el-dropdown-item>销量排序</el-dropdown-item>
            <el-dropdown-item>新品排序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-main class="order-content">
      <router-view :changeValue='changeValue'></router-view>
    </el-main>
  </el-container>
</template>

<script src="../action/evaluationShellAction.js">

</script>

<style lang="scss" scoped>
  /* 订单管理 header */
  .el-header {
    height: 90px !important;
    background: #fff;
    padding: 0;
  }

  .order-header {
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 700;

    .order-manage {
      font-size: 18px;
      color: #333;
      width: 120px;
    }

    .order-class-manage {
      border-left: 3px solid #e4e4e4;
      width: 100px;
      font-weight: 700;
      font-style: normal;
      color: black;
      font-size: 14px;
    }

    .order-class-img {
      width: 40px;
      height: 40px;
      background: url(../assets/images/ordersImg/orderBulkShippingOne.png) no-repeat 100% 100%;
      margin: 0 auto;
    }

    .order-class-manage:hover {
      color: #4890f7;

      .order-class-img {
        width: 40px;
        height: 40px;
        background: url(../assets/images/ordersImg/orderBulkShippingTwo.png) no-repeat 100% 100%;
        margin: 0 auto;
      }
    }

    .order-search-box {
      flex: 1;
      text-align: right;
    }

    .order-search-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .order-search-img:hover {
      background: rgba(228, 228, 228, 1);
    }

    .order-fitter {
      width: 100px;
    }

    .order-fitter-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .order-fitter-img:hover {
      background: rgba(228, 228, 228, 1);
    }
  }

  /* 内容 */
  .order-content {}
</style>