<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="select">
            <p @click="open('picker')">{{DateTime}}</p>
        </div>
        <div class="buttonBox">
            <div class="button" @click="change">确定</div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            v-model="value4"
            :startDate="startDate"
            :endDate="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleChange">
        </mt-datetime-picker>
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
    .select{
        width: 100%;
        height: 88px;
        text-align: center;
        background: #fff;
        margin-top: 40px;
        p{
            line-height: 88px;
            font-size: 30px;
            color: #323232;
        }
    }
    .picker-slot-wrapper{
        padding: 0 20px;
        position: absolute 50% auto auto auto;
        width: 100%;
        transform: translateY(-50%);
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
    import Vue from 'vue'
    import {DatetimePicker} from 'mint-ui';
    import tisp from '../../components/tisp/index.vue';
    Vue.component(DatetimePicker.name, DatetimePicker);
    export default{
        data(){
            return{
                userName:"用户名",
                title:"生日设置",
                value4: null,
                startDate: new Date('1950'),
                endDate: new Date(),
                DateTime: "请选择您的生日",
                date:"",
                customerId:window.sessionStorage.getItem('customerId'),
                contents:"",
                isShow:false
            }
        },
        components:{
            myHeader,
            tisp
        },
        methods:{
            change(){
                this.$http.post("/eb-web-api/mobile/customer/updateCustomerInfo",{customerId:this.customerId,brithDay:this.date},{emulateJSON:true}).then(function(res){
                    var back = res.body;
                    if(back.result == "000"){
                        this.contents = "生日修改成功";
                        this.isShow = true;
                        var that = this;
                        setTimeout(function() {
                            that.isShow = false;
                            that.$router.push("/userInfo");
                        }, 3000);
                    }
                },(res)=>{

                })
            },
            open(picker){
                this.$refs[picker].open();
            },
            handleChange(value){
                this.DateTime = value.toLocaleDateString();
                let arr = this.DateTime.split("/");
                this.DateTime = arr[0] + '年' + arr[1] + '月' + arr[2] + '日';
                if(arr[1].length == 1 && arr[2].length == 1){
                    this.date = arr[0] + '-' + '0' + arr[1] + '-' + '0' + arr[2];
                }else if(arr[1].length != 1 && arr[2].length == 1){
                    this.date = arr[0] + '-' + arr[1] + '-' + '0' + arr[2];
                }else if(arr[1].length == 1 && arr[2].length != 1){
                    this.date = arr[0] + '-' + '0' + arr[1] + '-' + arr[2];
                }else{
                    this.date = arr[0] + '-' + arr[1] + '-' + arr[2];
                }
            }
        },
        created(){
            document.body.style.backgroundColor='#fff';
        }
    }
</script>