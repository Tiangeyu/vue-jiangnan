<template>
    <div>
        <div class="box">
                <router-link to='/' class="back"></router-link>
                <p class="item" v-text="title" @click="selType"></p>
                <i class="selType" @click="selType"></i>
        </div>
        <div>
            <ul class="head clearfix">
                <li class="fl" @click="verify"><p :class="{sel:isV}" v-show="!isPay">待验证</p></li>
                <li class="fl" @click="pay"><p :class="{sel:isP}">待付款</p></li>
                <li class="fl" @click="success"><p :class="{sel:isS}">交易成功</p></li>
                <li class="fl" @click="refund"><p :class="{sel:isR}">退款成功</p></li>
                <li class="fl" @click="all"><p :class="{sel:isA}" v-show="isPay">全部订单</p></li>
            </ul>
            <ul class="content">
                <li v-for="(item,i) in orders" :key="i">
                    <div>
                        <ul>
                            <li class="clearfix storeInfo">
                                <i class="fl commonShopLogo"></i>
                                <p class="fl storeName">{{item.storeName}}</p>
                                <i class="fr del" v-show="!isV" @click="del(item.id)"></i>
                                <p class="fr status" v-show="item.status == '4'" :class="{mr70:isV}">待验证</p>
                                <p class="fr status" v-show="item.status == '0'">待付款</p>
                                <p class="fr status" v-show="item.status == '5'">交易成功</p>
                                <p class="fr status" v-show="item.status == '2'">退款成功</p>
                            </li>
                            <router-link :to="{path:'orderDatil',query: {id: item.id}}" class="productBox">
                                <li class="productInfo clearfix" v-for="(product,index) in item.childList" :key="index">
                                    <img :src="picUrl+product.bigImage" class="fl" />
                                    <div class="fl">
                                        <p>{{product.productName}}</p>
                                        <p>￥{{product.unitPrice}}</p>
                                    </div>
                                </li>
                            </router-link>
                                <li class="orderInfo clearfix">
                                    <p class="fl"> 订单号：{{item.parentId}}</p>
                                    <p class="orderButton fr" v-show="item.status == '0'" @click="goPay(item.gathering,item.childList[0].id,item.parentId)">继续支付</p>
                                    <p class="orderButton fr orderButtonV" v-show="item.status == '4'" @click="goVer(item.id)">查看二维码</p>
                                    <router-link :to="{path:'myComment',query: {storeId: item.storeId,orderId: item.id,orderNo:item.orderNo}}">
                                        <p class="orderButton fr orderButtonS" v-show="item.status == '5'">去评价</p>
                                    </router-link>
                                </li>
                        </ul>
                        <div class="gap20"></div>
                    </div>
                </li>
            </ul>
            <infinite-loading  :on-infinite="queryFn"  ref="infiniteLoading" spinner='bubbles'>
                <img slot="no-results"  class="information" :src="logo" />
                <span slot="no-more">
                    订单已加载完成
                </span>
            </infinite-loading>
        </div>
        <myFooter :page='1'></myFooter>
        <div class="selTypeBox" v-show="isSelType">
            <ul>
                <li @click="typePay">买单订单</li>
                <li @click="typePro">商品订单</li>
            </ul>
        </div>
        <div class="fixed-body" v-show="isShow">
            <div class="main-body clearfix">
                <h3>温馨提示</h3>
                <p>{{contents}}</p>
                <div class="btnL fl" @click="cancel">取消</div>
                <div class="btnR fl" @click="sure">确定</div>
            </div>
        </div>
    </div>
