<template>
    <div class="team" v-show="haveData">
        <i class="team-logo" :style="{backgroundImage: 'url('+logo+')'}"></i>
        <!-- v-if -->
        <!-- <ul>
            <li>
                <div class="team-pic"></div>
                <div class="team-info"></div>
                <div class="team-sell"></div>
            </li>
        </ul> -->
          <!-- v-else -->
        <ul>
            <li v-for="(item, index) in datas" :key="index" @click="togo(item.id)">
                <div class="team-pic" :style="{backgroundImage: 'url('+picUrl+item.smallPicture+')'}"></div>
                <div class="team-info">
                    <h3>{{item.name}}</h3>
                    <div><font>￥{{item.unitPrice}}</font><span>￥{{item.listPrice}}</span></div>
                </div>
                <div class="team-sell clearfix"> <i class="fr"></i><font class="fr">已售{{item.saleCount}}份</font></div>
            </li>          
        </ul>
    </div>
</template>

<style lang="less" scoped>
    .team{
        margin-top: 18px;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        padding-left: 78px;
        background-color: #fff;
        position: relative;
        .team-logo{
            position: absolute;
            left: 28px;
            top: 28px;
            width: 32px;
            height: 32px;
            background-size: 100% 100%;
        }
        p{
            border-top: 1px solid #e1e1e1;
            height: 78px;
            display: flex;
            font{
                padding-left: 220px;
                line-height: 78px;
                font-size: 24px;
                color: #3da4f1;
                padding-right: 18px;
            }
            i{
                width: 27px;
                height: 75px;
                background: url('../../assets/imgs/store_down.png') no-repeat left center;
                background-size: 100%;
            }
        }
        li{
            border-bottom: 1px solid #e1e1e1;
            padding: 29px 0;
            display: flex;
            .team-pic{
                width: 128px;
                height: 110px;
                background-size: 100%; 
            }
            .team-info{
                margin-left: 26px;
                margin-top: 9px;
                width: 350px;
                h3{
                    font-size: 30px;
                    height: 60px;
                    color: #333;
                }
                div{
                    font{
                        font-size: 48px;
                        color:#fd3e3e;
                        font-weight: 500;
                        margin-right: 10px;
                    }
                    span{
                        margin-top: 12px;
                        font-size: 30px;
                        color: #9a9a9a;
                        font-weight: 500;
                        text-decoration: line-through;
                    }
                }
            }
            .team-sell{
                flex: 1;
                font{
                    font-size: 22px;
                    color: #aaa;
                    line-height: 110px;
                }
                i{
                    margin-left: 24px;
                    margin-right: 24px;
                    width:18px;
                    height: 105px;
                    background: url('../../assets/imgs/store_enter.png') no-repeat left center;
                    background-size: 100%; 
                }
            }
        }
        li:last-child{
            border-bottom: none;
        }
    }
</style>
    
<script>
import {getItem} from '../../assets/js/common.js'
export default {
    props:['apiUrl', 'logo','datas'],
    created() {
        // console.log(this.apiUrl)
        // console.log(this.datas)
    },
    data(){
        return {
            haveData: true,
            picUrl: getItem('picUrl')
        }
    },
    methods:{
        togo(id) {
            this.$router.push({name:'productInfo', query:{productId: id}})
        }
    }
}
</script>


