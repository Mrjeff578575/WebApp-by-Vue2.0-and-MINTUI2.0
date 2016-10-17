<template>
    <div class="order-container">
        <!-- 货物状态部分 -->
        <mt-navbar class="page-part" v-model="selected" fixed>
          <mt-tab-item id="all">全部</mt-tab-item>
          <mt-tab-item id="untreated">未入库</mt-tab-item>
        </mt-navbar>
        <!-- 订单列表部分 （根据状态分成两部分）-->
        <ul class="order-list" v-if="display == true">
            <li class="order-item" v-for="good in goods">
                <img :src ="good.img" class="clear">
                <h4>{{ good.title }}</h4>
                <p>{{ good.info }}</p>
            </li>
        </ul>
        <ul class="order-list" v-if="display == false">
            <li class="order-item" v-for="good in goods_unstorage" track-by="$index">
                <img :src ="good.img" class="clear">
                <h4>{{ good.title }}</h4>
                <p>{{ good.info }}</p>
                 <!-- 货物操作部分（计划改成向左活动出现操作）-->
                <button class="btn" @click="changeStatus(this)">入库</button>
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
            let goods
            let goods_unstorage
            return {selected, display, goods, goods_unstorage}
        },
        computed: mapState({
            goods: state => state.orders.goods,
            goods_unstorage: state => state.orders.goods_unstorage
        }),
        mounted:function(){
           this.getGoods('goods')
        },
        methods:{
            getGoods(item){
                this.$store.dispatch('changeOrder', item)
            },
            changeStatus(good){
                this.$store.dispatch('changeStatus', good)
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
    .btn{
        position: absolute;
        width: 20px;
        bottom: 20px;
        right: 10px;
        background-color: #BFF8B7;
        color: #090808;
        border: 1px solid #bff8b7;
        border-radius: 3px;
        box-shadow: 2px 2px 2px #000000;
        font-weight: bold;
    }
</style>