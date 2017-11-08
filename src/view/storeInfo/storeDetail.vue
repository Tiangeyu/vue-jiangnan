<template>
  <section>
      <dl>
          <dd :style="{backgroundImage: 'url('+picUrl+store.companyLogo+')'}"></dd>
          <dt>
              <h3><b>{{store.storeUserName}}</b></h3>
              <div class="clearfix">
                  <i class="active-star fl" v-for="n in parseInt(store.score)" :key="n"></i>
                  <i class="star fl" v-for="n in 5 - parseInt(store.score)" :key="n"></i>
                  <font class="fl">{{label.count}}条</font>
                  <font class="fl">￥{{store.avgprice}}/人</font>
              </div>
          </dt>
      </dl>
      <div class="servers clearfix">
          <font class="fl">服务: {{store.serviceScore}}</font>
          <font class="fl">环境: {{store.enScore}}</font>
          <font class="fl">性价比: {{store.costScore}}</font>
          <button class="fr" @click="tototo">优惠买单</button>
      </div>

      <ul class="info">
          <li><i class="addr"></i><font>{{store.companyAddress}}</font></li>
          <li><i class="tel"></i><font>{{store.collectionMobile}}</font></li>
      </ul>

      <div class="special-offer clearfix" @click="tototo">
          <i class="special-offer-logo fl"></i>
          <font class="fonts fl">优惠买单</font>
          <span class="fl">{{name}}</span>
          <i class="go fr"></i>
          <font class="sell fr">已售{{mdCount}}份</font>         
      </div>

      <Tuan :api-url="tuan_test" :logo="tuan_img" :datas="coupon" v-show="groupon.length"></Tuan>

      <Tuan :api-url="quan_test" :logo="quan_img" :datas="groupon" v-show="coupon.length"></Tuan>

      <div class="evaluate" v-show="label.count">
          <nav class="clearfix"><font class="fl">商户评价</font> <span class="fr">{{label.count}}人评价</span></nav>
          <ul class="clearfix">
              <li v-for="(item, index) in label.goodLabels" :key="index">{{item.name}} {{item.number}}</li>
              <li style="color:#999; border-color: #999;" v-for="(it, ind) in label.badLabels" :key="ind">{{it.name}} {{it.number}}</li>
          </ul>
      </div>

      <div class="store_infom">
          <nav>商户信息</nav>
          <p v-html="store.companyScope">

          </p>
      </div>

      <div class="clearfix subbranch"><font class="fl">其他13家分店</font><i class="fr"></i></div>
      <tips :contents="contents" v-show="noticeShow"></tips> 
  </section>
</template>