</template>
<style lang ="less" scoped>
    .information{
        display: block;
        width: 389px;
        height: 247px;
        margin: 0 auto;
        margin-top: 50px;
    }
    .mr70{
        margin-right: 70px;
    }
    .box{
        position:fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
        height: 88px;
        background: #fff;
        border-bottom: 1px solid #e4e4e4;
        .back{
            width: 40px;
            height: 88px;
            background: url(../../assets/imgs/daohanglan_fanhui.png) no-repeat center center;
            background-size:  22px 40px;
            margin-left: 30px;
            display: block;
        }
        p{
            line-height: 88px;
            margin-left: 235px;
            margin-right:300px;
            color: #323232;
            font-size: 34px;
        }
        .selType{
            width: 20px;
            height: 15px;
            background: url(../../assets/imgs/down_blue_triangle.png) no-repeat center center;
            background-size: 100%;
            display: block;
            position: absolute;
            top: 35px;
            right: 285px;
        }
    }
    .gap20{
        width: 100%;
        height: 20px;
        background: #efeef4;
    }
    .sel{
        color: #80aded!important;
    }
    .head{
        margin-top: 88px;
        height: 88px;
        border-bottom: 1px solid #e5e5e5;
        li{
            p{
                width: 187px;
                line-height: 88px;
                text-align: center;
                font-size: 32px;
                color: #323232;
            }
        }
    }
    .content{
        .storeInfo{
            height: 80px;
            .commonShopLogo{
                margin-left: 30px;
                display: block;
                height: 26px;
                width: 28px;
                background: url(../../assets/imgs/shop_logo.png) no-repeat;
                background-size: 100%;
                margin-top: 30px;
            }
            .storeName{
                font-size: 28px;
                color: #323232;
                margin-left: 20px;
                line-height: 80px;
            }
            .status{
                font-size: 28px;
                color: #f4b02b;
                line-height: 80px;
            }
            .del{
                margin-right: 30px;
                margin-left: 40px;
                margin-top: 25px;
                display: block;
                width: 31px;
                height: 30px;
                background-image: url(../../assets/imgs/order_del.png);
                background-size: 100%;
            }
        }
        .productInfo{
            width: 100%;
            height: 176px;
            background: #f5f5f5;
            img{
                width: 140px;
                height: 140px;
                margin-top: 18px;
                margin-left: 30px;
            }
            div{
                margin-top: 52px;
                margin-left: 30px;
                font-size: 28px;
                color: #323232;
                p:last-child{
                    margin-top: 28px;
                }
            }
        }
        .productBox{
            li{
                border-bottom: 2px solid #e0e0e0;
            }
            li:nth-last-child(2){
                border-bottom: none;
            }
            li:last-child{
                border-bottom: none;
            }
        }
        .orderInfo{
            height: 88px;
            p{
                line-height: 88px;
                font-size: 28px;
                color: #999;
                margin-left: 30px;
            }
            .orderButton{
                width: 150px;
                height: 52px;
                line-height: 52px;
                color: #f4b02b;
                border: 2px solid #f4b02b;
                border-radius: 10px;
                margin-top: 17px;
                margin-right:30px;
                text-align: center;
            }
            .orderButtonV{
                width: 178px;
            }
            .orderButtonS{
                width: 122px;
            }
        }
    }
    .selTypeBox{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.5);
        ul{
            margin-top: 88px;
            li{
                height: 88px;
                line-height: 88px;
                width: 100%;
                text-align: center;
                background: #fff;
            }
            li:first-child{
                border-bottom: 1px solid #e0e0e0;
            }
        }
    }
    .fixed-body{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.7);
        .main-body{
            opacity: 1;
            position: absolute;
            top: 360px;
            left: 125px;
            width: 501px;
            height: 310px;
            background-color: #fff;
            border-radius: 15px;
            h3{
                padding-top: 40px;
                font-size: 36px;
                color: #323232;
                text-align: center;
                padding-bottom: 46px;
            }
            p{
                font-size: 28px;
                color: #323232;
                padding-bottom: 70px;
                text-align: center;
                border-bottom: 1px solid #e2e2e2;
            }
            .btnL{
                width: 250px;
                text-align: center;
                padding-top: 25px;
                padding-bottom: 18px;
                color: #a0a0a0;
                font-size: 36px;
                border-right: 1px solid #e2e2e2;
            }
            .btnR{
                width: 250px;
                text-align: center;
                padding-top: 25px;
                padding-bottom: 18px;
                color: #3d87f7;
                font-size: 36px;
            }
        }
    }
    .isNone{
        width: 389px;
        height: 247px;
        background-image: url(../../assets/imgs/noOrder.png);
        background-size: 100%;
        margin-left: 180px;
        margin-top: 100px;
    }
