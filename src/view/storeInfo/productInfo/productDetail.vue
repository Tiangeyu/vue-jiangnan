<template>
    <section>
        <!-- 商品banner -->
        <div class="product-title">
            <div class="product-banner" :style="{backgroundImage: 'url('+picUrl+product.bigPicture+')'}"></div>
            <h3>{{product.name}}</h3>
            <p class="product-price"><font class="fon32">￥</font><font class="fon46">{{product.unitPrice}}</font><span>￥{{product.listPrice}}</span></p>
        </div>

        <!-- 商家信息 -->
        <div class="store-info">
            <nav>商家信息</nav>
            <div>
                <dl class="clearfix">
                    <dt class="fl">
                        <h5>{{store.storeName}}</h5>
                        <h6 class="clearfix"><i class="fl"></i><font class="fl">{{store.address}}</font></h6>
                    </dt>
                    <dd class="fr"><i></i></dd>
                </dl>
            </div>
        </div>

        <!-- 商品信息 -->
        <div class="product-info" v-show="productGroup">
            <nav class="clearfix">
                <font class="fl">商品信息</font>
                <i class="fr"></i>
                <span class="fr" @click="goMore">更多图文详情</span>
            </nav>
            <ul>
                <li class="liTitle">{{product.note}}</li>
                <li class="pt20 clearfix" v-for="(it, ind) in productGroup" :key="ind"><font class="fl">{{it.name}}</font><font class="fr">{{it.unitPrice}}元</font><font class="fr">{{it.quantity}}份</font></li>
                <li class="pt40 clearfix"><span class="fr">{{maxPrice}}元</span><font class="fr">最高价值</font></li>
                <li class="pt20 clearfix"><span class="fr px30">{{product.unitPrice}}元</span><font class="fr">团购价</font></li>
            </ul>
        </div>

        <!-- 购买须知 -->
        <div class="notice">
            <nav>购买须知</nav>
            <div>
                <h4>有效期</h4>
                <p>{{product.indate}}</p>
                <h4>使用时间</h4>
                <p>{{product.usingTime}}</p>
                <h4>使用规则</h4>
                <p>{{product.useScope}}</p>
                <p>{{product.limitRemind}}</p>
                <p>{{product.apponintmentRemind}}</p>
                <p>{{product.rooms}}</p>
                <p>{{product.takeOut}}</p>
                <h4>商家服务</h4>
                <p>{{product.storeService}}</p>

            </div>
        </div>

        <div class="geduan">

        </div>

        <footer>
            <span class="fl sp1">￥</span><span class="fl sp2">{{product.unitPrice}}</span>
            <font class="fl">￥{{product.listPrice}}</font>
            <button class="fr" @click="toPay">立即购买</button>
        </footer>
        <tips :contents="contents" v-show="noticeShow"></tips> 
    </section>
</template>

