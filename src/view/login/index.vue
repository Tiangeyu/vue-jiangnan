<template>
    <div>
        <header class="box">
            <p class="item" v-text="title"></p>
        </header>
        <div class="bg"></div>
        <div class="logo"></div>
        <div class="input">
            <label for="num" class="num">账号</label>
            <label for="pass" class="pass">密码</label>
            <input type="text" placeholder="请输入手机号码" id="num" v-model="tel"/>
            <input type="password" placeholder="请输入密码" id="pass" v-model="pass"/>
        </div>
        <div class="buttonBox">
            <div class="button" @click="login">确定</div>
        </div>
        <div class="regNfor">
            <router-link :to="{path:'register',query: {type: '0'}}">
                <p class="register fl">免费注册</p>
            </router-link>
            <router-link :to="{path:'register',query: {type: '1'}}">
                <p class="forget fr">忘记密码？</p>
            </router-link>
        </div>
        <tisp :contents="contents" v-show="isShow"></tisp>
    </div>
</template>
<style lang="less" scoped>
    header{
        height: 88px;
        background: #fff;
        border-bottom: 1px solid #e4e4e4;
        position:fixed;
        width: 100%;
        left: 0;
        top: 0;
        z-index: 999;
            p{
            text-align: center;
            line-height: 88px;
            font-size: 34px;
            }
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        background: #efeef4;
        z-index: -999;
    }
    .logo{
        width:120px;
        height: 120px;
        margin: 0 auto;
        margin-top: 65+88px;
        margin-bottom: 65px;
        background-image: url(../../assets/imgs/logo.png);
        background-size: 100%;
    }
    .input{
        width: 750px;
        position: relative;
        input{
            display: block;
            width: 543px;
            height: 100px;
            margin: 0 auto;
            padding-left: 135px;
            background: #fff;
        }
        #num{
            border-radius: 10px 10px 0 0;
            border-bottom: 2px solid #f5f5f5;
        }
        #pass{
            border-radius: 0 0 10px 10px;
        }
        label{
            position: absolute;
            top: 30px;
            left: 65px;
            font-size: 30px;
            color: #323232;
        }
        .pass{
            top: 130px;
        }
    }
    .buttonBox{
        width: 750px;
        .button{
            width: 678px;
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #fff;
            background: #d7d8da;
            border-radius: 10px;
            text-align: center;
            margin: 0 auto;
            margin-top: 35px;
        }
    }
    .regNfor{
        margin-top: 30px;
        .register{
            font-size: 24px;
            color: #969696;
            margin-left: 80px;
        }
        .forget{
            font-size: 24px;
            color: #0060fe;
            margin-right: 80px;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import md5 from 'js-md5';
    import tisp from '../../components/tisp/index.vue';
    import {setItem} from '../../assets/js/common'
    export default{
        data(){
            return{
                title:"登录",
                tel:"",
                pass:"",
                isShow:"",
                contents:""
            }
        },
        components:{
            myHeader,
            md5,
            tisp
        },
        methods:{
            login(){
                if(this.tel == ""){
                    this.contents = "账号为空，请输入账号";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.pass == ""){
                    this.contents = "密码为空，请输入密码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                this.$http.post("/eb-web-api/mobile/base/loginUser",{phone:this.tel,password:md5(this.pass)},{emulateJSON: true}).then(function(res){
                    var back = res.body;
                    if(back.msg == "账号或者密码错误！"){
                        this.contents = "账号或者密码错误，请核对后重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }else if(back.result == "000"){
                        this.contents = "登录成功";
                        setItem('phone',this.tel);
                        setItem('customerId',back.data.userId);
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            if(that.$route.query.storeId){
                                 that.$router.push({name: 'storeInfo', query:{storeId: that.$route.query.storeId}});
                                 return
                            }                          
                            if(that.$route.query.productId){
                                that.$router.push({name: 'productInfo', query:{productId: that.$route.query.productId}});
                                return
                            }
                            that.$router.push("/user")                          
                        }, 2000);
                    }else{
                        return false;
                    }
                },function(){
                }) 
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
        }
    }
</script>