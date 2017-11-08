<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="listUp">
            <ul>
                <li class="clearfix">
                    <i class="fl"></i>
                    <p class="fl">退款成功</p>
                </li>
                <div class="gap20"></div>
                <li class="clearfix last_li">
                    <p class="fl">
                        温馨提示：<br/>
                        预计10秒内退至您交易支付账户，退款成功时间以查询结果为准
                    </p>
                </li>
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" @click="order">查看我的订单</div>
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
    .gap20{
        width: 100%;
        height: 20px;
        background: #efeef4;
    }
    .listUp{
        ul{
            background: #fff;
            li:first-child{
                height: 80px;
                p{
                    font-size: 30px;
                    color: #323232;
                    line-height: 80px;
                    text-align: center;
                }
                i{
                    display: block;
                    width: 39px;
                    height: 39px;
                    background-image: url(../../assets/imgs/pay_suc.png);
                    background-size: 100%;
                    margin-top: 20px;
                    margin-left: 285px;
                    margin-right: 20px
                }
            }
            li:last-child{
                height: 230px;
                p{
                    width: 700px;
                    margin-left: 25px;
                    margin-top: 30px;
                    font-size: 28px;
                    color: #b0b0b0;
                    line-height: 50px;
                }
            }
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
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                cacheNum:"255",
                title:"交易结果",
                customerId:""
            }
        },
        components:{
            myHeader
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.customerId = this.$route.query.id;
        },
        methods:{
            order(){
                this.$router.push("orderList");
            }
        }
    }
</script>