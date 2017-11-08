<template>
  <div>
      <!--<div class="div"></div>-->
      
      <section>
        <!--美食-->
        <div class="detailIcon" v-show="this.$route.query.id==1">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconList" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--丽人-->
            <div class="beautyBox" v-show="this.$route.query.id==2">
                <ul class="iconBox clearfix" >
                    <li  v-for="(item,index) in beautyArea" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                        <!--<a href="">-->
                            <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                            <span>{{item.iconSpan}}</span>
                        <!--</a>-->
                    </li>
                </ul>
            </div>
        <!--养生-->
        <div class="healthyBox" v-show="this.$route.query.id==21">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in healthyArea" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--亲子-->
        <div class="detailIcon" v-show="this.$route.query.id==17">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListF" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--娱乐-->
        <div class="detailIcon" v-show="this.$route.query.id==18">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListE" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--购物-->
        <div class="detailIcon" v-show="this.$route.query.id==19">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListS" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--酒店-->
        <div class="detailIcon" v-show="this.$route.query.id==22">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListH" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--生活服务-->
        <div class="detailIcon" v-show="this.$route.query.id==23">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListL" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
        <!--旅游-->
        <div class="detailIcon" v-show="this.$route.query.id==24">
            <ul class="iconBox clearfix" >
                <li  v-for="(item,index) in iconListT" :key="item.id" @click="iconTo(item.id,item.iconSpan,index)">
                    <!--<a href="">-->
                        <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                        <span>{{item.iconSpan}}</span>
                    <!--</a>-->
                </li>
            </ul>
        </div>
      </section>
      
      <section class="select">
          <ul class="box btns">
            <li class="item" @click="trader('merchant')" >
                <p ref="merchant">全部分类</p>
                <i class="icon-jiao" :class="{'active':this.opaA}"></i>
            </li>
            <li class="item" @click="trader('circle')">
                <p  ref="circle">全城</p>
                <i class="icon-jiao" :class="{'active':this.opaB}"></i>
            </li>
            <li class="item" @click="trader('sort')" >
                <p  ref="sort">智能排序</p>
                <i class="icon-jiao" :class="{'active':this.opaC}"></i>
            </li>
          </ul>
        <div class="opacity opaA" v-show="opaA" @click.self='close()'>
            <div class="merchant box ">
                <ul class="classA item">
                    <li class="clearfix merAllA"@click="allFn('merchant',merchB.mainCateName)">
                        <p class="name fl">全部分类</p>
                        <p class="num fr mr-50">{{merchB.totalCount}}</p>
                    </li>
                    <li class="clearfix merA"v-for="(item,index) in merchB.cateList" :key="index" @click="classBFn('merchant',item.id,item.cateName,index)"  >
                        <p class="name fl">{{item.cateName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.cateCount}}</p>
                    </li>
                </ul>
                <!--<ul class="classB">
                    <li class="clearfix" @click="allBFn('merchant',merchB.mainCateName)">
                        <p class="name fl">全部分类</p>
                        <p class="num fr mr-50">{{merchB.totalCount}}</p>
                    </li>
                    <li class="clearfix merB" v-for="(item,index) in merchB.cateList" :key="index" @click="classBFn('merchant',item.id,item.cateName,index)">
                        <p class="name fl">{{item.cateName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.cateCount}}</p>
                    </li>
                </ul>-->
          </div>
        </div>
        <div class="opacity opaB" v-show="opaB" @click.self='close()'>
            <div class="merchant box ">
                <ul class="classA item">
                    <li class="clearfix cirAllA"  @click='allFn("circle")'>
                        <p class="name fl">全部分类</p>
                        <p class="num fr mr-50">{{circleA.totalCount}}</p>
                    </li>
                     <li class="clearfix cirA" v-for="(item,index) in circleA.distList" :key="index" @click="subset('circle',item.id,index)">
                        <p class="name fl">{{item.discName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.discCount}}</p>
                    </li>
                </ul>
                <ul class="classB" v-show="cirClassB">
                    <li class="clearfix cirAllB" @click="allBFn('circle',circleB.secondDiscName)">
                        <p class="name fl">全部分类</p>
                        <p class="num fr">{{circleB.totalCount}}</p>
                    </li>
                     <li class="clearfix cirB" v-for="(item,index) in circleB.distList" :key="index"  @click="classBFn('circle',item.id,item.discName,index)">
                        <p class="name fl">{{item.discName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.discCount}}</p>
                    </li>
                </ul>
          </div>
        </div>
        <div class="opacity opaC" v-show="opaC" @click.self='close()'>
            <div class="merchant box ">
                <ul class="classA item">
                    <li class="clearfix sort" v-for="(item,index) in sortData" :key="index" @click="sortFn(item.id,item.mark,item.name,index)">
                        <p class="name fl">{{item.name}}</p>
                    </li>
                </ul>
          </div>
        </div>
          
        </section>
        <section>
            <div class="position clearfix">
                <i class="positionIcon"></i>
                <span id="addr" >{{address}}</span>
                <i class="freshen" @click="mapFun()"></i>
            </div>
             <ul class="tenants" v-for="(item,index) in queryData" :key="index">
                 <router-link :to="{name:'storeInfo', query:{storeId:item.id}}">
                <li class="box">
                    <img :src='picUrl+item.storeLogo' alt="" class='tenantImg'>
                    <div class="item right">
                        <div class="top">
                            <p class="tenantName">{{item.storeName}}</p>
                            <div class="clearfix">
                                <div class="starBox fl clearfix">
                                    <i class="icon-yellow" v-for="i in parseInt(item.storeScore)" :key="i"></i>
                                    <i class="icon-ccc" v-for="ic in (5-parseInt(item.storeScore))" :key="ic"></i>
                                </div>
                                <p class="fl">￥{{item.storeAvgprice}}/人</p>
                            </div>
                            <div class="addres clearfix">
                                <span>{{item.storeSecondCate}}</span>
                                <span>{{item.storeDistrict}}</span>
                                <i class="icon-juan" v-show="item.storeServiceType.indexOf(6)"></i>
                                <i class="icon-tuan" v-show="item.storeServiceType.indexOf(2)"></i>
                            </div>
                        </div>
                    </div>
                </li>
                 </router-link>
            </ul> 
        </section>    
          <infinite-loading  :on-infinite="queryFn"  ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="info" ref="info">
                <!--<img src="../../assets/imgs/noSearch.png" />-->
                <p>没有找到相关信息</p>
            </div>
            <span slot="no-more">
                没有更多数据  
            </span>
        </infinite-loading>        
  </div>
