<template>
    <div>
        <header class="box clearfix">
            <router-link to='/' class="back"></router-link>
            <p class="item" v-text="title"></p>
            <span @click="editProduct()" v-show="moniList.length > 0">编辑</span>
        </header>
        <div class="centerTitle">商品</div>
        <ul>
            <li class="collectList clearfix" v-for="(item,index) in moniList" :key="item.productId" name="productInfo">
                <div class="picDiv ">
                    <input type="checkbox" class="checkDelete" v-show="radioBtn" name="che" :value="index" v-model="selectArr" />
                    <i class="productIcon"  :style="{backgroundImage:'url('+picUrl +item.smaillPicture+')'}"></i>
                </div>
                <div class="productInfo">
                    <p class="storeName">{{item.productName}}</p>
                    <p class="productDetail">{{item.productNote}}</p>
                    <p class="priceNow">￥{{item.unitPrice}}<span class="priceUsed">￥{{item.listPrice}}</span></p>
                </div>
            </li>
            <!--<li class="collectList clearfix">
                <div class="picDiv ">
                    <input type="checkbox" class="checkDelete" v-show="radioBtn">
                    <i class="productIcon"></i>
                </div>
                <div class="productInfo">
                    <p class="storeName">常来品私房菜馆</p>
                    <p class="productDetail">双层乳脂蛋糕仅售45元! 优惠多多</p>
                    <p class="priceNow">￥45.00<span class="priceUsed">￥55.00</span></p>
                </div>
            </li>-->
            <!--<li class="collectList clearfix" v-for="(item,index) in moniList" :key="item.productId" name="productInfo">
                <div class="picDiv ">
                    <input type="checkbox" class="checkDelete" v-show="radioBtn" name="che" :value="index" v-model="selectArr"/>
                    <i class="productIcon"></i>
                </div>
                <div class="productInfo">
                    <p class="storeName">{{item.productName}}</p>
                    <p class="productDetail">{{item.productNote}}</p>
                    <p class="priceNow">￥45.00<span class="priceUsed">￥55.00</span></p>
                </div>
            </li>-->

            <div class="deleteBtn" v-show="radioBtn" @click="toDelete()">删除</div>
        </ul>
        <!--<div class="deleteBtn" v-show="radioBtn" @click="toDelete(index,item.productId)">删除</div>-->
        <div class="gearArea"  v-show="deleteArea">
            <div class="remainBox">
                <i class="deleteIcon"></i>正在删除...
            </div>
        </div>
        <div class="gearArea"  v-show="deleteFail">
            <div class="remainBox">
                删除失败
            </div>
        </div>
        <div class="noCollect" v-show="moniList.length == 0">
            <div class="noBag"></div>
        </div>
        <tisp :contents="content" v-show="noticeArea"></tisp>
    </div>
</template>
<style lang="less" scoped>
    header{
        height: 88px;
        line-height: 88px;
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
            text-align: center;
            line-height: 88px;
        }
        span{
            text-align: right;
            margin-right: 30px;
        }
    }
    .centerTitle{
        height: 88px;
        line-height: 88px;
        font-size: 32px;
        color: #63a9ed;
        text-align: center;
        background: #fff;
        border-bottom: 1px solid #e4e4e4;
    }   
    .collectList{
        background: #ffffff;
        border-bottom: 1px solid #e4e4e4;
        .picDiv{
            width: 30%;
            .checkDelete{
                margin: 70px 0 0 20px;
                float: left;
            }
            .productIcon{
                margin: 18px 0 18px 30px;
                float: left;
                display: block;
                height: 140px;
                width: 140px;
                background: url(../../assets/imgs/productDetail.png) no-repeat center;
                background-size: 100% 100%;
            }
        }
        .productInfo{
            width: 65%;
            float: left;
            margin-left: 30px;
            .storeName{
                margin-top: 32px;
                font-size: 30px;
                color: #323232;
            }
            .productDetail{
                margin-top: 22px;
                font-size: 28px;
                color: #646464;
            }
            .priceNow{
                margin: 22px 0;
                font-size: 28px;
                color: #f73125;
            }
            .priceUsed{
                margin-left: 25px;
                font-size: 28px;
                color: #999999;
                font-weight: bolder;
                text-decoration: line-through;
            }
        }
    }
    .deleteBtn{
        margin: 0 auto;
        margin-top: 80px;
        margin-bottom: 80px;
        width: 80%;
        height: 88px;
        line-height: 88px;
        background: #6AA1ED;
        border-radius: 10px;
        color: #ffffff;
        text-align: center;
        font-size: 32px;
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
        width: 260px;
        height: 130px;
        line-height: 130px;
        margin: 0 auto;
        margin-top: 300px;
        font-size: 28px;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: center;
        color: #fff;
        overflow: hidden;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        border-radius: 10px;
        .deleteIcon{
            display: inline-block;
            width: 31px;
            height: 34px;
            background: url(../../assets/imgs/icon_delete.png) no-repeat center;
            background-size: 100% 100%;
            margin-right: 20px;
        }
    }
    .noCollect{
        .noBag{
            margin: 0 auto;
            margin-top: 140px;
            margin-bottom: 80px;
            width: 209px;
            height: 274px;
            background: url(../../assets/imgs/nocollectProduct.png) no-repeat center;
            background-size: 100% 100%;
        }
    }
