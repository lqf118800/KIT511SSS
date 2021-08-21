<template>
  <div>
    <div v-show="showConfirm == 0">
      <div class="main-container">
        Welcome to Student Support Services! <br /><br />
        You are applying for leave of absence. Few steps to go! <br /><br />

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
            <li><span>ID:</span>{{ absenceInfo.id }}</li>
            <li><span>Campus:</span>{{ absenceInfo.campus }}</li>
            <li><span>Current Course:</span>{{ absenceInfo.course }}</li>
            <li><span>Course Start Date:</span>{{ absenceInfo.startDate }}</li>
            <li><span>Course End Date:</span>{{ absenceInfo.endDate }}</li>
          </ul>
        </div>
      </div>
      <div class="left-box">
        <div class="main-container1" v-show="tags == 0" :rules="rules">
            <br/>
            <el-form :model="form3" ref="form3">
                <el-form-item
            label="Trainer:"
            :required="true"
            prop="trainer"
          >
            <el-col :span="18">
               <el-input
                placeholder="Trainer"
                v-model="form3.trainer"
              >
              </el-input>
            </el-col>
          </el-form-item>

          <el-form-item
            label="Leave of Absence Start Date:"
            :required="true"
            prop="startDate"
          >
            <el-col :span="18">
              <el-date-picker
                v-model="form3.startDate"
                type="date"
                placeholder="Choose Leave of Absence Start Date"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item
            label="Leave of Absence End Date:"
            :required="true"
            prop="endDate"
          >
            <el-col :span="18">
              <el-date-picker
                v-model="form3.endDate"
                type="date"
                placeholder="Choose Leave of Absence End Date"
                @change="calWeeks()"
              >
              </el-date-picker>
            </el-col>
          </el-form-item>

                    <el-form-item
            label="Total weeks:"
          >
            <el-col :span="18">
                    {{totalWeek}}
            </el-col>
          </el-form-item>

          <el-form-item>
            <div class="form2button">
              <el-button type="primary" @click="deferSubmit()"
                >next</el-button
              >
            </div>
          </el-form-item>
        </el-form>
        </div>


              <div class="main-container1" v-show="tags == 1" :rules="rules">
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
            Supporting evidence includes documentation such as Medical certificates; <br/>
            Flight itinerary Affidavit Court Order Written directive(s) issued by governmental body(ies)
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
              <div class="right-box" v-loading="loading">
          <div style="text-align: center; margin-bottom: 15px; color: #777; font-size:18px;">Contact Us If details incorret</div>
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
        totalWeek:'',
      reasonList: [...conf.reasons],
      rules: {
    email: [{ validator: checkEmail, trigger: "blur" }]
    },
      isShowReason: 0,
      showConfirm: 0,
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
      form3:{
          startDate:'',
          endDate:'',
          trainer:''
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
      
   async getabsenceInfo() {
      const res = await this.$request({
        url: `/api/student/absenceInfo`,
        method: "get",
      });
      this.absenceInfo = res.Data;
    },
      calWeeks(){
          console.log(1)
           let sDate1 = Date.parse(this.form3.startDate);
          let sDate2 = Date.parse(this.form3.endDate);
          var dateSpan = sDate2 - sDate1;
          var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          console.log(iDays);
          this.totalWeek = (iDays/7).toFixed(2);
      },
       userInfoSubmit(){
            this.$refs.form.validate((valid) => {
        if (valid) {
         // 向后台发送请求
         const res =  this.$request({
        // url: `/api/student/submitStudentInfo`,
        url: `/api/student/submitStudentInfo`,
        // method: "get"
        // data: this.form2
      });
      console.log(res.Result)
    //   if (res.Result == 1) {
        // this.form2='',
         this.$msg("commit success");
    //   };
        } else {
          //就像用户提示发生错误的消息
        }
      })
          
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
          // vue校验时间大于2周小于4周
          let sDate1 = Date.parse(this.form3.startDate);
          let sDate2 = Date.parse(this.form3.endDate);
          var dateSpan = sDate2 - sDate1;
          var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
          console.log(iDays);
          if (iDays <28) {
            this.tags = 1;
            return;
          }else{
              this.$router.push("/pages/student/deferment");
          }
          
    //     } else {
    //       //就像用户提示发生错误的消息
    //     }
    //   });
    },
    async deferSubmit2() {
      this.form1 = "";
      this.form2 = "";
      this.showConfirm = 0;
      this.tags =0
    },
    async confirmInfo() {
      this.showConfirm = 1;
    },
  },
};
</script>

<style scoped>
.main-container {
  width: 1500px;
  height: 800px;
  background: white;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  padding: 100px;
}
.n {
  width: 100%;
  height: 100%;
  padding: 20px;
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
  width: 60%;
  height: 100%;
  padding-left: 20px;
  display: inline-block;
  vertical-align: top;
  /* text-align: center; */
  /* margin: 0 auto; */
  margin-left: 20px;
  background: white;
}
.right-box {
  width: 35%;
  display: inline-block;
  padding-left: 20px;
  vertical-align: top;
  background: white;
  margin-left: 20px;
  padding-top: 25px;
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
</style>