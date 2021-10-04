<template>
  <div>
    <div v-show="showConfirm == 0">
      <div class="main-container">
        Welcome to Student Support Services! <br /><br />
        You are applying for Credit Transfer. Few steps to go! <br /><br />

        I confirm that the above documents and information given by me are true
        and genuine. I hereby take all the responsibility for all the
        information given by me.<br /><br /><br /><br />
        <div style="text-align: center">
          <el-button type="primary" @click="confirmInfo">confirm</el-button>
        </div>
      </div>
    </div>
    <div v-show="showConfirm == 1">
      <div class="main-container" v-show="tags == 0" :rules="rules">
        <el-form :model="form1" ref="form1">
          <el-form-item label="What is CT">
            <el-tooltip
              class="item"
              effect="light"
            
              placement="right-start"
            >
            <div slot="content">
　　        Description <br/>
　　        Transfer credit, credit transfer, or advanced standing are the terms used <br/>
　　        by colleges and universities for the procedure of granting credit to a  <br/>
　　        student for educational experiences or courses undertaken at another 
            institution. This is a subset of Recognition of Prior Learning.  <br/>
        </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-form-item>
          <el-form-item
            label="Are you a student in AIBTGlobal？"
            :required="true"
          >
            <el-radio v-model="isStudent" label="1" @change="showUserM()"
              >No</el-radio
            >
            <el-radio v-model="isStudent" label="2" @change="showUserM2()"
              >Yes</el-radio
            >
          </el-form-item>
        </el-form>
        <el-form
          :model="form2"
          ref="form2"
          :rules="rules"
          v-show="showUser == 1"
        >
          <el-form-item label="name" :required="true" prop="name">
            <el-col :span="20">
              <el-input
                v-model="form2.name"
                placeholder="plase input your name"
                clearable
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="email" :required="true" prop="email">
            <el-col :span="20">
              <el-input
                v-model="form2.email"
                placeholder="plase input your email"
                clearable
                style="width: 70%"
                :required="true"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="phone" :required="true" prop="phone">
            <el-col :span="20">
              <el-input
                v-model="form2.phone"
                placeholder="plase input your phone"
                clearable
                style="width: 70%"
                :required="true"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="address" :required="true" prop="address">
            <el-col :span="20">
              <el-input
                v-model="form2.address"
                placeholder="plase input your address"
                clearable
                style="width: 70%"
                :required="true"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item
            label="passport number"
            :required="true"
            prop="passpord"
          >
            <el-col :span="20">
              <el-input
                v-model="form2.passpord"
                placeholder="plase input your passport number"
                clearable
                style="width: 70%"
                :required="true"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Upload your course of application">
            <el-col :span="20">
              <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  Drag the file here, or <em>click to upload</em>
                </div>
              </el-upload>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div class="form2button">
              <el-button type="primary" @click="submit2()">submit</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="main-container" v-show="tags == 1">
        <el-form :model="form3">
          <el-form-item
            label="Specify the program name of the certificate uploaded:"
            :required="true"
          >
            <el-select v-model="form3.name" placeholder="">
              <el-option
                v-for="item in certificateNameList"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Upload your Certificate">
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Drag the file here, or <em>click to upload</em>
              </div>
            </el-upload>
          </el-form-item>

          <el-form-item
            label="Upload your completion letter(If applicable) (optional)"
          >
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                Drag the file here, or <em>click to upload</em>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <div class="form2button">
              <el-button type="primary" @click="submit3()">submit</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="main-container" v-show="tags == 2">
        Welcome to Student Support Services! You are applying for Credit Transfer. Few steps to go!<br/><br/>
        I confirm that the above documents and information given by me are true and genuine. I hereby take all the responsibility for all the information given by me.
        <br/><br/><el-radio v-model="isConfirmInfo1" label="1"
              >confirm</el-radio
            >
            <el-button type="primary" @click="submit4()">next</el-button>
      </div>

      <div class="main-container" v-show="tags == 3">
          Welcome to Student Support Services!<br/><br/>
        You are applying for Credit Transfer. <br/><br/>
        I, (student full name), authorise AIBTGlobal to retrieve my personal information and study record from<br/>
         my previous education provider, (college name), in order to proceed my Credit Transfer application<br/><br/>
        <br/><el-radio v-model="isConfirmInfo2" label="1"
              >confirm</el-radio
            >
<br/><br/>
            <el-input
  type="textarea"
  :rows="2"
  placeholder="Draw Your Signature"
  v-model="textarea">
</el-input>
<br/><br/>
        <el-button type="primary" @click="submit5()">submit</el-button>
        <el-button type="info" @click="skip5()">skip</el-button>
           
      </div>

      <div class="main-container" v-show="tags == 4">
         Your application has been submitted successfully! <br/>For the result, you will receive an email.
      </div>

    </div>
  </div>
</template>

<script>
import conf from "./conf.js";
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("email is required"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("Please input the correct email format"));
        }
      }, 100);
    };
    return {
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        name: [{ required: true, trigger: "blur" }],
        phone: [{ required: true, trigger: "blur" }],
      },
      certificateNameList: [...conf.certificateNameList],
      //   rules: {
      //     deferment: [{ required: true, trigger: "blur" }],
      //     resumption: [{ required: true, trigger: "blur" }],
      //   },
      isStudent: "",
      showUser: 0,
      showConfirm: 1,
      isConfirmInfo1:"",
      isConfirmInfo2:"",
      tags: 0,
      form2: {
        name: "",
        email: "",
        phone: "",
        address: "",
        passpord: "",
      },
      form3: {
        name: "",
      },
    };
  },
  methods: {
    async submit2() {
      this.$refs.form2.validate((valid) => {
        if (valid) {
          this.tags = 1;
        } else {
          //It's like a message that the user prompts for an error
        }
      });
    },
    async submit3() {
      this.tags = 2;
    },
    async submit4() {
        if(this.isConfirmInfo1 != 1){
            this.$message("plase confirm first")
            return;
        }
      this.tags = 3;
    },
    async submit5() {
        if(this.isConfirmInfo2 != 1){
            this.$message("plase confirm first")
            return;
        }
      this.tags = 4;
    },
    async skip5() {
      this.tags = 4;
    },
    showUserM() {
      this.showUser = 1;
      
    },
    showUserM2() {
      this.showUser = 0;
      this.tags = 1;
    },
    showOtherReason() {
      if (this.form2.reason == "Other") {
        this.isShowReason = 1;
        return;
      }
      this.isShowReason = 0;
    },
    async deferSubmit() {
      this.$refs.form1.validate((valid) => {
        if (valid) {
          // vue校验时间小于4周
          let sDate1 = Date.parse(this.form1.deferment);
          let sDate2 = Date.parse(this.form1.resumption);
          var dateSpan = sDate2 - sDate1;
          var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          console.log(iDays);
          if (iDays > 28) {
            this.tags = 1;
            return;
          }
          this.$router.push("/pages/student/absence");
          if (res.Result == 1) {
          }
        } else {
          //It's like a message that the user prompts for an error
        }
      });
    },
    async deferSubmit2() {
      this.form1 = "";
      this.form2 = "";
      this.showConfirm = 0;
    },
    async confirmInfo() {
      this.showConfirm = 1;
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 800px;
  height: 900px;
  background: white;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  padding: 100px;
}
</style>