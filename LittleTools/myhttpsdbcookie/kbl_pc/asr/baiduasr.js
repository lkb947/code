$(document).ready(function () {
    /* 以上是主函数开头 */

    // 这个IP必须修改为服务器的当前IP。
    let ws = new WebSocket('wss://127.0.0.1:9001');
    ws.onopen = e => {
        console.log('Connection to server opened');

    }

    let audio = document.getElementById('recorderAudio');
    let audioTxt = document.getElementById('voiceText');

    /**
     * @name: captureMicrophone
     * @description: 获取麦克风权限
     * @param {type} callback
     * @return: none
     */
    function captureMicrophone(callback) {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(callback).catch(function (error) {
            alert('Unable to access your microphone.');
            console.error(error);
        });
    }
    // converts blob to base64
    const blobToBase64 = function (blob, cb) {
        let reader = new FileReader();
        reader.onload = function () {
            let dataUrl = reader.result;
            let base64 = dataUrl.split(',')[1];
            cb(base64);
        };
        reader.readAsDataURL(blob);
    };
    /**
     * @name: stopRecordingCallback
     * @description: 停止说话
     * @param {type} none
     * @return: none
     */
    function stopRecordingCallback() {
        audio.srcObject = null;
        let blob = recorder.getBlob();
        console.log(blob);
        ws.send(blob)
        audio.src = URL.createObjectURL(blob);

        recorder.microphone.stop();

        audio.play();
    }
    ws.onmessage = e => {
        console.log(e.data);
        if (e.data) {
            audioTxt.innerHTML += e.data;
        }
    }
    ws.onclose = e => {
        console.log('Connection to server closed');

    }

    let recorder; // globally accessible
    /**
     * @name: 
     * @description: 开始说话
     * @param {type} none
     * @return: 
     */
    document.getElementById('btn-start-recording').onclick = function () {
        this.disabled = true;
        audioTxt.innerHTML = '';
        captureMicrophone(function (microphone) {
            audio.srcObject = microphone;


            recorder = RecordRTC(microphone, {
                type: 'audio',
                recorderType: StereoAudioRecorder,
                desiredSampRate: 16000
            });

            recorder.startRecording();

            // 点击停止说话是释放麦克风
            recorder.microphone = microphone;
            document.getElementById('btn-stop-recording').disabled = false;
        });
    };
    /**
     * @name: 
     * @description: 停止说话
     * @param {type} none
     * @return: 
     */
    document.getElementById('btn-stop-recording').onclick = function () {
        this.disabled = true;
        document.getElementById('btn-start-recording').disabled = false;
        recorder.stopRecording(stopRecordingCallback);

    };

    /* 以下是主函数结尾 */
});