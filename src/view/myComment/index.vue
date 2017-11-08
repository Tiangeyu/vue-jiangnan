<template>
  <div>
    <my-header title="我的点评"></my-header>
    <div class="story box" >
        <img src="../../assets/imgs/iprom.png" alt="">
        <div class="item right">
            <p>我是店铺名称</p>
            <div class="clearfix">
                <span class="fl">评分</span>
                <div class="fl star">
                    <i :class="{'active':index<=score}" v-for="index in 5" :key="index" @click="starFn(index)"></i>
                </div>
                <span class="fl" v-text="score? score+'分' : '0分'"></span>
            </div>
        </div>
    </div>
    <ul class="tab clearfix" v-show="!badShow">
        <li v-for="(item,index) in labels.goodLabels" :key="index" @click="LabelFn('good',item.key)" :class="{'fe8': goodArr.indexOf(item.key)==-1? false : true}">{{item.name}}</li>
    </ul>
    <ul class="tab clearfix" v-show="badShow">
        <li v-for="(item,index) in labels.badLabels" :key="index"  @click="LabelFn('bad',item.key)" :class="{'fe8': badArr.indexOf(item.key)==-1? false : true}">{{item.name}}</li>
    </ul>
    <ul class="smileBox">
        <li class="box">
            <span>服务</span>
            <div class="item clearfix smile">
                <i v-for="index in 5" :class="{'active':index<=service}" :key="index" @click="smileFn('service',index)" ></i>
            </div>
        </li>
        <li class="box">
            <span>环境</span>
            <div class="item clearfix smile">
                <i v-for="index in 5" :class="{'active':index<=environment}" :key="index" @click="smileFn('environment',index)"></i>
            </div>
        </li>
        <li class="box ">
            <span class="mr-33">性价比</span>
            <div class="item clearfix smile">
                <i v-for="index in 5" :key="index" :class="{'active':index<=costEffective}" @click="smileFn('costEffective',index)"></i>
            </div>
        </li>
    </ul>
    <div class="capita box">
        <span>人均：&nbsp;&nbsp;&nbsp;￥</span>
        <input class="item" type="num" placeholder="0.00" @blur="money()" ref="money"/>
    </div>
    <div class="buttonBox" @click="submit()">
        <div class="button">提交评论</div>
    </div>
    <tisp :contents='tisp' v-show="show"></tisp>

  </div>
</template>
<script>
import myHeader from '../../components/Header/myHeader'
import tisp from '../../components/tisp/index'
export default {
    data () {
        return {
            labels:[],
            score:'',//总评分
            storeId:this.$route.query.storeId,//
            badShow:false,
            goodArr:[],//好评标签
            badArr:[],//差评标签
            service:{type : Number,default : ''},//服务
            environment:{type : Number,default : ''},//环境
            costEffective:{type : Number,default : ''},//性价比
            per:'',//人均消费
            tisp:'',
            show:false
        }
    },
    methods:{
           starFn(index){
                this.score=index;
                if(index>2){
                    this.badShow=false;
                    this.badArr=[];
                }else{
                    this.badShow=true;
                    this.goodArr=[];
                }
           },
           smileFn(item,score){
                switch (item) {
                    case 'service':
                        this.service=parseFloat(score).toFixed(1);
                        break;
                    case 'environment':
                        this.environment=parseFloat(score).toFixed(1);
                        break;
                    case 'costEffective':
                        this.costEffective=parseFloat(score).toFixed(1);
                        break;
                    default:
                        break;
                        
                }
           },
           LabelFn(degree,id){
                switch (degree) {
                    case 'good':
                    if(this.goodArr.indexOf(id)==-1){
                        this.goodArr.push(id)
                    }else{
                        var index=this.goodArr.indexOf(id)
                        this.goodArr.splice(index,1)
                    }
                    this.badArr=[];
                        break;
                    case 'bad':
                    this.goodArr=[];
                    if(this.badArr.indexOf(id)==-1){
                        this.badArr.push(id)
                    }else{
                        var index=this.badArr.indexOf(id)
                        this.badArr.splice(index,1)
                    }
                        break;
                }

           },
           money(){
                var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                var money=this.$refs.money.value;
                if (reg.test(money)) {
                    this.per=parseFloat(money).toFixed(2)
                }else{
                    this.tisp='请输入正确的金额！';
                    this.show=true;
                    var _that=this;
                setTimeout(function(){
                    _that.show=false;
                },3000)
                };

           },
        submit(){
                this.$http.get("/eb-web-api/mobile/base/createPublicPraiseData",{params:{userId:sessionStorage.getItem('customerId'),storeId:this.storeId,orderId:this.$route.query.orderNo.orderId,orderNo:this.$route.query.orderNo,evaluationScore:this.score,
                goodLabel:this.goodArr.join('|'),badLabel:this.badArr.join('|'),serviceScore:this.service,environmentScore:this.environment,costEffectiveScore:this.costEffective,perCapitaConsumption:this.per==''?'0.00':this.per}}).then((res)=>{
                if(res.body.result=='000'){
                         this.tisp='提交成功！';
                        var _that=this;
                          setTimeout(function(){
                            _that.$router.push({path:'orderList'})
                        },2000)
                    }
                })
        }
    },
    components: {
        myHeader,
        tisp
    },
    created () {
        document.body.style.backgroundColor='#f6f6f8';
        sessionStorage.removeItem('searchInput')
         this.$http.get("/eb-web-api/mobile/base/queryPublicPraiseSet",{params:{storeId:this.storeId}}).then((res)=>{
            if(res.body.result=='000'){
                this.labels=res.body.data;
                
            }
        })
    }
}
</script>

<style lang="less" scoped>
 @import '../../assets/css/myComment.less';
</style>

