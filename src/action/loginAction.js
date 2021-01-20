import { checkUser } from "@/config/api.js"
import { startLoading, endLoading } from '../common/util'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    loginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          startLoading()
          checkUser(this.form).then((res) => {
            console.log(res)
            endLoading()
            if (res.state === 0) {
              localStorage.setItem("totaladmintoken", res.data);
              // this.$store.commit("username", res.data.username);
              this.$message({
                message: '登录成功',
                type: "success",
              });
              // this.$router.push({ name: "index" });
              this.$router.push({ path: '/' });
            } else {
              this.$message({
                message: '登录失败',
                type: "error",
              });
            }
          }).catch(() => {
              endLoading()
              this.$message({
                message: '登录失败',
                type: "error",
              });
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};