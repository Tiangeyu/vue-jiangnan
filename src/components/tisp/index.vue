<template>
  <div>
        <p class="tisp" >{{contents}}</p>
  </div>
</template>
<script>
export default {
props:['contents'],
data(){
    return {
       
    }
},
}
</script>

<style lang="less" scoped>
.tisp{
        background: rgba(000, 000, 000, 0.6);
        width: 500px;
        font-size: 28px;
        text-align: center;
        color: #fff;
        height: 60px;
        padding: 0 20px;
        border-radius:6px;
        position: absolute;
        left: 50%;
        line-height: 60px;
        transform: translateX(-50%);
        bottom: 10%; 
    }
</style>

