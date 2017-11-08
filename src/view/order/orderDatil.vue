<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="listUp">
            <ul>
                <li class="productName">{{productName}}</li>
                <li class="storeName">{{storeName}}</li>
                <li class="status status0" v-if="status == 0">待付款</li>
                <li class="status status0" v-if="status == 4">待验证</li>
                <li class="status status1" v-if="status == 1"><i></i>支付成功</li>
                <li class="status status2" v-if="status == 2||status == 3||status == 5||status == 9"><i></i>已失效</li>
            </ul>
        </div>
        <div class="listDown">
            <ul>
                <li>有效期：<p class="label3">{{orderValidateTime}}</p></li>
                <li>订单金额：<p class="label4">{{totalCost}}</p></li>
                <!--<li>积分抵扣：<p class="label4">{{deductionIntegral}}</p></li>-->
                <li>红包金额：<p class="label4">{{redPacketMoney}}</p></li>
                <li>合计：<p class="label2">{{gathering}}</p></li>
                <li>订单号：<p class="label3">{{orderNo}}</p></li>
                <li>下单时间：<p class="label4">{{orderDate}}</p></li>
                <!--<li>商家地址：<p class="label4">{{storeAdd}}</p></li>-->
                <li>联系电话：<p class="label4">{{storePhone}}</p></li>
            </ul>
        </div>
        <div class="verify" v-if="status == '4'">
            <div class="verCode">验证码：{{verCode}}</div>
            <div class="qrCode"><img :src="picUrl+qrCode"/></div>
            <div class="buttonBox">
                <div class="button" @click="">申请退款</div>
            </div>
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
        background: #efeef4;
        z-index: -999;
    }
    .listUp{
        background: #fff;
        border-bottom: 1px solid #e4e4e4;
        ul{
            padding-top: 32px;
            padding-bottom: 32px;
            margin-left: 30px;
            position: relative;
            .productName{
                font-size: 32px;
                color: #323232;
            }
            .storeName{
                font-size: 28px;
                color: #999;
                margin-top: 30px;
            }
            .status{
                font-size: 30px;
                position: absolute;
                top: 32px;
                right: 30px;
            }
            .status0{
                color: #edb349;
            }
            .status1{
                color: #323232;
                margin-top: 1px;
                i{
                    position: absolute;
                    top: 3px;
                    right: 140px;
                    display: inline-block;
                    width: 39px;
                    height: 39px;
                    background-image: url(../../assets/imgs/pay_suc.png);
                    background-size: 100%;
                }
            }
            .status2{
                color: #646464;
                margin-top: 1px;
                i{
                    position: absolute;
                    top: 3px;
                    right: 110px;
                    display: inline-block;
                    width: 36px;
                    height: 36px;
                    background-image: url(../../assets/imgs/order_invalid.png);
                    background-size: 100%;
                    // background-repeat:no-repeat;
                    // background-position: bottom;
                    // margin-right: 20px;
                }
            }
        }
    }
    .listDown{
        background: #fff;
        ul{
            margin-left: 30px;
            padding-bottom: 30px;
            padding-top: 42px;
            li{
                font-size: 28px;
                color: #999;
                margin-top: 30px;
                p{
                    display: inline-block;
                    // margin-top: 30px;
                    // margin-left: 30px;
                }
            }
            li:first-child{
                margin-top: 0;
            }
            .label2{
                margin-left: 106px;
            }
            .label3{
                margin-left: 78px;
            }
            .label4{
                margin-left: 50px;
            }
        }
    }
    .verify{
        background-color: #fff;
        border-top: 1px solid #e4e4e4;
        .verCode{
            margin-top: 50px;
            text-align: center;
        }
        .qrCode{
            width: 400px;
            margin: 0 auto;
        }
        .buttonBox{
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
                margin-top: 100px;
            }
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                status:"",   //订单状态 (待支付", 0)("已支付", 1)("已退款", 2)("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                productName:" ",    //商品名称
                storeName:"",   //商户名称
                orderValidateTime:"",   //有效期-接口中订单有效期
                totalCost:"",   //消费（订单）金额-接口中订单总金额
                deductionIntegral:"",   //抵扣积分
                redPacketMoney:"",  //红包金额
                gathering:"",   //合计-接口中应收（应付）金额
                orderNo:"",   //订单号
                orderDate:"",   //下单时间-接口中
                storeAdd:"",   //商家地址
                storePhone:"",   //商户电话
                aaaaaaaa:"",   //
                title:"订单详情",
                orderId:"",
                qrcordImg:"",
                verCode:"",
                picUrl:window.sessionStorage.getItem('picUrl'),
                qrCode:""
            }
        },
        components:{
            myHeader
        },
        created(){
            document.body.style.backgroundColor='#fff';
            // this.orderId = this.$route.query.id;
            this.$http.get("/eb-web-api/mobile/order/getOrderDetail",{params:{orderId:this.$route.query.id}}).then(function(res){
                var order = res.body.order;
                this.status = order.status;
                this.storeName = order.storeName;
                this.orderValidateTime = order.orderValidateTime;
                this.totalCost = order.totalCost;
                this.deductionIntegral = order.deductionIntegral;
                this.redPacketMoney = order.redPacketMoney;
                this.gathering = order.gathering;
                this.orderNo = order.orderNo;
                this.orderDate = formatDate(new Date(order.orderDate));
                this.storeAdd = order.storeAdd;
                this.storePhone = order.storePhone;
                this.productName = order.childList[0].productName;
                this.verCode = order.orderNo;
                this.qrCode = order.qrcordImg;
            },(res)=>{

            })

            function formatDate(now) { 
                var year=now.getFullYear(); 
                var month=now.getMonth()+1; 
                var date=now.getDate(); 
                var hour=now.getHours(); 
                var minute=now.getMinutes(); 
                var second=now.getSeconds(); 
                return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
            }
        }
    }
</script>