<template>
    <section>   
        <header class="headerBg clearfix" :style="{backgroundImage:'url('+picUrl +shoppingList.bigImage+')'}">
            <i class="returnBtn" @click="back()"></i>
            <!--<i class="shareIcon"></i>-->
        </header>
        <div class="timeDown clearfix  ">
            <span class="fontRed">数量有限，抢完即止！</span>
            <span class="fontGray">距离本场结束还有</span>
            <p class="timeColor">
                <span id="t_h">{{h}}</span>
                <span id="tm">{{m}}</span>
                <span id="t_s">{{s}}</span>
            </p>
            
        </div>
        <div class="productList">
            <ul>
                <li class="productPic clearfix" v-for="item in productList" :key="item.id">
                    <div class="imgDiv"><i :style="{backgroundImage:'url('+picUrl +item.smallPicture+')'}"><div class="circal" v-show="item.totalCount<=0"><div class="insideCircle">抢光了</div></div></i></div>
                    <div class="productDiv clearfix">
                        <p class="productInfo">{{item.productName}}</p>
                        <div class="buttonDiv clearfix">
                            <p class="detailPro">{{item.note}}</p>
                            <button class="buyBtn" v-show="item.totalCount>0" @click="goBuy(item.productId)">立即抢购</button>
                            <button class="grayBg" v-show="item.totalCount<=0">立即抢购</button>
                        </div>
                        <p class="productPrice"><span class="moneyIcon">￥</span>{{item.unitPrice}}<span class="realPrice">￥{{item.listPrice}}</span></p>
                    </div>
                </li>
            </ul>
        </div>
        <tisp v-show="remainBox" :contents ="contents"></tisp>
        <!--<infinite-loading  :on-infinite="queryFn"  ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="information">
                <span slot="no-more">
                    没有更多数据
                </span>
            </div>
        </infinite-loading>-->
    </section>
