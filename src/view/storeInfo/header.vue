<template>
  <header>
      {{title}}
      <i class="goBack" @click="goBack"></i>
  </header>
</template>

<style lang="less" scoped>
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 88px;
    background: #3da4f1;
    text-align: center;
    font-size: 32px;
    color: #fff;
    line-height: 88px;
    z-index: 999;
    .goBack{
      width: 22px;
      height: 88px;
      background: url("../../assets/imgs/daohanglan_fanhui_@2x.png") no-repeat 0 center;
      background-size: 100%;     
      position: absolute;
      left: 30px;
      top: 0;
    }
    .share{
      width: 37px;
      height: 88px;
      background: url("../../assets/imgs/daohanglan_share_@2x.png") no-repeat 0 center;
      background-size: 100%;
      position: absolute;
      top: 0;
      right: 92px;
    }
    .collen{
      width: 40px;
      height: 88px;
      background: url("../../assets/imgs/shoucang_meishangse_@2x.png") no-repeat 0 center;
      background-size: 100%;
      position: absolute;
      top: 0;
      right: 30px;
    }
  }
</style>

<script>
export default {
  props:['title'],
  methods:{
    goBack(){
      window.history.go(-1)
    }
  }
}
</script>



