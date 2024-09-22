const urlParams = new URLSearchParams(window.location.search);
const meetingCode = urlParams.get('code');
document.title = `會議代碼: ${meetingCode}`;

const peer = new Peer(); // 創建 PeerJS 客戶端
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream;
let callActive = false;
let cameraOn = true;
let micOn = true;

// 設置本地視訊流
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  localStream = stream;
  localVideo.srcObject = stream;
});

// 當收到通話時，處理來自其他用戶的通話
peer.on('call', (call) => {
  call.answer(localStream); // 回應通話並傳送本地視訊流
  call.on('stream', (remoteStream) => {
    remoteVideo.srcObject = remoteStream; // 顯示對方的視訊流
  });
  callActive = true;
});

// 發起通話
function initiateCall() {
  if (!callActive) {
    const call = peer.call(meetingCode, localStream); // 呼叫對方
    call.on('stream', (remoteStream) => {
      remoteVideo.srcObject = remoteStream; // 顯示對方的視訊流
    });
    callActive = true;
  }
}

document.getElementById('toggleCamera').addEventListener('click', () => {
  const videoTrack = localStream.getVideoTracks()[0];
  videoTrack.enabled = !videoTrack.enabled;
  cameraOn = !cameraOn;
  document.getElementById('toggleCamera').textContent = cameraOn ? "關閉鏡頭" : "開啟鏡頭";
  initiateCall(); // 保證在通話過程中切換鏡頭也能持續
});

document.getElementById('toggleMic').addEventListener('click', () => {
  const audioTrack = localStream.getAudioTracks()[0];
  audioTrack.enabled = !audioTrack.enabled;
  micOn = !micOn;
  document.getElementById('toggleMic').textContent = micOn ? "關閉麥克風" : "開啟麥克風";
});
