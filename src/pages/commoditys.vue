<template>
  <el-container>
    <!-- 商品管理 header -->
    <el-header>
      <div class="goods-header">
        <router-link to="/commoditys">
          <div class="goods-manage">商品管理</div>
        </router-link>
        <router-link :to="{name: 'goodsAddAndEdit', params:{id:`add`}}">
          <div class="goods-add">
            <div class="goods-add-img"></div>
            <div class="goods-add-text">商品添加</div>
          </div>
        </router-link>
        <!-- <router-link to="/goodsClass">
          <div class="goods-class-manage">
            <div class="goods-class-img"></div>
            <div class="goods-class-text">分类管理</div>
          </div>
        </router-link> -->
        <div class="goods-search-box">
          <!-- <div class="goods-search"></div> -->
          <img class="goods-search-img" src="../assets/images/goodsImg/goodsSearch.png" alt="">
        </div>
        <el-dropdown class="goods-fitter">
          <div class="el-icon-setting1" style="margin-right: 15px">
            <img class="goods-fitter-img" src="../assets/images/goodsImg/goodsFitter.png" alt="">
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>默认排序</el-dropdown-item>
            <el-dropdown-item>销量排序</el-dropdown-item>
            <el-dropdown-item>新品排序</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="goods-change-look" @click="changeClassStyle">
          <router-link to="/commoditys">
            <img v-if="changeValue === true" class="goods-look-img" src="../assets/images/goodsImg/goodsLookTwo.png"
              alt="">
            <img v-else class="goods-look-img" src="../assets/images/goodsImg/goodsLookOne.png" alt="">
            <div class="goods-look-text">切换查看</div>
          </router-link>
        </div>
      </div>
    </el-header>
    <!-- 内容 -->
    <el-main class="goods-content">
      <router-view :changeValue='changeValue'></router-view>
    </el-main>
  </el-container>
</template>

<script src="../action/commoditysAction.js">

</script>

<style lang="scss" scoped>
  /* 商品管理 header */
  .el-header {
    height: 90px !important;
    background: #fff;
    padding: 0;
  }

  .goods-header {
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 700;

    .goods-manage {
      font-size: 18px;
      color: #333;
      width: 120px;
    }

    /* .goods-add {
      border-left: 3px solid rgba(228, 228, 228, 1);
      width: 100px;
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      color: black;
    }

    .goods-add-img {
      width: 40px;
      height: 40px;
      background: url(../assets/images/goodsImg/goodsAddOne.png) no-repeat 100% 100%;
      margin: 0 auto;
    }

    .goods-add:hover {
      color: #4890f7;

      .goods-add-img {
        width: 40px;
        height: 40px;
        background: url(../assets/images/goodsImg/goodsAddTwo.png) no-repeat 100% 100%;
        margin: 0 auto;
      }
    } */

    .goods-class-manage {
      width: 100px;
      font-weight: 700;
      font-style: normal;
      color: black;
      font-size: 14px;
    }

    .goods-class-manage:hover {
      color: #4890f7;

      .goods-class-img {
        width: 40px;
        height: 40px;
        background: url(../assets/images/goodsImg/goodsClassTwo.png) no-repeat 100% 100%;
        margin: 0 auto;
      }
    }

    .goods-class-img {
      width: 40px;
      height: 40px;
      background: url(../assets/images/goodsImg/goodsClassOne.png) no-repeat 100% 100%;
      margin: 0 auto;
    }

    .goods-search-box {
      flex: 1;
      text-align: right;
    }

    .goods-search-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .goods-search-img:hover {
      background: rgba(228, 228, 228, 1);
    }

    .goods-fitter {
      width: 100px;
    }

    .goods-fitter-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .goods-fitter-img:hover {
      background: rgba(228, 228, 228, 1);
    }

    .goods-change-look {
      font-weight: 700;
      font-style: normal;
      font-size: 14px;
      width: 100px;
      border-left: 3px solid rgba(228, 228, 228, 1);
    }

    .goods-look-img {
      width: 40px;
      height: 40px;
    }
  }

  /* 内容 */
  .goods-content {}
</style>