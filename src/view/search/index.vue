<template>
    <div>
        <div class="div"></div>
       <header class="clearfix">
            <div @click="back()" class="back fl"></div>
            <p class="fr" @click="search()">搜索</p>
            <div class="search box fr">
                    <i class="iconSearch"></i>
                    <input type="text" ref="searchInput" class="item" placeholder="输入商品、商户或商圈" v-model="input">
            </div>
        </header>
        <h2 class="tit" v-show="!Data">搜索历史记录</h2>
        <ul class="history">
            <li v-for="(item,index) in searchData" :key="index" @click="liSearch(item,index)">{{item}}</li>
        </ul>
        <p class="clear" @click="clear()" v-show="!Data">清除历史记录</p>
        <img src="../../assets/imgs/noSearchData.png" alt="" v-show="Data">
        <!-- <p class="tisp" v-show="show">请输入需要搜索的商品或商户</p> -->
        <tisp contents='请输入需要搜索的商户' v-show="show"></tisp>
    </div>
</template>
<script>
import tisp from '../../components/tisp/index'
export default {
    data(){
        return{
             searchData:[],
             localData:[],
             Data:true,
             show:false,
             input:sessionStorage.getItem('searchInput')
        }
    },
    methods:{
       search(){
        var index;
           if(this.$refs.searchInput.value.length==0){
               var _that=this;
               this.show=true;
               setTimeout(function(){
                   _that.show=false;
               },3000)
               return;
           }
           if(this.localData.length==0){
                this.localData.unshift(this.$refs.searchInput.value);
           }else{
                index=this.localData.indexOf(this.$refs.searchInput.value);
                if(index == -1){
                    this.localData.unshift(this.$refs.searchInput.value);
                }else{
                    this.localData.splice(index,1);
                    this.localData.unshift(this.$refs.searchInput.value);
                }
           }

           if(this.localData.length>10){
               this.localData.length=10;
           }
            this.Data=false;
            localStorage.setItem('localSearch',JSON.stringify(this.localData));
            sessionStorage.setItem('searchInput',this.$refs.searchInput.value)
            this.$router.push({ name: 'searchResult'})
       },
       clear(){
           this.localData.length=0;
           this.searchData.splice(0,this.searchData.length);
           this.Data=true;
           
           localStorage.setItem('localSearch',JSON.stringify(this.localData))
       },
       liSearch(inner,index){
            this.localData.splice(index,1);
            this.localData.unshift(inner);
            localStorage.setItem('localSearch',JSON.stringify(this.localData));
            this.$router.push({ name: 'searchResult'})
            sessionStorage.setItem('searchInput',inner)
       },
       back(){
           this.$router.go(-1);
            sessionStorage.removeItem('searchInput')
       },
  },
   created(){
        document.body.style.backgroundColor='#f6f6f8';
        if(localStorage.getItem('localSearch')){
            this.searchData=JSON.parse(localStorage.getItem('localSearch'));
            this.localData=JSON.parse(localStorage.getItem('localSearch'));
            if(this.searchData.length==0){
                this.Data=true;
            }else{
                this.Data=false;
            }
        }else{
            localStorage.setItem('localSearch',[]);
        }
  },
        
  components:{
      tisp
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search.less';
       .tit{
           line-height: 60px;
           font-size: 24px;
           color:#b4b4b4;
           margin-left: 30px;
       }

        .history{
            background: #fff;
            padding: 0 30px;
            li{
                height: 88px;
                line-height: 88px;
                border-bottom: 1px solid #f6f6f8;
                font-size: 28px;
                color: #646464;
            }
        }

        .clear{
            height: 88px;
            background: #fff;
            font-size: 28px;
            text-align: center;
            color: #999;
            line-height: 88px;
        }

        img{
            width: 204px;
            height: 266px;
            display: block;
           position: fixed;
           left: 50%;
           top: 50%;
           margin-left: -204/2px;
           margin-top: -266/2px;
        }
        .tisp{
            background: rgba(000, 000, 000, 0.6);
            font-size: 28px;
            text-align: center;
            color: #fff;
            width: 400px;
            height: 60px;
            border-radius:6px;
            position: absolute;left: 50%;
            margin-top: -40px;
            line-height: 60px;
            margin-left: -200px;
            top: 50%; 
        }
</style>
