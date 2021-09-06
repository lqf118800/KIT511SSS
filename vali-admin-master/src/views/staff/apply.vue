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

        
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="interviewList2"
          >search</el-button
        >
      </div>

      <el-table border :data="totalData">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="tickedId:" prop="tickedId"></el-table-column>
        <el-table-column label="name" prop="name"></el-table-column>
        <el-table-column label="subject" prop="subject"></el-table-column>
        <el-table-column label="status" prop="status"></el-table-column>
        <el-table-column label="date" prop="date"></el-table-column>
        <el-table-column label="操作">
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
          </template>
        </el-table-column>
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
        </el-form>
      </el-dialog>

      <el-dialog
        class="dialog-component"
        :visible.sync="showDialog2"
        width="1500px"
        @close="closeDialog(0)"
      >
        <!-- ref="interviewRef" -->
        <el-form :model="processTable" label-width="150px" >
          
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
              <el-button type="primary" @click="submit2()"
                >Approve</el-button
              >
              <el-button type="primary" @click="submit3()"
                >Reject</el-button
              >
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
      status:'',
      aa: "1",
      loading: false,
      userInfo: {},
      processTable:{comments:""},
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
        status:"",
        subject: "",
        ticketId: "",
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      applyType: [...conf.applyType],
      statusList: [...conf.status],
      totalData: [],
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
    // 关闭操作
    closeDialog(flag) {
      if (flag) {
        // 重新刷新表格内容
        let request = { pageIndex: 1, pageSize: 10 };
        this.interviewList(request);
      }
      this.showDialog = false;
    },
    //修改
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
    async handleProcess(index, row){
              this.showDialog2 = true; 
    },
    async submit1(){
      this.showDialog2 = false; 
      this.$message("success")
    },
    async submit2(){
      this.showDialog2 = false; 
      this.$message("success")
    },
    async submit3(){
      this.showDialog2 = false; 
      this.$message("success")
    }
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