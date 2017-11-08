<template>
    <div class="fixed-body">
        <div class="main-body">
            <h3>提示</h3>
            <p>{{contents}}</p>
            <div class="btn" @click="aa">确定</div>
        </div>
    </div>   
</template>

<style lang="less" scoped>
    .fixed-body{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.7);
        .main-body{
            opacity: 1;
            position: absolute;
            top: 360px;
            left: 125px;
            width: 500px;
            height: 310px;
            background-color: #fff;
            border-radius: 15px;
            h3{
                padding-top: 40px;
                font-size: 36px;
                color: #323232;
                text-align: center;
                padding-bottom: 46px;
            }
            p{
                font-size: 28px;
                color: #323232;
                padding-bottom: 70px;
                text-align: center;
                border-bottom: 1px solid #e2e2e2;
            }
            .btn{
                text-align: center;
                padding-top: 25px;
                color: #3d87f7;
                font-size: 36px;
            }
            
        }
    }
</style>

<script>
export default {
  props:['contents'],
  methods:{
      aa(){
          this.$emit('calcel')
      }
  }
}
</script>