<style lang="less" scoped>
    section{
        background-color: #f7f7f8;
    }
    dl{
        height: 146px;
        display:  flex;
        padding: 28px 30px;
        margin-top: 88px;
        background-color: #fff;
        dd{
            width: 174px;
            height: 144px;
            margin-right: 22px;
            background-size: 100% 100%;
        }
        dt{
            flex: 1;
            padding-top: 15px;
            h3{
                height: 80px;
                line-height: 40px;
                font-size: 32px;
                color: #333;
                text-align: left;
            }
            div{
                margin-top: 20px;
                i{
                    width: 26px;
                    height: 26px;
                    margin-right:8px;
                    background-size: 100% 100%;
                }
                .active-star{
                    background-image: url('../../assets/imgs/pinlun_xiaostar_@2x.png');
                }
                .star{
                    background-image: url('../../assets/imgs/storeStar.png');
                }
                font{
                    font-size: 24px;
                    color: #777;
                    line-height: 30px;
                    margin-left: 20px;
                    margin-right: 20px;
                }
            }
        }
    }
    .servers{
        background-color: #fff;
        height: 74px;
        border-top: 1px solid #aaa;
        border-bottom: 1px solid #aaa;
        padding: 0 30px;
        font{
            line-height: 74px;
            padding-right: 28px;
            font-size: 20px;
            color: #aaa;
        }
        button{
            width: 146px;
            height: 58px;
            background-color: #3da4f1;
            margin-top: 8px;
            font-size: 26px;
            color: #fff;
            font-weight: 500;
            text-align: center;
            line-height: 58px;
            border-radius: 10px;
        }

    }
    .info{
        margin-top: 18px;
        border-top: 1px solid #e1e1e1;
        li{
            padding: 0 30px;
            padding-left:30px;
            display: flex;
            height: 80px;
            border-bottom: 1px solid #e1e1e1;
            background: #fff;
            font{
                flex: 1;
                line-height: 80px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
                padding-left: 20px;
                font-size: 26px;
                color: #777;
            }
            .addr{
                width: 24px;
                height: 80px;
                background: url('../../assets/imgs/tubiao_dingwei_@2x.png') no-repeat left center;
                background-size: 100%; 
            }
            .tel{
                width: 28px;
                height: 80px;
                background: url('../../assets/imgs/tubiao_dianhua_@2x.png') no-repeat left center;
                background-size: 100%;
            }
        }
    }
    .special-offer{
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        height: 80px;
        background-color: #fff;
        padding: 0 30px;
        margin-top: 18px;
        .special-offer-logo{
            width: 32px;
            height: 80px;
            margin-right: 20px;
            background: url('../../assets/imgs/store_hui.png') no-repeat left center;
            background-size: 100%;
        }
        .fonts{
            font-size: 28px;
            color: #333;
            font-weight: 500;
            line-height: 80px;
            padding-right: 42px;
        }
        span{
            margin-top: 22px;
            border: 1px solid #fe853c;
            border-radius: 4px;
            font-size: 20px;
            line-height: 36px;
            padding: 0 10px;
            text-align: center;
            color: #fe853c;
        }
        .go{
            width:18px;
            height: 80px;
            background: url('../../assets/imgs/store_enter.png') no-repeat left center;
            background-size: 100%;
            margin-left: 20px;
        }
        .sell{
            line-height: 80px;
            font-size: 22px;
            color: #aaa;
        }
    }
    .evaluate{
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        background-color: #fff; 
        margin-top: 18px;
        nav{
            padding: 0 30px;
            height: 80px;
            border-bottom: 1px solid #e1e1e1;
            font{
                font-size:28px;
                color:#333;
                font-weight: 500;
                line-height: 80px;
            }
            span{
                font-size: 22px;
                color: #aaa;
                line-height: 80px;
            }
        }
        ul{
            padding-top: 28px;
            
        }
        li{
            float: left;
            padding: 8px 12px;
            border: 1px solid #fe853c;
            border-radius: 20px;
            color: #fe853c;
            margin-bottom: 28px;
            margin-left: 30px;
        }

    }
    .store_infom{
        margin-top: 18px;
        border-top: 1px solid #e1e1e1;
        border-bottom: 1px solid #e1e1e1;
        background-color: #FFF; 
        nav{
            font-size: 28px;
            color: #333;
            padding-left: 30px;
            border-bottom: 1px solid #e1e1e1;
            line-height: 80px;
            text-align: left;
        }
        p{
            font-size: 24px;
            line-height: 48px;
            color: #aaa;
            text-align: left;
            padding: 10px 30px;
            
        }

    }
    .subbranch{   
        border-bottom: 1px solid #e1e1e1;
        background-color: #FFF;
        font{
            font-size: 28px;
            color: #333;
            padding-left: 30px;
            line-height: 80px;
            text-align: left;
        }
        i{
            background: url('../../assets/imgs/store_enter.png') no-repeat left center;
            width: 18px;
            height: 80px;
            background-size: 100%;
            margin-right: 30px;
        }
    }
</style>

