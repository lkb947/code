/* 以下是page切换时暂停媒体文件播放 */
$(document).on('pagebeforehide', function () {
    $("audio, video").each(function () {
        $(this)[0].pause();
    });
});
/* 以上是page切换时暂停媒体文件播放 */

/* 以下是点击播放时暂停其它媒体文件播放 */
$(document).ready(function () {
    $("audio, video").on("play", function () {
        $("audio, video").not(this).each(function () {
            $(this)[0].pause();
        });
    });
});
/* 以上是点击播放时暂停其它媒体文件播放 */
