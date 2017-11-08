<template>
  <div>
      <section class="buying">
        <div class="box title">
            <img src="../../assets/imgs/ishizhong.png" alt="" class='icon-time'>
            <p class="item">超值抢购</p>
         </div>
         <ul class="buyList">
             <li v-for="(item,index) in buyList" :key="index">
                 <router-link :to="{name:'specialSelling',query:{shoppingId:item.id}}">
                    <div class="imgBox">
                        <img :src='picUrl + item.bigImage' alt="">
                        <div class="timeBox"><span v-text='timeText[index]'></span> <font>{{time[index].h}}</font>:<font>{{time[index].m}}</font>:<font>{{time[index].s}}</font></div>
                    </div>
                    <div class="txtBox">
                        <p>{{item.name}}</p>
                        <p>{{item.description}}</p>
                    </div>
                </router-link>
             </li> 
         </ul>
      </section>
  </div>
</template>
<script>
import {getItem} from '../../assets/js/common'
export default {
    data(){
        return{
            buyList:[],
            time:[],
            startTime:[],
            endTime:[],
            picUrl: getItem('picUrl'),
            timeText:[]
        }
    },
    methods:{
        timeFn(that){

            var total,h,m,s
            var newTime=new Date().getTime();
            for(var i=0;i<that.startTime.length;i++){
                if(that.startTime[i]>newTime){
                    that.timeText.splice(i,0,'距 开始');
                    total =parseInt((that.startTime[i]-newTime)/1000);
                }else{
                    that.timeText.splice(i,0,'距 结束');
                    total =parseInt((that.endTime[i]-newTime)/1000);
                }
                h=parseInt(total/3600)
                total%=3600;
                    m=parseInt(total/60);
                total%=60;
                    s=total;
                if(that.time.length==0){
                    that.time.push({'h':that.fill(h),'m':that.fill(m),'s':that.fill(s)})
                }else{
                    that.time.splice(i,1,{'h':that.fill(h),'m':that.fill(m),'s':that.fill(s)})
                }
            }
        },
        fill(n){
          if(n<10){
              n='0'+n
          }
            return n;
        }
    },
   created() {
        this.$http.get("/eb-web-api/mobile/activity/getShoppingList").then((res)=>{
            if(res.body.result=='000'){
                this.buyList = res.body.list;
                //超值抢购
                for(var i=0;i<this.buyList.length;i++){
                    var  start=this.buyList[i].startTime;
                    var  end=this.buyList[i].endTime;
                    this.startTime.push(start);
                    this.endTime.push(end);
                }
                this.timeFn(this);
                var that=this
                setInterval(function(){
                    that.timeFn(that);
                },1000)
            }
        },(res)=>{
        })
    },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/index.less';
</style>
