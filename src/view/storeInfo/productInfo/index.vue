<template>
    <div>
        <Headers :title="title" show-img="true" :collenn="collenn"  @isCollen="isCollen"></Headers>
        <Product-detail @isCollen="isCollen"></Product-detail>
    </div>
</template>

<script>
import Headers from './header.vue'
import ProductDetail from './productDetail.vue'
export default {
  components:{
      Headers,
      ProductDetail
  },
  data() {
      return {
          title: "商品详情",
          collenn: ''
      }
  },
  methods:{
      isCollen(bleaoon){
          this.collenn = bleaoon;
      }
  }
}
</script>
