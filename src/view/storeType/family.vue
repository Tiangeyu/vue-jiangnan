<template>
    <div class="detailIcon">
        <ul class="iconBox clearfix" >
            <li  v-for="item in iconList" :key="item.id" @click="familyIcon(item.id,item.iconSpan,index)">
                <a href="">
                    <i :style="{backgroundImage:'url('+item.iconSrc+')'}"></i>
                    <span>{{item.iconSpan}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
    .detailIcon{
        background: #ffffff;
        padding-top: 40px;
        border-bottom: 1px solid #e1e1e1;
        .iconBox{
            margin: 0 auto;
            font-size: 24px;
            color: #333;
        }
        .iconBox li {
            float: left;
            margin-bottom: 35px;
            width: 25%;
            text-align: center;
            list-style: none;
        }
        .iconBox i{
            margin: 0 auto;
            margin-bottom: 20px;
            display: block;
            height: 60px;
            width: 60px;
            background: url(../../assets/imgs/tianpin.png);
            background-size:100% 100%;
        }
    }
</style>

<script>
export default {
    data(){
        return{
            iconList:[
                {iconSrc:"../static/imgs/qinzi_icon01.png",iconSpan:'亲子摄影',id:'1','to':'/'},
                {iconSrc:"../static/imgs/qinzi_icon02.png",iconSpan:'亲子游乐',id:'2','to':'/'},
                {iconSrc:"../static/imgs/qinzi_icon03.png",iconSpan:'早教中心',id:'3','to':'/'},
                {iconSrc:"../static/imgs/qinzi_icon04.png",iconSpan:'幼儿教育',id:'4','to':'/'}
            ],
        }
    }
}
</script>
