<template>
  <div class="n-position">
    <div class="n-position-content n-cell">
      <div class="search_container">
        <el-select v-model="params.subject" placeholder="please select subject">
          <el-option
            v-for="item in applyType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-select v-model="params.status" placeholder="please select status ">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>

        <el-input
          placeholder="please input tickedId"
          v-model="params.ticketId"
          style="width: 300px"
          clearable
        ></el-input>

        <el-input
          placeholder="please input name"
          v-model="params.name"
          style="width: 300px"
          clearable
        ></el-input>


              <el-date-picker
                v-model="params.applyDate"
                type="date"
                placeholder="Choose Date"
      
              >
              </el-date-picker>


        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="interviewList2"
          >search</el-button
        >
      </div>

      <el-table border :data="totalData" @row-click="handleEdit">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="tickedId:" prop="tickedId"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="subject" prop="subject"></el-table-column>
        <el-table-column label="status" prop="status"></el-table-column>
        <el-table-column label="date" prop="date"></el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >detail</el-button
            >
            <el-button
              size="mini"
              type="primary"
              @click="handleProcess(scope.$index, scope.row)"
              >process</el-button
            >

                        <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >delete</el-button
            >
          </template>
        </el-table-column> -->
      </el-table>

      <div style="text-align: center; margin-top: 30px">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="params.total"
          @current-change="current_change"
          :current-page="params.pageIndex"
          :page-size="params.pageSize"
        ></el-pagination>
      </div>

      <el-dialog
        class="dialog-component"
        :visible.sync="showDialog"
        width="1500px"
        @close="closeDialog(0)"
      >
        <!-- ref="interviewRef" -->
        <el-form :model="applyTable" label-width="150px" style="margin: 0 auto">
          <el-form-item label="TickedID:">
            {{ applyTable.tickedId }}
          </el-form-item>
          <el-form-item label="name:">
            {{ applyTable.name }}
          </el-form-item>
          <el-form-item label="id:">
            {{ applyTable.id }}
          </el-form-item>
          <el-form-item label="campus:">
            {{ applyTable.campus }}
          </el-form-item>
          <el-form-item label="trainer:">
            {{ applyTable.trainer }}
          </el-form-item>
          <el-form-item label="currentCourse:">
            {{ applyTable.currentCourse }}
          </el-form-item>
          <el-form-item label="address:">
            {{ applyTable.address }}
          </el-form-item>
          <el-form-item label="eamil:">
            {{ applyTable.eamil }}
          </el-form-item>
          <el-form-item label="phone:">
            {{ applyTable.phone }}
          </el-form-item>
          <el-form-item label="StartDate:">
            {{ applyTable.absStartDate }}
          </el-form-item>
          <el-form-item label="EndDate:">
            {{ applyTable.absEndDate }}
          </el-form-item>
          <el-form-item label="totalWeeks:">
            {{ applyTable.totalWeeks }}
          </el-form-item>
          <el-form-item label="subject:">
            {{ applyTable.subject }}
          </el-form-item>
          <el-form-item label="content:">
            {{ applyTable.content }}
          </el-form-item>
          <el-form-item >
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="primary"
              @click="handleProcess(scope.$index, scope.row)"
              >process</el-button
            >

                        <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >delete</el-button
            >
          </template>
        </el-form-item>
        </el-form>
                
      </el-dialog>

      <el-dialog
        class="dialog-component"
        :visible.sync="showDialog2"
        width="1500px"
        @close="closeDialog(0)"
      >
        <!-- ref="interviewRef" -->
        <el-form :model="processTable" label-width="150px">
          <el-form-item label="signature or sign:">
            <el-col :span="20">
              <div style="color: #777">
                <!-- request more documents Please advise the student of the documents that they need to attach. -->
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
          <el-form-item label="comments:" :required="true" prop="comments">
            <el-col :span="20">
              <el-input
                v-model="processTable.comments"
                clearable
                type="textarea"
                :rows="2"
                style="width: 70%"
              ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item style="">
            <div class="form2button">
              <el-button type="primary" @click="submit1()"
                >Request more Document</el-button
              >
              <el-button type="primary" @click="submit2()">Approve</el-button>
              <el-button type="primary" @click="submit3()">Reject</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import conf from "./conf.js";
