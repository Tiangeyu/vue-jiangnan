<template>
  <div>
   <search :left='false'></search>
   <!-- banner -->
      <swiper :options="bannerSwiperOption" ref="myBanner">
         <swiper-slide v-for="(item,index) in bannerData" :key="index">
              <router-link :to="item.linkUrl" class="bannerImg">
               <img :src='picUrl+item.imageUrl'>
              </router-link>
          </swiper-slide>
          <div  class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- nav -->
      <swiper :options='navSwiper'>
          <swiper-slide>
            <div class="navOne">
              <ul class="clearfix">
                <li v-for="(item,index) in navDataOne " :key="index">
                  <router-link :to="{'name':'storeType',query:{'id':item.id}}">
                    <img :src="item.imgUrl" />
                    <p>{{item.text}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide>
             <div class="navOne">
              <ul class="clearfix">
                <li v-for="(item,index) in navDataTwo " :key="index">
                  <router-link :to="{'name':'storeType',query:{'id':item.id}}">
                    <img :src="item.imgUrl" />
                    <p>{{item.text}}</p>
                  </router-link>
                </li>
              </ul>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <!-- 超值抢购 -->
      <buying></buying>
      <!-- 闪惠推荐 -->
      <recommend></recommend>
      <!-- footer -->
    <my-footer :page='0'></my-footer>
  </div>
</template>
<script>
import imeishi from "../../../static/imgs/imeishi.png";
import iGouwu from "../../../static/imgs/iGouwu.png";
import iliren from "../../../static/imgs/iliren.png";
import iqinzi from "../../../static/imgs/iqinzi.png";
import iyule from "../../../static/imgs/iyule.png";
import iyangsheng from "../../../static/imgs/iyangsheng.png";
import jingdian from "../../../static/imgs/jingdian.png";
import iluyou from "../../../static/imgs/iluyou.png";
import ifuwu from "../../../static/imgs/ifuwu.png";
import search from '../../components/searchHeader/searchHeader.vue';
import myFooter from '../../components/Footer/index.vue';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import buying from'./PanicBuying.vue'
import recommend from'./Recommend.vue'
import {getItem} from '../../assets/js/common'

export default {
  data() {
        return {
            picUrl: getItem('picUrl'),
            // banner
            bannerData: [],
            bannerImg:[],
            bannerSwiperOption: {
                //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                notNextTick: true,
                autoplay: 3000, //自动切换时间
                pagination: '.swiper-pagination',
                paginationClickable :true,
                // slidesPerView: 'auto',
                // autoplayDisableOnInteraction:false,
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
                speed: 1000
                // effect: 'fade'  //切换效果
            },
            //nav
            navSwiper:{
                notNextTick: true,
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',  
                centeredSlides: true,
                spaceBetween: 30,
                loop: true,
            },
            navDataOne:[
              {'text':'美食','id':'1','imgUrl':imeishi},
              {'text':'购物','id':'19','imgUrl':iGouwu},
              {'text':'丽人','id':'2','imgUrl':iliren}, 
              {'text':'亲子','id':'17','imgUrl':iqinzi},
              {'text':'娱乐','id':'18','imgUrl':iyule},
              {'text':'养生','id':'21','imgUrl':iyangsheng},
              {'text':'酒店','id':'22','imgUrl':jingdian},
              {'text':'生活','id':'23','imgUrl':imeishi}
            ],
            navDataTwo:[
              {'text':'旅游','id':'24','imgUrl':iluyou},
              {'text':'家政','id':'0','imgUrl':ifuwu},
            ]
            
        }
    },
    created() {
                document.body.style.backgroundColor='#f6f6f8';
                sessionStorage.removeItem('searchInput',)
                //轮播图
                 this.$http.get("/eb-web-api/mobile/order/listCarouselAdById",{params:{groupId:6}}).then((res)=>{
                    if(res.body.result=='000'){
                      this.bannerData=res.body.ads;
                      for(var i=0;i<this.bannerData.length;i++){
                        this.bannerImg.push(res.body.ads[i].imgUrl)
                      }
                    }
                 })

    },
 components:{
    search,
    myFooter,
    swiper,
    swiperSlide,
    buying,
    recommend
 }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';
</style>

