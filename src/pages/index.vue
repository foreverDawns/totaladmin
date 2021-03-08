<template>
  <div class="home">
    <el-container>
      <el-aside width="auto">
        <div class="logo-con">
          <div class="logo-con-txt logo-con-txt-animation">
            {{ !isCollapse ? "云游山西" : "ALY" }}
          </div>
          <img
            :class="[!isCollapse ? 'logo-con-icon' : 'logo-con-icon-animation']"
            src="../assets/images/menuImg/logo.png"
          />
          <div class="logo-con-time" v-if="!isCollapse">{{ currentTime }}</div>
        </div>
        <el-menu
          :unique-opened="true"
          :default-active="currentPage"
          :collapse="isCollapse"
          :router="true"
          class="el-menu-admin"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <template  v-for="item in menuData">
            <el-menu-item :index="item.path" v-if="!item.hsaChildren" :key="item.id">
              <i class="el-icon-location">
                <img
                  :src="require(`@/assets/images/menuImg/${item.icon}.jpg`)"
                  alt=""
                />
              </i>
              <span class="el-icon-location-text">{{ item.authName }}</span>
            </el-menu-item>

            <el-submenu :index="item.id" v-else :key="item.id" >
              <template slot="title">
                <i class="el-icon-location">
                  <img
                    :src="require(`@/assets/images/menuImg/${item.icon}.jpg`)"
                    alt=""
                  />
                </i>
                {{ item.authName }}
              </template>
              <el-menu-item v-for="item2 in item.children" :index="item2.path" :key="item2.id">
                <i class="el-icon-location">
                  <img
                    :src="require(`@/assets/images/menuImg/${item2.icon}.jpg`)"
                    alt=""
                  />
                </i>
                <span class="el-icon-location-text">{{ item2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- header部分 -->
        <el-header>
          <i class="myicon myicon-menu toggle-btn" @click="toggleCollapse"></i>
          <div class="system-title">云游山西电商管理系统</div>
          <el-dropdown>
            <div class="el-icon-setting el-icon-setting-one">
              <div class="task-img"></div>
              <span>任务</span>
            </div>
            <el-dropdown-menu slot="dropdown" class="dropdown-box">
              <div class="task-num task-item">
                你有<span class="dropdown-box-task-tip">2</span>个任务未完成
              </div>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="@/assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">未完成</div>
              </el-dropdown-item>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">未完成</div>
              </el-dropdown-item>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">未完成</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown>
            <div class="el-icon-setting el-icon-setting-two">
              <div class="new-img"></div>
              <span>消息</span>
            </div>
            <el-dropdown-menu slot="dropdown" class="dropdown-box">
              <div class="task-num task-item">
                你有<span class="dropdown-box-task-tip">2</span>个任务未完成
              </div>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">5分钟</div>
              </el-dropdown-item>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">5分钟</div>
              </el-dropdown-item>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">添加属于你的第一个产品</div>
                <div class="task-item-status">5分钟</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dropdown>
            <div class="el-icon-setting el-icon-setting-two">
              <div class="new-img"></div>
              <span>123123</span>
            </div>
            <el-dropdown-menu slot="dropdown" class="dropdown-box">
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con">系统设置</div>
              </el-dropdown-item>
              <el-dropdown-item class="task-item">
                <img
                  class="task-item-img"
                  src="../assets/images/menuImg/logo.png"
                  alt=""
                />
                <div class="task-item-con" @click="onLoginOut">安全退出</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <!-- 中间内容部分 -->
        <el-main>
          <router-view :key="key"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script src="../action/indexAction.js"></script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background-color: #e5e5e5;
  max-width: 1500px;
  margin: 0 auto;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    background-color: #fff;
    color: #000;
  }

  .el-main {
    padding: 0;
  }

  .el-menu--collapse {
    width: 80px;
  }

  .el-icon-location img {
    width: 100%;
    height: 100%;
  }

  .el-icon-location-text {
    color: black;
    font-size: 16px;
    padding-left: 10px;
  }

  .el-icon-location::before {
    display: none;
  }

  .el-container {
    height: 100%;
  }

  .el-menu-admin {
    border-right: 0;
  }

  .el-aside {
    background-color: #fff;
  }

  /* header style */

  .el-header {
    display: flex;
    align-items: center;
    background-color: rgba(48, 50, 63, 1);
  }

  .system-title {
    font-size: 28px;
    color: white;
    flex: 1;
    text-align: center;
  }

  .el-icon-setting {
    padding-right: 30px;
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .el-icon-setting:before {
    display: none;
  }

  .task-img {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url(../assets/images/menuImg/task-one.png) no-repeat;
    background-size: 100% 100%;
  }

  .new-img {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 8px;
    background: url(../assets/images/menuImg/news-one.png) no-repeat;
    background-size: 100% 100%;
  }

  .el-icon-setting-one:hover {
    color: #fc8bc8;

    .task-img {
      background: url(../assets/images/menuImg/task-two.png) no-repeat;
    }
  }

  .el-icon-setting-two:hover {
    color: #fa8e7d;

    .new-img {
      background: url(../assets/images/menuImg/news-two.png) no-repeat;
    }
  }

  /* logo style */
  .logo-con {
    padding-top: 30px;
    height: 220px;
    margin: 0 auto;
    text-align: center;
    border-bottom: 5px solid rgba(245, 247, 250, 1);
    position: relative;
  }

  .logo-con-txt {
    font-size: 26px;
    font-weight: 700;
    color: black;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.647058823529412);
    -webkit-text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.647058823529412);
    -moz-text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.647058823529412);
  }

  /* .logo-con-txt-animation {
      position: absolute;
      top: 30px;
      left: 50%;
      margin-left: -25%;
      animation: animationTxt 0.8s;
      -moz-animation: animationTxt 0.8s; 
      -webkit-animation: animationTxt 0.8s; 
      -o-animation: animationTxt 0.8s; 
    } */

  /* @keyframes animationTxt {
      from {
        transform: translateX(0px);
      }
      to {
        transform: translateX(-20px);
        display: none;
      }
    }  */

  .logo-con-icon {
    margin: 30px auto;
    animation: logo-con-icon-ani 0.8s;
  }

  @keyframes logo-con-icon-ani {
    from {
      transform: scale(0.6);
    }

    to {
      transform: scale(1);
    }
  }

  .logo-con-icon-animation {
    transform: scale(0.6);
  }

  .logo-con-time {
    /* margin-bottom: 30px; */
  }

  /* .logo {
      height: auto;
      background: url(../assets/logo.png) no-repeat;
      background-size: 100%;
      background-color: white;
    } */

  .toggle-btn {
    border-width: 0px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: url(../assets/images/menuImg/menuOne.png);
  }

  .toggle-btn:hover {
    background: url(../assets/images/menuImg/menuTwo.png);
  }

  .welcome {
    color: white;
  }

  /* aside style*/
  /deep/.el-submenu__title {
    color: #303133 !important;
    padding-left: 26px !important;
    font-size: 16px !important;
    i {
      margin-right: 11px !important;
    }
  }

  .el-menu-item {
    border-left: 6px solid #fff;
    font-size: 16px;
  }

  .el-menu-item:hover {
    border-left: 6px solid rgba(72, 144, 247, 1);
  }

  .is-active {
    border-left: 6px solid rgba(72, 144, 247, 1);
    background: #f5f7f8;
  }
}

/* 任务消息弹框样式 */
.dropdown-box {
  .dropdown-box-task-tip {
    font-size: 20px;
    color: #fc8bc8;
  }

  .task-num {
    cursor: pointer;
  }

  .task-item {
    padding: 10px 15px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
  }

  .task-item:nth-child(3) {
    border: none;
  }

  .task-item-img {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .task-item-con {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-right: 8px;
  }

  .task-item-status {
    padding: 0 5px;
    color: red;
  }
}
</style>