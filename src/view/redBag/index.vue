<template>
    <div>
        <myHeader :title="title"></myHeader>
        <div class="useChoose clearfix">
            <ul class="insideBox clearfix">
                <li class="useAble" @click="canUseArea()" id="canUse">
                    <span>可用</span>
                </li>
                <li class="unUsed" @click="cantUseArea()" id="cantUse">
                    <span>失效</span>
                </li>
            </ul>
            <div v-show="redList">
                <ul>
                    <li class="effective" v-for="item in redList" :key="item.id" v-show="userAble">
                        <div class="clearfix">
                            <div class="redPrice">
                                ￥{{item.amount}}
                            </div>
                            <div class="redInfo">
                                <p class="redName">{{item.name}}</p>
                                <p class="untill">有效期 : <span>{{item.validityTime}}</span></p>
                                <!--<p class="untill">红包代码 : <span>201611153789721</span></p>-->
                            </div>
                        </div>
                    </li>
                    <li class="lostEffective" v-for="item in lossRedList" :key="item.id" v-show="unUseList">
                        <div class="clearfix">
                            <div class="redPriceLost">
                                ￥{{item.amount}}
                            </div>
                            <div class="redLost clearfix">
                                <i class="nouseIcon"></i>
                                <p class="redNameLost">{{item.name}}</p>
                                <p class="lostUntill">有效期 : <span>{{item.validityTime}}</span></p>
                                <!--<p class="lostUntill">红包代码 : <span>201611153789721</span></p>-->
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="noBagBox" v-show="redList.length == 0">
                    <div class="noBag"></div>
                    <span>暂无可用红包</span>
                </div>
                <span class="redRule" @click="showContent">红包规则</span>
            </div>
            
        </div>
    </div>
</template>
<style lang="less" scoped>
    .useChoose{
        height: 88px;
        background: #ffffff;
        .insideBox{
            padding: 14px 0;
            height: 60px;
            line-height: 60px;
            width: 100%;
            font-size: 32px;
            color: #999999;
            .useAble{
                border-right: 1px solid #d3d3d3;
                height: 60px;
                text-align: center;
                float: left;
                width: 49%;
                color: #4facf2;
            }
            .unUsed{
                height: 60px;
                float: left;
                width: 50%;
                text-align: center;
            }
        }
    }
    .effective{
        margin: 0 auto;
        margin-top: 40px;
        height: 230px;
        width: 657px;
        background: url(../../assets/imgs/redBg.png) no-repeat center;
        background-size: 100% 100%;
        .redPrice{
            float: left;
            width: 170px;
            height: 230px;
            text-align: center;
            line-height: 230px;
            font-size: 40px;
            color: #ffffff;
        }
        .redInfo{
            float: left;
            margin-left: 50px;
            width: 437px;
            height: 230px;
            .redName{
                font-size: 32px;
                color: #323232;
                margin-top: 36px;
            }
            .untill{
                font-size: 28px;
                color: #747474;
                margin-top: 40px;
            }
        }
    }
    .lostEffective{
        margin: 0 auto;
        margin-top: 40px;
        height: 230px;
        width: 657px;
        background: url(../../assets/imgs/grayBg.png) no-repeat center;
        background-size: 100% 100%;
        .redPriceLost{
            float: left;
            width: 170px;
            height: 230px;
            text-align: center;
            line-height: 230px;
            font-size: 40px;
            color: #ffffff;
        }
        .redLost{
            float: left;
            margin-left: 50px;
            width: 437px;
            height: 230px;
            .redNameLost{
                font-size: 32px;
                color: #dedede;
                margin-top: 36px;
            }
            .lostUntill{
                font-size: 28px;
                color: #dedede;
                margin-top: 40px;
            }
            .nouseIcon{
                float: right;
                display: block;
                margin: 30px 20px 0 0;
                width: 88px;
                height: 75px;
                background: url(../../assets/imgs/useless.png) no-repeat center;
                background-size: 100% 100%;
            }
        }
    }
    .redRule{
        font-size: 28px;
        color: #4facf2;
        display: block;
        float: right;
        margin: 42px 44px 100px 0;
    }
    .noBagBox{
        text-align: center;
        font-size: 30px;
        color: #646464;
        .noBag{
            margin: 0 auto;
            margin-top: 140px;
            margin-bottom: 80px;
            width: 146px;
            height: 157px;
            background: url(../../assets/imgs/noRed.png) no-repeat center;
            background-size: 100% 100%;
        }
    }
    
</style>
<script>
    import Vue from 'vue'
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                title:"我的红包",
                redList:true,
                unUseList:false,
                userAble:true,
                noBag:false,
                redList:[],
                lossRedList:[],
                userName:window.sessionStorage.getItem('phone')
            }
        },
        components:{
            myHeader
        },
        methods:{
            timerDetail() {
                Date.prototype.format = function (format) {
                    let date = {
                        "M+": this.getMonth() + 1,
                        "d+": this.getDate(),
                        "h+": this.getHours(),
                        "m+": this.getMinutes(),
                        "s+": this.getSeconds(),
                        "q+": Math.floor((this.getMonth() + 3) / 3),
                        "S+": this.getMilliseconds()
                    };
                    if (/(y+)/i.test(format)) {
                        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
                    }
                    for (var k in date) {
                        if (new RegExp("(" + k + ")").test(format)) {
                            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                        }
                    }
                    return format;
                }
                let newDate = new Date();
                let formatTime = newDate.format('yyyy-MM-dd-h-m-s')
            },
            canUseArea:function(){
                this.unUseList = false;
                this.userAble = true;
                var obj = document.getElementById("canUse");
                var unUsed = document.getElementById("cantUse");
                obj.style.cssText="color:#4facf2;";
                unUsed.style.cssText='color:#999999';
            },
            cantUseArea:function(){
                this.unUseList = true;
                this.userAble = false;
                var unUsed = document.getElementById("cantUse");
                var obj = document.getElementById("canUse");
                unUsed.style.cssText="color:#4facf2;";
                obj.style.cssText='color:#999999';
            },
            showContent:function(){
                this.$router.push({name: 'redRule'})
            }
        },
        created(){
            document.body.style.backgroundColor = "#f8f8f8";
            this.$http.get("/eb-web-api/mobile/activity/getRedPacketList",{params:{userName:this.userName}}).then((res)=>{
                this.redList = res.body.usable;
                this.lossRedList = res.body.disable;
                // console.log(this.redList)
                // console.log(this.lossRedList)
                this.timerDetail()
                if(this.redList.length>0){
                    for(var i = 0;i<this.redList.length;i++){
                        let turnTime = this.redList[i].validityTime;
                        let newDate = new Date();
                        newDate.setTime(turnTime);
                        this.redList[i].validityTime = newDate.format('yyyy-MM-dd')
                    }
                }
                //红包失效
                if(this.lossRedList.length>0){
                    for(var j = 0;j<this.lossRedList.length;j++){
                        let lossTime = this.lossRedList[j].validityTime;
                        let lossDate = new Date();
                        lossDate.setTime(lossTime);
                        this.lossRedList[j].validityTime = lossDate.format('yyyy-MM-dd')
                    }
                }
                
            },(res)=>{
                
            })
        }
    }
</script>


