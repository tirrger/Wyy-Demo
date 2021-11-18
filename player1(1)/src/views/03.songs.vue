<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" @click="type = 0" :class="{active:type == 0}">全部</span>
      <span class="item" @click="type = 7" :class="{active:type == 7}">华语</span>
      <span class="item" @click="type = 96" :class="{active:type == 96}">欧美</span>
      <span class="item" @click="type = 8" :class="{active:type == 8}">日本</span>
      <span class="item" @click="type = 16" :class="{active:type == 16}">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(item, index) in songsList"
          :key="index"
        >
          <td>{{ index }}</td>
          <td>
            <div class="img-wrap" @click="getUrl(item.id)">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap" >
                <span>{{ item.album.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{ item.album.company }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.alias[0] }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "songs",
  data() {
    return {
      type: 0,
      songsList: [],
    };
  },
  created() {
    this.newSongs();
  },
  methods: {
    async newSongs() {
      const result = await this.$axios({
        url: "top/song",
       
        params: {
          limit: 20,
          type: this.type,
        },
      });
      console.log(result);
      this.songsList = result.data.data;
      console.log(this.songsList);
      for (let i = 0; i < this.songsList.length; i++) {
        let ms = this.songsList[i].duration; //播放的毫秒值
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
        this.songsList[i].duration = `${min}:${sec}`;
      }
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
  watch:{
    type(){
      console.log(this.type);
      this.newSongs()
    }
  }
};
</script>

<style >
</style>
