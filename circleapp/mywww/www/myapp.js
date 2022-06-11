$(document).ready(function () {
    /* 以上是页面加载的主函数，不能修改。 */

    /* 以下设置翻页后网址不显示Page ID */
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    /* 以上设置翻页后网址不显示Page ID */

    /* 以下是设置全局的头部、脚部、面板的函数 */
    function loadGlobalUI() {
        /* 显示全局元素 */
        $(".globalUI").css('display', 'block');

        $(function () {
            $("[data-role='navbar']").navbar();
            $("[data-role='header']").toolbar();
            $("[data-role='footer']").toolbar(
                {
                    fullscreen: false,
                    tapToggle: false
                }
            );
            $("[data-role='panel']").panel();

            /* 全局的图片弹窗 */
            $("[data-role='popup']").enhanceWithin().popup();
        });
    }
    /* 以上是设置全局的头部、脚部、面板的函数 */

    /*以下是Splash自动翻页代码。 */
    var myCounter = 5;

    function mySplashPageCountDown() {
        //console.log(myCounter);

        $('#mySecond').text(myCounter);

        if (myCounter > 0) {
            myCounter--;
        }
        else {
            $.mobile.changePage("#page3");
            mySplashPageTimer.stop();
            loadGlobalUI();
        }
    }

    /* 计时器每隔1秒执行一次mySplashPageCountDown()函数 */
    var mySplashPageTimer = $.timer(1000, mySplashPageCountDown);

    /* 以上是Splash自动翻页代码。 */

    /*以下是点跳过按钮跳过Splash的代码。 */
    $("#skipButton").click(function () {
        $.mobile.changePage("#page3");
        mySplashPageTimer.stop();
        loadGlobalUI();
    });
    /*以上是点跳过按钮跳过Splash的代码。 */

    /* 以下是图片幻灯代码 */
    var myImages = ["s1.jpg", "s2.jpg", "s3.jpg"]; //用一个数组保存所有的图片文件名。
    var myTexts = ["图片1文字", "图片2文字", "图片3文字"]; //用一个数组保存所有的图片文件名。

    $('#myImg').attr('src', myImages[0]);
    $('#myText').html(myTexts[0]);

    var i = 1; //用一个计数器来指向数组下标
    $("#changeImage").click(function () {
        if (i < myImages.length) {
            $('#myImg').attr('src', myImages[i]);
            $('#myText').html(myTexts[i]);
        }
        else {
            i = 0;
            $('#myImg').attr('src', myImages[i]);
            $('#myText').html(myTexts[i]);
        }

        i++;
    });
    /* 以上是图片幻灯代码 */

    /* 以下是点击小图弹窗显示大图的事件函数 */
    $(".popupImg").click(function () {
        $("#popupWinImg").attr("src", $(this).attr("src"));
        $("#myImgPopup").popup("open");
    });
    /* 以上是点击小图弹窗显示大图的事件函数 */


    /* 以下是页面加载的主函数，不能修改。 */
});
