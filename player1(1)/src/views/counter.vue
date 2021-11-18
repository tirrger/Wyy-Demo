<template>
  <div id="counter">
    <div>
      <h2>当前的和为{{ sum }}</h2>
      <h3>(vue)当前和的十倍为{{ tenSum }}</h3>
      <h3>(vuex)当前和的十倍为{{ changeSum }}</h3>
      <p>我在{{school}}学习，学习{{zy}}专业</p>
      <select v-model.number="count">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button @click="JIA(count)">+</button>
      <button @click="JIAN(count)">-</button>
      <button @click="jiadd(count)">当前和为基数时相加</button>
      <button @click="waitadd(count)">等一等再加</button>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations,mapGetters } from 'vuex'
export default {
  name: "counter",
  data() {
    return {
      count: 1,
    };
  },
  methods: {
    // increment() {
    //     // console.log(this);
    //     this.$store.dispatch('JIA',this.count)
    // },
    // decrement() {
    //     this.$store.dispatch('JIAN',this.count)
    // },
    ...mapMutations('modulesX',['JIA','JIAN']),
    ...mapActions('modulesX',['jiadd','waitadd']),
   
    // jiAdd() {
    //   // if (this.sum % 2 != 0) {
    //   //   this.sum += this.count;
    //   // }
    //   this.$store.dispatch('JIADD',this.count)
    // },
    // waitAdd() {
    //   // setTimeout(() => {
    //   //   this.sum += this.count;
    //   // }, 500);
    //   this.$store.dispatch('WAITADD',this.count)
    // },
   
  },
  //计算属性
  computed:{
    tenSum(){
       return this.$store.state.modulesX.sum *10 
    },
    ...mapState('modulesX',{school:'school',zy:'zy',sum:'sum'}),
    ...mapGetters('modulesX',{changeSum:'changeSum'})
  },
  created(){
    // console.log('this.$store.state.temp===>',this.$store.state.temp);
    // let m = ({school:'school',zy:'zy'})
    // console.log(m);
  }
};
</script>

<style>
button {
  margin-left: 10px;
  padding: 0 5px;
}
</style>