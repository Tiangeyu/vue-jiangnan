<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="listUp">
            <ul>
                <router-link to="userInfo">
                    <li class="clearfix">
                        <p class="fl">个人信息</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
                <router-link to="safe">
                    <li class="clearfix last_li">
                        <p class="fl">账户与安全</p>
                        <i class="intoArrowGray fr"></i>
                    </li>
                </router-link>
            </ul>
        </div>
        <div class="gap20"></div>
        <div class="listDown">
            <ul>
                <!--<li class="clearfix">
                    <p class="fl">非wifi环境下省流量模式</p>
                    <i class="intoArrowGray fr"></i>
                </li>
                <li class="clearfix">
                    <p class="fl">清空缓存</p>
                    <p class="cacheNum fr">{{cacheNum}}K</p>
                </li>-->
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" @click="signOut">退出账户</div>
        </div>
        <div class="fixed-body" v-show="isShow">
            <div class="main-body clearfix">
                <h3>温馨提示</h3>
                <p>{{contents}}</p>
                <div class="btnL fl" @click="cancel">取消</div>
                <div class="btnR fl" @click="sure">确定</div>
            </div>
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
    .gap20{
        width: 100%;
        height: 20px;
        background: #efeef4;
    }
    .listUp,.listDown{
        ul{
            background: #fff;
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
            .last_li{
                border-bottom: none;
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
        .cacheNum{
            margin-right: 30px;
        }
    }
    .buttonBox{
        width: 750px;
        .button{
            width: 670px;
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #fff;
            background: #6ca1ed;
            border-radius: 10px;
            text-align: center;
            margin: 0 auto;
            margin-top: 140px;
        }
    }
    .fixed-body{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background-color: rgba(0,0,0,.7);
        .main-body{
            opacity: 1;
            position: absolute;
            top: 360px;
            left: 125px;
            width: 501px;
            height: 310px;
            background-color: #fff;
            border-radius: 15px;
            h3{
                padding-top: 40px;
                font-size: 36px;
                color: #323232;
                text-align: center;
                padding-bottom: 46px;
            }
            p{
                font-size: 28px;
                color: #323232;
                padding-bottom: 70px;
                text-align: center;
                border-bottom: 1px solid #e2e2e2;
            }
            .btnL{
                width: 250px;
                text-align: center;
                padding-top: 25px;
                padding-bottom: 18px;
                color: #a0a0a0;
                font-size: 36px;
                border-right: 1px solid #e2e2e2;
            }
            .btnR{
                width: 250px;
                text-align: center;
                padding-top: 25px;
                padding-bottom: 18px;
                color: #3d87f7;
                font-size: 36px;
            }
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                cacheNum:"",
                title:"设置",
                customerId:"",
                contents:"",
                isShow:false
            }
        },
        components:{
            myHeader
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.customerId = window.sessionStorage.getItem("customerId");
        },
        methods:{
            signOut(){
                this.contents = "您确定退出登录吗？";
                this.isShow = true;
            },
            cancel(){
                this.isShow = false;
            },
            sure(){
                window.sessionStorage.removeItem("customerId");
                window.sessionStorage.removeItem("phone");
                this.$router.push("/index");
            }
        }
    }
</script>