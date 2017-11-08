<template>
  <div>
    <header>
        {{title}}
        <i class="goBack" @click="goBack"></i>
        <i class="collen" v-show="showImg" @click="collen" :class="collenn?'isCollen':'noCollen'"></i>
    </header>
    <tips :contents="contents" v-show="noticeShow"></tips> 
  </div>
</template>

<style lang="less" scoped>
  header{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    height: 88px;
    background: #fff;
    text-align: center;
    font-size: 32px;
    color: #333;
    line-height: 88px;
    z-index: 999;
    .goBack{
      width: 22px;
      height: 88px;
      background: url("../../../assets/imgs/product_return.png") no-repeat 0 center;
      background-size: 100%;     
      position: absolute;
      left: 30px;
      top: 0;
    }
    .share{
      width: 37px;
      height: 88px;
      background: url("../../../assets/imgs/product_share.png") no-repeat 0 center;
      background-size: 100%;
      position: absolute;
      top: 0;
      right: 92px;
    }
    .collen{
      width: 40px;
      height: 88px;
      position: absolute;
      top: 0;
      right: 30px;
    }
    .isCollen{
        background: url("../../../assets/imgs/product_likeTrue.png") no-repeat 0 center;
        background-size: 100%;
    }
    .noCollen{
        background: url("../../../assets/imgs/product_like.png") no-repeat 0 center;
        background-size: 100%;
    }
  }
</style>

<script>
import tips from '../../../components/tisp/index.vue'
import {getItem} from '../../../assets/js/common'
export default {
  props:['title',"showImg","collenn"],
  components:{
    tips
  },
  data(){
    return{
        contents: "错误提示",
        noticeShow: false
    }
  },
  methods:{
    goBack(){
      window.history.go(-1)
    },
    collen(){
      console.log(this.collenn)
      if(getItem("customerId")){
        if(this.collenn){
          this.$http.get("/eb-web-api/mobile/product/delProductCollect",{params: {userId: getItem("customerId"), productId: this.$route.query.productId}}).then((res)=>{
            if(res.body.result === "000"){
              this.$emit("isCollen", 0)
            }else{
              this.noticeShow = true;
              this.contents = "删除收藏失败";
              setTimeout(()=>{
                  this.noticeShow = false;
              },2000)
            }     
          }, (res)=>{
            this.noticeShow = true;
            this.contents = "删除收藏服务器异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
          })
        }else{
          this.$http.get("/eb-web-api/mobile/product/addProductCollect",{params: {userId: getItem("customerId"), productId: this.$route.query.productId}}).then((res)=>{
            if(res.body.result === "000"){
               this.$emit("isCollen", 1)
            }else{
              this.noticeShow = true;
              this.contents = "添加收藏失败";
              setTimeout(()=>{
                  this.noticeShow = false;
              },2000)
            }     
          }, (res)=>{
            this.noticeShow = true;
            this.contents = "添加收藏服务器异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
          })
        }
      }else{
        this.$router.push({ name: 'login', query: {productId: this.$route.query.productId}});
        return;
      }
    }
  }
}
</script>