<style lang="less" scoped>
    section{
        margin-top: 88px;
        background: #f7f7f8;
    }
    .product-title{
        background: #fff;
        border-bottom: 1px solid #e1e1e1;
        .product-banner{
            width: 100%;
            height: 400px;
            background-size: 100% 100%; 
            background-repeat: no-repeat; 
        }
        h3{
            font-size: 30px;
            color: #333;
            text-align: center;
            font-family: 'PingFang SC';
            padding-top: 20px;
            padding-bottom: 10px;
        }
        .product-special{
            display: inline-block;
            margin: 0 auto;
            height: 36px;
            i{
                float: left;
                width: 24px;
                height: 36px;
                background: url('../../../assets/imgs/product_ok.png') no-repeat left center;
                background-size: 100%;
            }
            font{
                float: left;
                font-size: 24px;
                line-height: 36px;
                color:#3da4f1;
                font-family: 'PingFang SC';
                margin-right: 20px;
                margin-left: 10px;
            }
        }
        .product-price{
            padding-top: 10px;
            padding-bottom: 30px;
            text-align: center;
            font{
                color: #fd3e3e;
            }
            span{
                color: #999;  
                font-size: 30px;
                text-decoration: line-through; 
                margin-left: 10px;             
            }
            .fon32{
                font-size: 32px;
            }
            .fon46{
                font-size: 46px;
            }
        }
    }
    .store-info{
        background: #fff;
        margin-top: 18px;
        font-family: 'PingFang SC';
        border-bottom: 1px solid #e1e1e1;
        nav{
            font-size: 30px;
            color: #333;
            line-height: 80px;
            border-top: 1px solid #e1e1e1; 
            border-bottom: 1px solid #e1e1e1;
            padding: 0 30px;
            text-align: left;
            font-family: 'PingFang SC';
        }
        dt{       
            margin-left: 30px;
            height: 120px;
            h5{
                text-align: left;
                padding-top: 30px;
                font-size: 28px;
                color: #333;
                padding-bottom: 16px;
            }
            h6{  
                i{
                    width: 19px;
                    height: 30px;
                    background: url('../../../assets/imgs/product_add.png') no-repeat left center;
                    background-size: 100%; 
                    margin-right: 10px;
                }
                font{
                     line-height: 30px;
                     font-size: 26px;
                     color: #666;
                }
            }
        }
        dd{
            padding-left: 36px;
            margin-right: 36px;
            height: 80px;
            border-left: 1px solid #e1e1e1;
            margin-top: 20px;
            i{
                display: inline-block;
                width: 48px;
                height: 80px;
                background: url('../../../assets/imgs/product_contact.png') no-repeat left center;
                background-size: 100%;
            }
        }
    }
    .product-info{
        background: #fff;
        margin-top: 18px;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        font-family: "PingFang SC";
        nav{
            height: 80px;
            padding: 0 30px;
            border-bottom: 1px solid #e1e1e1;
            font{
                font-size: 30px;
                color: #333;
                line-height: 80px;
            }
            span{
                font-size: 24px;
                line-height: 80px;
                color: #666;
                padding-right: 20px;
            }
            i{
                width:18px;
                height: 80px;
                background: url('../../../assets/imgs/store_enter.png') no-repeat left center;
                background-size: 100%; 
            }
        }
        ul{
            text-align: left;
            padding:26px 30px;
            .liTitle{
               font-size: 22px;
               color: #666;
            }
            li{
                font-size: 26px;
                color: #333;
            }
            .pt20{      
                text-align: right;
                padding-top: 20px;
                .fr{
                    width: 120px;
                }
                .px30{
                    font-size: 30px;
                    color: #FD3e3e;
                }
            }
            .pt40{
                margin-top: 40px;
                text-align: right;
                .fr{
                  width: 120px;  
                }
            }
        }
    }
    .notice{
        background: #fff;
        margin-top: 18px;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        font-family: "PingFang SC";
        text-align: left;
        nav{
            height: 80px;
            padding: 0 30px;
            border-bottom: 1px solid #e1e1e1;
            font-size: 30px;
            color: #333;
            line-height: 80px;       
        }
        div{
            padding: 26px 30px;
            h4{
                font-size: 26px;
                color: #333;
                margin-bottom: 20px;
            }
            p{
                font-size: 24px;
                color: #666;
                margin-bottom: 20px;
                padding-left: 40px;
            }
        }
    }
    .geduan{
        margin-top: 18px;
        height: 100px;
    }
    footer{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100px;
        border-top: 1px solid #e1e1e1;
        background: #fff;
        padding: 0 30px;
        span{
            color: #fd3e3e;
        }
        .sp1{
            font-size: 36px;
            padding-right: 10px;
            line-height: 110px;
        }
        .sp2{
            font-size: 50px;
            padding-right: 10px;
            line-height: 100px;
        }
        font{
            font-size: 34px;
            color: #999;
            line-height: 110px;
            text-decoration: line-through;
        }
        button{
            width: 240px;
            height: 70px;
            margin-top: 15px;
            border-radius: 10px;
            background: #efb134;
            font-size: 32px;
            color: #fff;
            line-height: 70px;
            text-align: center;
        }
    }
</style>
    

