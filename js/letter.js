const rowButton = document.getElementsByClassName("row")[0];
const colButton = document.getElementsByClassName("col")[0];

const letterImg = document.getElementsByClassName("letterImg")[0];
const letterImagesImg = document.querySelectorAll('.letterImages');
const letterContainerSection = document.getElementsByClassName("letterContainer")[0];

const versionContainerSection = document.getElementsByClassName("versionContainer")[0];

var isVerticalActive = true; // 가로 버전이 활성화된 상태

const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const letterContainer = document.querySelector('.letterContainer');

const writeDiv = document.getElementsByClassName('write')[0];
const containerDiv = document.getElementsByClassName('container')[0];

// 한 번에 움직일 픽셀 값 (조절 가능)
let scrollAmount = 228; 

// 가로 버튼 클릭 이벤트
rowButton.onclick = () => {
    if (!isVerticalActive) {
        // 세로 버튼이 비활성화 상태일 때만 실행
        rowButton.classList.remove("versionColor2");
        rowButton.classList.add("versionColor1");
        colButton.classList.remove("versionColor1");
        colButton.classList.add("versionColor2");
        isVerticalActive = true;

        letterImg.src = '/image/울적한날의개굴편지지.png';
        letterImagesImg.forEach((img) => {
            img.src = '/image/울적한날의개굴편지지.png';
        });

        letterContainerSection.style = 'grid-template-columns: 1fr; width: 100%;'
        scrollAmount = 228; 
    }
};

// 세로 버튼 클릭 이벤트
colButton.onclick = () => {
    if (isVerticalActive) {
        // 가로 버튼이 비활성화 상태일 때만 실행
        colButton.classList.remove("versionColor2");
        colButton.classList.add("versionColor1");
        rowButton.classList.remove("versionColor1");
        rowButton.classList.add("versionColor2");
        isVerticalActive = false;

        letterImg.src = '/image/울적한날의개굴편지지(세로).png';
        letterImagesImg.forEach((img) => {
            img.src = '/image/울적한날의개굴편지지(세로).png';
        });

        letterContainerSection.style = 'grid-template-columns: 1fr 1fr; width: 100%;'
        scrollAmount = 125; 
    }
};

// 오른쪽 버튼 클릭 시, 오른쪽으로 스크롤
rightButton.addEventListener('click', () => {
    letterContainer.scrollLeft += scrollAmount;
});

// 왼쪽 버튼 클릭 시, 왼쪽으로 스크롤
leftButton.addEventListener('click', () => {
    letterContainer.scrollLeft -= scrollAmount;
});

// 이벤트 리스너 수정: 함수 이름만 전달
writeDiv.addEventListener('click', () => {
    if (isVerticalActive) {
        containerDiv.classList.remove('colhidden');
        containerDiv.classList.add('rowhidden');
    }
    else{
        containerDiv.classList.remove('rowhidden');
        containerDiv.classList.add('colhidden');
    }
    writeDiv.classList.add('down');
    // writeDiv.style.height = 'calc(100vh - 100px)';
});

versionContainerSection.addEventListener('click', () => {
    containerDiv.classList.remove('colhidden');
    containerDiv.classList.remove('rowhidden');
    writeDiv.classList.remove('down');

});
letterContainer.addEventListener('click', () => {
    containerDiv.classList.remove('colhidden');
    containerDiv.classList.remove('rowhidden');
    writeDiv.classList.remove('down');
});