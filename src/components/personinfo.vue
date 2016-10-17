<template>
	<div class="personinfo-container">
		<!-- 头像部分 -->
		<div class="headimage" @click="sheetVisible = !sheetVisible">
			<img src="../../static/venkman.jpg" class="clear">
			<h2>{{ persons[currentName].name }}</h2>
			<p>{{ persons[currentName].position }}</p>
		</div>
		<!-- 弹出操作栏（用于更换头像和LOGO） -->
		<mt-actionsheet
  			:actions="actions"
  			v-model="sheetVisible">
		</mt-actionsheet>
		<!-- 个人信息展示 -->
		<ul class="personinfo">
			<li @click="sheetVisible = !sheetVisible">&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;应用LOGO更换<i class="arrow"></i></li>
			<li>&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;店铺名称: {{ persons[currentName].store }}<i class="arrow"></i></li>
			<li>&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;手机：{{ persons[currentName].phoneNumber }}<i class="arrow"></i></li>
			<li>&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;座机：{{ persons[currentName].call }}<i class="arrow"></i></li>
			<li>&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;邮箱：{{ persons[currentName].email }}<i class="arrow"></i></li>
			<li>&nbsp;&nbsp;<i class="iconfont">&#xe6e1;</i>&nbsp;公司名称：{{ persons[currentName].companyName }}<i class="arrow"></i></li>
		</ul>
		<!-- 退出按钮 -->
		<router-link to="login"><div class="leave-btn"><i class="iconfont">&#xe6e1;</i>安全退出</div></router-link>
	</div>
</template>
<script type="text/javascript">
	import { mapState } from 'vuex'

	export default{
		data() {
			let actions = [
				{name:'拍照'}, 
				{name:'从手机相册中选取'}
			]
			let persons
			let currentName
			let sheetVisible = false
			return {sheetVisible, actions, persons, currentName}
		},
		computed: mapState({
			persons: state => state.persons.persons,
			currentName: state => state.persons.currentName
		})
	}
</script>
<style type="text/css">
	.personinfo-container{
        position: absolute;
        top: 40px;
        width:100%;
        text-align: left;
	}
	.headimage{
		height: 70px;
		border-bottom: 1px solid #efefef;
		background-color: #ffffff;
		position: relative;
	}
	.headimage img{
		float: left;
		width: 60px;
		height: 60px;
		border-radius: 5px;
		margin: 5px 5px 0 10px;
	}
	.headimage h2{
		position: absolute;
		top: 5px;
		left: 80px;
		font-size: 20px;
		font-weight: 1000;
	}
	.headimage p{
		margin-top:-5px;
		color: #c1c1c1;
		position: absolute;
		left: 80px;
		bottom: 10px;
	}
	.personinfo li{
		width: 100%;
		height: 30px;
		padding: 5px 0;
		background-color: #ffffff;
		border-bottom: 1px solid #efefef;
		line-height: 30px;
		position: relative;
		font-size: 16px;
		color: #6E6D6D;
	}
	.arrow{
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
	.leave-btn{
		width: 200px;
		height: 50px;
		margin: 50px auto;
		background-color: #F62929;
		line-height: 50px;
		color: #ffffff;
		font-size: 20px;
		text-align: center;
		border-radius: 5px;
		box-shadow: 1px 1px 2px #efefef;
	}
</style>