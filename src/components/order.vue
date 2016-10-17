<template>
    <div class="order-container">
        <!-- 订单状态部分 -->
        <mt-navbar class="page-part" v-model="selected" fixed>
          <mt-tab-item id="all">全部</mt-tab-item>
          <mt-tab-item id="untreated">待处理</mt-tab-item>
        </mt-navbar>
        <!-- 订单列表部分 （根据状态分成两部分）-->
        <ul class="order-list" v-if="display == true">
            <li class="order-item" v-for="order in orders">
                <img :src ="order.img" class="clear">
                <h4>{{ order.title }}</h4>
                <p>{{ order.info }}</p>
            </li>
        </ul>
        <ul class="order-list" v-if="display == false">
            <li class="order-item" v-for="order in orders_untreated" track-by="$index">
                <img :src ="order.img" class="clear">
                <h4>{{ order.title }}</h4>
                <p>{{ order.info }}</p>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
    import { mapState } from 'vuex'

    export default{
        data(){
            let selected = "all"
            let display = true
            let orders
            let orders_untreated
            let orders_status
            return {selected, display, orders, orders_untreated, orders_status}
        },
        computed: mapState({
            orders: state => state.orders.orders,
            orders_untreated: state => state.orders.orders_untreated,
            orders_status: state => state.orders_status
        }),
        mounted:function(){
            this.changeOrder('orders')
        },
        methods:{
             changeOrder(item){
                this.$store.dispatch('changeOrder', item)
             }
        },
        watch: {
            selected: function(selected){
                this.display = (selected == 'all') ? true : false
            }
        }
    }
</script>
<style type="text/css">
    .order-container{
        position: absolute;
        top: 40px;
        height: 100%;
        width:100%;
    }
    .page-part{
        z-index: 99;
    }
    .order-list{
        position: relative;
        top: 49px;
        height: calc(100% - 144px);
        overflow: scroll;
    }
    .order-item img{
        width: 100px;
        height: 100px;
        float: left;
    }
    .order-item h4{
        padding-top: 20px;
        margin-left: 110px;
    }
    .order-item{
        height: 100px;
        position: relative;
        top: 5px;
    }
    .order-item p{
        position: absolute;
        bottom: 10%;
        color: #c1c1c1;
        left: 110px;
    }
    .mint-navbar.is-fixed{
        top: 40px;
    }
    .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0;
    }
</style>