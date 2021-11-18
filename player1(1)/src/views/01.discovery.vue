<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items" >
        <div class="item" v-for="(item,index) in personalizedList" :key="index"> 
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}：{{item.name}}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.copywriter}}：{{item.name}}</p>
        </div>
  
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items" >
        <div class="item" v-for="(item,index) in newSongList" :key="index" >
          <div class="img-wrap"  @click="getUrl(item.id)">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item,index) in mvList" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "discovery",
  data() {
    return {
      bannerList: [],
      personalizedList:[],
      newSongList:[],
      mvList:[],


    };
  },
  methods: {
    //轮播图
    async getBanner() {
      const result = await this.$axios({
        url: "banner",
      });
      // console.log(result);
      this.bannerList = result.data.banners;
      // console.log(this.bannerList);
    },
    //推荐歌单
    async personalized() {
      const result = await this.$axios({
        url: "personalized",
        params:{
          limit:10
        }
      });
     
      this.personalizedList = result.data.result
      //  console.log( this.personalizedList);
    },
    //最新音乐
    async newSongs(){
      const result  = await this.$axios({
        url:'personalized/newsong',
      })
      
      this.newSongList = result.data.result
       console.log( this.newSongList);
    },
    //最新音乐播放
    async getUrl(id){
         let musicUrl =  `https://music.163.com/song/media/outer/url?id=${id}.mp3`
         const result  = await this.$axios({
           url:'/song/url',
      })
        console.log(result);
      
        //  console.log(musicUrl);
         this.$parent.musicUrl = musicUrl
        //  this.$parent.list.push(musicUrl)
    },
    //推荐Mv
    async  tjMv(){
      const result  = await this.$axios({
        url:'personalized/mv'
      })
      this.mvList = result.data.result;
      // console.log(this.mvList);

    }
  },

  //钩子函数 进来
  created() {
    this.getBanner();
    this.personalized();
    this.newSongs();
    this.tjMv();

  },
};
</script>

<style >
</style>
