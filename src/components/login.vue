<template>
    <div class="login-container">
        <mt-popup
            :visible.sync="popupVisible"
            position="top"
            popup-transition="popup-fade">
         登&nbsp;录&nbsp;成&nbsp;功
        </mt-popup>
        <div class="login-form" v-if="$route.path == '/login'">
            <img class="logo" src="../assets/logo.png">
            <!-- 登录表单 -->
            <form id="login_form" v-if="show == 'login'">
            <!-- action="js_form_action.asp" method="post" -->
                <mt-field label="手机号" placeholder="请输入手机号" type="tel" 
                    :value = "tel"
                    @input = "tel = arguments[0]"
                    :attr = "{ minlength:11, maxlength:11}" 
                    :state = "status.tel">
                </mt-field>
                <mt-field label="密码" placeholder="请输入密码(8 - 16位)" type="password" 
                    :value = "password"
                    @input = "password = arguments[0]"
                    :attr = "{ minlength:8, maxlength:16}" 
                    :state = "status.password">                    
                </mt-field>
            </form>
            <!-- 注册表单 -->
            <form id="register_form" v-if="show == 'register'"><!-- action="js_form_action.asp" method="post" -->
                <!-- #使用自定义事件的表单输入组件 -->
                <mt-field label="用户名" placeholder="请输入用户名(2 - 4位)"
                    :value = "username" 
                    @input = "username = arguments[0]" 
                    :state = "status.user" 
                    :attr = "{ minlength:2, maxlength:6}">
                </mt-field>
                <mt-field label="邮箱" placeholder="请输入邮箱" type="email"  
                    :value = "email" 
                    @input = "email = arguments[0]"
                    :state = "status.email">                  
                </mt-field>
                <mt-field label="密码" placeholder="请输入密码(8 - 16位)" type="password" 
                    :value = "password"
                    @input = "password = arguments[0]" 
                    :attr = "{ minlength:8, maxlength:16}" 
                    :state = "status.password">                    
                </mt-field>
                <mt-field label="手机号" placeholder="请输入手机号" type="tel" 
                    :value = "tel"
                    @input = "tel = arguments[0]"
                    :attr = "{ minlength:11, maxlength:11}" 
                    :state = "status.tel">
                </mt-field>
            </form>
            <!-- 协议部分   -->
            <div class="agreement">
                <input type="checkbox" class="checkbox" id="checkbox_a1" checked>
                <label for="checkbox_a1" @click="checked = !checked"></label>
                <span class="left">勾选即表示接收<a href="#" class="agreement-text">《NES使用协议》</a></span>
                <span class="right"><a href="#" class="forget">忘记密码?</a></span>            
            </div> 
            <button class="login submit" @click="Jump('login')" :disabled="!checked">登&nbsp;&nbsp;&nbsp;&nbsp;录</button>
            <button class="register submit" @click="Jump('register')" :disabled="!checked">注&nbsp;&nbsp;&nbsp;&nbsp;册</button>    
        </div>
    </div>
