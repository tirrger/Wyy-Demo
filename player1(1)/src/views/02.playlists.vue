<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="playlists.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ playlists.name }}
        </div>
        <div class="info">
          {{ playlists.description }}
        </div>
      </div>
      <img src="../assets/listCover.jpg" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          @click="cat = '全部'"
          :class="{ active: cat == '全部' }"
          >全部</span
        >
        <span
          class="item"
          @click="cat = '欧美'"
          :class="{ active: cat == '欧美' }"
          >欧美</span
        >
        <span
          class="item"
          @click="cat = '华语'"
          :class="{ active: cat == '华语' }"
          >华语</span
        >
        <span
          class="item"
          @click="cat = '流行'"
          :class="{ active: cat == '流行' }"
          >流行</span
        >
        <span
          class="item"
          @click="cat = '说唱'"
          :class="{ active: cat == '说唱' }"
          >说唱</span
        >
        <span
          class="item"
          @click="cat = '摇滚'"
          :class="{ active: cat == '摇滚' }"
          >摇滚</span
        >
        <span
          class="item"
          @click="cat = '民谣'"
          :class="{ active: cat == '民谣' }"
          >民谣</span
        >
        <span
          class="item"
          @click="cat = '电子'"
          :class="{ active: cat == '电子' }"
          >电子</span
        >
        <span
          class="item"
          @click="cat = '轻音乐'"
          :class="{ active: cat == '轻音乐' }"
          >轻音乐</span
        >
        <span
          class="item"
          @click="cat = '影视原声'"
          :class="{ active: cat == '影视原声' }"
          >影视原声</span
        >
        <span
          class="item"
          @click="cat = 'ACG'"
          :class="{ active: cat == 'ACG' }"
          >ACG</span
        >
        <span
          class="item"
          @click="cat = '怀旧'"
          :class="{ active: cat == '怀旧' }"
          >怀旧</span
        >
        <span
          class="item"
          @click="cat = '治愈'"
          :class="{ active: cat == '治愈' }"
          >治愈</span
        >
        <span
          class="item"
          @click="cat = '旅行'"
          :class="{ active: cat == '旅行' }"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in musicLists" :key="index">
            <div class="img-wrap" @click="$router.push(`/home/playlist?id=${item.id}`)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "recommend",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //精品歌单
      playlists: [],
      //标签歌单
      musicLists: [],
      //歌单标签
      cat: "全部",
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.playlist();
    },
    //
    async highquality() {
      const result = await this.$axios({
        url: "top/playlist/highquality",
        params: {
          cat: this.cat,

          limit: 1,
        },
      });
      //  console.log(result);
      this.playlists = result.data.playlists[0];
      // console.log(this.playlists);
    },
    //获取歌单列表
    async playlist() {
      console.log();
      const result = await this.$axios({
        url: "top/playlist/",
        params: {
          cat: this.cat,
          offset: (this.page - 1) * 10,
          limit: 10,
        },
      });
      console.log(result);
      //总页数
      this.total = result.data.total;

      this.musicLists = result.data.playlists;

      // console.log(this.musicLists);
      for (let i = 0; i < this.musicLists.length; i++) {
        //得到播放次数
        let playCount = this.musicLists[i].playCount;
        if (playCount > 100000) {
          //将小数转换为整数
          playCount = parseInt(playCount / 10000);
          this.musicLists[i].playCount = `${playCount}万+`;
        }
      }
    },
  },
  //监听
  watch: {
    cat() {
      // console.log(this.cat);
      this.highquality();
       this.page = 1;
      this.playlist();
    },
  },
  //钩子函数
  created() {
    this.highquality();
    this.playlist();
  },
};
</script>

<style >
</style>
