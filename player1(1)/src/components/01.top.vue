<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home"></span>
        <span class="iconfont icon-sami-select"></span>
        <span class="iconfont icon-full-screen"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift"></span>
        <span class="iconfont icon-arrow-right"></span>
      </div>
      <!-- <div class="info">
        <div>用户：{{this.$store.state.modulesX.admin}}</div>
         <div>班别:{{this.$store.state.modulesX.class}}</div>
        <div>姓名：傅伟琛</div>
        <div>学号：201970120104</div>
       
      </div> -->
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model.trim="query"
          @keyup.enter="toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      query: "",
    };
  },
  methods: {
      toResult() {
      //判断是否有输入
      if (this.query == "") {
        this.$message({
          message: "请输入歌曲或歌手",
          type: "warning",
        });
        return;
      }
      //  this.$axios({
      //   url: "/search",
      //   params: {
      //     keywords: this.query,
      //     type:1,
      //     limit: 30
      //   },
      // }).then((res) => {
      //   //总线$bus 传值
      //   console.log('dadada',res);
      //   this.$bus.$emit('getSong',res.data)
      //   // this.$bus.$emit("getSong", this.query);
      //   //有则跳转
      //   this.$router.push(`/result?q=${this.query}`);
      // });
        // 总线传值
        // this.$bus.$emit("getSong", this.query);

        // console.log(this);
        this.$store.dispatch('modulesX/getQuery',this.query)
        //有则跳转
        this.$router.push(`/home/result?q=${this.query}`);
    },
  },
};
</script>

<style scoped></style>
