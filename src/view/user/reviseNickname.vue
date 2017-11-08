<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="input">
            <input type="text" :placeholder="userName" v-model="userName" />
            <i @click="clear"></i>
        </div>
        <div class="tip">
            <p>
                以中文或英文字母开头，限4-6个字符，一个汉字为两个字符
            </p>
        </div>
        <div class="buttonBox">
            <div class="button" @click="change">确定</div>
        </div>
        <tisp :contents="contents" v-show="isShow"></tisp>
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
    .input{
        width: 750px;
        position: relative;
        input{
            display: block;
            width: 680px;
            height: 80px;
            margin: 0 auto;
            margin-top: 20px;
            padding-left: 20px;
            background: #fff;
            border-radius: 10px;
        }
        i{
            display: block;
            position: absolute;
            top: 24px;
            right: 50px;
            width: 29px;
            height: 29px;
            background-image: url(../../assets/imgs/x_gary.png);
            background-size: 100%;
        }
    }
    .tip{
        width: 750px;
        position: relative;
        p{
            width: 670px;
            line-height: 50px;
            font-size: 28px;
            color: #999;
            margin: 0 auto;
            margin-top: 50px;
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
    export default{
        data(){
            return{
                userName:"",
                title:"个人信息",
                customerId:"",
                contents:"",
                isShow:false
            }
        },
        components:{
            myHeader,
            tisp
        },
        methods:{
            clear(){
                this.userName = "";
            },
            change(){
                // if(this.userName.length<4||this.userName.length>6){
                if(!(/^[\u4e00-\u9fa5a-zA-Z]{4,6}$/.test(this.userName))){
                    this.contents = "用户名不符合规则，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                if(this.userName == ""){
                    this.contents = "用户名为空，请重填";
                    this.isShow = true;
                    var that = this;
                    setTimeout(function() {
                        that.isShow = false;
                    }, 3000);
                    return false;
                }
                this.$http.post("/eb-web-api/mobile/customer/updateCustomerInfo",{customerId:this.customerId,nickName:this.userName},{emulateJSON:true}).then(function(res){
                    var back = res.body;
                    if(back.result == "000"){
                        this.contents = "昵称修改成功";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {
                            that.isShow = false;
                            that.$router.push("/userInfo");
                        }, 3000);
                    }
                },(res)=>{

                })
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
            this.customerId = window.sessionStorage.getItem("customerId");
            this.$http.get("/eb-web-api/mobile/customer/queryCustomerInfo",{params:{customerId:this.customerId}}).then(function(res){
                var user = res.body;
                this.userName = user.customerInfo.nickName;
            },(res)=>{

            })
        }
    }
</script>