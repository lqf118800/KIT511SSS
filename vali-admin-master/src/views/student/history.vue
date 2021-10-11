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

      <el-dialog :visible.sync="showDialog" width="40%" @close="closeDialog(0)">
        <div class="detail-container">
          <el-row>
            <el-col :span="12">
              <div class="item-title">TickedID:</div>
              <div class="item-content">{{ applyTable.tickedId }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">name:</div>
              <div class="item-content">{{ applyTable.name }}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="item-title">id:</div>
              <div class="item-content">{{ applyTable.id }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">campus:</div>
              <div class="item-content">{{ applyTable.campus }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="item-title">trainer:</div>
              <div class="item-content">{{ applyTable.trainer }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">currentCourse:</div>
              <div class="item-content">{{ applyTable.currentCourse }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="item-title">address:</div>
              <div class="item-content">{{ applyTable.address }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">eamil:</div>
              <div class="item-content">{{ applyTable.eamil }}</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <div class="item-title">subject:</div>
              <div class="item-content">{{ applyTable.subject }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">content:</div>
              <div class="item-content">{{ applyTable.content }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="item-title">phone:</div>
              <div class="item-content">{{ applyTable.phone }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">StartDate:</div>
              <div class="item-content">{{ applyTable.absStartDate }}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="item-title">EndDate:</div>
              <div class="item-content">{{ applyTable.absEndDate }}</div>
            </el-col>
            <el-col :span="12">
              <div class="item-title">totalWeeks:</div>
              <div class="item-content">{{ applyTable.totalWeeks }}</div>
            </el-col>
          </el-row>
          
           <el-row>
            <el-col :span="24">
              <div class="item-title">Staff Comments:</div>
              <div class="item-content"></div>
            </el-col>
            <el-col :span="12">
              <div class="item-title"> Comments Time:</div>
              <div class="item-content"></div>
            </el-col>
           
          </el-row>



        </div>
       
      </el-dialog>

  
    </div>
  </div>
</template>

<script>
import conf1 from "./conf1.js";
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
        applyDate: "",
        status: "",
        subject: "",
        ticketId: "",
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      applyType: [...conf1.applyType],
      statusList: [...conf1.status],
      totalData: [],
      totalData1: [],
      selectCompList: [
        {
          type: "select",
          k: "position",
          label: "apply type",
          options: [...conf1.applyType],
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
        if (this.params.ticketId == "") {
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
        if (this.params.name == "") {
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
            if ((this.totalData[i].name + "").indexOf(this.params.name) >= 0) {
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
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 20px;
}

.detail-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  left: 10%;
  .item-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .item-content {
    margin-bottom: 20px;
  }
}
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>