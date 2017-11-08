<template>
    <div>
        <headers :title="title" :show-img="false"></headers>

        <section class="main-body">
            <div class="clearfix marT20 totalCost"><font class="fl fon32">消费总额 :</font><input class="fr" type="text" placeholder="0"  v-model="totalCost" @blur="computedPay"></div>

            <section class="no-discounts">
                <div class="clearfix">
                    <font class="fl">输入不参与优惠金额 (如 :酒水、饮料等)</font>
                    <p class="fr chechs" :class=" youhui ? 'active' : 'noActive' "><input type="checkbox" v-model="youhui" /></p>
                </div>
                <div class="clearfix"><font class="fl">不参与优惠金额:</font><input class="fr" type="text" v-model="youhuiMoney" value="youhuiMoney" placeholder="请询问服务员之后输入" @keyup="limitPrice"></div>
            </section>
            <section class="box-parents">
                <div class="clearfix" v-for="(item, index) in specialOffers" :key="index">
                    <i class="fl" :class="item.type == 1 ? 'man' : 'hui'"></i><font class="fl">{{item.name}}</font>
                    <p class="fr chechs" :class=" tehui[index] ? 'active' : 'noActive' "><input type="checkbox" v-model="tehui[index]" @change="cancelStateS(index, item.discountRate, item.maxFree)" /></p>
                    <span class="fr">今日剩余{{item.count}}次最高减{{item.maxFree}}元</span>
                </div>
                <div class="clearfix" v-for="(it, ind) in promotionsOffers" :key="ind">
                    <i class="fl" :class="it.type == 1 ? 'man' : 'hui'"></i><font class="fl">{{it.name}}</font>
                    <p class="fr chechs" :class=" pu[ind] ? 'active' : 'noActive' "><input type="checkbox" v-model="pu[ind]" @change="cancelStateP(ind,it.discountRate, it.threshold, it.type, it.maxFree)"/></p>
                    <span class="fr">今日剩余{{it.count}}次最高减{{it.maxFree}}元</span><i></i>
                </div>
            </section>
           
            <div class="clearfix useRedbag" @click="chooseRedBag"><font class="fl">使用红包可抵 </font><font class="fl colR">￥{{redBag}}</font><i class="fr"></i></div>

            <div class="clearfix marT20 pay"><font class="fl fon32">实付金额 :</font><font class="fr colR">￥{{finisPay}}</font></div>

            <button class="btn" @click="payF">确定买单</button>
        </section>
        <tips :contents="contents" v-show="noticeShow"></tips>         
    </div>
</template>

<style lang="less" scoped>
    .pay{
        border: 1px solid #e1e1e1;
        border-radius: 10px;
    }
    .totalCost{
        border: 1px solid #e1e1e1;
        border-radius: 10px;
    }
    .no-discounts{
        margin-top: 20px;
        border: 1px solid #e1e1e1;
        border-radius: 10px;
    }
    .useRedbag{
        margin-top: 20px;
        border: 1px solid #e1e1e1;
        border-radius: 10px;
        i{
            width: 18px;
            height: 86px;
            margin-right: 10px;
            background: url('../../../assets/imgs/store_enter.png') no-repeat left center;
            background-size: 100%;
        }
    }
    .box-parents{
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid #e1e1e1;
        div{
            border-bottom: 1px solid #e1e1e1;
        }
        div:last-child{
            border:none;
        }
    }
    .chechs{
        width: 50px;
        height: 86px;
        background-repeat: no-repeat;
        background-position: left center; 
        background-size: 100%;
        input{
            width: 100%;
            height: 100%;
            opacity: 0;
        }
    }

    .noActive{
        background-image: url('../../../assets/imgs/order-cancel.png');
    }
    .active{
        background-image: url('../../../assets/imgs/order-ok.png');
    }
    .w80{
        width: 80px;
    }
    .colR{
        color: #ff0303!important;
        font-size: 30px!important;
    }
    .fon28{
        font-size: 28px;
        color: #666;
    }
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
    .hui{
        width: 40px;
        height: 86px;
        margin-right: 10px;
        background: url('../../../assets/imgs/store_hui.png') no-repeat left center;
        background-size: 100%;
    }
    .man{      
        width: 40px;
        height: 86px;
        margin-right: 10px;
        background: url('../../../assets/imgs/store_man.png') no-repeat left center;
        background-size: 100%;
    }
    .main-body{
        margin-top: 88px;
        background-color: #f7f7f9;
        padding: 0 30px;
        padding-bottom: 65px;
        overflow: hidden;
        .marT20{
            margin-top: 20px;
        }

        font{
            font-size: 28px;
            color: #333;
            line-height: 86px;
        }
        .fon32{
            font-size: 32px;
        }
        span{
            font-size: 24px;
            color: #666;
            line-height: 86px;
            margin-right: 10px;
        }
        input{
            height: 86px;
            text-align: right;
        }
        div{
            background: #fff;
            height: 86px;
            padding: 0 20px;
        }
    }
    .reduce{
        width: 43px;
        height: 86px;
        background: url('../../../assets/imgs/order-reduce.png') no-repeat left center;
        background-size: 100%;
        margin-right: 10px; 
    }
    .add{
        width: 43px;
        height: 86px;
        background: url('../../../assets/imgs/order-add.png') no-repeat left center;
        background-size: 100%; 
        margin-left: 10px;
    }
