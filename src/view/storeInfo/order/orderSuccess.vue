<template>
  <div>
      <header>
        订单详情
        <i class="goBack" @click="goBack"></i>
      </header>

      <div class="hint">
          <div class="clearfix">
              <i class="fl"></i>
              <font class="fl">购买成功</font>
          </div>
      </div>

      <div class="information">
          <nav class="clearfix">
              <i class="fl"></i>
              <font class="fl">{{orderData.storeName}}</font>
          </nav>
          <dl class="clearfix" v-show="orderData.type === 2 ? false : true">
              <dd class="fl"></dd>
              <dt class="fl">
                  <h3>{{orderData.productName}}</h3>
                  <h4>￥{{orderData.totalCost}}</h4>
              </dt>
          </dl>
          <ul>          
              <li class="clearfix"><font class="fl">订单金额:</font><span class="fl">￥{{orderData.gathering}}</span></li>
              <li class="clearfix"><font class="fl">订单号:</font><span class="fl">{{orderData.orderNo}}</span></li>
              <li class="clearfix"><font class="fl">官方电话:</font><span class="fl">{{orderData.storePhone}}</span></li>
          </ul>

          <div class="erwei" v-show="orderData.type === 2 ? false : true">
              <p>验证码: 09894654454</p>
              <img :src='picUrl+orderData.qrcordImg' />
          </div>
      </div>
      <tips :contents="contents" v-show="noticeShow"></tips>
  </div>
</template>

<style lang="less" scoped>
.hint {
  border-top: 1px solid #e1e1e1;
  margin-top: 88px;
  height: 180px;
  background: #fff;
  div {
    width: 280px;
    margin: 0 auto;
    padding-top: 60px;
    i {
      width: 65px;
      height: 65px;
      background: url("../../../assets/imgs/ordersucess.png") no-repeat;
      background-size: 100% 100%;
    }
    font {
      padding-left: 30px;
      height: 65px;
      line-height: 65px;
      font-size: 40px;
      color: #323232;
      font-weight: bold;
    }
  }
}

.information {
  margin-top: 20px;
  background: #fff;
  .quan {
    height: 88px;
    padding: 0 30px;
    i {
      width: 32px;
      height: 88px;
      background: url("../../../assets/imgs/order_jiangnan.png") no-repeat left
        center;
      background-size: 100%;
    }
    font {
      line-height: 88px;
      font-size: 28px;
      color: #f4b028;
      padding-left: 20px;
    }
  }
  nav {
    border-top: 1px solid #e1e1e1;
    height: 88px;
    padding: 0 30px;
    i {
      width: 28px;
      height: 88px;
      background: url("../../../assets/imgs/order_chang.png") no-repeat left
        center;
      background-size: 100%;
    }
    font {
      line-height: 88px;
      font-size: 28px;
      color: #323232;
      padding-left: 20px;
    }
  }
  dl {
    height: 136px;
    padding: 20px 30px;
    background: #f5f5f5;
    dd {
      width: 174px;
      height: 136px;
      background: url("../../../assets/imgs/order_jiangnan.png") no-repeat;
      background-size: 100% 100%;
    }
    dt {
      padding-left: 30px;
      h3 {
        padding-top: 32px;
        font-size: 28px;
        color: #323232;
      }
      h4 {
        padding-top: 28px;
        font-size: 28px;
        color: #323232;
      }
    }
  }

  ul {
    padding-top: 40px;
    padding-left: 30px;
    li {
      padding-bottom: 30px;
      font {
        font-size: 28px;
        color: #999;
        width: 180px;
      }
      span {
        font-size: 28px;
        color: #323232;
      }
    }
  }
  .erwei {
    padding-top: 90px;
    padding-bottom: 90px;
    p {
      text-align: center;
      font-size: 28px;
      color: #323232;
      padding-bottom: 36px;
    }
    img {
      display: block;
      width: 307px;
      height: 303px;
      margin: 0 auto;
      border: 0;
    }
  }
}
header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 88px;
    background: #fff;
    text-align: center;
    font-size: 32px;
    color: #333;
    line-height: 88px;
    z-index: 999;
    .goBack{
        width: 22px;
        height: 88px;
        background: url("../../../assets/imgs/product_return.png") no-repeat 0 center;
        background-size: 100%;     
        position: absolute;
        left: 30px;
        top: 0;
    }
    .share{
        width: 37px;
        height: 88px;
        background: url("../../../assets/imgs/product_share.png") no-repeat 0 center;
        background-size: 100%;
        position: absolute;
        top: 0;
        right: 92px;
    }
    .collen{
        width: 40px;
        height: 88px;
        background: url("../../../assets/imgs/product_like.png") no-repeat 0 center;
        background-size: 100%;
        position: absolute;
        top: 0;
        right: 30px;
    }
}
</style>

<script>
import tips from '../../../components/tisp/index.vue'
import {setItem,getItem} from '../../../assets/js/common'
export default {
  components:{
    tips
  },
  data() {
    return {
      orderData: "",
      picUrl: getItem('picUrl'),
      contents: "操作异常",
      noticeShow: false
    };
  },
  methods:{
      goBack(){
          setItem("orderSuccess","0");
          this.$router.push('index')
      }
  },
  created() {
    this.$http
      .get("/eb-web-api/mobile/order/getOrderDetail", {
        params: { orderId: this.$route.query.orderId }
      })
      .then(res => {
        if(res.body.result === "000"){
          this.orderData = res.body.order;
        }else{
          this.noticeShow = true;
          this.contents = "数据库操作异常";
          setTimeout(()=>{
              this.noticeShow = false;
          },2000)
        }     
      }, (res)=>{
        this.noticeShow = true;
        this.contents = "服务器连接异常";
        setTimeout(()=>{
            this.noticeShow = false;
        },2000)
      });

    document.body.style.backgroundColor = "#f5f5f5";
  }
};
</script>