<script>
import tips from '../../../components/tisp/index.vue'
import banner from '../../../assets/imgs/product_banner.png'
import {getItem} from '../../../assets/js/common.js'
export default {
    components:{
        tips
    },
    data() {
        return {
            banner: banner,
            product: {
                "bigPicture": "group1/M00/00/1D/wKgIBVmVQI-AQpdSAADEU_XygYs455.jpg",
                "categoryName": "美食>西餐",
                "centerPicture": "",
                "channel": 0,
                "checkMan": "",
                "checkNote": "",
                "checkStatus": 1,
                "checkTime": 1503383279000,
                "createTime": 1502097642000,
                "dayBuyCount": 10000,
                "description": "大发'M00/00/20/wKgIBVmbznuAJjkEAAAv__WJsYI388.png'/",
                "endTime": 1501668910000,
                "id": 165,
                "isHaveBuyNote": 0,
                "isHot": 0,
                "isWxshop": 1,
                "listPrice": 18.00,
                "mainCategory": 1,
                "manufactory": "",
                "name": "可乐",
                "note": "",
                "oneBuyCount": 10000,
                "popPicture": "group1/M00/00/1B/wKgIBVmJcEaAIphqAAJziOkpDuc814.jpg",
                "popPicture1": "group1/M00/00/1B/wKgIBVmJcESAGCD1AAJziOkpDuc872.jpg",
                "popPicture2": "group1/M00/00/1B/wKgIBVmJcEaAIphqAAJziOkpDuc814.jpg",
                "producingArea": "",
                "quantity": 10000,
                "quantityError": 100,
                "smallPicture": "",
                "startTime": 1501578910000,
                "status": 0,
                "storeId": 35,
                "storeName": "肯德基",
                "storeUserName": "kendeji",
                "subCategory": 9,
                "type": 1,
                "unit": "",
                "unitPrice": 0.01,
                "updateTime": 1503383266000,
                "validityEndTime": 1511946910000,
                "validityStartTime": 1501578910000,
                "version": 0
            },
            store:{
                "mobile":"13333333333",
                "storeId":35,
                "storeName":"肯德基",
                "address":"地址地址地址"
            },
            maxPrice: 0,
            picUrl: getItem('picUrl'),
            contents: "错误提示",
            noticeShow: false
        }
    },
    methods:{
        goMore(){
            this.$router.push({name: 'morePic', query: {productId: this.$route.query.productId}});
        },
        toPay(){
            if(!getItem("customerId")){
                this.$router.push({ name: 'login', query: {productId: this.$route.query.productId}});
                return;
            }
            let objArr = [];
            let obj = {};
            obj.gathering = this.product.unitPrice;
            obj.totalCost = this.product.listPrice;
            obj.type = 0;
            obj.storeId = this.store.storeId;
            obj.storeName = this.store.storeName;
            obj.storePhone = this.store.storePhone;
            obj.customerId = 1;
            obj.customerName = 1;
            obj.childList = [];
            obj.childList[0]={};
            obj.childList[0].basePrice = this.product.listPrice;
            obj.childList[0].unitPrice = this.product.unitPrice;
            obj.childList[0].productName = this.product.name;
            obj.childList[0].productId = this.product.id;
            obj.childList[0].bigImage = this.product.bigPicture;
            obj.childList[0].quantity = 1;
            objArr.push(obj);
            let orderInfos = JSON.stringify(objArr);
            this.$http.get("/eb-web-api/mobile/order/saveOnlineOrder",{params: {orderInfos: orderInfos}}).then((resq)=>{
                if(res.body.result === "000"){
                    window.location.href = "../h5/pay.html?orderAmount="+this.product.unitPrice+"&bussOrderNo="+ resq.body.orderParentNo+"&orderIdList="+resq.body.orderId;
                }else{
                    this.noticeShow = true;
                    this.contents = "保存订单失败";
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
    },
    created() {
        //  登陆与 未登录状态不同, 查询的接口参数也不同, 主要是用来判断是否被收藏的, 只有登陆了才判断, 未登录不能判断

        if(getItem("customerId")){
            this.customerId = getItem("customerId");
        }else{
             this.customerId = "";
        }
        this.$http.get('/eb-web-api/mobile/product/getProductDetailById',{params:{ userId :this.customerId,productId: this.$route.query.productId}}).then((res)=>{
            if(res.body.result === "000"){
                this.product = res.body.product;
                this.store = res.body.store;
                this.$emit("isCollen",res.body.isCollect)
                this.productGroup = res.body.product.productGroup;
                let maxPrice = this.productGroup[0].unitPrice;
                for(let i=1; i<this.productGroup.length; i++){
                    if(maxPrice < this.productGroup[i].unitPrice){
                        maxPrice = this.productGroup[i].unitPrice;
                    }              
                }
                this.maxPrice = maxPrice;
            }else{
                this.noticeShow = true;
                this.contents = "获取订单详情失败";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            }
        },(res)=>{
            this.noticeShow = true;
            this.contents = "服务器连接异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
        })
    }
}
</script>

