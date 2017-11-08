<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="listUp">
            <ul>
                <router-link to="">
                    <li class="clearfix first_li">
                        <p class="fl">头像</p>
                        <img :src="picUrl+userHead" class="fr" />
                    </li>
                </router-link>
                <router-link to="reviseNickname">
                    <li class="clearfix">
                        <p class="fl">昵称</p>
                        <i class="intoArrowGray fr"></i>
                        <p class="fr infoText">{{userName}}</p>
                    </li>
                </router-link>
                <router-link to="birth">
                    <li class="clearfix last_li">
                        <p class="fl">生日</p>
                        <i class="intoArrowGray fr"></i>
                        <p class="fr infoText">{{userBirth}}</p>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: #efeef4;
        z-index: -999;
    }
    .listUp{
        ul{
            background: #fff;
            li{
                height: 80px;
                margin-left: 38px;
                border-bottom: 1px solid #e5e5e5;
                i{
                    display: block;
                    background-size: 100%;
                    margin-top: 24px;
                }
                p{
                    display: block;
                    font-size: 32px;
                    color: #323232;
                    margin-left: 30px;
                    line-height: 80px;
                }
                img{
                    width: 116px;
                    height: 117px;
                    margin-top: 13px;
                    margin-bottom: 12px;
                    margin-right: 72px;
                }
                .infoText{
                    font-size: 30px;
                    color: #999;
                    margin-right: 20px;
                }
            }
            .last_li{
                border-bottom:none;
            }
            .first_li{
                height: 142px;
                i{
                    margin-top: 24px;
                }
                p{
                    line-height: 142px;
                }
            }
        }
        .intoArrowGray{
            width: 18px;
            height: 34px;
            background-image: url(../../assets/imgs/into_arraw_gray.png);
            margin-left: 0;
            margin-right: 30px;
            margin-top: 24px;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import {getItem} from '../../assets/js/common';
    export default{
        data(){
            return{
                picUrl:getItem('picUrl'),
                userHead:"../../assets/imgs/user_pic.png",
                userName:"用户名",
                userBirth:"99",
                title:"个人信息",
                customerId:""
            }
        },
        components:{
            myHeader
        },
        created(){
            this.customerId = window.sessionStorage.getItem("customerId");
            this.$http.get("/eb-web-api/mobile/customer/queryCustomerInfo",{params:{customerId:this.customerId}}).then(function(res){
                var user = res.body;
                this.userHead = user.customerInfo.headImage;
                this.userName = user.customerInfo.nickName;
                this.userBirth = user.birthday;
            },(res)=>{

            }),
            document.body.style.backgroundColor='#fff';
        }
    }
</script>