<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $store.state.query}}</h2>
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songLists"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap" >
                  <div class="name-wrap" @click="getUrl(item.id)">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mvid != 0"></span>
                  </div>
                  <span>{{ item.alias[0] }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in lists" :key="index">
            <div class="img-wrap" @click="$router.push(`/playlist?id=${item.id}`)">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.bookCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvList" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      activeIndex: "songs",
      query: "",
      //返回数量
      limit: 30,
      // 偏移数量
      offset: 0,
      // 搜索类型
      type: 1,
      //存放歌曲数组
      songLists: [],
      //存放歌单数组
      lists: [],
      //mv数组
      mvList: [],
      //数量
      count: 0,
    };
  },
  methods: {
    async serch() {
      await this.$axios({
        url: "/search",
        params: {
          keywords: this.$store.state.modulesX.query,
          limit: this.limit,
          type: this.type,
        },
      })
        .then((res) => {
          console.log("res==>", res);
          if (this.type == 1) {
            this.songLists = res.data.result.songs;
            this.count = res.data.result.songCount;
            for (let i = 0; i < this.songLists.length; i++) {
              let ms = this.songLists[i].duration; //播放的毫秒值
              //将毫秒转换为秒
              let sec = parseInt(ms / 1000);
              //将秒转为分钟
              let min = parseInt(sec / 60);
              //取模 得到剩余的秒数
              sec = sec % 60;
              if (sec < 10) {
                sec = "0" + sec;
              }
              if (min < 10) {
                min = "0" + min;
              }
              this.songLists[i].duration = `${min}:${sec}`;
            }
          } else if (this.type == 1000) {
            this.lists = res.data.result.playlists;
            this.count = res.data.result.playlistCount;
              for(let i =0;i < this.lists.length; i++){
                  let bookCount = this.lists[i].bookCount;
              if (bookCount > 10000) {
                bookCount = parseInt(bookCount / 10000);
                this.lists[i].bookCount = `${bookCount}万+`;
              }
              }
          } else {
            this.mvList = res.data.result.mvs;
            this.count = res.data.result.mvCount;
            for (let i = 0; i < this.mvList.length; i++) {
              let ms = this.mvList[i].duration; //播放的毫秒值
              //将毫秒转换为秒
              let sec = parseInt(ms / 1000);
              //将秒转为分钟
              let min = parseInt(sec / 60);
              //取模 得到剩余的秒数
              sec = sec % 60;
              if (sec < 10) {
                sec = "0" + sec;
              }
              if (min < 10) {
                min = "0" + min;
              }
              this.mvList[i].duration = `${min}:${sec}`;

              let playCount = this.mvList[i].playCount;
              if (playCount > 10000) {
                playCount = parseInt(playCount / 10000);
                this.mvList[i].playCount = `${playCount}万+`;
              }
            }
          }
        })
        .catch((err) => {
          console.log("err==>", err);
        });
    },
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
  },
  watch: {
    activeIndex() {
      console.log(this.activeIndex);
      switch (this.activeIndex) {
        //歌曲
        case "songs":
          this.type = 1;
          break;
        //歌单
        case "lists":
          this.type = 1000;
          break;
        //mv
        case "mv":
          this.type = 1004;
          break;
      }
      this.serch();
    },
    query(){
      console.log('11111');
       this.serch();
    }
  },
  //首次渲染
  created() {
    this.query =  this.$route.query.q  

    // this.$bus.$on('getSong',data=>{
    //   console.log('总线',data);
    //   this.query = data
    //   // this.serch();
    //   //歌曲列表
    //   // this.songLists = data.result.songs
    //   // //总数
    //   // this.count = data.result.songCountx
    // })
   
  },
  updated (){
    this.query = this.$route.query.q;
       this.serch();

  },
  
  //将播放时间进行格式化处理
  // changeTimeFormat(t) {
  //   console.log("11111111");
  //   for (let i = 0; i < t.length; i++) {
  //     let ms = t[i].duration; //播放的毫秒值
  //     //将毫秒转换为秒
  //     let sec = parseInt(ms / 1000);
  //     //将秒转为分钟
  //     let min = parseInt(sec / 60);
  //     //取模 得到剩余的秒数
  //     sec = sec % 60;
  //     if (sec < 10) {
  //       sec = "0" + sec;
  //     }
  //     if (min < 10) {
  //       min = "0" + min;
  //     }
  //     t[i].duration = `${min}:${sec}`;
  //   }
  //   return t;
  // },
};
</script>

<style >
</style>