</template>
<style lang="less" scoped>
    .circal{
        margin: 0 auto;
        padding: 10px;
        height: 120px;
        width: 120px;
        border-radius: 50%;
        background: #9a9a9a;
        opacity:0.9;
        .insideCircle{
            margin: 0 auto;
            height: 110px;
            line-height: 110px;
            width: 110px;
            border-radius: 50%;
            background: #9a9a9a;
            opacity:0.9;
            color: #ffffff;
            text-align: center;
            font-size: 28px;
            border: 5px solid rgba(255, 255, 255, 1);
        }
    }
    .headerBg{
        border-bottom: 1px solid #aaaaaa;
        height: 364px;
        background: url(../../assets/imgs/specialBanner.png) no-repeat center;
        background-size: 100% 100%;
        .returnBtn{
            display: inline-block;
            margin: 24px 0 0 30px;
            width: 22px;
            height: 40px;
            background: url(../../assets/imgs/daohanglan_fanhui_@2x.png) no-repeat center;
            background-size: 100%;
            float: left;
        }
        .shareIcon{
            display: inline-block;
            margin: 24px 30px 0 0 ;
            background: url(../../assets/imgs/daohanglan_share_@2x.png) no-repeat center;
            background-size: 100% 100%;
            float: right;
            width: 37px;
            height: 44px;
        }
    }
    .index-banner {
        display: block;
        height: 364px;
        background: #aaaaaa;
        border-bottom: 1px solid #aaaaaa;
        a {
            display: block;
            height: 100%;
            background-size: 100% 100%;
        }
        .swiper-pagination span {
            width: 18/200/1.17rem;
            border-radius: 0;
            height: 5px;
            background: #fff;
        }
        .swiper-pagination-bullet-active {
            background: #000;
            opacity: 0.7
        }
        .returnBtn{
            display: inline-block;
            margin: 24px 0 0 30px;
            width: 22px;
            height: 40px;
            background: url(../../assets/imgs/daohanglan_fanhui_@2x.png) no-repeat center;
            background-size: 100%;
            float: left;
            z-index: 999;
        }
        .shareIcon{
            display: inline-block;
            margin: 24px 30px 0 0 ;
            background: url(../../assets/imgs/daohanglan_share_@2x.png) no-repeat center;
            background-size: 100% 100%;
            float: right;
            width: 37px;
            height: 44px;
        }
    }
    .timeDown{
        border-bottom: 1px solid #aaaaaa;
        height: 70px;
        line-height: 70px;
        background: #f9f9f9;
        font-size: 24px;
        .fontRed{
            margin-left: 30px;
            color: #fd8a8a;
            float: left;
        }
        .fontGray{
            color: #d4d4d4;
        }
        .timeColor{
            display: inline;
            margin: 22px 30px 0 0;
            color: #fd8a8a;
            float: right;
        }
    }
    .productList{
        background: #ffffff;
        overflow: hidden;
        padding-right: 30px;
    }
    .productPic{
        width:100%;
        margin: 20px 0 0 30px;
        border-bottom: 1px solid #E1E1E1;
        .imgDiv{
            float: left;
            width: 28%;
        }
        .imgDiv i{
            display: block;
            background: url(../../assets/imgs/productDetail.png) no-repeat center;
            background-size: 100%;
            width: 194px;
            height: 150px;
            border-radius: 5px;
            z-index:1;
        }
        .productDiv{
            width: 72%;
            text-align: left;
            float: left;
            margin-top: 12px;
            .productInfo{
                margin: 0 0 0 12px;
                font-size: 28px;
                color: #333333;
            }
            .buttonDiv{
                .detailPro{
                    float: left;
                    margin-top: 26px;
                    font-size: 24px;
                    color: #333333;
                    margin: 26px 0 0 12px;
                }
                .buyBtn{
                    float: right;
                    display: block;
                    height: 59px;
                    line-height: 59px;
                    width: 146px;
                    border-radius: 10px;
                    background: #ff5e5d;
                    margin: 20px 30px 0 0;
                    color: #ffffff;
                    font-size: 24px;
                    text-align: center;
                }
            }
            .productPrice{
                color: #fd3e3e;
                font-size: 48px;
                font-weight: bolder;
                .moneyIcon{
                    margin-left: 12px;
                    color: #fd3e3e;
                    font-size: 24px;
                }
                .realPrice{
                    text-decoration: line-through;
                    font-size: 30px;
                    color: #b6b6b6;
                    font-weight: bolder;
                    margin-left: 20px;
                }
            }
        }
    }
    .grayBg{
        float: right;
        display: block;
        height: 59px;
        line-height: 59px;
        width: 146px;
        border-radius: 10px;
        margin: 20px 30px 0 0;
        color: #ffffff;
        font-size: 24px;
        text-align: center;
        background: #9a9a9a;
    }
    .check_frame{
        float: right;
        position: relative;
        top: 310px;
        margin-right:26px;
    }
    .check_frame .checkbox { display: none; }
    .check_frame  .trigger {
        cursor: pointer;
        position: relative;
        float: right;
        width: 70px; 
        height: 30px;
        border-radius: 15px;
        background: #ff5e5d;
        overflow: hidden;
        -webkit-transition: background .15s linear;
    }
    .check_frame .checkbox:checked + .trigger { background: #ff5e5d; }
    .check_frame .trigger:before {
        content: '';
        position: absolute;
        width: 30px; height: 30px;
        border-radius: 50%;
        background: #ffffff;
        -webkit-transition: left .15s linear;
    }
    .check_frame .checkbox:checked + .trigger:before { left: 40px; }
    .remainFont{
        font-size: 20px;
        color:#ff5e5d;
        margin-right: 16px;
    }
    .gearArea {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
        font-size: 10px;
        background-color: rgba(0, 0, 0, 0);
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9900;
        overflow: hidden;
        -webkit-animation-fill-mode: both;
                animation-fill-mode: both
    }
    .remainBox{
        padding: 32px 26px;
        width: 404px;
        // height: 192px;
        margin: 0 auto;
        margin-top: 478px;
        font-size: 28px;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        border-radius: 10px;
    }
    .alertA{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        background: rgba(0, 0, 0, 0.3);
        .al-block{
            width: 404px;
            padding-bottom: 26px;
            background: #fff;
            border-radius: 20px; 
            margin: 0 auto;
            margin-top: 478px;
            text-align: center;
        }
        h3{
            padding-top: 44px;
            font-size: 26px;
            font-weight: bold;
            color: #2a2a2a;
            text-align: center;
        }
        span{
            display: block;
            padding-top: 40px;
            font-size: 24px;
            color: #2a2a2a;
        }
        .al-button{
            width: 80%;
            margin: 0 auto;
            margin-top: 44px;
            .goSure{
                float: left;
                background:#ff6600;
                width: 130px;
                height: 45px;
                font-size: 22px;
                line-height: 45px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
            }  
            .toClose{
                float: right;
                background: #ff6600;
                width: 130px;
                height: 45px;
                font-size: 22px;
                line-height: 45px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
            }
             .fontColor{
               color: #fff;
           }
           
        }
    }
</style>
<script>
import {getItem} from '../../assets/js/common'
import tisp from '../../components/tisp/index.vue';
import InfiniteLoading from 'vue-infinite-loading';
export default {
    data (){
        return {
            h:'00',
            m:'00',
            s:'00',
            shoppingList:'',
            messagePush:'',
            productList:[],
            shoppingList:[],
            picUrl: getItem('picUrl'),
            contents:"活动暂未开始，敬请期待",
            remainBox:false,
            customerId:window.sessionStorage.getItem('customerId')
        }
    },
    components:{
        tisp,
        InfiniteLoading,
    },
    methods:{
        back(){
           this.$router.go(-1)
        },
        timerDetail() {
            Date.prototype.format = function (format) {
                let date = {
                    "M+": this.getMonth() + 1,
                    "d+": this.getDate(),
                    "h+": this.getHours(),
                    "m+": this.getMinutes(),
                    "s+": this.getSeconds(),
                    "q+": Math.floor((this.getMonth() + 3) / 3),
                    "S+": this.getMilliseconds()
                };
                if (/(y+)/i.test(format)) {
                    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in date) {
                    if (new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                    }
                }
                return format;
            }

            //  设置倒计时
            
            let testTime = this.shoppingList.endTime;
            // console.log(testTime)
            let newDate = new Date();
            newDate.setTime(testTime );
            //console.log(newDate)
            let formatTime = newDate.format('yyyy-MM-dd hh:mm:ss')
            // console.log(formatTime)
            let toStartTime = this.shoppingList.startTime;
            // console.log(testTime)
            let newSDate = new Date();
            newSDate.setTime(toStartTime );
            let formatSTime = newSDate.format(formatTime)
            // console.log(formatSTime)
            // let arr = formatTime.split("-");
            
            let that = this;
            
            function GetRTime(){
                var EndTime= new Date(formatTime);//开始时间
                // console.log(formatTime)
                var NowTime = new Date();
                var t =EndTime.getTime() - NowTime.getTime();
                // console.log(t)
                var d=0;
                var h=0;
                var m=0;
                var s=0;
                if(t>=0){
                    d=Math.floor(t/1000/60/60/24);
                    h=Math.floor(t/1000/60/60%24);
                    m=Math.floor(t/1000/60%60);
                    s=Math.floor(t/1000%60);
                }
                that.h=(that.fill(h) +":");
                that.m=(that.fill(m) +":");
                that.s=(that.fill(s));
            }
            // setInterval(GetRTime);
            if(Date.parse(new Date()) - that.shoppingList.startTime > 0){
                setInterval(GetRTime);
            }else if(Date.parse(new Date()) - that.shoppingList.startTime < 0){
                clearInterval(GetRTime);
            }
        },
        goBuy:function(productId){
            var startBuy = new Date();
            if(Date.parse(new Date()) - this.shoppingList.startTime > 0){
                this.$router.push({name: 'productInfo',query:{productId: productId,userId:this.customerId}})
            }else{
                this.remainBox =!this.remainBox
                var that = this;
                setTimeout(function() {     
                    that.remainBox = false;
                }, 2000);
                return false;
            }

        },
        fill(n){
          if(n<10){
              n='0'+n
          }
            return n;
        },
        // queryFn(){
        //     this.page=this.page+1;
        //     this.$http.get("/eb-web-api/mobile/activity/getProductByShoppingId",{params:{pageNum:this.page,shoppingId:this.$route.query.shoppingId,userId:this.customerId}}).then((res)=>{
        //         this.loadList = res.body;
        //         // this.shoppingList = res.body.shopping;
        //         if(res.body.result === "000"){
        //             if(this.loadList.list.length>0){
        //                 this.loadList = this.loadList.concat(this.loadList.list);
        //                 // this.shoppingList = this.shoppingList.concat(this.shoppingList);
        //                 this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded'); 
        //             }else{      
        //                 this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        //             }  
        //         }else{
        //             this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        //         }                 
        //     },(res)=>{
        //             this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
        //     })
        // },
    },
    created(){
        document.body.style.backgroundColor = "#f6f6f6";
        this.$http.get("/eb-web-api/mobile/activity/getProductByShoppingId",{params:{shoppingId:this.$route.query.shoppingId,userId:this.customerId}}).then((res)=>{
                this.productList = res.body.list;
                this.shoppingList = res.body.shopping;
                if(res.body.result == "000"){
                   
                    this.timerDetail();
                }
            }).catch((res)=>{
                
            })
    }
}
</script>

