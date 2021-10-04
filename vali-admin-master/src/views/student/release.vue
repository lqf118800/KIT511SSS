<template>
  <div>
    <div v-show="showConfirm == 0">
      <div class="main-container">
        Welcome to Student Support Services! <br /><br />
        You are applying for release or withdraw. Few steps to go! <br /><br />

        I confirm that the above documents and information given by me are true
        and genuine. I hereby take all the responsibility for all the
        information given by me.<br /><br /><br /><br />
        <div style="text-align: center">
          <el-button type="primary" @click="confirmInfo">confirm</el-button>
        </div>
      </div>
    </div>
    <div v-show="showConfirm == 1">
      <div class="n" v-loading="loading">
        <ul class="n-cell">
          <li><span>Name:</span>{{ absenceInfo.name }}</li>
          <li><span>ID:</span>{{ absenceInfo.id }}</li>
          <li><span>Campus:</span>{{ absenceInfo.campus }}</li>
          <li><span>Current Course:</span>{{ absenceInfo.course }}</li>
          <li><span>Course Start Date:</span>{{ absenceInfo.startDate }}</li>
          <li><span>Course End Date:</span>{{ absenceInfo.endDate }}</li>
        </ul>
      </div>

      <div class="left-box">
        <div class="main-container1" v-show="tags == 0" :rules="rules">
          <br />
          <el-form :model="form3" ref="form3">
            <el-form-item label="Trainer:" :required="true" prop="trainer">
              <el-col :span="18">
                <el-input placeholder="Trainer" v-model="form3.trainer">
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item label="Comments:" :required="true" prop="comments">
              <el-col :span="18">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="please provide your reasons of transfer"
                  v-model="form3.comments"
                >
                </el-input>
              </el-col>
            </el-form-item>

            <el-form-item
              label="Letter  . of .  Offer (LOO)* :"
              prop="loo"
              :required="true"
            >
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

            <el-form-item
              label="Other supporting documents :"
              prop="otherDoc"
              :required="true"
            >
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
            <div class="buttons">
            <br /><br />
            <el-button type="primary" @click="releaseOpt()">release</el-button>
            <el-tooltip class="item" effect="light" placement="right-start">
              <div slot="content">
                　　 Release means that you can transferto other education
                provider <br />
                　　
              </div>
              <i class="el-icon-question" />
            </el-tooltip>

            <el-button type="primary" @click="withDrawOpt()"
              >WithDraw</el-button
            >
            <el-tooltip class="item" effect="light" placement="right-start">
              <div slot="content">
                　　 withdraw means you can remove this course <br />
                　　
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
            </div>
          </el-form>
        </div>
      </div>
      <!-- <div class="right-box" v-loading="loading">
        <div
          style="
            text-align: center;
            margin-bottom: 15px;
            color: #777;
            font-size: 18px;
          "
        >
          Contact Us If details incorret
        </div>
        <el-form :model="form2" :rules="rules" ref="form">
          <el-form-item label="Address:" :required="true" prop="address">
            <el-col :span="20">
              <el-input
                v-model="form2.address"
                placeholder="please input address"
                clearable
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Email:" :required="true" prop="email">
            <el-col :span="20">
              <el-input
                v-model="form2.email"
                placeholder="plase input email"
                clearable
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="Phone:" :required="true" prop="phone">
            <el-col :span="20">
              <el-input
                v-model="form2.phone"
                placeholder="plase input phone"
                clearable
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
            <div class="form2button">
              <el-button type="primary" @click="userInfoSubmit()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div> -->
    </div>
    <div v-show="showConfirm == 2">
      <div class="main-container">
        <el-form :model="form3" :rules="rules" ref="form3">
          <el-form-item label="comments:" :required="true" prop="comments">
            <el-col :span="20">
              <el-input
                v-model="form3.comments"
                placeholder="Please provide your reason for transfer, at least 20 words"
                clearable
                type="textarea"
                :rows="2"
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            label="attachment â€¢ Letter Of Offer:"
            :required="true"
            prop="attachment"
          >
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

          <el-form-item label="Attachment: " :required="true" prop="attachment">
            <el-col :span="20">
              <div style="color: #777">
                Other supporting documents (relevant to the reasons pre-scribed)
                Medical certificates Flight itinerary Affidavit Court Order
                Written directive(s) issued by governmental body(ies)
              </div>
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
              <el-button type="primary" @click="submit3()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-show="showConfirm == 3">
      <div class="main-container">
        <el-form :model="form3" :rules="rules" ref="form4">
          <el-form-item label="comments:" :required="true" prop="comments">
            <el-col :span="20">
              <el-input
                v-model="form3.comments"
                placeholder="Please provide your reason for withDraw, at least 20 words"
                clearable
                type="textarea"
                :rows="2"
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>


          <el-form-item label="Attachment: " :required="true" prop="attachment">
            <el-col :span="20">
              <div style="color: #777">
 Other supporting documents (relevant to the reasons pre-scribed) â€¢ Flight itinerary â€¢ Affidavit â€¢ Court Order â€¢ Written directive(s) issued by governmental body(ies)
              </div>
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
              <el-button type="primary" @click="submit3()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>

        <div v-show="showConfirm == 4">
      <div class="main-container">
        Your application has been submitted successfully! Our staff will process your application within 48 hours. Thanks for your patience! <br/><br/>
        <el-button type="success" @click="done()"
                >done</el-button
              >
        </div></div>
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
      totalWeek: "",
      reasonList: [...conf.reasons],
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
      },
      isShowReason: 0,
      showConfirm: 1,
      tags: 0,
      form1: {
        deferment: "",
        resumption: "",
      },
      form2: {
        address: "",
        email: "",
        phone: "",
      },
      form3: {
        trainer: "",
        comment: "",
        loo: "",
        otherDoc: "",
      },
      absenceInfo: {
        id: "",
        campus: "",
        course: "",
        startDate: "",
        endDate: "",
      },
    };
  },
  mounted() {
    this.absenceInfo = this.getabsenceInfo();
  },
  methods: {
    async done(){
      this.showConfirm = 0;
    },
    async submit3(){
      this.showConfirm = 4;
    },
    async releaseOpt() {
      this.showConfirm = 2;
    },
    async withDrawOpt() {
      this.showConfirm = 3;
    },
    async getabsenceInfo() {
      const res = await this.$request({
        url: `/api/student/absenceInfo`,
        method: "get",
      });
      this.absenceInfo = res.Data;
    },
    calWeeks() {
      console.log(1);
      let sDate1 = Date.parse(this.form3.startDate);
      let sDate2 = Date.parse(this.form3.endDate);
      var dateSpan = sDate2 - sDate1;
      var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      console.log(iDays);
      this.totalWeek = (iDays / 7).toFixed(2);
    },
    userInfoSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 向后台发送请求
          const res = this.$request({
            // url: `/api/student/submitStudentInfo`,
            url: `/api/student/submitStudentInfo`,
            // method: "get"
            // data: this.form2
          });
          console.log(res.Result);
          //   if (res.Result == 1) {
          // this.form2='',
          this.$msg("commit success");
          //   };
        } else {
          //It's like a message that the user prompts for an error
        }
      });
    },
    showOtherReason() {
      if (this.form2.reason == "Other") {
        this.isShowReason = 1;
        return;
      }
      this.isShowReason = 0;
    },
    async deferSubmit() {
      //   this.$refs.form.validate((valid) => {
      // if (valid) {
      // check time is greater than 2 weeks and less than 4 weeks
      let sDate1 = Date.parse(this.form3.startDate);
      let sDate2 = Date.parse(this.form3.endDate);
      var dateSpan = sDate2 - sDate1;
      var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      console.log(iDays);
      if (iDays < 28) {
        this.tags = 1;
        return;
      } else {
        this.$router.push("/pages/student/deferment");
      }

      //     } else {
      //       //It's like a message that the user prompts for an error
      //     }
      //   });
    },
    async deferSubmit2() {
      this.form1 = "";
      this.form2 = "";
      this.showConfirm = 0;
      this.tags = 0;
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

.n {
  width: 50%;
  margin: 0 auto;
  margin-top: 10px;
}
.n ul {
  width: 100%;
  background: #fff;
  flex-wrap: wrap;
  @include n-row5;
  padding: 20px;
}
.n li {
  flex: 0 1 50%;
  color: #777;
  font-size: 20px;
  padding: 20px 10px;
}
.n span {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.n-100 {
  flex: 100%;
}
.left-box {
  width: 50%;
  height: 900px;
  background: white;
  margin: 0 auto;
  margin-top: 10px;
}
.right-box {
  width: 50%;
  background: white;
  margin: 0 auto;
}
.c ul {
  width: 100%;
  background: #fff;
  padding: 20px;
  padding-left: 80px;
  text-align: left;
}
.c li {
  color: #777;
  font-size: 20px;
  padding: 20px 10px;
}
.c span {
  width: 100px;
  text-align: right;
  margin-right: 10px;
  color: black;
  font-weight: 900;
}
.rtitle {
  text-align: center;
  color: #777;
}
.el-form-item{
    margin-left: 50px;
    margin-top: 30px;
}
.buttons{
 text-align: center;
}
</style>