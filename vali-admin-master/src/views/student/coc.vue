
<template>
  <div>
    <div v-show="showConfirm == 0">
      <div class="main-container">
        Welcome to Student Support Services! <br /><br />
        You are applying for Credit Transfer. Few steps to go! <br /><br />

        I confirm that the above documents and information given by me are true
        and genuine. I hereby take all the responsibility for all the
        information given by me.<br /><br />
        <div style="color:rgb(192,192,192); text-align:center">signature or sign:</div><br />
        <div style="text-align:center" >
                      <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text" >
                  Drag the file here, or <em>click to upload</em>
                </div>
              </el-upload>
              </div><br /><br />
        <div style="text-align: center">
          <el-button type="primary" @click="confirmInfo">confirm</el-button>
        </div>



      </div>
    </div>
    <div v-show="showConfirm == 1">
      <div class="n" v-loading="loading">
        <ul class="n-cell">
          <li><span>Name:</span>{{ userInfo.name }}</li>
          <li><span>ID:</span>{{ userInfo.number }}</li>
          <li><span>campus</span>{{ userInfo.campus }}</li>
        </ul>
      </div>
      <div class="c">
        <div class="left-box" v-show="tags == 0">
          <ul class="n-cell">
            <li>
              <span>Change to Campus:</span>
              <el-select v-model="form.campus" placeholder="">
                <el-option
                  v-for="item in campusList"
                  :label="item"
                  :value="item"
                  :key="item"
                >
                </el-option>
              </el-select>
            </li>
            <li>
              <span>Intake Month:</span>
              <el-select v-model="form.month" placeholder="">
                <el-option
                  v-for="item in monthValue"
                  :label="item.label"
                  :value="item.value"
                  :key="item.label"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>Current Courese:</span>
              <el-select
                v-model="form.course"
                placeholder=""
                @change="verifyCourse"
              >
                <el-option
                  v-for="item in courseList"
                  :label="item"
                  :value="item"
                  :key="item"
                >
                </el-option>
              </el-select>
            </li>
            <li><span>Course Start Date:</span>{{ courseDetail.startDate }}</li>
            <li><span>Course End Date:</span>{{ courseDetail.endDate }}</li>
            <li>
              <span>Traniner:</span
              ><el-input
                v-model="form.traniner"
                placeholder=""
                style="width: 200px"
              ></el-input>
            </li>
            <li style="text-align: center">
              <span
                ><el-button type="primary" @click="nextPage"
                  >next<i
                    class="el-icon-arrow-right el-icon--right"
                  ></i></el-button
              ></span>
            </li>
          </ul>
        </div>

        <div class="left-box" v-show="tags == 1">
          <ul class="n-cell">
            <li>
              <span>Reason:</span>
              <el-select
                v-model="form.reason"
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
            </li>
            <li v-show="isShowReason == 1">
              <span>Other Reason:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="other reason"
                v-model="form.otherReason"
              >
              </el-input>
            </li>
            <li>
              <span>Comment:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="No less than 20 words"
                v-model="form.comment"
              >
              </el-input>
            </li>
            <li>
              Supporting evidence includes documentation such as Medical
              certificates; Flight itinerary Affidavit Court Order Written
              directive(s) issued by governmental body(ies)
            </li>
            <li>
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
            </li>
            <li style="text-align: center">
              <span
                ><el-button type="primary" @click="submitApply"
                  >submit</el-button
                ></span
              >
            </li>
          </ul>
        </div>

        <div class="left-box" v-show="tags == 2">
          <ul class="n-cell">
            <li style="text-align: center; margin-top: 20px">
              Your application has been submitted successfully! Our staff will
              process your application within 48 hours. Thanks for your
              patience!
              <br />
              <el-button
                type="primary"
                style="margin-top: 40px"
                @click="doneSubmitApply"
                >Done</el-button
              >
            </li>
          </ul>
        </div>
<!-- 
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
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import conf from "./conf.js";
export default {
  components: {},
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
          rules: {
    email: [{ validator: checkEmail, trigger: "blur" }]
    },
      showConfirm: 1,
      tags: 0,
      userInfo: {},
      loading: false,
      monthValue: [...conf.monthValue],
      campusList: [],
      courseList: [],
      reasonList: [...conf.reasons],
      traniner: "",
      isShowReason: 0,
      courseDetail: {
        startDate: "",
        endDate: "",
      },
      form2: {
        address: "",
        email: "",
        phone: "",
      },
      form: {
        month: "",
        campus: "",
        course: "",
        courseStartDate: "",
        courseEndDate: "",
        traniner: "",
        reason: "",
        comment: "",
        otherReason: "",
      },
    };
  },
  
  created() {},
  mounted() {
    this.userInfo = JSON.parse(localStorage.userInfo || "{}");
    this.campusList = this.getcampusList();
    this.courseList = this.getCourseList();
  },
  methods: {
    async userInfoSubmit(){
      this.$refs.form.validate((valid) => {
        if (valid) {
         // 向后台发送请求
         const res = this.$request({
        url: `/api/student/submitStudentInfo`,
        method: "post",
        data: this.form2
      });
      // if (res.Result == 1) {
        this.$msg("submit success");
        // this.form2=''
      // };
        } else {
          //It's like a message that the user prompts for an error
        }
      })
          

    },
    async confirmInfo() {
      this.showConfirm = 1;
    },
    async getInfo() {
      this.loading = true;
      const res = await this.$request({
        url: `/api/user/detail?id=` + this.userInfo.id,
        method: "get",
      });
      this.loading = false;
      if (res.Result != 1) return;
      this.userInfo = res.Data;
    },
    async getcampusList() {
      this.loading = true;
      const res = await this.$request({
        url: `/api/student/campusList`,
        method: "get",
      });
      this.loading = false;
      console.log(res.Data);
      if (res.Result != 1) return;
      this.campusList = res.Data;
    },
    async getCourseList() {
      this.loading = true;
      const res = await this.$request({
        url: `/api/student/courseList`,
        method: "get",
      });
      this.loading = false;
      console.log(res.Data);
      if (res.Result != 1) return;
      this.courseList = res.Data;
    },
    async verifyCourse() {
      const res = await this.$request({
        url: `/api/student/courseDetail?campus=${this.form.campus}&course=${this.form.course}`,
        method: "get",
      });
      console.log(res.Data);
      if (res.Result == 1 && res.Data != null) {
        this.courseDetail = res.Data;
        console.log(this.courseDetail);
        this.form.courseStartDate = this.courseDetail.startDate;
        this.form.courseEndDate = this.courseDetail.endDate;
        return;
      }
      this.$msg("future campus and the course is not available", 2);
    },
    nextPage() {
      this.tags = 1;
    },
    showOtherReason() {
      if (this.form.reason == "Other") {
        this.isShowReason = 1;
        return;
      }
      this.isShowReason = 0;
    },
    async submitApply() {
      //   const res = await this.$request({
      //     url: `/api/student/addCocApply`,
      //     data: this.form,
      //   });
      if (this.form.comment != null && this.form.comment.length < 20) {
        this.$msg("commnet must be less than 20 characters in length", 2);
        return;
      }
      this.tags = 2;
      //   if (res.Result != 1) return;
    },
    doneSubmitApply() {
      this.tags = 0;
    },
  },
};
</script>
<style  scoped>
.main-container {
  width: 800px;
  height: 800px;
  background: white;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 20px;
  padding: 100px;
}
.form2button {
  text-align: center;
}
.n {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  background: white;
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
  margin: 0 auto;
  margin-top: 10px;
}
.right-box {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
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