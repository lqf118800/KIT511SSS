<template>
  <div>
    <div v-show="showConfirm == 0">
      <div class="main-container">
        Welcome to Student Support Services! <br /><br />
        You are applying for deferment. Few steps to go! <br /><br />

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
          <el-form-item
            label="Choose deferment date:"
            :required="true"
            prop="deferment"
          >
            <el-col :span="20">
              <el-date-picker
                v-model="form1.deferment"
                type="date"
                placeholder="Choose deferment date"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            label="Choose Resumption date:"
            :required="true"
            prop="resumption"
          >
            <el-col :span="20">
              <el-date-picker
                v-model="form1.resumption"
                type="date"
                placeholder="Choose Resumption date"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div class="form2button">
              <el-button type="primary" @click="deferSubmit()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>

      <div class="main-container" v-show="tags == 1" :rules="rules">
        <el-form :model="form1" ref="form2">
          <el-form-item label="Reason:" prop="reason">
            <el-col :span="20">
              <el-select
                v-model="form2.reason"
                placeholder=""
                @change="showOtherReason"
              >
                <el-option
                  v-for="item in reasonList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.label"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>

          <el-form-item
            label="other Reason:"
            prop="otherReason"
            v-show="isShowReason == 1"
          >
            <el-col :span="20">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="Other Reason"
                v-model="form2.otherReason"
              >
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="comment:" prop="comment">
            <el-col :span="20">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="No less than 20 words"
                v-model="form2.comment"
              >
              </el-input>
            </el-col>
          </el-form-item>

          <div style="color: #777">
            supporting documents mandatory, <br />tips "medical/law
            infringements/court order/death certifcate, etc,<br />
            that can proof the compassionate or compelling reasons
          </div>
          <br />

          <el-form-item prop="comment">
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
              <el-button type="primary" @click="deferSubmit2()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
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
    }
    return {
            pickerOptions: { //Control the time range
disabledDate (time) {
return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000))
}
},
        rules: {
    email: [{ validator: checkEmail, trigger: "blur" }]
    },
      reasonList: [...conf.reasons],
      rules: {
        deferment: [{ required: true, trigger: "blur" }],
        resumption: [{ required: true, trigger: "blur" }],
      },
      isShowReason: 0,
      showConfirm: 1,
      tags: 0,
      form1: {
        deferment: "",
        resumption: "",
      },
      form2: {
        reason: "",
        otherReason: "",
        comment: "",
      },
    };
  },
  methods: {
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
          // The check time is less than 4 weeks
          let sDate1 = Date.parse(this.form1.deferment);
          let sDate2 = Date.parse(this.form1.resumption);
          var dateSpan = sDate2 - sDate1;
          var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          console.log(iDays);
          if (iDays > 28) {
            this.tags = 1;
            return;
          }
          this.$router.push("/pages/student/absence")
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
  height: 800px;
  background: white;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  padding: 100px;
}
</style>