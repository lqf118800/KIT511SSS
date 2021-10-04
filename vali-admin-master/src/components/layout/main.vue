<style>
body,
html {
  width: 100%;
  min-width: 1000px;
  height: 100%;
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.n-main {
  width: 100%;
  overflow: hidden;
  height: 100%;
  background: #f6f6f6;
  @include n-row2;
  align-items: stretch;

  /deep/ .n-nav {
  }
  .n-main-right {
    flex: 1;
    width: 0;
    @include n-col1;
    align-items: stretch;

    > main {
      height: 0;
      flex: 1;
      overflow: auto;
    }
  }
  .anim-enter {
    transform: translate(10%);
    opacity: 0.3;
  }
  //When an element appears, active is used to define the time, curve, etc. of the animation
  .anim-enter-active {
    transform-style: preserve-3d;
    transition: all 0.3s;
  }
  //The last frame state of the animation when the element appears
  .anim-enter-to {
    transform: translate(0%);
    opacity: 1;
  }
  //The first frame state of the animation when the element disappears
  .anim-leave {
    transform: translate(0%);
    opacity: 1;
  }
  //When an element disappears, active is used to define the time, curve, etc. of the animation
  .anim-leave-active {
    transform-style: preserve-3d;
    transition: all 0.3s;
  }
  //The last frame state of the animation when the element disappears
  .anim-leave-to {
    transform: translate(10%);
    opacity: 0.1;
  }
}
</style>

<template>
  <div class="n-main">
    <n-slider :intactSlider="intactSlider" />
    <div class="n-main-right">
      <n-nav :compList="navCompList" :intactSlider.sync="intactSlider" />
      <main>
        <transition name="anim" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
      <div id="kefu">
        <el-popover
          placement="left-end"
          trigger="click"
          @show="showPopver"
          @hide="hidePopver"
          ref="popverRef"
        >
     
          <!-- <img src="@/assets/images/custom.png" style="width: 200px;" /> -->
          <label slot="reference" class="topBtn" title="客服"></label>


		        <div class="div_content" >
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
        <el-form :model="form2"  ref="form">
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
            <div class="form2button" style="text-align:center">
              <el-button type="primary" @click="userInfoSubmit()"
                >submit</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
	

<script>
import routes from "@/router/menuRoute.js";
export default {
  data() {
    return {
      intactSlider: true,
      checkList: "",
      navCompList: [{ type: "user" }],

      systemRoutes: [],
      menus: [],
	  form2: {
        address: "",
        email: "",
        phone: "",
      }
    };
  },
  components: {
    "n-nav": () => import("@/components/layout/nav"),
    "n-slider": () => import("@/components/layout/slider"),
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    setTimeout(() => this.$bus.emit("sliderMenu", routes), 200);
  },
  methods: {
    showPopver() {
      // 处理
	  this.$refs.popverRef.doShow(); // 显示弹框
    },
	userInfoSubmit(){
		this.$refs.popverRef.doClose(); // 隐藏弹框
	}
  },
};
</script>

<style scoped>
#kefu {
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 999;
  width: 60px;
  height: 60px;
}
#kefu .topBtn {
  width: 60px;
  height: 60px;
  background-color: #f2f2f2;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50%;
  cursor: pointer;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 40px 40px;
  -webkit-animation: wobble 250ms infinite;
  animation: wobble 250ms infinite;
  background-image: url("data:image/svg+xml;%20charset=utf8,%3Csvg%20t%3D%221575450105478%22%20class%3D%22icon%22%20viewBox%3D%220%200%201220%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%222883%22%20width%3D%2248%22%20height%3D%2248%22%3E%3Cpath%20d%3D%22M609.524%20103.522c-222.89%200-403.712%20178.472-403.712%20398.78%200%20220.31%20180.823%20398.782%20403.712%20398.782%20222.889%200%20403.712-178.473%20403.712-398.781%200-220.309-180.823-398.781-403.712-398.781v48.762c196.1%200%20354.95%20156.785%20354.95%20350.019s-158.85%20350.019-354.95%20350.019-354.95-156.785-354.95-350.02c0-193.233%20158.85-350.018%20354.95-350.018v-48.762z%22%20fill%3D%22%231296db%22%20p-id%3D%222884%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M786.578%20916.34c166.45-69.217%20278.408-231.055%20278.408-414.035%200-248.026-203.847-449.219-455.457-449.219-251.619%200-455.457%20201.188-455.457%20449.22%200%2055.397%2010.152%20109.367%2029.718%20159.975%204.855%2012.56-1.39%2026.677-13.949%2031.533-12.56%204.855-26.677-1.39-31.532-13.949a490.396%20490.396%200%200%201-3.042-8.078c-1.85%200.077-3.711%200.116-5.581%200.116C58.06%20671.903%200%20614.597%200%20543.903c0-65.005%2049.09-118.69%20112.68-126.91C153.65%20182.56%20360.56%204.324%20609.528%204.324c248.962%200%20455.877%20178.24%20496.85%20412.67%2063.583%208.225%20112.669%2061.907%20112.669%20126.909%200%2070.694-58.06%20128-129.686%20128-1.89%200-3.771-0.04-5.642-0.119-47.536%20129.702-148.34%20235.841-279.493%20290.027-1.161%2033.464-29.012%2060.24-63.2%2060.24-34.925%200-63.237-27.944-63.237-62.416%200-34.471%2028.312-62.415%2063.237-62.415%2017.892%200%2034.048%207.333%2045.551%2019.12z%22%20fill%3D%22%231296db%22%20p-id%3D%222885%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M609.528%20611.405c-58.933%200-112.056-10.644-158.472-28.342-16.123-6.147-30.211-12.702-42.138-19.208-6.926-3.777-11.447-6.59-13.437-7.972-19.24-13.373-44.428%205.446-37.059%2027.688%2035.296%20106.527%20136.054%20179.913%20251.106%20179.913%20115.05%200%20215.796-73.384%20251.092-179.913%207.37-22.243-17.82-41.062-37.06-27.687-1.99%201.383-6.51%204.195-13.434%207.972-11.926%206.505-26.012%2013.06-42.133%2019.207-46.413%2017.698-99.533%2028.342-158.465%2028.342z%22%20fill%3D%22%231296db%22%20p-id%3D%222886%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E");
}
.div_content{
	width: 500px;
}
</style>