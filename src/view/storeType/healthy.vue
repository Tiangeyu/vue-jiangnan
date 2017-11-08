<template>
    <div class="healthyBox">
        <ul class="iconBox clearfix" >
            <li  v-for="item in healthyArea" :key="item.id">
                <a href="">
                    <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                    <span>{{item.iconSpan}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .healthyBox{
        width: 100%;
        overflow: hidden;
        background: #ffffff;
        border-bottom: 1px solid #e1e1e1;
        .iconBox{
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            font-size: 24px;
            color: #ffffff;
        }
        .iconBox li {
            float: left;
            margin: 0 10px 0 0;
            width: 30%;
            height: 140px;
            border-radius: 10px;
            background: #ff9e62;
            text-align: center;
            list-style: none;
        }
        .iconBox i{
            margin: 0 auto;
            margin-bottom: 20px;
            margin-top: 20px;
            display: block;
            height: 60px;
            width: 60px;
            background: url(../../assets/imgs/tianpin.png);
            background-size:100% 100%;
        }
        .iconBox span{
            color: #fff;
        }
    }
</style>
<script>
    export default {
        data(){
            return{
                healthyArea:[
                    {'iconSpan':'温泉洗浴','id':'0','iconSrc':'../static/imgs/health_icon01.png','to':'/'},
                    {'iconSpan':'足疗按摩','id':'0','iconSrc':'../static/imgs/health_icon02.png','to':'/'},
                    {'iconSpan':'体检/医药','id':'0','iconSrc':'../static/imgs/health_icon03.png','to':'/'}
                ]
            }
        }
    }
</script>
