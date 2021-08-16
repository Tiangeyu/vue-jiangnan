<template>
  <div id="app">
       <router-view></router-view>
  </div>
</template>

<script>
import {setItem, getItem} from './assets/js/common'
export default {
  name: 'app',
  created() {

    // 笨笨笨
     this.$http.get('/eb-web-api/mobile/base/queryPicUrl').then((res)=>{
        setItem('picUrl', res.body.url)
        this.$router.push("/index")
     })

     if(location.href.search("orderSuccess") > 1){
       setItem("orderSuccess","1");
     }

     if(getItem("orderSuccess") === "1"){
       this.$router.push({name: 'orderSucess', query: {orderId: getItem("orderId")}})
     }

  }
}
</script>

<style>

</style>
