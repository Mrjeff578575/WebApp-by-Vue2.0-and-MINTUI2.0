<template>
  <div class="container">
    <!-- header部分 -->
    <mt-header fixed :title = "selected" class="header" v-if="$route.path !== '/login'">
        <mt-button slot="left">
            <i class="iconfont" v-if="$route.path == '/index'" @click="sideVisible = !sideVisible">&#xe677;</i>
        </mt-button>
        <mt-button slot="right">
                <transition name="slide-fade">
                    <input type="text" v-model="Svalue" name="search" class="searchBox" v-if="searchVisible == true">
                </transition>
            <i class="iconfont search" v-if="$route.path == '/order'" @click="search">&#xe639;</i>
        </mt-button>
    </mt-header>
    <!-- 侧边栏 -->
    <mt-popup
      v-model="sideVisible"
      position="left" class="sidebar">
      <div class="userinfo">
          <img src="./assets/logo.png" style="width:250px; height:50px;">
          <h4></h4>
          <p></p>
      </div>
      <ul class="sideinfo">
          <li><i class="iconfont"></i></li>
          <li><i class="iconfont"></i></li>
          <li><i class="iconfont"></i></li>
          <li><i class="iconfont"></i></li>
      </ul>
    </mt-popup>
    <!-- 底部菜单栏部分 -->
    <mt-tabbar v-model="selected" class="bottom_tabs" fixed v-if="$route.path !== '/login'">
        <mt-tab-item id="首页">
            <i class="iconfont tabs-icon" slot="icon">&#xe622;</i>
            <router-link to="index"></router-link>
            首页
        </mt-tab-item>
        <mt-tab-item id="订单管理">
            <i class="iconfont tabs-icon" slot="icon">&#xe6e1;</i>           
            <router-link to="order"></router-link>
            订单
        </mt-tab-item>
        <mt-tab-item id="商品管理">
            <i class="iconfont tabs-icon" slot="icon">&#xe624;</i>
            <router-link to="goods"></router-link>
            商品
        </mt-tab-item>
        <mt-tab-item id="个人信息">
            <i class="iconfont tabs-icon" slot="icon">&#xe677;</i>
            <router-link to="personinfo"></router-link>
            我
        </mt-tab-item>
        <mt-tab-item id="AJAX测试">
            <i class="iconfont tabs-icon" slot="icon">&#xe677;</i>
            <router-link to="test"></router-link>
            测试页面
        </mt-tab-item>
        <mt-tab-item id="推送测试">
            <i class="iconfont tabs-icon" slot="icon">&#xe624;</i>
            <router-link to="push"></router-link>
            推送测试
        </mt-tab-item>
    </mt-tabbar>
    <!-- 内容部分 -->
    <router-view></router-view>
  </div>
</template>
<script type="text/javascript">
    import { mapState } from 'vuex'
    import { MessageBox } from 'mint-ui';
    export default{
        data(){
            let selected = '首页'
            let sideVisible = false
            let searchVisible = false
            let Svalue
            return { selected, sideVisible, searchVisible, Svalue}
        },
        watch:{
            //当其他页面route.pash的时候，index路由也能在header正确显示首页
            '$route':function(item){
                if(item.path == '/index'){
                    this.selected = '首页'
                }
            }
        },
        methods:{
            //打开和关闭搜索框
            search: function(){
                this.searchVisible = !this.searchVisible
                let title =  document.getElementsByClassName('mint-header-title')[0]
                if(this.searchVisible){
                    title.style.transform = "translateX(-20px)"
                    title.style.opacity = "0"
                }
                else{
                    title.style.transform = "translateX(0)"
                    title.style.opacity = "1"
                    if(this.Svalue != undefined){
                        this.submit(this.Svalue)
                    }
                }
            },
            //搜索内容的提交以及返回
            submit: function(item){
                console.log(item)
            }
        },
        //将路由导向index，确保有内容
        beforeCreate:function(){
            this.$router.push({path: '/index'})
        }
    }
</script>
<style type="text/css">
    html{
        overflow: hidden;
    }
    html,body{
        height: 100%;
    }
    .container{
        height: 100%;
    }
    .bottom_tabs .fa{
        font-size: 22px;
    }
    .searchBox{
        border-radius: 3px;
        border: 1px solid #efefef;
        outline: none;
    }
    .mint-header-title{
        transition: all .5s;
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s ease;
    }
    .slide-fade-enter, .slide-fade-leave-active {
        transform-origin: right 0;
        transform: rotateY(-90deg);
        opacity: 0;
    }
    .tabs-icon{
        color: #999898;
    }
    .is-selected .tabs-icon{
        color: #26a2ff;
    }
    .container .sidebar{
        height: 100%;
        width: 70%;
    }
    .mint-tab-item-label a{
        display: block;
        width: calc(100% / 5);
        height: 55px;
        position: absolute;
        bottom: 0;
    }
</style>