const canvas = document.getElementById('letterCanvas');
const ctx = canvas.getContext('2d');
const textArea = document.getElementById('textArea');
const image = new Image();
image.src = '/image/마음소리함.png'; // 편지지 이미지 경로

// 캔버스 크기 설정
canvas.width = 600; // 편지지 너비
canvas.height = 800; // 편지지 높이

image.onload = function () {
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 이미지 그리기
    updateCanvas(); // 초기 텍스트 업데이트
};

function updateCanvas() {
    // 캔버스를 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 이미지 다시 그리기

    // 텍스트 가져오기
    const text = textArea.value;
    ctx.fillStyle = "black"; // 텍스트 색상
    ctx.font = "20px Arial"; // 텍스트 폰트 및 크기

    // 텍스트를 자동으로 줄 바꿈 처리
    const maxWidth = canvas.width - 40; // 이미지 여백 고려
    const lines = [];
    const words = text.split(''); // 단어 분리
    let line = '';

    words.forEach(word => {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;

        if (testWidth > maxWidth && line.length > 0) {
            lines.push(line); // 현재 줄을 저장
            line = word + ' '; // 새로운 줄 시작
        } else {
            line = testLine; // 줄에 단어 추가
        }
    });

    lines.push(line); // 마지막 줄 추가

    // 각 줄을 캔버스에 그리기
    lines.forEach((line, index) => {
        ctx.fillText(line, 20, 50 + (index * 30)); // 각 줄마다 위치 조정
    });
}

function downloadImage() {
    const link = document.createElement('a');
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환

    link.download = `${formattedDate}.png`; // 저장할 파일 이름
    link.href = canvas.toDataURL('image/png'); // 캔버스 내용을 PNG 이미지로 변환

    link.click(); // 링크 클릭
}

