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

// 이미지 경로 배열
const horizontalImagePaths = [
    '/image/울적한날의개굴편지지.png',
    '/image/아름다운꽃날의편지지.png',
    '/image/삐죽삐죽식은땀나개..편지지.png',
    '/image/파릇파릇새싹!네잎클로버편지지.png',
    '/image/연결의편지지.png',
    '/image/사랑이가득!하트뿅뿅편지지.png',
    '/image/항상고마워!감사편지지.png',
    '/image/해피할로윈!편지지.png',
    '/image/생일축하편지지.png',
    '/image/가을날의귀여운강아지편지지.png',
];

const verticalImagePaths = [
    '/image/울적한날의개굴편지지(세로).png',
    '/image/아름다운꽃날의편지지(세로).png',
    '/image/삐죽삐죽식은땀나개..편지지(세로).png',
    '/image/파릇파릇새싹!네잎클로버편지지(세로).png',
    '/image/연결의편지지(세로).png',
    '/image/사랑이가득!하트뿅뿅편지지(세로).png',
    '/image/항상고마워!감사편지지(세로).png',
    '/image/해피할로윈!편지지(세로).png',
    '/image/생일축하편지지(세로).png',
    '/image/가을날의귀여운강아지편지지(세로).png',
];

// 가로 버튼 클릭 이벤트
rowButton.onclick = () => {
    if (!isVerticalActive) {
        // 세로 버튼이 비활성화 상태일 때만 실행
        rowButton.classList.remove("versionColor2");
        rowButton.classList.add("versionColor1");
        colButton.classList.remove("versionColor1");
        colButton.classList.add("versionColor2");
        isVerticalActive = true;

        // 이미지 변경
        letterImagesImg.forEach((img, index) => {
            img.src = horizontalImagePaths[index];
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

        // 이미지 변경
        letterImagesImg.forEach((img, index) => {
            img.src = verticalImagePaths[index];
        });

        letterContainerSection.style = 'grid-template-columns: 1fr 1fr; width: 100% !important;'
        scrollAmount = 125;
    }
    setTimeout(() => truncateLetterTitle(10), 0); // 텍스트 최신화 후 호출
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
    else {
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

letterImagesImg.forEach((imgElement) => {
    imgElement.addEventListener('click', () => {
        letterImg.src = imgElement.src;
    })
})

// 텍스트를 간추리는 함수
function truncateText(text, maxLength) {
    return [...text].length > maxLength
        ? [...text].slice(0, maxLength).join('') + '...'
        : text;
}

// 텍스트 요소들
const letterTitleSpan = document.querySelectorAll(".letterTitle"); // 클래스가 'letterTitle'인 요소들

// 텍스트 간추리기 함수
function truncateLetterTitle(maxLength) {
    letterTitleSpan.forEach((element) => {
        element.textContent = truncateText(element.textContent, maxLength);
    });
}
truncateLetterTitle(20);

// 'go' 버튼 클릭 이벤트 추가
document.getElementsByClassName('go')[0].addEventListener('click', function () {
    if (letterImg) {
        // URL 인코딩 처리
        const encodedImgSrc = encodeURIComponent(letterImg.src);

        // URL에 이미지 경로 전달
        window.location.href = `/html/writepink.html?img=${encodedImgSrc}`;
    } else {
        console.error("letterImg 요소를 찾을 수 없습니다.");
    }
});
