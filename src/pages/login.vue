<template>
  <div class="login">
    <div class="login-con my-flex border-ra-15 bg-white p-30">
      <div class="flex-1 login-con-left flex-h-center">
        <div class="fs-20 fw-700 text-align-c color-999 flex-1">欢迎使用云游山西后台管理系统</div>
      </div>
      <el-form ref="form" :model="form" class="container flex-1 p-20" :rules="rules">
        <el-form-item class="avatar">
          <img style="width: 100%;" src="../assets/images/menuImg/logo.png" alt />
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="账号" prefix-icon="myicon myicon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码" prefix-icon="myicon myicon-key"
            @keydown.native.enter="loginSubmit('form')"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="text-align-c m-t-80">
          <el-button type="primary" class="login-btn" @click="loginSubmit('form')"
            @keydown.native.enter="loginSubmit('form')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script src="../action/loginAction.js"></script>

<style lang="scss" scoped>
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/comImg/image11.gif);
    background-size: 100%;

    .login-con {
      width: 700px;
      height: 500px;
      position: relative;
      margin: 0 auto;
      top: 25%;
    }

    .login-con-left {
      border-right: 1px dashed #ccc;
    }

    .container {
      position: relative;
      padding-top: 160px;

      .avatar {
        position: absolute;
        left: 50%;
        top:-60px;
        width: 120px;
        height: 120px;
        top: 0px;
        margin-left: -60px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 10px solid #fff;
        box-shadow: 0 1px 5px #ccc;
        overflow: hidden;
      }

      .el-form-item__content {
        text-align: center;
      }

      .login-btn {
        width: 80%;
        margin: 0 auto;
      }
    }
  }
</style>