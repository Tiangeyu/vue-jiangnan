<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="listUp">
            <ul>
                <li>
                    <label>设置密码：</label>
                    <input type="password" placeholder="6-20位数字、字母或字符的任意两种组合" id="pass" v-model="pass"/>
                </li>
                <li class="clearfix">
                    <label>确认密码：</label>
                    <input type="password" placeholder="请再次输入密码" id="confirm" v-model="rePass"/>
                </li>
            </ul>
        </div>
        <div class="agreement clearfix">
            <i :class="{isSel:isAgreement}" class="fl isUnsel" @click="agreement"></i>
            <p class="fl">我已阅读并同意<router-link to="">《注册服务协议》</router-link></p>
        </div>
        <div class="buttonBox">
            <div class="button" @click="setting" :class="{isDis:!isAgreement}">确定</div>
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
            label{
                font-size: 32px;
                color: #323232;
            }
            input{
                font-size: 28px;
                color: #999;
                width: 500px;
                margin-left: 30px;
            }
        }
    }
    .agreement{
        .isUnsel{
            display: block;
            width: 28px;
            height: 28px;
            background-image: url(../../assets/imgs/unsel_pass.png);
            background-size: 100%;
            margin-top: 140px;
            margin-left: 30px;
        }
        .isSel{
            display: block;
            width: 28px;
            height: 28px;
            background-image: url(../../assets/imgs/sel_pass.png);
            background-size: 100%;
            margin-top: 140px;
            margin-left: 30px;
        }
        p{
            font-size: 28px;
            color: #999;
            margin-top: 140px;
            margin-left: 10px;
            a{
                color: #ff9000;
            }
        }
    }
    .buttonBox{
        width: 750px;
        .button{
            width: 690px;
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #fff;
            background: #6ca1ed;
            border-radius: 10px;
            text-align: center;
            margin: 0 auto;
            margin-top: 40px;
        }
        .isDis{
            background: #d7d8da;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    import md5 from 'js-md5';
    import tisp from '../../components/tisp/index.vue';
    export default{
        data(){
            return{
                title:"设置密码",
                tel:"",
                pass:"",
                rePass:"",
                isShow:"",
                contents:"",
                isAgreement:false
            }
        },
        components:{
            myHeader,
            md5,
            tisp
        },
        methods:{
            agreement(){
                this.isAgreement = !this.isAgreement;
            },
            setting(){
                if(this.isAgreement == false){
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
                if(this.rePass == ""){
                    this.contents = "确认密码为空，请输入确认密码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(pwdIsSimple(this.pass) < 2){
                    this.contents = "密码不符合规则，请输入确认密码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.pass != this.rePass){
                    this.contents = "两次输入密码不同，请确认后重新输入";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                /*判断密码是否为纯数字或纯字母*/
                function pwdIsSimple(str) {
                    var len = str.length;
                    var i = 0;
                    if(str.match(/[a-z]/ig)) {
                        i++;
                    }
                    if(str.match(/[0-9]/ig)) {
                        i++;
                    }
                    if(str.match(/(.[^a-z0-9])/ig)) {
                        i++;
                    }
                    return i;
                }
                
                if(this.$route.query.type == "0"){
                    this.$http.post("/eb-web-api/mobile/base/registerUser",{phone:this.tel,password:md5(this.pass),rePassword:md5(this.rePass)},{emulateJSON: true}).then(function(res){
                        var back = res.body;
                        if(back.result == "000"){
                            this.contents = "注册成功，请登录！";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                                that.$router.push("/login");
                            }, 3000);
                            return false;
                        }else{
                            return false;
                        }
                    },function(){
                    }) 
                }else if(this.$route.query.type == "1"){
                    this.$http.post("/eb-web-api/mobile/base/updateUserPassword",{phone:this.tel,password:md5(this.pass),rePassword:md5(this.rePass)},{emulateJSON: true}).then(function(res){
                        var back = res.body;
                        if(back.result == "000"){
                            this.contents = "密码重置成功，请登录！";
                            this.isShow = true;
                            var that = this;
                            setTimeout(function() {       
                                that.isShow = false;
                            }, 3000);
                            return false;
                        }else{
                            return false;
                        }
                    },function(){
                    })
                }
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.tel = this.$route.query.tel;
        }
    }
</script>