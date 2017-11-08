<template>
    <div>
        <myHeader :title='title'></myHeader>
        <div class="bg"></div>
        <div class="content">
            <ul>
                <li>
                    <i></i>
                </li>
                <li>
                    <p>江南商圈</p>
                </li>
                <li>
                    <p>纵享生活&nbsp&nbsp&nbsp乐在商圈</p>
                </li>
                <li>
                    <p>ios 1.6.2</p>
                </li>
                <li>
                    <div class="buttonBox">
                        <a href="tel:96005"class="button">拨打客服热线： 96005</a>
                    </div>
                </li>
                <li>
                    <p>江南农村商业银行版权所有</p>
                    <p>Copyrjignt@5015-2017</p>
                    <p>All Right Reserved</p>
                </li>
            </ul>
        </div>
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
    .content{
        li{
            text-align: center;
            i{
                display: block;
                width: 224px;
                height: 213px;
                background-image: url(../../assets/imgs/about_logo.png);
                background-size: 100%;
                margin: 0 auto;
                margin-top: 166px;
            }
            p{
                font-size: 28px;
                color: #646464;
            }
        }
        li:nth-child(2){
            margin-top: 63px;
        }
        li:nth-child(3){
            margin-top: 24px;
        }
        li:nth-child(4){
            margin-top: 30px;
            p{
                color: #999;
            }
        }
        li:nth-child(5){
            margin-top: 100px;
            .buttonBox{
                width: 750px;
                .button{
                    display: block;
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
        }
        li:nth-child(6){
            margin-top: 300px;
            p{
                font-size: 24px;
                color: #999;
            }
        }
    }
</style>
<script>
    import myHeader from '../../components/Header/myHeader.vue';
    export default{
        data(){
            return{
                title:"关于",
            }
        },
        components:{
            myHeader
        }
    }
</script>