</style>
<script>
    import logo from '../../assets/imgs/noOrder.png'
    import myFooter from '../../components/Footer/index.vue';
    import {getItem} from '../../assets/js/common';
    import InfiniteLoading from 'vue-infinite-loading';
    export default{                    
        data(){
            return{
                logo: logo,
                picUrl:getItem('picUrl'),
                orders:[],
                storeName:"常来品私房菜馆",
                status:"待付款",//13待付款 10待验证 11已验证 15已退款
                productName:"常来品私房菜馆",
                totalCost:"588",
                orderId:"12345685432132545656",
                title:"买单订单",
                isV:true,
                isP:true,
                isS:false,
                isR:false,
                isA:false,
                isPay:true,//是否是买单订单 true=买单订单 false=商品订单
                isSelType:false,
                customerId:getItem('customerId'),
                // customerId:"19",
                contents:"",
                isShow:false,
                orderNum:"",
                isNone:false,
                page:0,
                statusNum: 0,
                typeNum: 2,
            }
        },
        components:{
            myFooter,
            InfiniteLoading
        },
        beforeCreate(){
            if(getItem('customerId')== ""||getItem('customerId') == undefined){
                this.$router.push("/login")
            }else{
                this.customerId = getItem('customerId');
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
        },
        methods:{
            queryFn(){
                this.page=this.page+1;
                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{pageNum:this.page,numPerPage:7,customerId:this.customerId,status: this.statusNum,type:this.typeNum}}).then((res)=>{
                    var orders = res.body;  
                    if(orders.result === "000"){
                         if(orders.orders.length>0){
                            this.orders = this.orders.concat(orders.orders);
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded'); 
                        }else{      
                            this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                        }  
                    }else{
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                    }                 
                },(res)=>{
                     this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                })
            },
            verify(){
                this.isV = true;
                this.isP = false;
                this.isS = false;
                this.isR = false;
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.page = 0;
                this.statusNum = 4;
                this.orders = [];
                if(this.isPay){    
                    this.typeNum = 2;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }else{
                    this.typeNum = 0;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }
            },
            pay(){
                this.isV = false;
                this.isP = true;
                this.isS = false;
                this.isR = false;
                this.isA = false;
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.statusNum = 0;
                this.page = 0;
                this.orders = [];
                if(this.isPay){    
                    this.typeNum = 2;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }else{
                    this.typeNum = 0;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }
            },
            success(){
                this.isV = false;
                this.isP = false;
                this.isS = true;
                this.isR = false;
                this.isA = false;
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.statusNum = 5;
                this.orders = [];
                this.page = 0;
                if(this.isPay){    
                    this.typeNum = 2;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }else{
                    this.typeNum = 0;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }
            },
            refund(){
                this.isV = false;
                this.isP = false;
                this.isS = false;
                this.isR = true;
                this.isA = false;
                this.statusNum = 2;
                this.page = 0;
                this.orders = [];
                if(this.isPay){    
                    this.typeNum = 2;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }else{
                    this.typeNum = 0;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }
            },
            all(){
                this.isA = true;
                this.isP = false;
                this.isS = false;
                this.isR = false;
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.statusNum = "";
                this.page = 0;
                this.orders = [];
                if(this.isPay){   
                    this.typeNum = 2;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }else{
                    this.typeNum = 0;
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                }
            },
            selType(){
                this.isSelType = true;
            },
            typePro(){
                this.isSelType = false;
                this.isV = true;
                this.isP = false;
                this.isS = false;
                this.isR = false;
                this.isPay = false;
                this.title = "商品订单";
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.orders = [];
                this.statusNum = 4;
                this.page = 0;   
                this.typeNum = 0;
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
               
            },
            typePay(){
                this.isSelType = false;
                this.isP = true;
                this.isS = false;
                this.isR = false;
                this.isA = false;
                this.isPay = true;
                this.title = "买单订单";
                // 订单类型， 0 : 线上虚拟订单    1 : 线上实物订单   2 : 买单订单
                // 订单状态 (待支付", 0)("已支付", 1)("已退款", 2) ("过期退款", 3)("待验证",4)("成功订单",5)("待发货",6)("配送中",7)("待收货",8)("订单取消",9)
                this.statusNum = 0;
                this.orders = [];
                this.page = 0;          
                this.typeNum = 2;
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
                
            },
            del(orderId){
                this.contents = "您确定要删除订单吗？";
                this.isShow = true;
                this.orderNum = orderId;
            },
            cancel(){
                this.isShow = false;
            },
            sure(){
                this.$http.post("/eb-web-api/mobile/order/deleteOrder",{orderId:this.orderNum},{emulateJSON: true}).then(function(res){
                    var back = res.body;
                    if(back.result == "000"){
                        if(this.isPay == false){
                            if(this.isP == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:0,type:0}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                            if(this.isS == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:5,type:0}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                            if(this.isR == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:2,type:0}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                        }else if(this.isPay == false){
                            if(this.isP == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:0,type:2}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                            if(this.isS == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:5,type:2}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                            if(this.isR == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,status:2,type:2}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                            if(this.isA == true){
                                this.$http.get("/eb-web-api/mobile/order/listMyOrders",{params:{customerId:this.customerId,type:2}}).then(function(res){
                                    var orders = res.body;
                                    this.orders = orders.orders;
                                    if(this.orders.length == 0){
                                        this.isNone = true;
                                    }else{
                                        this.isNone = false;
                                    }
                                },(res)=>{

                                })
                            }
                        }
                        this.isShow = false;
                    }
                },(res)=>{

                })
            },
            goPay(gathering,id,parentId){
                window.location.href = "../h5/pay.html?orderAmount=" + gathering + "&bussOrderNo=" + id + "&orderIdList=" + parentId;
            },
            goVer(id){
                this.$router.push({name:'orderDatil',query: {id: id}});
            }
        }
    }
</script>