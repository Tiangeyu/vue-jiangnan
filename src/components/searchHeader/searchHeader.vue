<template>
  <div>
    <div class="div"></div>
        <header class="clearfix">
            <router-link to='window.history.go(-1)' class="back fl" v-show="left " slot="back"></router-link>
            <router-link to="./search" class='a fl'>
                <div class="search box">
                        <i class="iconSearch"></i>
                        <input type="text" class="item" placeholder="输入商品、商户或商圈" readonly>
                </div>
            </router-link>
        </header>
  </div>
</template>
<script>
export default {
  props:['left'],
  
}
</script>

<style lang="less" scoped>
@import '../../assets/css/search.less';
</style>

