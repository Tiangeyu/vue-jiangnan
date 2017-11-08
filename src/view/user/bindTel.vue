<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="switch">
            <ul class="clearfix">
                <li class="fl clearfix" :class="{selected:isVer}">
                    <i class="fl">1</i>
                    <p class="fl">安全验证</p>
                </li>
                <li class="fl clearfix" :class="{selected:!isVer}">
                    <i class="fl">2</i>
                    <p class="fl">验证新手机号</p>
                </li>
            </ul>
        </div>
        <div class="listUp">
            <ul>
                <li>
                    <input type="text" :placeholder="phoneText" id="phone" v-model="tel"/>
                </li>
                <li class="clearfix">
                    <input type="text" :placeholder="verifyText" id="verify" v-model="iptVerifyCode"/>
                    <button @click="getVerify" class="ipt_btn fr" :disabled="isDisabledV" v-if="isVer">
                        <span v-if="sendMsgDisabled">{{timeV+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                    </button>
                    <button @click="getVerify" class="ipt_btn fr" :disabled="isDisabledB" v-else>
                        <span v-if="sendMsgDisabled">{{timeB+'秒后获取'}}</span>
                        <span v-if="!sendMsgDisabled">获取验证码</span>
                    </button>
                </li>
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" v-show="isVer" @click="verify">验证</div>
            <div class="button" v-show="!isVer" @click="bind">确认绑定</div>
        </div>
        <div class="tip clearfix" v-show="!isVer">
            <i class="fl"></i>
            <p class="fl">1、重新绑定后，之前的手机号码将不能作为登录账号<br/>
            2、为了您的账户安全，建议您在更换手机号之后务必第一时间更换绑定信息，如默认地址的手机号</p>
        </div>
        <tisp :contents="contents" v-show="isShow"></tisp>
    </div>
</template>
<style lang="less" scoped>
    .switch{
        height: 90px;
        background: #efeef4;
        li{
            i{
                width: 56px;
                height: 56px;
                line-height: 56px;
                font-size: 32px;
                color: #fff;
                background: #999;
                border-radius: 50%;
                margin-top: 17px;
                text-align: center;
            }
            p{
                line-height: 90px;
                font-size: 32px;
                color: #999;
                margin-left: 32px;
            }
        }
        .selected{
            i{
                background: #6ca1ed;
            }
            p{
                color: #323232;
            }
        }
        li:first-child{
            margin-left: 90px;
        }
        li:last-child{
            margin-left: 90px;
        }
    }
    .listUp{
        margin-left: 30px;
        li{
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #f5f5f5;
            input{
                font-size: 30px;
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
    .tip{
        i{
            display: block;
            width: 40px;
            height: 40px;
            background-image: url(../../assets/imgs/bingTip.png);
            background-size: 100%;
            margin-top: 388px;
            margin-left: 40px;
        }
        p{
            display: block;
            width: 550px;
            line-height: 52px;
            font-size: 26px;
            color: #999;
            margin-top: 380px;
            margin-left: 40px;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import tisp from '../../components/tisp/index.vue';
    export default{
        data(){
            return{
                phoneText:"请输入您当前绑定的手机号",
                verifyText:"请输入验证码",
                title:"绑定手机号",
                isVer:true,
                tel:"",
                iptVerifyCode:"",
                contents:"",
                isShow:false,
                timeV:60,
                timeB:60,
                sendMsgDisabled:false,
                isDisabledV:false,
                isDisabledB:false,
                customerId:window.sessionStorage.getItem('customerId')
            }
        },
        components:{
            myHeader,
            tisp
        },
        methods:{
            verify(){
                if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.tel))){ 
                    this.contents = "手机号码有误，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.tel != window.sessionStorage.getItem('phone')){ 
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
                this.$http.post("/eb-web-api/mobile/customer/updateMobile",{customerId:this.customerId,phone:this.tel,verifyCode:this.iptVerifyCode,type:0},{emulateJSON: true}).then(function(res){
                    var back = res.body;
                    if(back.resultMsg == "验证码输入有误"){
                        this.contents = "验证码输入有误，请核对后重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }else if(back.result == "000"){
                        this.contents = "手机号码验证成功";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 2000);
                        this.isVer = false;
                        this.phoneText = "请输入新手机号";
                        this.tel = "";
                        this.iptVerifyCode = "";
                        this.sendMsgDisabled = false;
                    }
                },function(){
                })
            },
            bind(){
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
                this.$http.post("/eb-web-api/mobile/customer/updateMobile",{customerId:this.customerId,mobile:this.tel,verifyCode:this.iptVerifyCode,type:1},{emulateJSON: true}).then(function(res){
                    var back = JSON.parse(res.bodyText);
                    if(back.resultMsg == "验证码输入有误"){
                        this.contents = "验证码输入有误，请核对后重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }else if(back.result == "000"){
                        this.contents = "手机号码修改成功";
                        window.sessionStorage.setItem('phone',this.tel);
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            that.$router.push("/user")
                        }, 2000);
                    }else{
                        return false;
                    }
                },function(){
                }) 
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

                this.$http.post("/eb-web-api/mobile/customer/verifyCode",{phone:this.tel},{emulateJSON: true}).then(function(res){
                    var back = res.body;
                    this.verifyCode = back.verifyCode;
                    if(this.isVer == true && this.tel != window.sessionStorage.getItem('phone')){ 
                        this.contents = "非绑定手机号码，请重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }
                    if(back.result == "000"){
                        if(this.isVer == true){
                            let me = this;
                            me.sendMsgDisabled = true;
                            var interval = window.setInterval(function() {
                                me.isDisabledV = true;
                                if ((me.timeV--) <= 0) {
                                    me.timeV = 60;
                                    me.sendMsgDisabled = false;
                                    me.isDisabledV = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }else{
                            let me = this;
                            me.sendMsgDisabled = true;
                            var interval = window.setInterval(function() {
                                me.isDisabledB = true;
                                if ((me.timeB--) <= 0) {
                                    me.timeB = 60;
                                    me.sendMsgDisabled = false;
                                    me.isDisabledB = false;
                                    window.clearInterval(interval);
                                }
                            }, 1000);
                        }

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
        created(){
            document.body.style.backgroundColor='#fff';
        }
    }
</script>