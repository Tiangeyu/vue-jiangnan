<template>
  <div>
      <header class="box">
            <p class="back" @click="back"></p>
            <p class="item" v-text="title"></p>
      </header>
      <div class="div"></div>
  </div>
</template>
<style lang="less" scoped>
header{
    height: 88px;
    background: #fff;
    border-bottom: 1px solid #e4e4e4;
    position:fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 999;
     .back{
            width: 40px;
            height: 88px;
            background: url(../../assets/imgs/daohanglan_fanhui.png) no-repeat center center;
            background-size:  22px 40px;
            margin-left: 30px;
            display: block;
        }
        p{
          text-align: center;
          line-height: 88px;
          font-size: 34px;
        }
}
.div{
  height:88px;
}
</style>
<script>
export default {
  props:['title'],
  methods:{
    back(){
      this.$router.go(-1);
    }
  }
}
</script>


