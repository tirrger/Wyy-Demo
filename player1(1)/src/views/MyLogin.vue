<template>
<div class="bgc">
  <div class="login">
    <div class="info-pro">
      <div class="info-box">
        <div class="info-title">Login</div>
        <div class="info-enname">Welcome to the world 000000000000000000</div>
        <div class="info-input">
          <el-input
            v-model="username"
            placeholder="Type your usename"
          ></el-input>
          <el-input
            placeholder="Type your password"
            v-model="userpassword"
            show-password
          ></el-input>
        </div>
        <div class="info-checkbox">
          <el-checkbox v-model="checked">Remenber me </el-checkbox>
          <div class="info-forget">
            <a href="javaScript:;">Forget your password?</a>
          </div>
        </div>
        <div class="info-button">
          <div class="left">
            <el-button type="primary" round @click="login">Login Now</el-button>
          </div>
          <div class="right">
            <el-button type="primary " round>Register</el-button>
          </div>
        </div>
        <div class="bottom-icon">
          <div class="bottom-name">You can also login with</div>
          <div class="bicon">
            <a href="javaScript:;"
              ><svg class="icon tubiao" aria-hidden="true">
                <use xlink:href="#icon-changyonglogo28"></use>
              </svg>
            </a>
            <a href="javaScript:;"
              ><svg class="icon tubiao" aria-hidden="true">
                <use xlink:href="#icon-QQ1"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="image-pro">
      <img class="image" src="../assets/0.jpg" alt="" />
    </div>
  </div>
</div>

</template>

<script>
import "../assets/css/iconfont";
import {mapState,mapActions,mapMutations,mapGetters } from 'vuex'

export default {
  data() {
    return {
      username: "",
      userpassword: "",
      checked: false,
    };
  },
  methods: {
 

    login() {
      if (this.username == "" || this.userpassword == "") {
        this.$message({
          showClose: true,
          message: "请输入账号或密码",
          type: "warning",
        });
      }
      if (this.username == "admin" && this.userpassword == "666666") {
        this.$store.dispatch('modulesX/getpassword',this.userpassword);
        this.$store.dispatch('modulesX/getAdmin',this.username);
        localStorage.setItem('_token',this.username)
        console.log(this);
        this.$router.push('/home')
      } else {
        this.$message({
          showClose: true,
          message: "账号或密码错误",
          type: "warning",
        });
      }
    },

  },
};
</script>

<style>

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
* {
  margin: 0;
  padding: 0;

}
a {
  text-decoration: none;
  color: inherit;
}
.login {
  display: flex;
  padding: 100px;
  background-color: #918c8c;
}
.info-pro {
  width: 55%;
  height: 700px;
  /* border: 1px solid red; */
  box-shadow: 0 0 8px #585858;

  background-color: white;
}
.info-box {
  margin: 100px;
  /* border: 1px solid red; */
}
.info-box .info-title {
  font-size: 38px;
  font-weight: bolder;
  color: #585958;
}
.info-box .info-enname {
  margin-top: 20px;
  color: #918c8c;
}
.info-box .info-input {
  margin-top: 40px;
}
.info-box .info-input .el-input__inner {
  border-radius: 15px;
  background-color: #eeeeee;
  border-color: #eeeeee;
  margin-bottom: 20px;
}
.info-checkbox {
  display: flex;
}
.info-checkbox .el-checkbox {
  width: 45%;
}
.info-checkbox .el-checkbox__inner {
  margin-left: 10px;
  color: #918c8c;
}
.info-checkbox .el-checkbox__label {
  color: #918c8c;
}
.info-checkbox .info-forget {
  width: 55%;
  color: #918c8c;
  font-size: 14px;
  padding-left: 50px;
}
.info-button {
  margin-top: 35px;
  display: flex;
}
.info-button .left {
  width: 50%;
}
.info-button .right {
  width: 50%;
  text-align: right;
}
.info-button button {
  width: 90%;
}
.bottom-icon {
  margin-top: 100px;
}
.bottom-icon .bottom-name {
  font-size: 16px;
  color: #585958;
}
.bottom-icon .tubiao {
  margin: 10px;
  height: 20px;
}
.image-pro {
  width: 45%;
  height: 703px;
  /* background-color: rgb(136, 130, 130); */
  box-shadow: 0 0 8px #585858;
}
.image {
  width: 100%;
  height: 100%;
}
</style>