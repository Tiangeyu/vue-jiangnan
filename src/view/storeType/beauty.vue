<template>
    <div class="beautyBox">
        <ul class="iconBox clearfix" >
            <li  v-for="item in beautyArea" :key="item.id">
                <a href="">
                    <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                    <span>{{item.iconSpan}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .beautyBox{
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
            margin: 0 10px 10px 0;
            width: 30%;
            height: 140px;
            border-radius: 10px;
            background: #7abef3;
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
                beautyArea:[
                    {'iconSpan':'美发','id':'0','iconSrc':'../static/imgs/beauty_icon01.png','to':'/'},
                    {'iconSpan':'美甲美睫','id':'0','iconSrc':'../static/imgs/beauty_icon02.png','to':'/'},
                    {'iconSpan':'产后塑形','id':'0','iconSrc':'../static/imgs/beauty_icon03.png','to':'/'},
                    {'iconSpan':'美容SPA','id':'0','iconSrc':'../static/imgs/beauty_icon04.png','to':'/'},
                    {'iconSpan':'纤体瘦身','id':'0','iconSrc':'../static/imgs/beauty_icon05.png','to':'/'},
                    {'iconSpan':'韩式定妆','id':'0','iconSrc':'../static/imgs/beauty_icon06.png','to':'/'}
                ]
            }
        }
    }
</script>
