$(document).ready(function () {
    /* 以上是页面加载的主函数，不能修改。 */

    // 百度地图API功能
    var map = new BMap.Map("myMap");

    // 终点  云南大学呈贡校区图书馆经纬度
    var p2 = new BMap.Point(102.855394, 24.830453);
    map.centerAndZoom(p2, 11);
    map.enableScrollWheelZoom(true);

    var marker = new BMap.Marker(p2); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    map.centerAndZoom(p2, 12);
    var opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: "云南大学（呈贡校区)- 图书馆", // 信息窗口标题
        enableMessage: true, //设置允许信息窗发送短息
        message: ""
    }
    var infoWindow = new BMap.InfoWindow("快来图书馆学习吧！", opts); // 创建信息窗口对象 
    map.openInfoWindow(infoWindow, p2); //开启信息窗口

    $("#myNavButton").click(function () {
        myBMapNav();
    });

    function myBMapNav() {
        map.centerAndZoom(p2, 11);

        $("#myInfo").text('正在定位...');

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
                //map.centerAndZoom(new BMap.Point(r.point.lng, r.point.lat), 15);
                $("#myInfo").text('定位成功');

                // 起点
                var p1 = new BMap.Point(r.point.lng, r.point.lat);

                // 导航路径
                var driving = new BMap.DrivingRoute(map, {
                    renderOptions: {
                        map: map,
                        autoViewport: true
                    }
                });
                driving.search(p1, p2);
            } else {
                $("#myInfo").text('定位失败' + this.getStatus());
            }
        }, {
            enableHighAccuracy: true
        })

        /* 以下是页面加载的主函数，不能修改。 */

    }

    /* 以下是页面加载的主函数，不能修改。 */
});