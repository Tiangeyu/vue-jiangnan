<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="listUp">
            <ul>
                <li>
                    <input type="text" :placeholder="telText" id="phone" v-model="tel"/>
                </li>
                <li class="clearfix">
                    <input type="text" placeholder="请输入验证码" id="verify" v-model="iptVerifyCode"/>
                    <button @click="getVerify" class="ipt_btn fr" :disabled="isDisabled">
                        <span v-if="sendMsgDisabled">{{time+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" @click="register">下一步</div>
        </div>
        <tisp :contents="contents" v-show="isShow"></tisp>
    </div>
</template>
<style lang="less" scoped>
    .listUp{
        margin-left: 30px;
        li{
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #f5f5f5;
            input{
                font-size: 28px;
                color: #999;
                width: 720px;
            }
            #verify{
                width: 500px;
            }
            .ipt_btn{
                width: 180px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 24px;
                color: #999;
                background: #efefef;
                border-radius: 25px;
                margin-top: 19px;
                margin-right: 40px;
            }
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
            margin-top: 200px;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import tisp from '../../components/tisp/index.vue';
    import {setItem} from '../../assets/js/common';
    export default{
        data(){
            return{
                verifyCode:"",
                iptVerifyCode:"",
                time:60,
                sendMsgDisabled:false,
                isDisabled:false,
                title:"注册",
                tel:"",
                isShow:"",
                contents:"",
                telText:"请输入手机号"
            }
        },
        components:{
            myHeader,
            tisp
        },
        methods:{
            register(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    this.contents = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.iptVerifyCode == ""){
                    this.contents = "验证码为空，请输入验证码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.$route.query.type == "0"){
                    this.$http.post("/eb-web-api/mobile/base/verfiyRegisterVcode",{phone:this.tel,vcode:this.iptVerifyCode},{emulateJSON: true}).then(function(res){
                        var back = res.body;
                        if(back.result == "000"){
                            this.$router.push({path: '/settingPass',query: {type: '0',tel:this.tel}});
                        }else if(back.msg == "验证码错误或已过期！"){
                            this.contents = "验证码错误或已过期！";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }
                    },function(){
                        
                    })
                }else if(this.$route.query.type == "1"){
                    this.$http.post("/eb-web-api/mobile/base/verfiyForgetPassVcode",{phone:this.tel,vcode:this.iptVerifyCode},{emulateJSON: true}).then(function(res){
                        var back =res.body;
                        if(back.result == "000"){
                            this.$router.push({path: '/settingPass',query: {type: '1',tel:this.tel}});
                        }else if(back.msg == "验证码错误或已过期！"){
                            this.contents = "验证码错误或已过期！";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }
                    },function(){
                    })
                }
            },
            getVerify(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    this.contents = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.$route.query.type == "0"){
                    this.$http.post("/eb-web-api/mobile/base/getRegisterVcode",{phone:this.tel},{emulateJSON: true}).then(function(res){
                        var back = res.body;
                        if(back.msg == "该手机号已注册，请登录！"){
                            this.contents = "该手机号已注册，请登录！";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }else if(back.result == "000"){
                            let me = this;
                            me.sendMsgDisabled = true;
                            let interval = window.setInterval(function() {
                                me.isDisabled = true;
                                if ((me.time--) <= 0) {
                                    me.time = 60;
                                    me.sendMsgDisabled = false;
                                    me.isDisabled = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);

                            this.contents = "验证码已发送";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }
                    },function(){

                    }) 
                }else if(this.$route.query.type == "1"){
                    this.$http.post("/eb-web-api/mobile/base/getForgetPassVcode",{phone:this.tel},{emulateJSON: true}).then(function(res){
                        var back = res.body;
                        if(back.result == "000"){
                            let me = this;
                            me.sendMsgDisabled = true;
                            let interval = window.setInterval(function() {
                                me.isDisabled = true;
                                if ((me.time--) <= 0) {
                                    me.time = 60;
                                    me.sendMsgDisabled = false;
                                    me.isDisabled = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);

                            this.contents = "验证码已发送";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }
                    },function(){

                    }) 
                }
            },
        },
        created(){
            document.body.style.backgroundColor='#fff';
            if(this.$route.query.type == "0"){
                this.title="注册";
                this.telText="请输入手机号"
            }else if(this.$route.query.type == "1"){
                this.title="重置密码";
                this.telText="请输入您注册的手机号"
            }
        }
    }
</script>