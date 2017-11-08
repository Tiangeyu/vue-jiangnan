<template>
    <section>
        <search :left='true'></search>
        <swiper class="index-banner" :options="bannerSwiperOption">
            <swiper-slide v-for="(item,index) in scrollList" :key="index">
                <router-link :to="item.linkUrl">
                    <img class="swiperPic" :src='picUrl+item.imageUrl'>
                </router-link>
                <!--<img class="swiperPic" src="../../assets/imgs/specialBanner.png" />-->
            </swiper-slide>
            <div class="swiper-pagination swiperScroll" slot="pagination"></div>
        </swiper>
        <!--<filter-bar :bar-menus="barMenus" @showDialog="handleShowDialog" @closeDialog="handleCloseDialog" @changeTab="handleChangeTab"
        @changeMainItem="handleChangeMainItem" @changeSelect="changeData">
        </filter-bar>-->
        <div class="storeList">
            <!--<div class="position clearfix">
                <i class="positionIcon"></i>
                <span>当前位置 : 武进区漕桥镇</span>
                <i class="freshen"></i>
            </div>-->
            <!--<ul class="listInfo clearfix" v-for="item in storeInfo" :key="item.id">
                <li class="productImg">
                    <i class="detailImg" :style="{backgroundImage:'url('+picUrl +item.storeLogo+')'}"></i>
                </li>
                <li class="productDetail">
                    <div class="contentBox clearfix">
                        <span>{{item.storeName}}</span>
                        <p class="starBox">
                            <i></i><i></i><i></i><i></i><i></i>
                            <span>￥{{item.storeAvgprice}}/人</span>
                        </p>
                        <p class="locationInfo clearfix">{{item.storeServiceType}}<span class="locationDetail">{{item.storeDistrict}}</span><span class="locationNum"> < 100m</span></p>
                    </div>
                    <ul class="couponBox">
                        <li class="groupArea"> 
                            <img class="iconType" src="../../assets/imgs/tuan.png" alt="">  
                            <span>{{tuanList.name}}</span>
                        </li>
                        <li class="groupArea">
                            <img class="iconType" src="../../assets/imgs/store_quan.png" alt="">  
                            <span>{{quanList.name}}</span>
                        </li>
                        <li class="groupArea">
                            <img class="iconType" src="../../assets/imgs/hui.png" alt="">  
                            <span>{{huiList.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>-->
        </div>
        <searchFor></searchFor>
    </section>
</template>
<style lang="less" scoped>
    .index-banner {
        height: 250px;
        background: #fff;
        // opacity: 0.7;
        .swiperPic{
            height: 100%;
            width: 100%;
        }
    }
    .selectBox{
        background: #ffffff;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        width: 100%;
        height: 74px;
        margin-top: 18px;
        .selectUl li{
            margin: 13px 0;
            border-left: 1px solid #e1e1e1;
            float: left;
            width: 33%;
            height: 48px;
            line-height: 48px;
            text-align: center;
            font-size: 26px;
            color: #333333;
            list-style: none;
        }
        .selectUl li:nth-child(1){
            border: none;
        }
        .selectUl li i{
            margin: 0 auto;
            margin-left: 10px;
            display: inline-block;
            width: 25px;
            height: 18px;
            background: url(../../assets/imgs/grayTriangle.png) no-repeat center;
            background-size: 100% 100%;
        }
        .selectUl li ul li{
            border: none;
            list-style: none;
            float: none;
            width: 100%;
        }
        .selectlist{
            width:100%;
            height:auto;
            box-sizing: border-box;
            .select_textdiv{
                height:61px;
                width:100%;
                line-height: 61px;
                text-align: center;
            }
        }
        .selectText{
            // height: 225px;
            // overflow-y: scroll;
            width:100%;
            background: #ffffff;
            position: absolute;
            .selectFirst{
                width: 100%;
                .firstLi{
                    margin: 0;
                    width: 100%;
                    height: 74px;
                    line-height: 74px;
                    border-bottom: 1px solid #e1e1e1;
                    .selectSecond{
                        width: 67%;
                        position: absolute;
                        right: 0px;
                        top: 0;
                        // background: #fff;
                        opacity: 1; 
                        display: none;
                        box-sizing: border-box;
                        // z-index: 999;
                    }
                    .selectSecond li{
                        text-align: left;
                        padding-left: 40px;
                        box-sizing: border-box;
                        margin: 0;
                        height: 74px;
                        line-height: 74px;
                        // border-bottom: 1px solid #e1e1e1;
                    }
                }
                .firstLi p{
                    padding-left: 30px;
                    box-sizing: border-box;
                    text-align: left;
                    height: 74px;
                    line-height: 74px;
                    width: 33%;
                    border-right: 1px solid #e1e1e1;
                }
            }
            
        }
    }
    .storeList{
        .position{
            background: #fff;
            height: 60px;
            line-height: 60px;
            font-size: 26px;
            color: #666;
            .positionIcon{
                margin: 16px 10px 0 30px;
                float: left;
                display: block;
                background: url(../../assets/imgs/positionIcon.png) no-repeat center;
                background-size: 100% 100%;
                width: 20px;
                height: 27px;
            }
            .freshen{
                margin: 18px 30px 0 0;
                display: block;
                float: right;
                height: 24px;
                width: 24px;
                background: url(../../assets/imgs/freshen.png) no-repeat center;
                background-size: 100% 100%;
            }
        }
        .listInfo{
            padding-top: 30px;
            background: #ffffff;
            width: 100%;
            border-top: 1px solid #e1e1e1;
            border-bottom: 1px solid #e1e1e1;
            margin-bottom: 20px;
            .productImg{
                float: left;
                width: 25%;
                .detailImg{
                    margin-left: 30px;
                    display: block;
                    height: 126px;
                    width: 126px;
                    border-radius: 5px;
                    background: url(../../assets/imgs/detailInfo.png) no-repeat center;
                    background-size: 100% 100%;
                }
            }
            .productDetail{
                float: left;
                width: 75%;
                .contentBox{
                    border-bottom: 1px solid #f3f3f3;
                    font-size: 34px;
                    color: #333333;
                    .starBox{
                        margin-top: 20px;
                        height: 26px;
                        line-height: 26px;
                    }
                    .starBox i{
                        margin-right: 7px;
                        float: left;
                        display: block;
                        width: 26px;
                        height: 26px;
                        background: url(../../assets/imgs/littleStar.png) no-repeat center;
                        background-size: 100% 100%;
                    }
                    .starBox span{
                        font-size: 22px;
                        color: #666666;
                    }
                    .locationInfo{
                        margin: 20px 0;
                        font-size: 26px;
                        color: #666666;
                        .locationDetail{
                            margin-left: 50px;
                        }
                        .locationNum{
                            float: right;
                            margin-right: 30px;
                        }
                    }
                }
                .couponBox{
                    margin: 20px 20px 20px 0;
                    font-size: 26px;
                    color: #666666;
                    .groupArea{
                        margin-top: 20px;
                        .iconType{
                            margin-right: 10px;
                            width: 32px;
                            height: 32px;
                        }
                    }
                } 
            } 
        }
    }
    .selectP{
        background: #f0f0f0;
        color: #3da4f1;
    }
</style>
<script>
import {getItem} from '../../assets/js/common'
import search from '../../components/searchHeader/searchHeader.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import searchFor from './searchFor.vue'
// import FilterBar from './FilterBar.vue'
// import barMenus from '../../data'
export default {
    components: {
        swiper,
        swiperSlide,
        search,
        searchFor    
        // searchResult,
        // 'filter-bar': FilterBar,
    },
    data() {
        return {
            // banner
            picUrl: getItem('picUrl'),
            bannerSwiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                notNextTick: true,
                autoplay: 3000,
                pagination: '.swiper-pagination',
                // slidesPerView: 'auto',  
                centeredSlides: true,
                spaceBetween: 30,
                paginationType:"bullets",
                loop: true,
                speed: 1000,
                // effect: 'fade'  //切换效果
            }, 
            chooseList:false,
            orderList:false,
            downBox:false,
            downDetail:false,
            scrollList:[],
            // storeInfo:[],
            tuanList:[],
            quanList:[],
            huiList:[],
            // barMenus: barMenus
        }
    }, 
    methods: {
      handleShowDialog(v) {
        // console.log(v);
      },
      handleCloseDialog(v) {
        // console.log(v);
      },
      handleChangeTab(v) {
        // console.log(v);
      },
      handleChangeMainItem(v) {
        // console.log(v)
      },
      changeData(v) {
        // console.log(v);
      },
      
    },
    created() {
        document.body.style.backgroundColor = "#f7f7f8";
        //轮播图
        this.$http.get("/eb-web-api/mobile/order/listCarouselAdById",{params:{groupId:2}}).then((res)=>{
            this.scrollList = res.body.ads;
            // console.log(this.scrollList)
        },(res)=>{
            
        })
        //商户详情
        // this.$http.get("/eb-web-api/mobile/store/queryBySeacher",{params:{thirDistrict:3}}).then((res)=>{
        //     this.storeInfo = res.body.seacherInfo.itemList;//
        //     console.log(this.storeInfo)
        //     if(res.body.result == '000'){
        //         // console.log(this.storeInfo.length)
        //         for(var i=0; i<this.storeInfo.length; i++){
        //             var selectId = this.storeInfo[i].id
        //             // console.log(selectId)
        //             // 团，券
        //             this.$http.get("/eb-web-api/mobile/product/getProductByStoreId",{params:{storeId:selectId}}).then((res)=>{
        //                 this.tuanList = res.body.groupon[0];
        //                 this.quanList = res.body.coupon[0];
        //                 // console.log(this.tuanList)
        //             },(res)=>{
                        
        //             })
        //             //优惠
        //             this.$http.get("/eb-web-api/mobile/activity/getAvtivityByStoreId",{params:{userId:1,storeId:selectId}}).then((res)=>{
        //                 this.huiList = res.body.list[0];
        //                 console.log(this.huiList) 
        //             },(res)=>{
                        
        //             })
        //         }
        //     }
        // },(res)=>{
            
        // })
    }
}
</script>