<script>
import imgSrc from '../../assets/imgs/shanghutu_zhu_@2x.png'
import tips from '../../components/tisp/index.vue'
import tuan_img from '../../assets/imgs/store_tuan.png'
import quan_img from '../../assets/imgs/store_quan.png'
import Tuan from './tuan.vue'
import {getItem} from '../../assets/js/common'
export default {
    components:{
        Tuan,
        tips
    },
    data(){
        return {
            tuan_img: tuan_img,
            tuan_test: 'testapi',
            quan_img: quan_img,
            quan_test: "testapi",
            coupon: "",
            groupon:"",
            mdCount: 10,
            name: "满100减5元",
            "store": {
                "storeUserName": "9990011111",
                "storeNo": "",
                "storeName": "11",
                "email": "1111@111.com",
                "mobile": "111",
                "servicePhone": "11",
                "password": "111",
                "status": 0,
                "frozenNote": "",
                "mainCategory": "2",
                "secondCategory": "8",
                "checkTime": "May 17, 2017 8:45:17 PM",
                "checkStatus": 1,
                "checkNode": "",
                "serviceType": "2,3,",
                "avgprice": 11,
                "serviceScore": 11111,
                "enScore": 11,
                "costScore": 11,
                "isNew": 1,
                "isHot": 1,
                "longitude": 11,
                "latitude": 11,
                "storeDistrict": "1,36,",
                "score": 3,
                "startSendFee": 11,
                "sendFee": 11,
                "openTime": "05 : 01",
                "closeTime": "18 : 00",
                "sendScope": "11",
                "sendDistance": "11",
                "takeout": 0,
                "companyName": "11",
                "companyLegal": "11",
                "companyPostcode": "11",
                "companyWeb": "11",
                "companyAddress": "11",
                "companyRegAddress": "11",
                "companyBank": "111",
                "companyBankName": "11",
                "companyBankNo": "11",
                "currency": "1",
                "isSelf": "1",
                "collectionMan": "11",
                "collectionMobile": "11",
                "companyIntro": "<p>\n\t\t\t\t\t\t\t这里写你的初始化内容11111111111<img src=\"http://192.168.8.5:8888/group1/M00/00/0A/wKgIBVkb9x6AZXTWAABXxC6ENi8150.png\" title=\"M00/00/0A/wKgIBVkb9x6AZXTWAABXxC6ENi8150.png\" alt=\"M00/00/0A/wKgIBVkb9x6AZXTWAABXxC6ENi8150.png\"/></p>",
                "companyScope": "<p>\n\t\t\t\t\t\t\t这里写你的初始化内容222222222222<img src=\"http://192.168.8.5:8888/group1/M00/00/0A/wKgIBVkcAS6AK727AABXxC6ENi8770.png\" title=\"M00/00/0A/wKgIBVkcAS6AK727AABXxC6ENi8770.png\" alt=\"M00/00/0A/wKgIBVkcAS6AK727AABXxC6ENi8770.png\"/></p>",
                "companyTaxImg": "",
                "companyLicense": "111",
                "companyLicenseImg": "",
                "companyBankImg": "",
                "comanyZgz1": "",
                "comanyZgz2": "",
                "comanyZgz3": "",
                "companyLogo": "",
                "developer": "11",
                "weihuer": "11",
                "frozenTime": "May 18, 2017 11:40:53 AM",
                "unFrozenTime": "May 18, 2017 11:25:57 AM",
                "id": 1,
                "version": 0,
                "createTime": "May 17, 2017 3:53:42 PM"
            },
            label:{
                total: 25,
                content: ['干净卫生 6', '味道很好 10', '价廉物美 6', '味道很好 10', '服务员好亲切 4']
            },
            picUrl: getItem("picUrl"),
            contents: "错误提示",
            noticeShow: false
        }
    },
    methods:{
        tototo(){
            if(!getItem("customerId")){
                this.$router.push({ name: 'login',query:{storeId: this.store.id}});
                return;
            }
            this.$router.push({ name: 'order', query:{storeId: this.store.id}});
        }
    },
    created() {
         this.$http.get('/eb-web-api/mobile/store/queryStoreInfo',{params: {storeId: this.$route.query.storeId}}).then((res)=>{
            if(res.body.result === "000"){
                this.store = res.body.store;
                this.name = res.body.activity[0].name;
                this.mdCount = res.body.mdCount;
            }else{
                this.noticeShow = true;
                this.contents = "查询商户详情失败";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            }
         }, (res)=>{
            this.noticeShow = true;
            this.contents = "服务器异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
         })
         this.$http.get('/eb-web-api/mobile/product/getProductByStoreId',{params: {storeId: this.$route.query.storeId}}).then((res)=>{
            if(res.body.result === "000"){
                this.coupon = res.body.coupon;
                this.groupon = res.body.groupon;
            }else{
                this.noticeShow = true;
                this.contents = "获取商户商品失败";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            }
         }, (res)=>{
            this.noticeShow = true;
            this.contents = "服务器异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
         })
         this.$http.get("/eb-web-api/mobile/store/queryStorePublicPraiseData", {params: {storeId: this.$route.query.storeId}}).then((res)=>{
            if(res.body.result === "000"){
                this.label = res.body.data;
            }else{
                this.noticeShow = true;
                this.contents = "获取评论失败";
                setTimeout(()=>{
                    this.noticeShow = false;
                },2000)
            }
         }, (res)=>{
            this.noticeShow = true;
            this.contents = "服务器异常";
            setTimeout(()=>{
                this.noticeShow = false;
            },2000)
         })
    }
}
</script>

