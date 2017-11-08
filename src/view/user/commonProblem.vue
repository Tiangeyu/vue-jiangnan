<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="pList">
            <ul>
                <li>
                    <h4>1.如何保证支付安全？</h4>
                    <p>移动支付会通过秘钥、取款密码验证、手机短信验证码、风险控件等技术手段来检验使用者身份，保证您的资金安全。</p>
                </li>
                <li>
                    <h4>2.如何进行线上支付？</h4>
                    <p>您可以通过点击商品详情页面的“立即购买”按钮，完成订单确认（包含派送信息、订单数量、订单金额等信息），并进行银行卡支付，凭支付成功后的验证信息在商户POSS机验证完成后完成最终支付；也可以通过加入购物车进行统一结算。</p>
                </li>
                <li>
                    <h4>3.商圈中的食物商品/服务支持货到付款么？</h4>
                    <p>目前暂不支持货到付款；如需购买商圈实物商品/服务，您必须利用手机银行完成付款。</p>
                </li>
                <li>
                    <h4>4.外卖订单还没有送到怎么办？</h4>
                    <p>用餐高峰、路况拥堵、或恶劣天气等原因。均有可能影响到外卖的送达时间；如果等待的时间确实超出承受范围，您可直接至“我的订单”中查找改订单，通过拨打商户联系电话进行催单。</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .pList{
        padding-left: 30px;
        li{
            border-bottom: 1px solid #e0e0e0;
            h4{
                margin-top: 20px;
                font-size: 28px;
                color: #323232;
            }
            p{
                margin-top: 20px;
                margin-bottom: 24px;
                font-size: 24px;
                color: #646464;
            }
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                title:"常见问题",
            }
        },
        components:{
            myHeader
        },
        created(){
            document.body.style.backgroundColor='#fff';
        }
    }
</script>