<template>
  <div>
      <div class="div"></div>
      <footer class="box">
          <div class="item">
             <router-link to='./index'  :class="{'active':page=='0'}">
                  <span>首页</span>
             </router-link>
          </div>
          <div class="item">
             <router-link to='./orderList' :class="{'active':page=='1'}">
                  <span>订单</span>
             </router-link>
          </div>
          <div class="item">
             <router-link to='./user' :class="{'active':page=='2'}">
                  <span>我的</span>
             </router-link>
          </div>
      </footer>
  </div>
</template>
<script>
export default {
  props:['page']
}
</script>

<style lang="less" scoped>
.div{
    width:100%;height:98px
}

    footer{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 98px;
        background: #3da4f1;
        a{
            text-align: center;
            display: block;
            height: 98px;
            font-size: 24px;
            color: #fff;
            background: url(../../assets/imgs/home.png) no-repeat center 12px;
            background-size: 46px 46px;
            padding-top:60px; 
            box-sizing: border-box;
        }
        div:nth-child(2) a{
            background-image: url(../../assets/imgs/my.png);
        }
        div:nth-child(3) a{
            background-image: url(../../assets/imgs/order.png);
        }

        a.active{
             background-image: url(../../assets/imgs/homeActive.png);
             color: #ffec85;
        }
        div:nth-child(2) a.active{
             background-image: url(../../assets/imgs/myActive.png);
             color: #ffec85;
        }
        div:nth-child(3) a.active{
             background-image: url(../../assets/imgs/myOrder.png);
             color: #ffec85;
        }
    }
</style>

