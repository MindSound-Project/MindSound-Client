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
            const targetSvg = imageButton.querySelector('.img');
            if (targetSvg) {
                targetSvg.style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    }
});

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-button');

    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    buttons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}

const loadImg = () => {
    const storageKey = 'letterImages';
    // const setlistImgDiv = document.getElementsByClassName('setlist-img')[0];
    const savedImages = JSON.parse(localStorage.getItem(storageKey)) || [];
    const imageList = document.getElementsByClassName('setlist-img')[0];

    // 기존 이미지를 모두 제거
    imageList.innerHTML = '';
    // 저장된 이미지를 각각 <img> 태그로 표시
    savedImages.reverse().forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Captured Image ${index + 1}`;
        img.classList.add('sentlistimg'); // 'sentlistimg' 클래스 추가
        img.classList.add(`sentlistimg${index + 1}`); // 동적으로 클래스 추가
        imageList.appendChild(img);
    })
    if (savedImages.length === 0) {
        alert('No images found in localStorage.');
    }
}
loadImg();
