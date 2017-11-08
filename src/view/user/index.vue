<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="infoBox clearfix">
            <img :src="picUrl+userHead" class="fl" />
            <div class="infoRight fl">
                <p class="userName">{{userName}}</p>
                <!--<p class="eCoin">我的e币：&nbsp{{eCoin}}</p>-->
            </div>
            <router-link to="setting">
                <i class="setting fr"></i>
            </router-link>
        </div>
        <div class="gap20"></div>
        <div class="listUp">
            <ul>
                <router-link to="redBag">
                    <li class="clearfix">
                        <i class="myRedBag fl"></i>
                        <p class="fl">我的红包</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
                <router-link to="collectProduct">
                    <li class="clearfix">
                        <i class="myCollection fl"></i>
                        <p class="fl">我的收藏</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
                <router-link to="commentList">
                    <li class="clearfix">
                        <i class="myComment fl"></i>
                        <p class="fl">我的点评</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="gap20"></div>
        <div class="listDown">
            <ul>
                <router-link to="commonProblem">
                    <li class="clearfix">
                        <i class="normalProblems fl"></i>
                        <p class="fl">常见问题</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
                <router-link to="about">
                    <li class="clearfix">
                        <i class="aboutUs fl"></i>
                        <p class="fl">关于</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
            </ul>
        </div>
        <myFooter :page='2'></myFooter>
    </div>
</template>
<style lang="less" scoped>
    .gap20{
        width: 100%;
        height: 20px;
        background: #efeef4;
    }
    .infoBox{
        img{
            width: 116px;
            height: 117px;
            margin-top: 26px;
            margin-bottom: 26px;
            margin-left: 40px;
        }
        .infoRight{
            margin-left: 46px;
            .userName{
                font-size: 32px;
                color: #323232;
                margin-top: 42px;
            }
            .eCoin{
                font-size: 28px;
                color: #999;
                margin-top: 18px;
                margin-bottom: 54px;
            }
        }
        .setting{
            display: block;
            width: 40px;
            height: 40px;
            background-image: url(../../assets/imgs/setting.png);
            background-size: 100%;
            margin-top: 42px;
            margin-right: 30px;
        }
    }
    .listUp,.listDown{
        ul{
            li{
                height: 80px;
                border-bottom: 1px solid #e5e5e5;
                margin-left: 38px;
                i{
                    display: block;
                    background-size: 100%;
                    margin-top: 24px;
                }
                p{
                    display: block;
                    font-size: 30px;
                    color: #323232;
                    margin-left: 30px;
                    line-height: 80px;
                }
            }
        }
        .myRedBag{
            width: 30px;
            height: 34px;
            background-image: url(../../assets/imgs/redBag.png);
            margin-top: 24px;
        }
        .myCollection{
            width: 30px;
            height: 35px;
            background-image: url(../../assets/imgs/collection.png);
            margin-top: 24px;
        }
        .myComment{
            width: 27px;
            height: 32px;
            background-image: url(../../assets/imgs/my_comment.png);
            margin-top: 24px;
            margin-left: 3px;
        }
        .normalProblems{
            width: 28px;
            height: 28px;
            background-image: url(../../assets/imgs/normalProblems.png);
            margin-top: 26px;
        }
        .aboutUs{
            width: 28px;
            height: 28px;
            background-image: url(../../assets/imgs/aboutUs.png);
            margin-top: 26px;
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
    .listUp{
        a:last-child{
            li{
                border-bottom:none;
            }
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import myFooter from '../../components/Footer/index.vue';
    import {getItem} from '../../assets/js/common';
    export default{
        data(){
            return{
                title:"个人中心",
                picUrl:getItem('picUrl'),
                userHead:"../../assets/imgs/user_pic.png",
                userName:"用户名",
                customerId:getItem('customerId'),
            }
        },
        components:{
            myHeader,
            myFooter
        },
        methods:{
            
        },
        beforeCreate(){
            if(getItem('customerId')== ""||getItem('customerId') == undefined){
                this.$router.push("/login")
            }else{
                this.customerId = getItem('customerId');
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.$http.get("/eb-web-api/mobile/customer/queryCustomerInfo",{params:{customerId:this.customerId}}).then(function(res){
                var user = res.body;
                this.userName = user.customerInfo.nickName;
                this.userHead = user.customerInfo.headImage;
                // this.customerId = user.customerInfo.id;
            },(res)=>{
                // this.title='服务器网络链接中断，请稍后再试！'
                // this.isShow=true;
                // var that=this
                // setTimeout(function(){
                //         that.isShow=false;
                // },3000)
            })
        }
    }
</script>