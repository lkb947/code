$(document).ready(function () {
    /* 以上是页面加载的主函数，不能修改。 */

    /* 以下设置翻页后网址不显示Page ID */
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    /* 以上设置翻页后网址不显示Page ID */

    /* 检查登录状态，转到登录页面。*/
    console.log(Cookies.get());

    if (Cookies.get('login') == 1) {
        $.mobile.changePage("#page2");
    } else {
        $.mobile.changePage("#page1");
    }

    /* 禁止H5的提交按钮 */
    $(document).find('form').submit(function () {
        return false;
    });

    /* 以下为点击登录按钮的事件函数 */
    $('#myButton1').click(function () {
        $('#myText1').text('');

        var myUsername = $("#myInput1").val();
        var myPassword = $("#myInput2").val();

        var submitJSON = {
            "用户名": myUsername,
            "密码": myPassword
        };

        $.ajax({
            type: "POST",
            /* AJAX 方法*/
            dataType: "json",
            /* 数据格式 */
            url: '../../login' + '?time=' + new Date().getTime(),
            /* 服务端网址 */
            data: submitJSON,
            success: function (returnData, returnStatus) {
                /* 服务器返回数据成功 */
                console.log(returnData);

                if (returnData.loginSuccess == 1) {
                    console.log(Cookies.get());

                    $.mobile.changePage("#page2");
                } else {
                    $('#myText1').text('登录失败, 请检查用户名和密码输入。');
                }
            },
            error: function () {
                /* 服务器返回数据失败 */
                console.log('错误：网络故障。');
            },
        });

    });
    /* 以上为点击登录按钮的事件函数 */

    /* 以下为点击注销按钮的事件函数 */
    $('#myButton2').click(function () {
        var submitJSON = {
            '注销': 1
        };

        $.ajax({
            type: "POST",
            dataType: "json",
            url: '../logout' + '?time=' + new Date().getTime(),
            data: submitJSON,
            success: function (returnData, textStatus) {
                if (returnData.logoutSuccess == 1) {
                    console.log(Cookies.get());

                    $.mobile.changePage("#page1");
                }
            }
        });

    });
    /* 以上为点击注销按钮的事件函数 */

    /* 以下是页面加载的主函数，不能修改。 */
});