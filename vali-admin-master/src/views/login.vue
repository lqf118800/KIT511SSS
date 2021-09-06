<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: 100vh;
  background: url("../assets/img/3.png") no-repeat;

  background-size: 100% 100%;
    margin: 0;
    padding: 0;
}
.head_img {
  width: 120px;
  margin: auto;
  height: 120px;
  margin-top: -70px;
  border-radius: 50%;
  background: url("../assets/img/head_img.jpg") no-repeat center / cover;
}
.form input {
  width: 300px;
  height: 40px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 20px;
  display: block;
  background: none;
  margin: auto;
  margin-top: 20px;
  outline: none;
}
.form input[type="button"] {
  background: #000;
  border-radius: 10px;
  color: #fff;
}
.form {
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 400px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
}
.form > p {
  text-align: right;
  width: 300px;
  color: #01b9fe;
  margin: 20px auto;
  > span {
    cursor: pointer;
  }
}
.v-code {
  width: 400px;
  margin: auto;
  overflow: hidden;
}
.tt {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 300px;
}
.v-code input {
  display: inline;
}
.v-code input:nth-child(1) {
  width: 200px;
}
.v-code input:nth-child(2) {
  width: 200px;
  border-radius: 0;
  float: right;
}
</style>

<template>
  <div>
    <div class="wrap content">
      <div v-if="type == 1" class="form">
        <div class="head_img"></div>
        <input type="text" v-model="form.userName" placeholder="username" />
        <input type="password" v-model="form.passWord" placeholder="password" />

        <div class="tt">
          <el-radio v-model="loginType" label="1">student</el-radio>
          <el-radio v-model="loginType" label="2">employee</el-radio>
        </div>

        <input type="button" value="login" @click="login" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      loginType: "1",
      type: 1,
      form: {
        userName: "",
        passWord: "",
      },
      form2: {
        number: "",
        name: "",
        courseName: "",
        age: "",
        classNum: "",
        userName: "",
        passWord: "",
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    async login() {
      const res = await this.$request({
        url: `/api/${this.loginType == "1" ? "student" : "admin"}/login`,
        data: this.form,
      });
      if (res.Result != 1) return;
      localStorage.setItem("userInfo", JSON.stringify(res.Data));
      this.$msg("login success");
      if(this.loginType == "1"){
          this.$router.push("/");
      }else{
        this.$router.push("/staff");
      }
      
    },
  },
};
</script>
