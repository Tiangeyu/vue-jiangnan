<template>
  <section class="recommend">
        <div class="box title">
            <img src="../../assets/imgs/recommend.png" alt="" class='icon-recommend'>
            <p class="item">闪惠推荐</p>
        </div>
        <ul class="recommendList">
            <li v-for="(item,index) in recommendList" :key="index">
                <router-link :to="{name:'productInfo',query:{productId:item.id}}" class="box">
                    <img :src="picUrl + item.smallPicture" alt="">
                    <div class="item right">
                       <div class="top box">
                         <p class="item">{{item.name}}</p>
                        </div> 
                        <p class="con">{{item.note}}</p>
                        <div class="bottom clearfix">
                            <span>{{item.unitPrice}}元</span>
                            <span>{{item.listPrice}}元</span>
                            <font>已售{{item.saleCount}}</font>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>

        <infinite-loading  :on-infinite="infiniteHandler"  ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="information">
                    <!-- <img src="../../common/imgs/noOrder.png"/> -->
            </div>
            <span slot="no-more">
                没有更多数据  
            </span>
        </infinite-loading>
  </section>
</template>
<script>
import {getItem} from '../../assets/js/common'
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading';
export default {
    data(){
        return{
            picUrl: getItem('picUrl'),
            allLoaded:false,
            scrollMode:'touch',
            recommendList:[],
            page:0
        }
    },
  methods:{
        infiniteHandler() {
            this.page=this.page+1;
            this.$http.get("/eb-web-api/mobile/product/getProductRecommendList",{params:{pageNum:this.page,numPerPage:10}}).then((res)=>{
                var json=res.body
                if(json.result=='000'){
                    if( json.list.length > 0 ){
                         this.recommendList = this.recommendList.concat(json.list)                     
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
       }
  },
   created() {
    },
  components: { 
      InfiniteLoading,
    },  
}
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';
</style>
