import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index/index'
import storeInfo from '@/view/storeInfo/index'
import productInfo from '@/view/storeInfo/productInfo/index'
import order from '@/view/storeInfo/order/index'
import search from '@/view/search/index'
import pay from '@/view/storeInfo/order/pay'
import searchResult from '@/view/searchResult/index'
import orderSucess from '@/view/storeInfo/order/orderSuccess'
import redBag from '@/view/redBag/index'
import useRedbag from "@/view/storeInfo/order/redbag"
import morePic from '@/view/storeInfo/productInfo/morePic'
import storeType from '@/view/storeType/index'
import collectProduct from '@/view/collectProduct/index'
import specialSelling from '@/view/specialSelling/index'
import orderList from '@/view/order/index'
import user from '@/view/user/index'
import setting from '@/view/user/setting'
import userInfo from '@/view/user/userInfo'
import reviseNickname from '@/view/user/reviseNickname'
import login from '@/view/login/index'
import register from '@/view/register/index'
import bindTel from '@/view/user/bindTel'
import safe from '@/view/user/safe'
import settingPass from '@/view/user/settingPass'
import changePass from '@/view/user/changePass'
import birth from '@/view/user/birth'
import orderDatil from '@/view/order/orderDatil'
import redRule from '@/view/redBag/redRule/index'
import myComment from '@/view/myComment/index'
import refund from '@/view/order/refund'
import refundSuc from '@/view/order/refundSuc'
import commentList from '@/view/commentList/index'
import about from '@/view/user/about'
import commonProblem from '@/view/user/commonProblem'
import loading from "@/view/loading/index"


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/index',
            name: 'index',
            component: index
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/storeInfo',
            name: 'storeInfo',
            component: storeInfo,
        },
        {
            path: '/productInfo',
            name: 'productInfo',
            component: productInfo
        },
        {
            path: '/searchResult',
            name: 'searchResult',
            component: searchResult
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/orderSucess',
            name: 'orderSucess',
            component: orderSucess
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay
        },
        {
            path: '/redBag',
            name: 'redBag',
            component: redBag
        },
        {
            path: '/useRedbag',
            name: 'useRedbag',
            component: useRedbag
        },
        {
            path: '/morePic',
            name: 'morePic',
            component: morePic
        },
        {
            path: '/storeType',
            name: 'storeType',
            component: storeType
        },
        {
            path: '/collectProduct',
            name: 'collectProduct',
            component: collectProduct
        },
        {
            path: '/specialSelling',
            name: 'specialSelling',
            component: specialSelling
        },
        {
            path: '/orderList',
            name: 'orderList',
            component: orderList
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/setting',
            name: 'setting',
            component: setting
        },
        {
            path: '/userInfo',
            name: 'userInfo',
            component: userInfo
        },
        {
            path: '/reviseNickname',
            name: 'reviseNickname',
            component: reviseNickname
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/bindTel',
            name: 'bindTel',
            component: bindTel
        },
        {
            path: '/safe',
            name: 'safe',
            component: safe
        },
        {
            path: '/settingPass',
            name: 'settingPass',
            component: settingPass
        },
        {
            path: '/changePass',
            name: 'changePass',
            component: changePass
        },
        {
            path: '/birth',
            name: 'birth',
            component: birth
        },
        {
            path: '/orderDatil',
            name: 'orderDatil',
            component: orderDatil
        },
        {
            path: '/redRule',
            name: 'redRule',
            component: redRule
        },
        {
            path: '/myComment',
            name: 'myComment',
            component: myComment
        },

        {
            path: '/refund',
            name: 'refund',
            component: refund
        },
        {
            path: '/refundSuc',
            name: 'refundSuc',
            component: refundSuc
        },
        {
            path: '/commentList',
            name: 'commentList',
            component: commentList
        },
        {
            path: '/about',
            name: 'about',
            component: about
        },
        {
            path: '/commonProblem',
            name: 'commonProblem',
            component: commonProblem
        },
        {
            path: "/loading",
            name: 'loading',
            component: loading
        },
        {
            path: "*",
            redirect: 'loading'
        },
    ]
})