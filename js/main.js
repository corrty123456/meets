// 隨機生成會議代碼
function generateMeetingCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

document.getElementById('joinMeeting').addEventListener('click', () => {
  const meetingCode = document.getElementById('meetingCode').value.trim();
  if (meetingCode) {
    window.location.href = `meeting.html?code=${meetingCode}`;
  } else {
    alert('請輸入會議代碼');
  }
});

document.getElementById('createMeeting').addEventListener('click', () => {
  const newMeetingCode = generateMeetingCode();
  window.location.href = `meeting.html?code=${newMeetingCode}`;
});
