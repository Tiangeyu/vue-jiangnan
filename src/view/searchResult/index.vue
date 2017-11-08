<template>
  <div>
      <div class="div"></div>
       <header class="clearfix">
            <div @click="back()"  class="back fl"></div>
            <router-link :to="{ name: 'search', query : { searchData: mainCondition}}" class='a fl'>
                <div class="search box">
                        <i class="iconSearch"></i>
                        <input type="text" class="item" v-model="mainCondition" placeholder="输入商品、商户或商圈" readonly>
                </div>
            </router-link>
        </header>
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
                    <li class="clearfix merAllA" @click='allFn("merchant")'>
                        <p class="name fl ">全部分类</p>
                        <p class="num fr mr-50">{{merchA.totalCount}}</p>
                    </li>
                     <li class="clearfix merA" v-for="(item,index) in merchA.cateList" :key="index" @click="subset('merchant',item.id,index)"  >
                        <p class="name fl">{{item.cateName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.cateCount}}</p>
                    </li>
                </ul>
                <ul class="classB" v-show="merClassB">
                    <li class="clearfix merAllB" @click="allBFn('merchant',merchB.mainCateName)">
                        <p class="name fl ">全部分类</p>
                        <p class="num fr mr-50">{{merchB.totalCount}}</p>
                    </li>
                    <li class="clearfix merB" v-for="(item,index) in merchB.cateList" :key="index" @click="classBFn('merchant',item.id,item.cateName,index)">
                        <p class="name fl">{{item.cateName}}</p>
                         <img src="../../assets/imgs/sejiao2.png" alt="" class='icon-jiao2'>
                        <p class="num fr">{{item.cateCount}}</p>
                    </li>
                </ul>
          </div>
        </div>
        <div class="opacity opaB" v-show="opaB" @click.self='close()'>
            <div class="merchant box ">
                <ul class="classA item">
                    <li class="clearfix cirAllA"  @click='allFn("circle")'>
                        <p class="name fl ">全城</p>
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
                        <p class="name fl " >全部分类</p>
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
             <ul class="tenants">
                <li v-for="(item,index) in queryData" :key="index">
                    <router-link  class="box" :to="{name:'storeInfo',query:{storeId:item.id}}">
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
                    </router-link>
                </li>
            </ul> 
        </section>    
          <infinite-loading  :on-infinite="queryFn"  ref="infiniteLoading" spinner='bubbles'>
            <div slot="no-results" class="info" ref="info">
                <img src="../../assets/imgs/noSearch.png" />
                <p>没有找到相关信息</p>
             </div>
            <span slot="no-more">
                没有更多数据  
            </span>
        </infinite-loading>           
  </div>