</template>
<script>
import tour1 from "../../../static/imgs/tour_icon01.png";
import tour2 from "../../../static/imgs/tour_icon02.png";
import tour3 from "../../../static/imgs/tour_icon03.png";
import tour4 from "../../../static/imgs/tour_icon04.png";
import life1 from "../../../static/imgs/life_icon01.png";
import life2 from "../../../static/imgs/life_icon02.png";
import life3 from "../../../static/imgs/life_icon03.png";
import life4 from "../../../static/imgs/life_icon04.png";
import hotel1 from "../../../static/imgs/hotel_icon01.png";
import hotel2 from "../../../static/imgs/hotel_icon02.png";
import hotel3 from "../../../static/imgs/hotel_icon03.png";
import hotel4 from "../../../static/imgs/hotel_icon04.png";
import disport1 from "../../../static/imgs/disport_icon01.png";
import disport2 from "../../../static/imgs/disport_icon02.png";
import disport3 from "../../../static/imgs/disport_icon03.png";
import disport4 from "../../../static/imgs/disport_icon04.png";
import shop1 from "../../../static/imgs/shop_icon01.png";
import shop2 from "../../../static/imgs/shop_icon02.png";
import shop3 from "../../../static/imgs/shop_icon03.png";
import shop4 from "../../../static/imgs/shop_icon04.png";
import health1 from "../../../static/imgs/health_icon01.png";
import health2 from "../../../static/imgs/health_icon02.png";
import health3 from "../../../static/imgs/health_icon03.png";
import qinzi1 from "../../../static/imgs/qinzi_icon01.png";
import qinzi2 from "../../../static/imgs/qinzi_icon02.png";
import qinzi3 from "../../../static/imgs/qinzi_icon03.png";
import qinzi4 from "../../../static/imgs/qinzi_icon04.png";
import taste1 from "../../../static/imgs/tianpin.png";
import taste2 from "../../../static/imgs/jiangzhe.png";
import taste3 from "../../../static/imgs/xiaoshikuaican.png";
import taste4 from "../../../static/imgs/huoguo.png";
import taste5 from "../../../static/imgs/chuanxiang.png";
import taste6 from "../../../static/imgs/xican.png";
import taste7 from "../../../static/imgs/zizhu.png";
import taste8 from "../../../static/imgs/riben.png";
import beauty1 from "../../../static/imgs/beauty_icon01.png";
import beauty2 from "../../../static/imgs/beauty_icon02.png";
import beauty3 from "../../../static/imgs/beauty_icon03.png";
import beauty4 from "../../../static/imgs/beauty_icon04.png";
import beauty5 from "../../../static/imgs/beauty_icon05.png";
import beauty6 from "../../../static/imgs/beauty_icon06.png";
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading';
import {getItem} from '../../assets/js/common'
export default {
   data(){
       return{
           iconListT:[
                {iconSrc:tour1,iconSpan:'主题公园',id:'57','to':'/'},
                {iconSrc:tour2,iconSpan:'展览馆',id:'58','to':'/'},
                {iconSrc:tour3,iconSpan:'农家乐',id:'59','to':'/'},
                {iconSrc:tour4,iconSpan:'周边游',id:'60','to':'/'}
            ],
           iconListL:[
                {iconSrc:life1,iconSpan:'摄影写真',id:'53','to':'/'},
                {iconSrc:life2,iconSpan:'课程培训',id:'54','to':'/'},
                {iconSrc:life3,iconSpan:'汽车服务',id:'55','to':'/'},
                {iconSrc:life4,iconSpan:'婚庆',id:'56','to':'/'}
            ],
           iconListH:[
                {iconSrc:hotel1,iconSpan:'经济型',id:'49','to':'/'},
                {iconSrc:hotel2,iconSpan:'豪华型',id:'50','to':'/'},
                {iconSrc:hotel3,iconSpan:'主题酒店',id:'51','to':'/'},
                {iconSrc:hotel4,iconSpan:'钟点房',id:'52','to':'/'}
            ],
           iconListE:[
                {iconSrc:disport1,iconSpan:'KTV',id:'38','to':'/'},
                {iconSrc:disport2,iconSpan:'电影院',id:'39','to':'/'},
                {iconSrc:disport3,iconSpan:'网吧网咖',id:'40','to':'/'},
                {iconSrc:disport4,iconSpan:'棋牌室',id:'41','to':'/'}
            ],
           iconListS:[
                {iconSrc:shop1,iconSpan:'食品烟酒',id:'42','to':'/'},
                {iconSrc:shop2,iconSpan:'超市',id:'43','to':'/'},
                {iconSrc:shop3,iconSpan:'花店',id:'44','to':'/'},
                {iconSrc:shop4,iconSpan:'眼镜',id:'45','to':'/'}
            ],
           healthyArea:[
            {'iconSpan':'温泉洗浴','id':'46','iconSrc':health1,'to':'/'},
            {'iconSpan':'足疗按摩','id':'47','iconSrc':health2,'to':'/'},
            {'iconSpan':'体检/医药','id':'48','iconSrc':health3,'to':'/'}
            ],
           iconListF:[
            {iconSrc:qinzi1,iconSpan:'亲子摄影',id:'34','to':'/'},
            {iconSrc:qinzi2,iconSpan:'亲子游乐',id:'35','to':'/'},
            {iconSrc:qinzi3,iconSpan:'早教中心',id:'36','to':'/'},
            {iconSrc:qinzi4,iconSpan:'幼儿教育',id:'37','to':'/'}
            ],
           iconList:[
                {iconSrc:taste1,iconSpan:'甜点饮品',id:'16','to':'/'},
                {iconSrc:taste2,iconSpan:'江浙菜',id:'3','to':'/'},
                {iconSrc:taste3,iconSpan:'小吃快餐',id:'12','to':'/'},
                {iconSrc:taste4,iconSpan:'火锅',id:'15','to':'/'},
                {iconSrc:taste5,iconSpan:'川湘菜',id:'26','to':'/'},
                {iconSrc:taste6,iconSpan:'西餐',id:'27','to':'/'},
                {iconSrc:taste7,iconSpan:'自助餐',id:'28','to':'/'},
                {iconSrc:taste8,iconSpan:'日本料理',id:'29','to':'/'}
            ],
        beautyArea:[
                {'iconSpan':'美发','id':'8','iconSrc':beauty1,'to':'/'},
                {'iconSpan':'美甲美睫','id':'11','iconSrc':beauty2,'to':'/'},
                {'iconSpan':'产后塑形','id':'30','iconSrc':beauty3,'to':'/'},
                {'iconSpan':'美容SPA','id':'31','iconSrc':beauty4,'to':'/'},
                {'iconSpan':'纤体瘦身','id':'32','iconSrc':beauty5,'to':'/'},
                {'iconSpan':'韩式定妆','id':'33','iconSrc':beauty6,'to':'/'}
            ],
          picUrl: getItem('picUrl'),
        //   merchA:[],//一级商户
          circleA:[],//一级商圈
          merchB:[],//二级商户
          circleB:[],//二级商圈
          queryData:[],//列表
        //   secondCellect:[],
          //三个遮罩
          opaA:false,
          opaB:false,
          opaC:false,
          cirClassB:false,
          sortData:[{
                name:'智能排序',
                id:'1',
                mark:''
            },{
                name:'好评优先',
                id:'score',
                mark:'9'
            },{
                name:'离我最近',
                id:'distSort',
                mark:'6'
            },{
                name:'人均最高',
                id:'avgprice',
                mark:'9'
            },{
                name:'人均最低',
                id:'avgprice',
                mark:'6'
          }],
        //查询需要的参数
          mainCondition:'',//主查询条件
          page:0,//当前页数
          mainCate:this.$route.query.id,//一级分类
          secondCate:'',//二级分类
          secdDistrict:'',//二级商圈
          thirDistrict:'',//三级商圈
          score:'',//商户评分(6升序,9倒序)
          avgprice:'',//人均消费(6升序,9倒序)
          distSort:'',//距离排序(6升序,9倒序)
          lng:this.saveLng,//纬度
          lat:this.saveLat,// 经度
        //   saveLng: 11,
        //   saveLat: 12,
          address: "当前地址:"
          
       } 
    }, 
    methods:{
        //查询
        queryFn(){
            this.page=this.page+1;
            this.$http.get("/eb-web-api/mobile/store/queryBySeacher",{params:{page:this.page,secdDistrict:this.secdDistrict,mainCate:this.mainCate,mainCondition:this.mainCondition,secondCate:this.secondCate,thirDistrict:this.thirDistrict,score:this.score,avgprice:this.avgprice,distSort:this.distSort,lng:this.lng,lat:this.lat}}).then((res)=>{
                var json=res.body;
                if(res.body.result == '000'){
                    if(json.seacherInfo.itemList.length>0){
                        this.queryData = this.queryData.concat(json.seacherInfo.itemList)                     
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
                    }else{      
                        // console.log(1)      
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete'); 
                    }                  
                }else{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                }
            },(res)=>{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            })
        },
        
        iconTo:function(id,name,index){
            this.style('merA',index)
            this.secondCate=id;
            this.$refs.merchant.innerHTML=name;
            this.again();
        },
        //点击按钮显示下拉
        trader(item){
            switch(item){
                case 'merchant':
                this.opaA=!this.opaA;
                this.opaB=false;
                this.opaC=false;
                break;
                case 'circle':
                this.opaA=false;
                this.opaB=!this.opaB;
                this.opaC=false;
                break;
                case 'sort':
                this.opaA=false;
                this.opaC=!this.opaC;
                this.opaB=false;   
                break;
            }
        },
        //点击一级查询二级
        subset(item,id,index){
                switch(item){
                case 'circle':
                this.opaA=false;
                this.opaB=true;
                this.opaC=false;
                this.secdDistrict=id;
                 this.$http.get("/eb-web-api/mobile/store/queryStoreCountByDistrict",{params:{secdDistrict:id,mainCondition:this.mainCondition,mainCate:this.mainCate,secdCate:this.secondCate}}).then((res)=>{
                if(res.body.result=='000'){
                        this.circleB=res.body.distCount;
                    }
                })
                for(var i=0;i<document.getElementsByClassName('cirB').length;i++){
                    document.getElementsByClassName('cirB')[i].style.color='#333';
                }
                 document.getElementsByClassName('cirAllA')[0].style.backgroundColor='#fff';
                document.getElementsByClassName('cirAllA')[0].style.color='#333';
                this.cirClassB=true;
               this.style('cirA',index);
                break;
                }
        },
        //二级点击处理
        classBFn(item,id,name,index){
                switch (item) {
                case 'merchant':
                this.opaA=true;
                this.opaB=false;
                this.opaC=false;
                this.secondCate=id;
                 this.$refs.merchant.innerHTML=name;                
                document.getElementsByClassName('merAllA')[0].style.backgroundColor='#fff';
                document.getElementsByClassName('merAllA')[0].style.color='#333';
                this.style('merA',index);
                this.secdDistrictFn();
                this.secdDistrictBFn();
                break;
                    case 'circle':
                     this.styleB('cirB',index)
                     this.thirDistrict=id
                document.getElementsByClassName('cirAllB')[0].style.color='#333';
                    this.$refs.circle.innerHTML=name;
                     this.mainCateBFn();
                        break;
                }
            this.close();
            this.again();
        },
        //智能排序处理
        sortFn(id,mark,name,index){
            switch (id) {
                case 'avgprice': //人均
                this.avgprice=mark;
                this.score='';
                this.distSort='';
                break;
                case 'score': //商户评分
                this.avgprice='';
                this.score=mark;
                this.distSort='';
                break;
                case 'distSort': //距离
                this.avgprice='';
                this.score='';
                this.distSort=mark;
                break;
                default:
                this.avgprice='';
                this.score='';
                this.distSort='';
                break;
            }
             this.style('sort',index)
            this.opaC=false;
            this.$refs.sort.innerHTML=name;
            this.again();
        },
        //全部分类处理
        allFn(item){
                switch(item){
                case 'merchant':
                this.secondCate='';
                for(var i=0;i<document.getElementsByClassName('merA').length;i++){
                    document.getElementsByClassName('merA')[i].style.backgroundColor='#fff';
                    document.getElementsByClassName('merA')[i].style.color='#333';
                }
                document.getElementsByClassName('merAllA')[0].style.backgroundColor='#f0f0f0';
                document.getElementsByClassName('merAllA')[0].style.color='#3da4f1';
                 this.$refs.merchant.innerHTML='全部分类';
                this.secdDistrictFn();
                this.secdDistrictBFn();
                break;
                case 'circle':
                this.thirDistrict='';
                this.secdDistrict=''
                this.circleB=[];
                for(var i=0;i<document.getElementsByClassName('cirA').length;i++){
                    document.getElementsByClassName('cirA')[i].style.backgroundColor='#fff';
                    document.getElementsByClassName('cirA')[i].style.color='#333';
                }
                document.getElementsByClassName('cirAllA')[0].style.backgroundColor='#f0f0f0';
                document.getElementsByClassName('cirAllA')[0].style.color='#3da4f1';
                 this.$refs.circle.innerHTML='全城';
                this.mainCateBFn();
                 this.cirClassB=false;
                break;
            }
            
            this.close();
            this.again();

        },
        //二级全部处理
        allBFn(item,name){
             switch(item){
                case 'circle':
               this.thirDistrict=''
                 this.$refs.circle.innerHTML=name;
                 for(var i=0;i<document.getElementsByClassName('cirB').length;i++){
                    document.getElementsByClassName('cirB')[i].style.color='#333';
                }
                document.getElementsByClassName('cirAllB')[0].style.color='#3da4f1';
                this.mainCateBFn();
                break;
            }
            this.close();
            this.again();

        },
        style(boj,index){
            for(var i=0;i<document.getElementsByClassName(boj).length;i++){
                document.getElementsByClassName(boj)[i].style.backgroundColor='#fff';
                document.getElementsByClassName(boj)[i].style.color='#333';
            }
            document.getElementsByClassName(boj)[index].style.backgroundColor='#f0f0f0';
            document.getElementsByClassName(boj)[index].style.color='#3da4f1';
        },
        styleB(boj,index){
            for(var i=0;i<document.getElementsByClassName(boj).length;i++){
                document.getElementsByClassName(boj)[i].style.color='#333';
            }
            document.getElementsByClassName(boj)[index].style.color='#3da4f1';
        },
        mapFun(){
            //测试手机能用
            let that = this; 
            // console.log(navigator)
            // console.log(BMap)
            navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
                function(pos){ // 如果成果则执行该回调函数
                    // alert(
                    //     '  经度：' + pos.coords.latitude +
                    //     '  纬度：' + pos.coords.longitude +
                    //     '  高度：' + pos.coords.altitude +
                    //     '  精确度(经纬)：' + pos.coords.accuracy +
                    //     '  精确度(高度)：' + pos.coords.altitudeAccuracy +
                    //     '  速度：' + pos.coords.speed
                    // );
                // latitude = pos.coords.latitude;
                // longitude = pos.coords.longitude;  
                that.saveLat =  pos.coords.latitude;
                that.saveLng = pos.coords.longitude;
                var point = new BMap.Point(pos.coords.longitude, pos.coords.latitude);
                var geoc = new BMap.Geocoder();      
                geoc.getLocation(point, function(rs){
                    var addComp = rs.addressComponents;
                    that.address=("当前位置："+ addComp.city + addComp.district + addComp.street + addComp.streetNumber);
                }); 
            }, function(err){ // 如果失败则执行该回调函数
                    alert(err.message);
                }, { // 附带参数
                    enableHighAccuracy: false, // 提高精度(耗费资源)
                    timeout: 3000, // 超过timeout则调用失败的回调函数
                    maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
                }
            );         
        },
        //关闭遮罩
        close(){
             this.opaA=false;
            this.opaB=false;
            this.opaC=false;
        },
        back(){
           this.$router.go(-1)
       },
       again(){
            this.page=0;
            this.queryData=[];
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
       },
         //查一级商户
        //查二级商圈
        secdDistrictFn(){
            this.$http.get("/eb-web-api/mobile/store/queryStoreCountByDistrict",{params:{mainCate:this.mainCate,secdCate:this.secondCate}}).then((res)=>{
                if(res.body.result=='000'){
                    this.circleA=res.body.distCount;
                }
            })
        },
        //查二级商户
       mainCateBFn(){
            this.$http.get("/eb-web-api/mobile/store/queryStoreCountByCategory",{params:{mainCate:this.mainCate,secdDistrict:this.secdDistrict,thirDistrict:this.thirDistrict}}).then((res)=>{
                if(res.body.result=='000'){
                        this.merchB=res.body.cateCount;
                    }
                })
       },
        //查三级商圈
        secdDistrictBFn(){
             this.$http.get("/eb-web-api/mobile/store/queryStoreCountByDistrict",{params:{secdDistrict:this.secdDistrict,mainCate:this.mainCate,secdCate:this.secondCate}}).then((res)=>{
                if(res.body.result=='000'){
                        this.circleB=res.body.distCount;
                    }
                })
        }
    },
  created(){
      sessionStorage.removeItem('searchInput')
        document.body.style.backgroundColor='#f6f6f8';
        this.mainCateBFn()
        this.secdDistrictFn()
        this.$http.get("/eb-web-api/mobile/store/querySecondeCategory",{params:{parentId:this.$route.query.id}}).then((res)=>{
            if(res.body.result=='000'){
                this.secondCellect=res.body.listCategory;
                // console.log(this.secondCellect)
            }
        }).catch((res)=>{

        })
        
  },
  components:{
    InfiniteLoading,
  }
}
</script>

