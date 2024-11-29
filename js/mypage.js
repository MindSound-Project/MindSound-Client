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
    const storageKey = 'letters';
    const savedImages = JSON.parse(localStorage.getItem(storageKey)) || [];
    const imageList = document.getElementsByClassName('setlist-img')[0];

    // 기존 이미지를 모두 제거
    imageList.innerHTML = '';
    // 저장된 이미지를 각각 <img> 태그로 표시
    savedImages.reverse().forEach((letter, index) => {
        let image = letter.image_url;
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

// 통계
const smallbarDiv = document.querySelectorAll('.smallbar');
const sumSpan = document.querySelectorAll('.sum');

const statistic = async () => {
    try {
        const response = await fetch('/json/letterList.json');  // JSON 파일을 가져옴
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const dataList = await response.json();  // JSON 데이터를 파싱
        
        let per = [0, 0, 0, 0, 0]
        dataList.forEach((data) => {
            if(data.emotion_category === 'happy'){
                per[0]++;
            } else if(data.emotion_category === 'good'){
                per[1]++;
            } else if(data.emotion_category === 'soso'){
                per[2]++;
            } else if(data.emotion_category === 'bad'){
                per[3]++;
            } else if(data.emotion_category === 'sad'){
                per[4]++;
            }
        })
        console.log(per);
        let max_emotion = Math.max(...per);
        console.log(max_emotion);
        let oneper = Math.ceil(100/max_emotion);
        let i=0;
        smallbarDiv.forEach((smallbar) => {
            smallbar.style.width = `${per[i++]*oneper}%`;
        });
        i=0;
        sumSpan.forEach((sum) => {
            sum.textContent = `${per[i++]}개`;
        })
        console.log(oneper);
    } catch (error) {
        console.error('Error fetching data:', error);  // 에러 처리
    }

};
statistic();

// JSON 데이터를 로딩하는 함수
fetch('/json/user.json')
  .then(response => response.json())
  .then(data => {
    const userIdElement = document.getElementById('user-id');
    const userPasswordElement = document.getElementById('user-password');
    const user = data.users[0];

    userIdElement.textContent = `아이디 : ${user.id}`;
    userPasswordElement.textContent = `비밀번호 : ${user.password}`;
  })
  .catch(error => console.error('데이터 로딩 오류:', error));

// 탭을 전환하는 함수
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => tab.classList.remove('active'));

  const activeTab = document.getElementById(tabId);
  activeTab.classList.add('active');

  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => button.classList.remove('active'));

  const activeButton = document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`);
  activeButton.classList.add('active');
}