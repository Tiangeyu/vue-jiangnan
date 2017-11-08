<template>
    <div>
        <myHeader :title="title"></myHeader>
        <div id="divcontent" v-html="description"></div>
    </div>
</template>
<script>
import {getItem} from '../../../assets/js/common'
import myHeader from '../../../components/Header/myHeader.vue';
export default {
    data(){
        return{
            description:'',
            picUrl: getItem('picUrl'),
            title:"红包规则",
        }
    },
    components:{
        myHeader
    },
    created(){
        this.$http.get("/eb-web-api/mobile/activity/getRedPacketRule").then((res)=>{
            this.rule = res.body;
            // console.log(this.rule.rule.ruleDetail)
            this.description = this.rule.rule.ruleDetail.replace(/group1/g,this.picUrl+"group1");
            
        },(res)=>{
        })
    }
}
</script>

