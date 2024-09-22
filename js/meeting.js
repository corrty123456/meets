const urlParams = new URLSearchParams(window.location.search);
const meetingCode = urlParams.get('code');
document.title = `會議代碼: ${meetingCode}`;

const peer = new Peer(); // 創建 PeerJS 客戶端
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
let localStream;

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
});

// 按下 "開啟鏡頭" 按鈕時發起呼叫
document.getElementById('toggleCamera').addEventListener('click', () => {
  const call = peer.call(meetingCode, localStream); // 呼叫對方
  call.on('stream', (remoteStream) => {
    remoteVideo.srcObject = remoteStream; // 顯示對方的視訊流
  });
});
 
