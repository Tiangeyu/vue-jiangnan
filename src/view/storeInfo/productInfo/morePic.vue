<template>
    <div>
        <headers :title="title"></headers>
        <div class="main-body" v-html="moreData"></div>
        <footer>
            <span class="fl sp1">￥</span><span class="fl sp2">{{product.unitPrice}}</span>
            <font class="fl">￥{{product.listPrice}}</font>
            <button class="fr" @click="toPay">立即购买</button>
        </footer>
        <tips :contents="contents" v-show="noticeShow"></tips>    
    </div>
</template>

<style lang="less" scoped>
    .main-body{
        margin-top: 88px;
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
import {getItem} from '../../../assets/js/common'
import headers from './header.vue'
export default {
    components:{
        headers,
        tips
    },
    data(){
        return{
            title: "商品图文详情",
            moreData: '',
            product: '',
            picUrl: getItem("picUrl"),
            store: '',
            contents: "错误提示",
            noticeShow: false
        }
    },
    methods:{
        toPay(){
            let objArr = [];
            let obj = {};
            obj.gathering = this.product.unitPrice;
            obj.totalCost = this.product.listPrice;
            obj.type = 1;
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
                if(resq.body.result === "000"){
                    window.location.href = "../h5/pay.html?orderAmount="+this.product.unitPrice+"&bussOrderNo="+ resq.body.orderParentNo+"&orderIdList="+resq.body.orderId;
                }else{
                    this.noticeShow = true;
                    this.contents = "保存订单失败";
                    setTimeout(()=>{
                        this.noticeShow = false;
                    },2000)
                }                        
            }, (resq)=>{
                this.noticeShow = true;
                this.contents = "保存订单服务异常";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            })
        }
    },
    created(){
        this.$http.get('/eb-web-api/mobile/product/getProductDetailById',{params:{productId: this.$route.query.productId}}).then((res)=>{
            if(res.body.result === '000'){
                this.moreData = res.body.product.description;
                this.product = res.body.product;
                this.store = res.body.store;
                this.moreData = this.moreData.replace(/src="\/ueditor/g, 'src="' + this.picUrl + 'ueditor' )    
            }else{
                this.noticeShow = true;
                this.contents = "获取商品详情失败";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            }         
        }, (res)=>{
            this.noticeShow = true;
            this.contents = "获取商品详情服务异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
        })
    }
}
</script>