</template>
<script type="text/javascript">
    import { MessageBox } from 'mint-ui'

    export default{
        data() {
            let username = ''
            let email = ''
            let password = ''
            let tel = ''
            let status = { 'user':'', 'email':'', 'password':'', 'tel':''}
            let checked = true
            let popupVisible = false
            let show = 'login'
            return {username, email, password, tel, status, checked, popupVisible, show}
        },
        methods: {
            //按钮点击的时候进行验证 =》 提交 =》 存本地 =》 本地提取 =》 完成登录
            test:function(){
                console.log(this)
            },
            Jump: function(show) {
                //当前状态再次点击 则表示用户想提交表单
                if(this.show == show){
                    if(show == 'login' && window.localStorage.user != null){
                        let localuser =  JSON.parse(window.localStorage.user)
                        if(localuser.tel == this.tel) {
                            this.$router.replace({path: 'personinfo'})
                        }                             
                        else{
                            MessageBox('提示', '请输入正确的用户名和密码'); 
                        }
                    }
                    else{
                       this.Check() 
                    }                    
                }
                else{
                    this.change(show)
                }
            },
            change: function(show) {
                this.show = show
            },
            //前端表单基础验证
            Check: function() {  
                const email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
                const tel_filter = /^1[34578]{1}\d{9}$/
                this.username.length >= 2 ? this.status.user = 'success' : this.status.user = 'error'
                email_filter.test(this.email) ? this.status.email = 'success' : this.status.email = 'error'
                this.password.length >= 8 ? this.status.password = 'success' : this.status.password = 'error'
                tel_filter.test(this.tel) ? this.status.tel = 'success' : this.status.tel = 'error'
                this.Submit()
            },
            //表单提交
            Submit: function() {  
                let j = 0
                for(let i in this.status){
                    //所有数据通过验证，则提交表单
                    if(this.status[i] == 'success'){
                        j++
                    }
                }
                if( j == 4){
                    if(document.getElementById("login_form")){
                        document.getElementById("login_form").submit()  
                    }
                    else{
                        document.getElementById("register_form").submit()
                    }                    
                    let user = {'username':this.username, 'email':this.email, 'password':this.password, 'tel':this.tel}
                    window.localStorage.user = JSON.stringify(user) //将用户数据存储在本地
                    // {'username':this.user, 'email':this.email, 'password':this.password, 'tel':this.tel}
                    this.changePerson(this.username)
                    this.$router.replace({path: 'personinfo'})
                }
                else{
                    console.log('请输入正确的用户名和密码')
                    MessageBox('提示', '请输入正确的用户名和密码');
                }
            },
            changePerson(item){
                this.$store.dispatch('changePerson', item)
            }
        },
        mounted:function(){
            if(window.localStorage.user !== undefined){
                let localuser =  JSON.parse(window.localStorage.user) //如果本地数据存在，则默认填入本地数据 
                this.username = localuser.username
                this.email = localuser.email
                this.password = localuser.password
                this.tel = localuser.tel
            }
        }
    }
</script>
<style type="text/css">
    .login-container{
        height: 100%;
        width: 100%;
    }
    .mint-popup{
        background: #56C1F6;
        width: 100%;
        text-align: center;
        height: 30px;
        font-size: 16px;
        color: #ffffff;
    }
    .login-form{
        width: 90%;
        margin: 80px auto 100px auto;
        border-radius: 5px;
    }
    .login-form .logo{
        width: 100%;
        padding-bottom: 40px;
    }
    .submit{
        width: 250px;
        height: 40px;
        display: block;
        margin: 0 auto;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        color: #ffffff;
        outline: none;
    }
    .submit:active{
        background: #FC7171;
    }
    .login{
        margin-top: 30px;
        background-color: #6CDFED;
        border: 1px solid #6CDFED;
    }
    .register{
        margin-top: 10px;
        background-color: #34F062;
        border: 1px solid #34F062;
    }
    button:disabled{
        background-color: #B9ABAB;
        border: none;
    }
    .agreement{
        margin-top: 10px;
        height: 28px;
        position: relative;
    }
    .agreement .left{
       position: absolute;
       top: 25%;
    }
    .agreement .right{
       position: absolute;
       top: 20%;
       right: 0;
    }
    .right .forget{
       color: #c1c1c1; 
    }
    .agreement-text{
        color: #0A81F5;
    }
    .checkbox{
        display: none;
    }
    .checkbox + label { 
        background-color: #FFF; 
        border: 1px solid #C1CACA; 
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05); 
        width:20px;
        height: 20px;
        top: 5px; 
        border-radius: 5px; 
        display: inline-block; 
        position: relative; 
        margin-right: 10px; 
    }      
    .checkbox:checked + label { 
        background-color: #ECF2F7; 
        border: 1px solid #92A1AC; 
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1); 
        color: #243441; 
    } 
     
    .checkbox:checked + label:after { 
        content: '\2714'; //勾选符号 
        position: absolute;
        top: 0;
        line-height: 22px;
        display: inline-block;
        height: 22px;
        width: 22px;  
        color: #758794; 
        font-size: 20px;
        color: #73F353; 
    } 
</style>