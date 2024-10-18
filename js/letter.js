const rowButton = document.getElementsByClassName("row")[0];
const colButton = document.getElementsByClassName("col")[0];

const letterImg = document.getElementsByClassName("letterImg")[0];
const letterImagesImg = document.querySelectorAll('.letterImages');
const letterContainerSection = document.getElementsByClassName("letterContainer")[0];


var isVerticalActive = true; // 가로 버전이 활성화된 상태

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

        letterContainerSection.style = 'grid-template-columns: 1fr; width: 300px;'
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

        letterContainerSection.style = 'grid-template-columns: 1fr 1fr; width: 400px;'

    }
};