</template>
<script>
import search from '../../components/searchHeader/searchHeader.vue';
import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading';
import {getItem} from '../../assets/js/common'
export default {
   data(){
       return{
          picUrl: getItem('picUrl'),
          merchA:[],//一级商户
          circleA:[],//一级商圈
          merchB:[],//二级商户
          circleB:[],//二级商圈
          queryData:[],//列表
          //三个遮罩
          opaA:false,
          opaB:false,
          opaC:false,
          merClassB:false,
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
          mainCondition:sessionStorage.getItem('searchInput'),//主查询条件
          page:0,//当前页数
          mainCate:'',//一级分类
          secondCate:'',//二级分类
          secdDistrict:'',//二级商圈
          thirDistrict:'',//三级商圈
          score:'',//商户评分(6升序,9倒序)
          avgprice:'',//人均消费(6升序,9倒序)
          distSort:'',//距离排序(6升序,9倒序)
          lng:'',//经度
          lat:'',//纬度
          
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
                        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete'); 
                    }                  
                }else{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
                }
            },(res)=>{
                    this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
            })
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
                case 'merchant':
                this.opaA=true;
                this.opaB=false;
                this.opaC=false;
                this.mainCate=id;
                this.$http.get("/eb-web-api/mobile/store/queryStoreCountByCategory",{params:{mainCate:id,mainCondition:this.mainCondition,secdDistrict:this.secdDistrict,thirDistrict:this.thirDistrict}}).then((res)=>{
                if(res.body.result=='000'){
                        this.merchB=res.body.cateCount;
                    }
                })
                
                for(var i=0;i<document.getElementsByClassName('merB').length;i++){
                    document.getElementsByClassName('merB')[i].style.color='#333';
                }
                 document.getElementsByClassName('merAllA')[0].style.backgroundColor='#fff';
                        document.getElementsByClassName('merAllA')[0].style.color='#333';
                this.merClassB=true;
               this.style('merA',index);
                break;
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
                        this.styleB('merB',index)
                        document.getElementsByClassName('merAllB')[0].style.color='#333';
                        this.secondCate=id;
                        this.$refs.merchant.innerHTML=name;
                        this.secdDistrictFn();
                        if(this.secdDistrict!=''){
                             this.secdDistrictBFn();
                        }
                        break;
                    case 'circle':
                        this.styleB('cirB',index)
                        document.getElementsByClassName('cirAllB')[0].style.color='#333';
                        this.thirDistrict=id
                        this.$refs.circle.innerHTML=name;
                        this.mainCateFn();
                        if(this.mainCate!=''){
                            this.mainCateBFn();
                        }
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
                this.lng = "";
                this.lat = "";
                break;
                case 'score': //商户评分
                this.avgprice='';
                this.score=mark;
                this.distSort='';
                this.lng = "";
                this.lat = "";
                break;
                case 'distSort': //距离
                this.avgprice='';
                this.score='';
                this.distSort=mark;
                this.lng = 11;
                this.lat = 12;
                break;
                default:
                this.avgprice='';
                this.score='';
                this.distSort='';
                this.lng = "";
                this.lat = "";
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
                this.merchB=[];
                this.secondCate='';
                this.mainCate=''
                for(var i=0;i<document.getElementsByClassName('merA').length;i++){
                    document.getElementsByClassName('merA')[i].style.backgroundColor='#fff';
                    document.getElementsByClassName('merA')[i].style.color='#333';
                }
                document.getElementsByClassName('merAllA')[0].style.backgroundColor='#f0f0f0';
                document.getElementsByClassName('merAllA')[0].style.color='#3da4f1';
                 this.$refs.merchant.innerHTML='全部分类';
                this.secdDistrictFn();
                this.secdDistrictBFn();
                this.merClassB=false;
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
                 this.mainCateFn()
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
                case 'merchant':
                this.secondCate='';
                 for(var i=0;i<document.getElementsByClassName('merB').length;i++){
                    document.getElementsByClassName('merB')[i].style.color='#333';
                }
                document.getElementsByClassName('merAllB')[0].style.color='#3da4f1';
                 this.$refs.merchant.innerHTML=name;
                 this.secdDistrictFn();
                this.secdDistrictBFn();
                break;
                case 'circle':
                this.thirDistrict=''
                 this.$refs.circle.innerHTML=name;
                 for(var i=0;i<document.getElementsByClassName('cirB').length;i++){
                    document.getElementsByClassName('cirB')[i].style.color='#333';
                }
                document.getElementsByClassName('cirAllB')[0].style.color='#3da4f1';
                 this.mainCateFn()
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
            /*navigator.geolocation.getCurrentPosition( // 该函数有如下三个参数
                function(pos){ // 如果成果则执行该回调函数
                    alert(
                        '  经度：' + pos.coords.latitude +
                        '  纬度：' + pos.coords.longitude +
                        '  高度：' + pos.coords.altitude +
                        '  精确度(经纬)：' + pos.coords.accuracy +
                        '  精确度(高度)：' + pos.coords.altitudeAccuracy +
                        '  速度：' + pos.coords.speed
                    );
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;
                }, function(err){ // 如果失败则执行该回调函数
                    alert(err.message);
                }, { // 附带参数
                    enableHighAccuracy: false, // 提高精度(耗费资源)
                    timeout: 3000, // 超过timeout则调用失败的回调函数
                    maximumAge: 1000 // 获取到的地理信息的有效期，超过有效期则重新获取一次位置信息
                }
            );
            
            var point = new BMap.Point(latitude,longitude);
            var geoc = new BMap.Geocoder();   
            geoc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                $(".addr").html("当前位置："+addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber);
            }); */
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
       mainCateFn(){
            this.$http.get("/eb-web-api/mobile/store/queryStoreCountByCategory",{params:{mainCondition:this.mainCondition,secdDistrict:this.secdDistrict,thirDistrict:this.thirDistrict}}).then((res)=>{
                if(res.body.result=='000'){
                    this.merchA=res.body.cateCount;
                }
            })
       },
        //查二级商圈
        secdDistrictFn(){
            this.$http.get("/eb-web-api/mobile/store/queryStoreCountByDistrict",{params:{mainCondition:this.mainCondition,mainCate:this.mainCate,secdCate:this.secondCate}}).then((res)=>{
                if(res.body.result=='000'){
                    this.circleA=res.body.distCount;
                }
            })
        },
        //查二级商户
       mainCateBFn(){
            this.$http.get("/eb-web-api/mobile/store/queryStoreCountByCategory",{params:{mainCate:this.mainCate,mainCondition:this.mainCondition,secdDistrict:this.secdDistrict,thirDistrict:this.thirDistrict}}).then((res)=>{
                if(res.body.result=='000'){
                        this.merchB=res.body.cateCount;
                    }
                })
       },
        //查三级商圈
        secdDistrictBFn(){
             this.$http.get("/eb-web-api/mobile/store/queryStoreCountByDistrict",{params:{secdDistrict:this.secdDistrict,mainCondition:this.mainCondition,mainCate:this.mainCate,secdCate:this.secondCate}}).then((res)=>{
                if(res.body.result=='000'){
                        this.circleB=res.body.distCount;
                    }
                })
        }
    },
  created(){
        document.body.style.backgroundColor='#f6f6f8';
        this.mainCateFn();
        this.secdDistrictFn();
       
  },
  components:{
      InfiniteLoading,
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search.less';
@import '../../assets/css/searchResult.less';
</style>