</style>


<script>
    import tips from '../../../components/tisp/index.vue'
    import headers from '../productInfo/header.vue'
    import {setItem,getItem} from '../../../assets/js/common'
    export default {
        components:{
            headers,
            tips
        },
        data(){
            return {
                title: "优惠买单",
                youhui: false,
                tehui: [],
                tehuiValue:'',
                pu: [],
                puValue: '',
                promotionsOffers:[],
                specialOffers:[],
                redBag: 0,
                totalCost: "",
                finisPay: "0.00",
                youhuiMoney: '',
                tehuizhekou: 0,
                tehuiFengding: false,
                storeData:'',
                contents: "错误提示",
                noticeShow: false
            }
        },
        methods:{
            payF() {
                let obj = {};
                obj.withoutDiscountAmount = 0;
                if(this.youhui){
                    obj.withoutDiscountAmount = this.youhuiMoney;
                }
                if(this.redBag != 0){
                    obj.redPacketId = this.$route.query.id;
                    obj.redPacketMoney = this.redBag;
                }
                obj.gathering = this.finisPay;
                obj.type = 2;
                obj.customerId = 19;
                obj.totalCost = this.totalCost;
                obj.storeName = this.storeData.storeName;
                obj.storePhone = this.storeData.servicePhone;
                console.log(obj.storeName)
                for(let [index, value] of this.tehui.entries()){
                    if(value){
                        obj.offerId = "s" + this.specialOffers[index].id;
                        obj.offerName = this.specialOffers[index].name;
                    }
                }
                for(let [i, v] of this.pu.entries()){
                    if(v){
                        if(obj.offerId){
                            obj.offerId = obj.offerId + ",p" + this.promotionsOffers[i].id;
                            obj.offerName =  obj.offerName + "," + this.promotionsOffers[i].name;
                        }else{
                            obj.offerId =  this.promotionsOffers[i].id;
                            obj.offerName = this.promotionsOffers[i].name;
                        }      
                    }
                }               
                let orderInfo = JSON.stringify(obj);
                this.$http.get("/eb-web-api/mobile/order/savePaymentOrder", {params: {orderInfo: orderInfo}}).then((res)=>{
                    if(res.body.result === "000"){
                        setItem("orderId",res.body.orderId);
                        window.location.href = "../h5/pay.html?orderAmount="+this.finisPay+"&bussOrderNo="+ res.body.orderParentNo+"&orderIdList="+res.body.orderId;
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
            },
            chooseRedBag() {
                let totalPrice = this.totalCost,
                    finisPrice = this.finisPay,
                    s="",
                    p="",
                    noYouhui = "";
                if(this.youhui){
                    noYouhui = this.youhuiMoney;
                }
                for(let [index,value] of this.tehui.entries()){
                    if(value){
                        s = index;
                    }
                }
                for(let [i, v] of this.pu.entries()){
                    if(v){
                        p = i;
                    }
                }
                if(this.$route.query.amount){
                    this.$router.push({name:'useRedbag', query:{storeId: this.$route.query.storeId,totalPrice: totalPrice, noYouhui: noYouhui, finisPrice: finisPrice + this.$route.query.amount, s: s, p: p , tehuiFengding: this.tehuiFengding }});
                    return;
                }
                this.$router.push({name:'useRedbag', query:{storeId: this.$route.query.storeId,totalPrice: totalPrice, noYouhui: noYouhui, finisPrice: finisPrice, s: s, p: p , tehuiFengding: this.tehuiFengding }});
            },

            //  特惠
            cancelStateS(ind, value, maxFree){

                this.redBag = 0;
                for( let index of this.tehui.keys()){
                    if(index !== ind){
                        this.tehui.splice(index,1,false);
                    }
                }

                //  不参与优惠的酒水
                let youhuiprice = 0;
                youhuiprice = this.totalCost;
                if(this.youhui){
                    youhuiprice = this.totalCost - this.youhuiMoney;
                }
                if(this.tehui[ind]){    
                    this.tehuizhekou = value;
                    // 普惠存在的情况下
                    for(let [index,val] of this.pu.entries()){
                        if(val){
                            let puData = this.promotionsOffers[index];
                            if(youhuiprice*value <= maxFree){
                                this.finisPay = this.totalCost - youhuiprice * (1 - value);
                                this.tehuiFengding = false;                    
                            }else if(youhuiprice*value > maxFree){
                                this.finisPay = this.totalCost - maxFree;
                                this.tehuiFengding = true;
                            }
                            // 满减
                            if(puData.type === 1){
                                if(this.tehuiFengding){
                                    let LastPrice = (youhuiprice - maxFree/value) % puData.threshold * puData.discountRate;
                                    if(LastPrice < puData.maxFree){
                                        this.finisPay = this.totalCost - maxFree - LastPrice;
                                    }else{
                                        this.finisPay = this.totalCost -maxFree - puData.maxFree;
                                    }                                 
                                }else{
                                    this.pu.splice(index,1,false);
                                }
                            }else if(puData.type === 2){
                                 if(this.tehuiFengding){
                                    let LastPrice = (youhuiprice - maxFree/value)*(1 - puData.discountRate)
                                    if(LastPrice < puData.maxFree){
                                        this.finisPay = this.totalCost - maxFree - LastPrice;
                                    }else{
                                        this.finisPay = this.totalCost - maxFree - puData.maxFree;
                                    }                                 
                                }else{
                                    this.pu.splice(index,1,false);
                                }
                            }
                            return
                        }
                    }
                    // 单特惠存在
                    if(youhuiprice*value <= maxFree){
                        this.finisPay = this.finisPay - youhuiprice * (1 - value);
                        this.tehuiFengding = false;                    
                    }else if(youhuiprice*value > maxFree){
                        this.finisPay = this.finisPay - maxFree;
                        this.tehuiFengding = true;
                    }               
                }else{
                    // 关闭特惠
                    //  普惠存在的情况下
                    for(let [index,vlaue] of this.pu.entries()){
                        if(vlaue){
                            let puData = this.promotionsOffers[index];
                            if(puData.type === 1){                      
                                let LastPrice = youhuiprice % puData.threshold * puData.discountRate;
                                if(LastPrice < puData.maxFree){
                                    this.finisPay = this.totalCost - youhuiprice % puData.threshold * puData.discountRate;
                                }else{
                                    this.finisPay = this.totalCost - puData.maxFree;
                                }                                                             
                            }else if(puData.type === 2){
                                let LastPrice = youhuiprice * (1 - puData.discountRate)
                                if(LastPrice < puData.maxFree){
                                    this.finisPay = this.totalCost - youhuiprice * (1 - puData.discountRate);
                                }else{
                                    this.finisPay = this.totalCost - puData.maxFree;
                                }  
                            }
                            return;
                        }
                    }

                    this.finisPay = this.totalCost;
                    this.tehuizhekou=0;
                    this.tehuiFengding = false;
                }              
            },
            // 普惠
            cancelStateP(i, value, maxValue,type, maxFree){
                /*
                    i 当前操作项 
                    value 折扣或满减数值
                    maxValue 满减门槛
                    type 满减 还是 折扣
                */ 
                this.redBag = 0;
                if(maxValue){
                    if(this.totalCost - this.youhuiMoney <  maxValue && type === 1){
                        console.log(1)
                        this.pu.splice(i,1,false);
                        return;
                    }
                }
                for( let [index,value] of this.pu.entries()){
                    if(index !== i){
                        this.pu.splice(index,1,false);
                    }
                }  

                //  不参与优惠的酒水
                let youhuiprice = 0;
                youhuiprice = this.totalCost; 
                if(this.youhui){
                    youhuiprice = this.totalCost - this.youhuiMoney;
                }
                // 价格计算
                if(this.pu[i]){
                    //  打开
                    for(let [inde,val] of this.tehui.entries()){
                        //  特惠+普惠
                        if(val){
                            let tehuiData = this.specialOffers[inde];

                            if(type === 2){
                                if(this.tehuiFengding){
                                    let LastPrice = (youhuiprice - (tehuiData.maxFree)/tehuiData.discountRate)*(1-value)
                                    if(LastPrice < maxFree){
                                        this.finisPay = this.totalCost - tehuiData.maxFree - LastPrice;
                                    }else{
                                        this.finisPay = this.totalCost - tehuiData.maxFree - maxFree;
                                    }                                 
                                }else{
                                    this.pu.splice(i,1,false);
                                }
                            }else if(type === 1){
                                if(this.tehuiFengding){
                                    let LastPrice = (youhuiprice - (tehuiData.maxFree)/tehuiData.discountRate) % maxValue * value;
                                    if(LastPrice < maxFree){
                                        this.finisPay = this.totalCost - tehuiData.maxFree - LastPrice;
                                    }else{
                                        this.finisPay = this.totalCost - maxFree;
                                    }                                 
                                }else{
                                    this.pu.splice(i,1,false);
                                }
                            }
                            return
                        }
                    }
                    //  仅普惠
                  
                    if(type === 1){                      
                        let LastPrice = youhuiprice % maxValue * value;
                        if(LastPrice < maxFree){
                            this.finisPay = this.totalCost - youhuiprice % maxValue * value;
                        }else{
                            this.finisPay = this.totalCost - maxFree;
                        }                                                             
                    }else if(type === 2){
                        let LastPrice = youhuiprice * (1 - value)
                        if(LastPrice < maxFree){
                            this.finisPay = this.totalCost - youhuiprice * (1 - value);
                        }else{
                            this.finisPay = this.totalCost - maxFree;
                        }  
                    }
                    
                }else{
                    //  普惠关闭
                    for(let [index,val] of this.tehui.entries()){
                        if(val){
                            let tehuiData = this.specialOffers[index];
                            if(youhuiprice*tehuiData.discountRate <= tehuiData.maxFree){
                                this.finisPay = this.totalCost - youhuiprice * (1 - tehuiData.discountRate);
                                this.tehuiFengding = false;                    
                            }else if(youhuiprice*tehuiData.discountRate > tehuiData.maxFree){
                                this.finisPay = this.totalCost - tehuiData.maxFree;
                                this.tehuiFengding = true;
                            }
                            return
                        }
                    }

                    // 特惠不存在
                    this.finisPay = this.totalCost;

                }
            },

            // 输入价钱时状态清空
            computedPay() {
                for(let index of this.tehui.keys()){
                    this.tehui.splice(index,1,false);
                }
                for(let ind of this.pu.keys()){
                    this.pu.splice(ind,1,false);
                }
                this.youhui = false;
                this.youhuiMoney = '';
                this.finisPay = this.totalCost;
                this.redBag = 0;
            },
            
            // 限制输入的价格
            limitPrice() {
                if(Number(this.youhuiMoney) > Number(this.totalCost)){
                    this.youhuiMoney = this.totalCost;
                }
                for(let index of this.tehui.keys()){
                    this.tehui.splice(index,1,false);
                }
                for(let ind of this.pu.keys()){
                    this.pu.splice(ind,1,false);
                }
                this.finisPay = this.totalCost;
                this.redBag = 0;
            }
        },
        created(){
            
            this.$http.get('/eb-web-api/mobile/activity/getAvtivityByStoreId',{params:{userId: getItem("customerId"), storeId: this.$route.query.storeId}}).then((res)=>{
                // console.log(res.body)
                // this.promotionsOffers = res.body.list;
                if(res.body.result === "000"){
                    for(let [index,value] of res.body.list.entries()){
                        if(value.offersType === "1"){
                            this.promotionsOffers.push(value)
                        }else if(value.offersType === "2"){
                            this.specialOffers.push(value)
                        }
                    }
                    for(let i=0; i<this.promotionsOffers.length; i++){
                        this.pu.push(false);
                    }
                    for(let i=0; i<this.specialOffers.length; i++){
                        this.tehui.push(false);
                    }
                }else{
                    this.noticeShow = true;
                    this.contents = "查询特、普惠信息失败";
                    setTimeout(()=>{
                        this.noticeShow = false;
                    },2000)
                }
            }, (res)=>{
                this.noticeShow = true;
                this.contents = "服务器异常";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            })

             this.$http.get('/eb-web-api/mobile/store/queryStoreInfo', {params: {storeId: this.$route.query.storeId}}).then((res)=>{
                 if(res.body.result === "000"){
                     this.storeData = res.body.store;
                 }else{
                    this.noticeShow = true;
                    this.contents = "查询商户信息失败";
                    setTimeout(()=>{
                        this.noticeShow = false;
                    },2000)
                 }         
             }, (res)=>{
                this.noticeShow = true;
                this.contents = "服务器异常";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
             })

            if(this.$route.query.finisPrice){
                this.totalCost = this.$route.query.totalPrice;
                if(this.$route.query.noYouhui){
                    this.youhui = true
                    this.youhuiMoney = this.$route.query.noYouhui
                }
                if(this.$route.query.s !== ""){
                    this.tehui.splice(Number(this.$route.query.s), 1 , true)
                }
                if(this.$route.query.p !== ""){
                    this.pu.splice(Number(this.$route.query.p), 1 , true)
                }
                this.redBag = this.$route.query.amount;
                this.finisPay = this.$route.query.finisPrice - Number(this.redBag);
                this.tehuiFengding = Boolean(this.$route.query.tehuiFengding);
            }
            document.body.style.backgroundColor = "#f7f7f9";
        }
    }
</script>

