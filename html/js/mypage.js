document.querySelector('.image-button').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageButton = document.querySelector('.image-button');
            imageButton.style.backgroundImage = `url(${e.target.result})`; // 배경 이미지로 설정
            imageButton.style.backgroundSize = 'cover'; // 이미지 크기 조정
            imageButton.style.backgroundPosition = 'center'; // 이미지 중앙 정렬
            
            // 특정 클래스의 SVG 숨기기
            const targetSvg = imageButton.querySelector('.bi.bi-image');
            if (targetSvg) {
                targetSvg.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }
});
