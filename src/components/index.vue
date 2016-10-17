<template>
    <div class="index-container">
        <!-- 轮播图部分 -->
        <mt-swipe :auto="4000">
            <mt-swipe-item><div class="banner1 banner" style="background:url('./static/banner1.jpg');background-size: cover;"></div></mt-swipe-item>
            <mt-swipe-item><div class="banner2 banner" style="background:url('./static/banner2.jpg');background-size: cover;"></div></mt-swipe-item>
        </mt-swipe>
        <!-- 订单同步状态部分 -->
        <mt-popup
          v-model="popupVisible"
          popup-transition="popup-fade"
          position="top">
          同步{{ orders_status }}
        </mt-popup>
        <!-- 首页功能栏部分 -->
        <ul class="icon-list">
            <li class="icon">
                <img src="../assets/scan.png" class="clear">
                <h4>订单管理</h4>
                <p>扫描盘点，手工盘点</p>
                <i></i>
            </li>
            <li class="icon">
                <img src="../assets/ana.png" class="clear">
                <h4>渠道管理</h4>
                <p>扫描盘点，手工盘点</p>
                <i></i>
            </li>
            <li class="icon">
                <img src="../assets/store.png" class="clear">
                <h4>订单发布</h4>
                <p>扫描盘点，手工盘点</p>
                <i></i>
            </li>
            <li class="icon" @click="getOrders()">
                <img src="../assets/goods.png" class="clear">
                <h4>订单同步</h4>
                <p>快速同步渠道订单，方便快捷</p>
                <i></i>
            </li>
            <li class="icon">
                <img src="../assets/download.png" class="clear">
                <h4>个人中心</h4>
                <p>信息管理，logo更换</p>
                <i></i>
            </li>                     
        </ul>
    </div>  
</template>
<script type="text/javascript">
    import { MessageBox } from 'mint-ui'
    import { mapState } from 'vuex'

    export default{
        created:function(){
            if(window.localStorage.user == null){
                this.$router.push({path: '/login'})
            }
        },
        data(){
            let popupVisible = false
            let orders_status
            return {popupVisible, orders_status}
        },
        computed:mapState({
            orders_status: state => state.news.orders_status,
        }),
        methods:{
            getOrders: function(){
                const that = this
                this.$store.dispatch('synchroOrder', this).then(function(){
                    that.popupVisible = true
                })
            }
        }
    }
</script>
<style type="text/css">
    .index-container{
        position: absolute;
        top: 30px;
        height: 100%;
        width:100%;
    }
    .mint-swipe{
        width: 100%;
        height: 30%;
    }
    .swipe{
        height:30%;
        overflow: visible;
    }
    .banner{
        width: 100%;
        min-height: 100%;
    }
    .swipe-indicator{
        opacity: 0.8;
        background: #F0F0F0;
    }
    .swipe-indicator.active{
        background: #FF7100;
    }
    .mint-popup-top{
        z-index: 99;
    }
    .icon-list{
        margin-top: 10px;
        height: 54%;
        overflow-y: scroll;
    }
    .icon-list img{
        width: 58px;
        height: 58px;
        float: left;
    }
    .icon-list .icon{
        height: 70px;
        width: 100%;
        padding: 0 20px 10px 20px;
        position: relative;
        display: inline-block;
        border-bottom: 1px solid #efefef;
        box-sizing: border-box;
    }
    .icon h4{
        position: absolute;
        left: 88px;
        top: 10px;
    }
    .icon p{
        position: absolute;
        left:88px;
        bottom: 25px;
        color: #c1c1c1;
    }
    .icon i{
        border: 2px solid #c8c8cd;
        border-bottom-width: 0;
        border-left-width: 0;
        content: " ";
        top: 50%;
        right: 20px;
        position: absolute;
        width: 5px;
        height: 5px;
        -webkit-transform: translateY(-50%) rotate(45deg);
        transform: translateY(-50%) rotate(45deg);
    }
</style>