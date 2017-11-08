<template>
  <div>
    <Headers :title="title"></Headers>
    <Store-detail></Store-detail>
  </div> 
  
</template>


<script>
import Headers from './header.vue'
import StoreDetail from './storeDetail.vue'
export default {
  components:{
      Headers,
      StoreDetail
  },
  data() {
    return {
      title: '商户详情'
    }
  }
}
</script>
