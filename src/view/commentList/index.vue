<template>
  <div>
        <my-header title="评论列表"></my-header>
        <ul class="commentList">
            <li v-for="(item,index) in commentLi" :key="index">
                <div class="box">
                    <img :src="picUrl+item.storeLogo" alt="">
                    <div class="item right">
                        <p>{{item.storeName}}</p>
                        <div class="box">
                            <span >评分</span>
                            <div class="item star">
                                <i class="active" v-for="index in parseInt(item.evaluationScore)" :key="index" ></i>
                                <i class="active" v-for="index in parseInt(5-item.evaluationScore)" :key="index" ></i>
                            </div>
                            <span >{{item.evaluationScore}}</span>
                        </div>
                        <ul class="tab clearfix good" >
                            <li class="fe8" v-for="(item,index) in item.goodLabelDatas" :key="index">{{item}}</li>
                        </ul>
                        <ul class="tab clearfix bad" >
                            <li v-for="(item,index) in item.badLabelDatas" :key="index">{{item}}</li>
                        </ul>
                        <ul class="smileBox">
                            <li class="box">
                                <span>服务</span>
                                <div class="item clearfix smile">
                                    <i class="active" v-for="index in parseInt(item.serviceScore)" :key="index" ></i>
                                    <i class="active" v-for="index in parseInt(5-item.serviceScore)" :key="index" ></i>
                                </div>
                                <font>{{item.serviceScore}}</font>
                            </li>
                            <li class="box">
                                <span>环境</span>
                                <div class="item clearfix smile">
                                   <i class="active" v-for="index in parseInt(item.environmentScore)" :key="index" ></i>
                                    <i class="active" v-for="index in parseInt(5-item.environmentScore)" :key="index" ></i>
                                </div>
                                <font>{{item.environmentScore}}</font>
                            </li>
                            <li class="box ">
                                <span class="mr-33">性价比</span>
                                <div class="item clearfix smile">
                                   <i class="active" v-for="index in parseInt(item.costEffectiveScore)" :key="index" ></i>
                                    <i class="active" v-for="index in parseInt(5-item.costEffectiveScore)" :key="index" ></i>
                                </div>
                                <font>{{item.costEffectiveScore}}</font>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="capita box">
                    <span>人均：&nbsp;&nbsp;&nbsp;￥</span>
                    <p class="item">{{item.perCapitaConsumption}}</p>
                </div>
            </li>
        </ul>
        <infinite-loading  :on-infinite="queryFn"  ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="info" ref="info">
                <img src="../../assets/imgs/noSearch.png" />
                <p>您尚未发表评论</p>
             </div>
            <span slot="no-more">
                没有更多数据  
            </span>
        </infinite-loading>           
  </div>
</template>
<script>
import InfiniteLoading from 'vue-infinite-loading';
import {getItem} from '../../assets/js/common'
import myHeader from '../../components/Header/myHeader'
import tisp from '../../components/tisp/index'
export default {
      data () {
        return {
            picUrl: getItem('picUrl'),
            page:0,
            userId:sessionStorage.getItem('customerId'),
            commentLi:[]
        }
    },
    methods:{
        queryFn(){
            this.page=this.page+1;
            this.$http.get("/eb-web-api/mobile/base/queryUserSelfPublicPraiseData",{params:{page:this.page,numPerPage:10,userId:39}}).then((res)=>{
                var json=res.body;
                if(res.body.result == '000'){
                    if(json.data.length>0){
                        this.commentLi = this.commentLi.concat(json.data)                     
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
    },
    components: {
        InfiniteLoading,
        myHeader,
        tisp
    },
    created () {
        document.body.style.backgroundColor='#f6f6f8';
    }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/commentList.less';
</style>
