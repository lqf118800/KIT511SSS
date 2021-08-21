<template>
  <div>
    Credit Transfer Welcome to Student Support Services! You are applying for
    Credit Transfer. Few steps to go! I confirm that the above documents and
    information given by me are true and genuine. I hereby take all the
    responsibility for all the information given by me.
    <el-button type="primary" @click="confirmInfo">submit</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    async confirmInfo() {
      var path = this.$route.path;
      var index = path.match('[^/]+(?!.*/)')[0];
      this.$router.push({path: index});
    },
  },
};
</script>

<style>
</style>