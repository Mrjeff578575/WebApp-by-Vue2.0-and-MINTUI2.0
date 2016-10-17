<template>
    <div class="push-container" v-if="$route.path = '/test'">
        <div data-role="content">
            <form>
                <h3>JPushPlugin Example</h3>
                <span name="alias" id="alias"></span>
                <div class="left-text">
                    <label>RegistrationID: </label><label id="registrationId">{{registrationId}}</label>
                </div>                
                <div data-role="fieldcontain">
                    <label>Tags: </label><input type="text" v-model="text1"/></br>
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label><input type="text" v-model="text2"/></br>        
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label><input type="text" v-model="text3"/></br>
                    <label>Alias: </label><input type="text" v-model="text4"/>
                </div>
                <div data-role="fieldcontain">
                    <input type="button" value="Add tag and alias" @click="showResult" class="button" />
                </div>
                <div class="left-text">
                    <label id="tagAliasPrompt">设置tag/alias结果:</label><label id="tagAliasResult">{{tagAliasResult}}</label></br>
                    <label id="notificationPrompt">接受的通知内容:</label><label id="notificationResult">{{notificationResult}}</label></br>
                    <label id="messagePrompt">接受的自定义消息:</label><label id="messageResult">{{messageResult}}</label> 
                </div>
            </form>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { MessageBox } from 'mint-ui'

    export default{
        data(){
            let text1
            let text2
            let text3
            let text4
            let registrationId
            let tagAliasResult
            let notificationResult
            let messageResult
            return {text1, text2, text3, text4, registrationId, tagAliasResult, notificationResult, messageResult}
        },
        mounted:function(){
                //注册一系列推送事件监听器,事件句柄在冒泡阶段执行
                //监听 jpush.setTagsWithAlias事件，来取得设置别名与标签的结果
                document.addEventListener("jpush.setTagsWithAlias", this.onTagsWithAlias, false);
                //监听 deviceready事件，来打开极光推送服务
                document.addEventListener("deviceready", this.onDeviceReady, false);

                //点击通知进入应用程序时会触发 jpush.openNotification事件
                document.addEventListener("jpush.openNotification", this.onOpenNotification, false);
                //收到通知时，会触发 jpush.receiveNotification事件
                document.addEventListener("jpush.receiveNotification", this.onReceiveNotification, false);
                //收到自定义消息，会触发 jpush.receiveMessage事件
                document.addEventListener("jpush.receiveMessage", this.onReceiveMessage, false);
        },
        methods: {
            onDeviceReady: function(){
                console.log("JPushPlugin:Device ready!")
                //初始化，开启推送服务
                this.initiateUI(); 
            },

            getRegistrationID: function(){
                //集成了 JPush SDK 的应用程序在第一次成功注册到 JPush 服务器时，JPush 服务器会给客户端返回一个唯一的该设备的标识 - RegistrationID
                window.plugins.jPushPlugin.getRegistrationID(this.onGetRegistrationID)
            },

            //取得对应 ID 成功注册是返回对应ID 失败时返回空字符串
            onGetRegistrationID: function(data){
                try {
                    console.log("JPushPlugin:registrationID is " + data)
                    if (data.length == 0) {
                        var t1 = window.setTimeout(this.getRegistrationID, 1000)
                    }
                    this.registrationId = data
                } catch (exception) {
                    console.log(exception)
                }
            },

            //取得设置别名与标签的结果
            onTagsWithAlias: function(event){ 
                try {
                    console.log("onTagsWithAlias")
                    var result = "result code:" + event.resultCode + " "
                    result += "tags:" + event.tags + " "
                    result += "alias:" + event.alias + " "
                    this.tagAliasResult = result
                } catch (exception) {
                    console.log(exception)
                }
            },

            onOpenNotification: function(event){
                try {
                    var alertContent;
                    if (device.platform == "Android") {
                        alertContent = event.alert;
                    } else {
                        alertContent = event.aps.alert;
                    }
                    console.log("open Notification:" + alertContent);
                } catch (exception) {
                    console.log("JPushPlugin:onOpenNotification" + exception);
                }
            },

            onReceiveNotification: function(event){
                try {
                    var alertContent;
                    if (device.platform == "Android") {
                        alertContent = event.alert;
                    } else {
                        alertContent = event.aps.alert;
                    }
                    this.notificationResult = alertContent
                } catch (exception) {
                    console.log(exception)
                }
            },

            onReceiveMessage: function(event){
                try {
                    var message;
                    if (device.platform == "Android") {
                        message = event.message;
                    } else {
                        message = event.content;
                    }
                    this.messageResult = message
                } catch (exception) {
                    console.log("JPushPlugin:onReceiveMessage-->" + exception);
                }
            },

            initiateUI: function(){
                try {
                    window.plugins.jPushPlugin.init()//调用此 API，用来开启 JPush SDK 提供的推送服务

                    this.getRegistrationID() //获取设备的 RegistrationID

                    if (device.platform != "Android") { //判断设备
                        //用于开启 Debug 模式，显示更多的日志信息
                        window.plugins.jPushPlugin.setDebugModeFromIos()
                        //本接口直接改变应用本地的角标值，设置 iOS 的角标，当设置 badge ＝ 0 时为清除角标。
                        window.plugins.jPushPlugin.setApplicationIconBadgeNumber(0)
                    } else {                        
                        //用于开启调试模式，可以查看集成 JPush 过程中的 Log，如果集成失败，可方便定位问题所在。
                        window.plugins.jPushPlugin.setDebugMode(true)
                        //用于在 js 中控制是否打开应用的统计分析功能
                        window.plugins.jPushPlugin.setStatisticsOpen(true)
                    }
                } catch (exception) {
                    console.log(exception)
                }
                this.showResult()    
            },

            showResult: function(){
                try {
                    let tags = []
                    let alias
                    if (this.text1 != "") {
                        tags.push(this.text1)
                    }
                    if (this.text2 != "") {
                        tags.push(this.text2)
                    }
                    if (this.text3 != "") {
                        tags.push(this.text3)
                    }
                    if (this.text4 != "") {
                        alias = this.text4
                    }
                    //别名Alias:为安装了应用程序的用户，取个别名来标识。以后给该用户 Push 消息时，就可以用此别名来指定 每个用户只能指定一个别名
                    //标签Tags:为安装了应用程序的用户，打上标签。其目的主要是方便开发者根据标签，来批量下发 Push 消息  可为每个用户打多个标签
                    //JPushPlugin.prototype.setTags(tags) 单独设置标签
                    //JPushPlugin.prototype.setAlias(alias) 单独设置别名
                    //调用设置设备标签与别名接口, 函数本身无返回值，但需要注册 jpush.setTagsWithAlias 事件来监听设置结果
                    window.plugins.jPushPlugin.setTagsWithAlias(tags, alias)
                } catch (exception) {
                    console.log(exception)
                }
            }
        }               
    }
</script>
<style type="text/css">
    .push-container{
        position: absolute;
        top: 40px;
        width: 100%;
        height: calc(100% - 95px);
        overflow-y: scroll;
    }
    .push-container form{
        width: 100%;
        text-align: center;
    }
    .push-container input{
        border-radius: 3px;
        margin-bottom: 5px;
        border: 1px solid #000000;
    }
    .push-container .button{
        width: 145px;
        position: relative;
        left: 16px;
        border: 1px solid #12CDFA;
        background-color: #12CDFA;
    }
    .left-text{
        text-align: left;
        margin-left: 40px;
    }
</style>