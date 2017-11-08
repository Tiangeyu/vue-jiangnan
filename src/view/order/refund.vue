<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <nav>
            {{orderData.storeName}}
        </nav>
        <dl class="clearfix">
            <dd class="fl" :style="{backgroundImage: 'url('+picUrl+orderData.childList[0].bigImage+')'}"></dd>
            <dt class="fl">
                <h3>{{orderData.childList[0].productName}}</h3>
                <p>{{orderData.childList[0].basePrice}}</p>
                <h4>共{{orderData.childList[0].quantity}}件</h4>
            </dt>
        </dl>
        <div class="listUp">
            <ul>          
                <li class="clearfix">
                    <p class="fl">总价</p>
                    <font class="fr">￥{{orderData.totalCost}}</font>
                </li>                    
                <li class="clearfix">
                    <p class="fl">退款数量</p>
                    <font class="fr">{{orderData.childList[0].quantity}}</font>
                </li>
                <li class="clearfix">
                    <p class="fl">退款金额</p>
                    <font class="fr">￥{{orderData.gathering}}</font>
                </li> 
                <li class="clearfix">
                    <p class="fl">退款账户</p>
                    <font class="fr">{{orderData.acNo}}</font>
                </li>      
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" @click="exitPay">确定</div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: #f5f5f5;
        z-index: -999;
    }
    nav{
        height: 80px;
        border-bottom: 1px solid #e5e5e5;
        padding: 0 30px;
        font-size: 32px;
        color: #323232;
        line-height: 80px;
        background: #fff;
    }
    dl{
        padding: 18px 30px;
        border-bottom: 1px solid #e5e5e5;
        background: #fff;
        dd{
            width: 140px;
            height: 140px;
            margin-right: 30px;
            background-repeat: no-repeat; 
            background-size: 100% 100%; 
        }
        dt{
            font-size: 28px;
            h3{
                padding-top: 10px;               
                color: #323232;
            }
            p{
                padding-top: 15px;
                color: #999;
            }
            h4{
                padding-top: 15px;
                color: #323232; 
            }
        }
    }
    .gap20{
        width: 100%;
        height: 20px;
        background: #efeef4;
    }
    .listUp,.listDown{
        ul{
            background: #fff;
            li{
                height: 80px;
                border-bottom: 1px solid #e5e5e5;
                padding: 0 30px;
                font-size: 28px;
                color: #646464;
                font{
                    background-size: 100%;
                    margin-top: 24px;
                }
                p{  
                    line-height: 80px;
                }
            }
        }
        .cacheNum{
            margin-right: 30px;
        }
    }
    .buttonBox{
        width: 750px;
        .button{
            width: 670px;
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #fff;
            background: #6ca1ed;
            border-radius: 10px;
            text-align: center;
            margin: 0 auto;
            margin-top: 140px;
        }
    }
</style>
<script>
    import {getItem} from '../../assets/js/common'
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                cacheNum:"255",
                title:"退款确认",
                customerId:"",
                orderData: '',
                picUrl: getItem("picUrl")
            }
        },
        components:{
            myHeader
        },
        methods:{
            exitPay(){
                this.$http.get("/eb-web-api/mobile/order/refundOrder",{params: {refundAmount: this.orderData.gathering, orderId: this.$route.query.orderId}}).then((res)=>{
                    if(res.body.resultMsg === "退款成功"){
                        this.$router.push("/refundSuc");
                    }else{
                        alert(res.body.resultMsg)
                    }
                })
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.customerId = this.$route.query.id;

            this.$http.get("/eb-web-api/mobile/order/getOrderDetail",{params: {orderId: this.$route.query.orderId}}).then((res)=>{
                this.orderData = res.body.order;
            })
        }
    }
</script>