</style>
<script>
import {getItem} from '../../assets/js/common'
import tisp from '../../components/tisp/index.vue';
export default {
    data(){
        return {
            check:[],
            radioBtn:false,
            title:'我的收藏',
            deleteArea:false,
            deleteFail:false,
            collectList:[],
            picUrl: getItem('picUrl'),
            content:"请选择要取消收藏的商品",
            noticeArea:false,
            cansoleList:'',
            selectArr: [],
            moniList:[
                // {productId:"0",productName:'辅导机构和',productNote:'唧唧复唧唧'},
                // {productId:"1",productName:'亲子摄影',productNote:'唧唧复唧唧'},
                // {productId:"2",productName:'做淡定淡定',productNote:'拒不见'},
                // {productId:"3",productName:'东方时尚v',productNote:'大范甘迪方式并'},
                // {productId:"4",productName:'富商大贾是',productNote:'唧唧复根本的唧唧'},
                // {productId:"5",productName:'看见公交卡',productNote:'拒不见'},
                // {productId:"6",productName:'发电公司吧 ',productNote:'大范甘迪方式并'},
                // {productId:"7",productName:'供饭换个号',productNote:'就让他'}
            ],
            customerId:window.sessionStorage.getItem('customerId')
        }
    },
    components:{
        tisp
    },
    methods:{
        editProduct:function(){
            this.radioBtn =! this.radioBtn
            if(this.moniList.length == 0){
                this.radioBtn = false;
            }
        },
        toDelete:function(){  
            var checkbox = document.getElementsByName("che"); //得到chekbox对象 
            var id ="";  
            var deleteMark = false
            for ( var i = 0; i < checkbox.length; i++) { 
                if(checkbox[i].checked){  
                    id = id + this.moniList[i].productId+","; //获取多个商品id
                    deleteMark = true
                }
            }
            if(deleteMark == false){
                this.noticeArea =! this.noticeArea
                var that = this;
                setTimeout(function() {     
                    that.noticeArea = false;
                }, 2000);
            }

             let arr = [];
                var len = this.moniList.length;
                for (var j = 0; j < len; j++) {
                    if (this.selectArr.indexOf(j)>=0) {
                        this.$http.get("/eb-web-api/mobile/product/delProductCollect",{params:{userId:this.customerId,productId:id}}).then((res)=>{
                            this.cansoleList = res.body.result
                            // console.log(res.body)
                            if(this.cansoleList=='000'){
                                this.deleteMark = true
                                this.deleteArea =!this.deleteArea
                                var that = this;
                                setTimeout(function() {     
                                    that.deleteArea = false;
                                }, 1000);
                            }else{
                                this.deleteFail =!this.deleteFail
                                var that = this;
                                setTimeout(function() {     
                                    that.deleteFail = false;
                                }, 2000);
                                return false;
                            }
                        },(res)=>{
                            
                        })
                    }
                    else{
                        arr.push(this.moniList[j])
                    }
                }
                this.moniList = arr;
                this.selectArr = []
            // alert("id为："+id);

            
        }
    },
    created() {
        document.body.style.backgroundColor = "#f6f6f6";

        this.$http.get("/eb-web-api/mobile/product/getProductCollect",{params:{userId:this.customerId}}).then((res)=>{
            this.moniList = res.body.list;
            // console.log(this.moniList)
        },(res)=>{
            
        })
    } 
}
</script>