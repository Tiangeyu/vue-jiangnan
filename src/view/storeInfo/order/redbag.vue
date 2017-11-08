<template>
    <div>
        <headers :title="title" :show-img="false"></headers>
         <div class="redBag-box">
            <h3>可用红包</h3>
            <ul>
                <li class="effective" v-for="item in useRed" :key="item.id" @click="gotoOrder(item.id, item.amount)">
                    <div class="clearfix">
                        <div class="redPrice">
                            ￥{{item.amount}}
                        </div>
                        <div class="redInfo">
                            <p class="redName">红包名称</p>
                            <p class="untill">有效期 : <span>2016-11-11</span></p>
                            <p class="untill">红包代码 : <span>201611153789721</span></p>
                        </div>
                    </div>
                </li>
            </ul>
            <h3>不可用红包</h3>
            <ul>
                <li class="lostEffective" v-for="it in unuseRed" :key="it.id">
                    <div class="clearfix">
                        <div class="redPriceLost">
                            ￥{{it.amount}}
                        </div>
                        <div class="redLost clearfix">
                            <p class="redNameLost">红包名称</p>
                            <p class="lostUntill">有效期 : <span>2016-11-11</span></p>
                            <p class="lostUntill">红包代码 : <span>201611153789721</span></p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <button class="btn" @click="gotoBack">不使用红包</button>
        <tips :contents="contents" v-show="noticeShow"></tips>
    </div>
</template>

<style lang="less" scoped>
    .btn{
        display: block;   
        margin: 0 auto; 
        margin-top: 100px;
        width: 680px;
        height: 88px;
        color: #fff;
        text-align: center;
        line-height: 88px;
        background: #73adf2;
        border-radius: 10px; 
    }
    h3{
        height: 88px;
        line-height: 88px;
        padding-left: 30px;
        font-size: 28px;
        color: #323232;
        border-bottom:  1px solid #e1e1e1;
    }
    ul{
        margin-bottom: 30px;
    }
    .redBag-box{
        margin-top: 88px;
    }
    .effective{
        margin: 0 auto;
        margin-top: 40px;
        height: 230px;
        width: 657px;
        background: url(../../../assets/imgs/redBg.png) no-repeat center;
        background-size: 100% 100%;
        .redPrice{
            float: left;
            width: 170px;
            height: 230px;
            text-align: center;
            line-height: 230px;
            font-size: 40px;
            color: #ffffff;
        }
        .redInfo{
            float: left;
            margin-left: 50px;
            width: 437px;
            height: 230px;
            .redName{
                font-size: 32px;
                color: #323232;
                margin-top: 36px;
            }
            .untill{
                font-size: 28px;
                color: #747474;
                margin-top: 40px;
            }
        }
    }
    .lostEffective{
        margin: 0 auto;
        margin-top: 40px;
        height: 230px;
        width: 657px;
        background: url(../../../assets/imgs/grayBg.png) no-repeat center;
        background-size: 100% 100%;
        .redPriceLost{
            float: left;
            width: 170px;
            height: 230px;
            text-align: center;
            line-height: 230px;
            font-size: 40px;
            color: #ffffff;
        }
        .redLost{
            float: left;
            margin-left: 50px;
            width: 437px;
            height: 230px;
            .redNameLost{
                font-size: 32px;
                color: #dedede;
                margin-top: 36px;
            }
            .lostUntill{
                font-size: 28px;
                color: #dedede;
                margin-top: 40px;
            }
            .nouseIcon{
                float: right;
                display: block;
                margin: 30px 20px 0 0;
                width: 88px;
                height: 75px;
                background: url(../../../assets/imgs/useless.png) no-repeat center;
                background-size: 100% 100%;
            }
        }
    }
</style>

<script>
import tips from '../../../components/tisp/index.vue'
import headers from '../productInfo/header.vue'
import {getItem} from '../../../assets/js/common'
export default {
    components:{
        headers,
        tips
    },
    data(){
        return{
            title: '使用红包',
            redList: '',
            useRed: [],
            unuseRed:[],
            contents: "错误提示",
            noticeShow: false
        }
    },
    methods:{
        gotoOrder(id, amount) {
            this.$router.push({name: 'order', query: {storeId: this.$route.query.storeId,totalPrice: this.$route.query.totalPrice, noYouhui: this.$route.query.noYouhui, finisPrice: this.$route.query.finisPrice, s: this.$route.query.s, p: this.$route.query.p ,tehuiFengding: this.$route.query.tehuiFengding, id: id, amount: amount}})
        },
        gotoBack(){
            this.$router.push({name: 'order', query: {storeId: this.$route.query.storeId,totalPrice: this.$route.query.totalPrice, noYouhui: this.$route.query.noYouhui, finisPrice: this.$route.query.finisPrice, s: this.$route.query.s, p: this.$route.query.p ,tehuiFengding: this.$route.query.tehuiFengding, amount: 0}})
        }
    },
    created(){
        this.$http.get("/eb-web-api/mobile/activity/getRedPacketList",{params:{userName: getItem("customerId"), status: 0, pageNum: 1, numPerPage: 10}}).then((res)=>{
            if(res.body.result === "000"){
                this.redList = res.body.usable;
                for(let i=0; i<this.redList.length; i++){
                    // this.$route.query.amount
                    if(this.redList[i].amount < this.$route.query.finisPrice){
                        this.useRed.push(this.redList[i]);
                    }else{
                        this.unuseRed.push(this.redList[i]);
                    }
                }    
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
        })
    }
}
</script>

