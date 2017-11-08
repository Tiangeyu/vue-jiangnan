<template>
    <div class="parent-box">
        <headers :title="title" :show-img="false"></headers>

        <ul>
            <li><font>姓名</font><span>刘艳</span></li>
            <li><font>付款金额</font><span style="color: red;">588.00元</span></li>
            <li><font>付款账户</font><span><select><option>6213**** ****1156</option></select></span></li>
            <li><font>账户余额</font><span>50.00元</span></li>
        </ul>

        <div class="note clearfix"><font class="fl">短信验证码: </font><input class="fl writen" type="text" placeholder="请输入验证码"><span class="fr getNum" @click="resetTime">获取</span></div>

        <button class="btn" @click="ensuerHandle">确定</button>

        <div class="pay-model" v-show="isShowPay">
            <div class="pay-body">
                <h3 class="pay-title">取款密码</h3>
                <input type="text" placeholder="请输入取款密码">
                <div class="btns clearfix"><span class="pay-cancle" @click="isShowPay = !isShowPay">取消</span><span class="pay-sure" @click="goOroff">确定</span></div>
            </div>
        </div>

        <notice :contents="contents" v-show="isShowNotice" @calcel="isShow"></notice>
    </div>
     
</template>

<style lang="less" scoped>
    ul{
        padding-top: 88px;
        background-color: #fff;
        li{
            border-top: 1px solid #e3e3e3;
            height: 88px;
            padding: 0 30px;        
            font{
                float: left;
                font-size: 32px;
                color: #323232;
                line-height: 88px;
            }
            span{
                float: right;
                color: #323232;
                font-size: 32px;
                line-height: 88px;
            }
        }
    }
    .note{
        margin-top: 20px;
        background-color: #fff;
        padding: 0 30px;
        height: 88px;
        font{
            line-height: 88px;
            font-size: 32px;
            color: #323232;
        }
        .writen{
            width: 200px;
            height: 62px;
            border-radius: 4px;
            border: 1px solid #e3e3e3;
            margin-top: 13px;
            margin-left: 10px;
            padding: 0 20px;
        }
        ::-webkit-input-placeholder{
            color: #999;
        }
        :-ms-input-placeholder{
            color: #999;
        }
        .getNum{
            margin-top: 16px;
            width: 170px;
            height: 60px;
            color: #6ca1ec;
            line-height: 60px;
            text-align: center;
            background-color: #e3e3e3;
            border-radius: 4px;
            font-size: 25px;
        }
    }
    .btn{
        display: block;
        background-color: #6ca1ec;
        font-size: 36px;
        color: #fff;
        height: 88px;
        width: 680px;
        border-radius: 10px;
        line-height: 36px;
        text-align: center;
        margin: 0 auto;
        margin-top: 100px;
         
    }
    .pay-model{
        position: absolute;
        z-index: 999;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .7);
        .pay-body{
            position: absolute;
            left: 125px;
            width: 500px;
            top: 340px;
            height: 320px;
            background: #fff;
            border-radius: 15px;
            overflow: hidden;
        }
        .pay-title{
            height: 90px;
            line-height: 90px;
            background: #3d87f7;
            font-size: 36px;
            color: #fff;
            text-align: center;
        }
        input{
            display: block;
            margin-top: 36px;
            margin-left: 44px;
            width: 382px;
            height: 62px;
            border-radius: 8px;
            padding-left: 30px; 
            border: 1px solid #e1e1e1;
        }
        .btns{
            position: absolute;
            left: 0;
            bottom: 0px;
            right: 0;
            height: 88px;
            border-top: 1px solid #e1e1e1;
            .pay-cancle{
                display: inline-block;
                height: 88px;
                width: 249px;
                border-right: 1px solid #e1e1e1;
                font-size: 36px;
                color: #999;
                text-align: center;
                line-height: 88px;
            }
            .pay-sure{
                display: inline-block;
                height: 88px;
                width: 248px;
                font-size: 36px;
                color: #3d87f7;
                text-align: center;
                line-height: 88px;
            }
        }
        
    }
</style>


<script>
import headers from '../productInfo/header.vue'
import notice from '@/components/notice/index.vue'

export default {
  components:{
      headers,
      notice
  },
  data(){
      return{
          title: '支付',
          timers: 59,
          contents: "该短信验证码已发送, 请注意查收",
          isShowNotice: false,
          isShowPay: false
      }
  },
  created(){
      document.body.style.backgroundColor = "#eff0f4";
  },
  methods:{
      isShow(){
          this.isShowNotice = !this.isShowNotice;
      },
      resetTime(){        
          this.isShow();
      },
      ensuerHandle(){
        //   ...
          this.isShowPay = !this.isShowPay
      },
      goOroff() {
          this.$http.get("/eb-web-api/mobile/order/prePaymentOrder",{params: {orderAmount: this.$route.query.orderAmount, bussOrderNo: this.$route.query.bussOrderNo, orderId: this.$route.query.orderId}}).then((res)=>{
              if(res.body.result === "000"){
                    this.$router.push({name:'orderSuccess', query:{orderId: this.$route.query.orderId}})
              }
          })
        
      }
  }
}
</script>