export default {
  data() {
    return {
      showDialog: false,
      showDialog2: false,
      status: "",
      aa: "1",
      loading: false,
      userInfo: {},
      processTable: { comments: "" },
      applyTable: {
        tickedId: "123",
        name: "jackie",
        id: "1",
        campus: "campus1",
        trainer: "kaka",
        currentCourse: "course1",
        address: "address1",
        eamil: "123@163.com",
        phone: "12635462",
        absStartDate: "2021.06.17",
        absEndDate: "2021.09.15",
        totalWeeks: "4.5",
        subject: "subject1",
        content: "content1",
      },
      params: {
        applyDate:"",
        status: "",
        subject: "",
        ticketId: "",
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      applyType: [...conf.applyType],
      statusList: [...conf.status],
      totalData: [],
      totalData1:[],
      selectCompList: [
        {
          type: "select",
          k: "position",
          label: "apply type",
          options: [...conf.applyType],
        },

        {
          type: "btns",
          right: 1,
          childRight: 1,
          btns: [
            {
              label: "search",
              props: { type: "primary", icon: "el-icon-search" },
              clickKey: "select",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.userInfo || "{}");
    this.select();
  },
  watch: {
    "params.ticketId": {
      deep: true,
      handler: function (newVal, oldVal) {
        if(this.params.ticketId == ''){
          this.select();
          return;
        }
        this.groupArr = []; //This is a defined array for storing data in the drop-down reminder box
        var len = this.totalData.length; //groupList
        var arr = [];
        // console.log(this.totalData[1].tickedId)
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            //Fuzzy matches based on the values in the input box
            if (
              (this.totalData[i].tickedId + "").indexOf(this.params.ticketId) >=
              0
            ) {
              arr.push(this.totalData[i]);
            }
          }
        }

        this.totalData = arr;
      },
    },
    "params.name": {
      deep: true,
      handler: function (newVal, oldVal) {
        if(this.params.name == ''){
          this.select();
          return;
        }
        this.groupArr = []; //This is a defined array for storing data in the drop-down reminder box
        var len = this.totalData.length; //groupList
        var arr = [];
        // console.log(this.totalData[1].tickedId)
        if (len > 0) {
          for (var i = 0; i < len; i++) {
            //Fuzzy matches based on the values in the input box
            if (
              (this.totalData[i].name + "").indexOf(this.params.name) >=
              0
            ) {
              arr.push(this.totalData[i]);
            }
          }
        }

        this.totalData = arr;
      },
    },
  },
  methods: {
    async select() {
      const res = await this.$request({
        url: `/api/staff/applyList`,
        method: "get",
      });
      // console.log(this)
      this.totalData = res.Data;
      this.params.total = res.TotalCount;
    },
    current_change(newPage) {
      this.params.pageIndex = newPage;
      this.select();
    },
    // Turn off the operation
    closeDialog(flag) {
      if (flag) {
        // Refresh the table contents
        let request = { pageIndex: 1, pageSize: 10 };
        this.interviewList(request);
      }
      this.showDialog = false;
    },
    //revise
    async handleEdit(index, row) {
      // const { data: res } = await this.$http.get(
      //   "staff/getApplyById/" + row.id
      // );
      // console.log(res.Data)
      // this.tableItem = res.Data;
      // //分类
      // await this.$http.get("admin/getDistinctCategory").then((res) => {
      //   this.options = res.data.Data;
      // });
      this.showDialog = true;
      // this.$nextTick(() => {
      //   this.$refs["dialogComponent"].showDialog = true;
      // });
    },
    async handleProcess(index, row) {
      this.showDialog2 = true;
    },
    async handleDelete(index, row) {
      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          });          
        });
    },
    async submit1() {
      this.showDialog1 = false;
      this.$message("success");
    },
    async submit2() {
      this.showDialog2 = false;
      this.$message("success");
    },
    async submit3() {
      this.showDialog2 = false;
      this.$message("success");
    },
  },
};
</script>

<style lang="scss" scoped>
.n-position {
  width: 100%;
  background: #f6f6f6;
  padding: 20px;
  .n-position-content {
    .n-position-btns {
      margin: 20px 0;
    }
  }
  /deep/ .tb-page {
    margin-top: 20px;
    text-align: right;
  }
}
.search_container {
  margin-bottom: 20px;
}
</style>