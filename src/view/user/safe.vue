<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="listUp">
            <ul>
                <router-link to="bindTel">
                    <li class="clearfix">
                        <p class="fl">绑定手机</p>
                        <i class="intoArrowGray fr"></i>
                        <p class="fr info">{{phone}}</p>
                    </li>
                </router-link>
                <router-link to="changePass">
                    <li class="clearfix">
                        <p class="fl">修改密码</p>
                        <i class="intoArrowGray fr"></i>
                        <p class="fr info">更换</p>
                    </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .listUp{
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
                .info{
                    font-size: 32px;
                    color: #999;
                    margin-right: 30px;
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
        .cacheNum{
            margin-right: 30px;
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                title:"账户与安全",
                phone:"",
                type:"",
                customerId:""
            }
        },
        components:{
            myHeader
        },
        created(){
            this.customerId = window.sessionStorage.getItem('customerId');
            this.$http.get("/eb-web-api/mobile/customer/queryCustomerInfo",{params:{customerId:this.customerId}}).then(function(res){
                var user = res.body;
                if(user.customerInfo.binding == "0"){
                    this.phone = "未绑定";
                }else if(user.customerInfo.binding == "1"){
                    let arr = user.customerInfo.phone.split("");
                    this.phone = arr[0] + arr[1] + arr[2] + '*' + '*' + '*' + '*' + arr[7] + arr[8] + arr[9] + arr[10];
                }
            },(res)=>{

            }),
            document.body.style.backgroundColor='#fff';
        }
    }
</script>