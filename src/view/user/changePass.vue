<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="listUp">
            <ul>
                <li>
                    <label>旧密码：</label>
                    <input type="password" placeholder="请输入登录密码" id="oldPass" v-model="oldPass"/>
                </li>
                <li>
                    <label>新密码：</label>
                    <input type="password" placeholder="6-20位数字、字母或字符的任意两种组合" id="pass" v-model="pass"/>
                </li>
                <li class="clearfix">
                    <label>确认密码：</label>
                    <input type="password" placeholder="请再次输入密码" id="confirm" v-model="rePass"/>
                </li>
                
            </ul>
        </div>
        <div class="buttonBox">
            <div class="button" @click="setting">确定</div>
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
    import md5 from 'js-md5';
    import tisp from '../../components/tisp/index.vue';
    export default{
        data(){
            return{
                title:"修改密码",
                tel:"18618113213",
                customerId:"1",
                oldPass:"",
                pass:"",
                rePass:"",
                contents:""
            }
        },
        components:{
            myHeader,
            md5,
            tisp
        },
        methods:{
            setting(){
                if(this.pass == ""){
                    this.contents = "旧密码为空，请输入密码";
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
                if(this.rePass == ""){
                    this.contents = "确认密码为空，请输入确认密码";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {       
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(pwdIsSimple(this.pass) < 2||6 > this.pass.length||this.pass.length > 20){
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
                this.$http.post("/eb-web-api/mobile/customer/updatePassword",{customerId:this.customerId,newPassWord:md5(this.pass),oldPassWord:md5(this.oldPass)},{emulateJSON: true}).then(function(res){
                    var back = res.body;
                    if(back.resultMsg == "旧密码输入错误"){
                        this.contents = "旧密码输入错误，请确认后重填";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                        }, 3000);
                        return false;
                    }else if(back.result == "000"){
                        this.contents = "密码修改成功";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {       
                            that.isShow = false;
                            that.$router.push("/safe")
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