$(document).ready(function () {
    /* 以上是页面加载的主函数，不能修改。 */

    /* 以下为点击AJAX按钮的事件函数 */
    $('#myButton3').click(function () {
        $.ajax({
            type: "GET", /* AJAX 方法*/
            dataType: "json", /* 数据格式 */
            url: '../r' + '?_=' + new Date().getTime(), /* API网址 */
            success: function (returnData, returnStatus) {
                console.log(returnData);
                /* 服务器成功返回数据 */

                /* 清空表格 */
                $("#myTable1 > tbody").html('');

                /* 把返回的数据赋值给一个对象 */
                var obj = returnData;

                /* 遍历对象里的每一个元素 */
                for (var index in obj) {
                    console.log(obj[index]);

                    var myLine = '<tr>';
                    myLine += '<td>' + obj[index]["课程名称"] + '</td>';
                    myLine += '<td>' + obj[index]["学分"] + '</td>';
                    myLine += '<td>' + obj[index]["成绩"] + '</td>';
                    myLine += '<td>' + obj[index]["绩点"] + '</td>';
                    myLine += '</tr>';

                    /* 把数据追加到表格中 */
                    $("#myTable1 > tbody").append(myLine);
                }

                /* 刷新表格 */
                $("#myTable1").table("refresh");
            },
            error: function () {
                console.log('错误：网络故障。');
            },
        });
    });
    /* 以上为点击AJAX按钮的事件函数 */

    /* 以下是页面加载的主函数，不能修改。 */
});
