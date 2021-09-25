<template>
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
</template>

<script>
export default {
  methods: {
    async confirmInfo() {
      this.$router.push('/student/coc');
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
  .el-button--primary{
    color: #fff;
    background-color: #67C23A;
    border-color: #67C23A;
  }
</style>