<style lang="less" scoped>
    // @import '../../assets/css/search.less';
    // @import '../../assets/css/searchResult.less';
    .position{
        background: #fff;
        height: 60px;
        line-height: 60px;
        font-size: 26px;
        color: #666;
        border-top:1px solid #e3e3e3;
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
     .detailIcon{
        background: #ffffff;
        padding-top: 40px;
        border-bottom: 1px solid #e1e1e1;
        .iconBox{
            margin: 0 auto;
            font-size: 24px;
            color: #333;
        }
        .iconBox li {
            float: left;
            margin-bottom: 35px;
            width: 25%;
            text-align: center;
            list-style: none;
        }
        .iconBox i{
            margin: 0 auto;
            margin-bottom: 20px;
            display: block;
            height: 60px;
            width: 60px;
            background: url(../../assets/imgs/tianpin.png);
            background-size:100% 100%;
        }
    }
    // .div{
    // height: 74+88px;
    // }
    .btns{
        border-top:1px solid #e3e3e3;
        margin-top: 18px;
        height: 74px;
        background: #fff;
        li{
            height: 48px;
            margin-top: (74-48)/2px;
            text-align: center;
            line-height: 48px;
            font-size: 26px;
            color: #333;
            p{
                display: inline-block;
            }
        }
        li:nth-child(2){
            border-left:1px solid #e3e3e3;
            border-right:1px solid #e3e3e3;
        }
        .icon-jiao{
            width: 25px;
            height: 18px;
            background: url(../../assets/imgs/seHuijiao.png) no-repeat;
            background-size: 100% 100%;
            display: inline-block;
        }
        .icon-jiao.active{
            background: url(../../assets/imgs/seLanjiao.png) no-repeat;
            background-size: 100% 100%;
        }
    }

    .select{
        height: 74px;
        // position: fixed;
        top: 88px;
        left: 0;
        width: 100%;
    }

    .opacity{
        // position: fixed;
        left: 0;
        top: 160px;
        bottom: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
    }

    .merchant{
        background: #fff;
        border-top: 1px solid #e1e1e1;
        width: 750px;
        position: absolute;
    }

    .classA,.classB{
        font-size: 28px;
        li{
        border-bottom: 1px solid #e1e1e1;
        .icon-jiao2{
            width: 12px;
            height: 21px;
            float: right;
            margin-top: 26px;
            margin-right: 20px;
        }
        
        p{
            line-height: 74px;
        }
        .name{
            margin-left: 30px;
        }
        .num{
            margin-right: 20px;
        }
        .mr-50{
            margin-right: 50px;
        }
        }
        li:last-child{
            border-bottom: none;
        }
    }

            
    .active{
        color: #3da4f1!important;
        background: #f0f0f0; 
    }

    .classB{
        border-left:  1px solid #e1e1e1;
        background: #f0f0f0;
        width: 320px;
        li{
        background-image:none;  
        width: 100%;
        }
    }



    // 列表
    .tenants{
        li{
            border-top:1px solid #e1e1e1;
            border-bottom:1px solid #e1e1e1; 
            background: #ffffff;
            padding-top: 20px;
            margin-bottom: 20px;
            box-sizing: border-box;
            .tenantImg{
                width: 126px;
                height: 126px;
                border-radius: 5px;
                margin-right: 20px; 
                margin-left: 30px;
            }
            .right{
                .top{
                    padding-right: 30px;
                    box-sizing: border-box;                
                    .tenantName{
                        font-size: 34px;
                        color: #333;
                        margin-top: 10px;
                        margin-bottom: 15px;
                    }
                    .starBox{
                        i{
                        float: left; 
                        width: 26px;
                        height: 26px;
                        margin-right: 7px;
                        background: url(../../assets/imgs/pinlun_xiaostar_@2x.png) no-repeat;
                        background-size:100% 100%; 
                        }
                        .icon-ccc{
                            background: url(../../assets/imgs/storeStar.png) no-repeat;
                            background-size:100% 100%; 
                        }
                    }
                    p{
                        color: #666;
                    }
                    .addres{
                        font-size: 26px;
                        color: #666;
                        margin-top: 14px;
                        margin-bottom: 20px;
                        span{float: left}
                        i{
                        display: block;
                        width: 32px;
                        height: 32px;
                        margin-right: 20px;
                        margin-bottom: 20px;
                        float: right;
                        }             
                        .icon-juan{
                            
                            background: url(../../assets/imgs/store_quan.png) no-repeat;
                            background-size:100% 100%;
                        }
                        .icon-tuan{
                            
                            background: url(../../assets/imgs/store_tuan.png) no-repeat;
                            background-size:100% 100%;
                        }
                        .icon-hui{
                            
                            background: url(../../assets/imgs/store_hui.png) no-repeat;
                            background-size:100% 100%;
                        }
                    }
                }
            }
        }
    }

    .info img{
        height: 248px;
        width: 389px;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        position: fixed;
    }
    .beautyBox{
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        border-bottom: 1px solid #e1e1e1;
        .iconBox{
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            font-size: 24px;
            color: #ffffff;
        }
        .iconBox li {
            float: left;
            margin: 0 10px 10px 0;
            width: 30%;
            height: 140px;
            border-radius: 10px;
            background: #7abef3;
            text-align: center;
            list-style: none;
        }
        .iconBox i{
            margin: 0 auto;
            margin-bottom: 20px;
            margin-top: 20px;
            display: block;
            height: 60px;
            width: 60px;
            background: url(../../assets/imgs/tianpin.png);
            background-size:100% 100%;
        }
        .iconBox span{
            color: #fff;
        }
    }
    .healthyBox{
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        border-bottom: 1px solid #e1e1e1;
        .iconBox{
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            font-size: 24px;
            color: #ffffff;
        }
        .iconBox li {
            float: left;
            margin: 0 10px 0 0;
            width: 30%;
            height: 140px;
            border-radius: 10px;
            background: #ff9e62;
            text-align: center;
            list-style: none;
        }
        .iconBox i{
            margin: 0 auto;
            margin-bottom: 20px;
            margin-top: 20px;
            display: block;
            height: 60px;
            width: 60px;
            background: url(../../assets/imgs/tianpin.png);
            background-size:100% 100%;
        }
        .iconBox span{
            color: #fff;
        }
    }
</style>

