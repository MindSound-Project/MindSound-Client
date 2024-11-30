// 달력
const calendarContainerDiv = document.querySelector("#calendar-container");
// 현재 날짜 구하자
let currentDate = new Date();
let currentMonth;

const setCalendarHeader = (date) => {
    // 연도 구하자
    const year = date.getFullYear();
    // 달 구하자
    const month = date.getMonth() + 1;
    titleString = `${month}월`;
    const calendarHeaderH1 = document.querySelector("#calendar-header h1");
    calendarHeaderH1.innerHTML = titleString;
}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth() + delta);
    setCalendarHeader(currentDate);
    setCalendar(currentDate);
}

// 이전 달 버튼 이벤트 처리하자
const prevMonthButton = document.getElementById("prev-month");
// ("click", console.log('이전 달')) 이면 console.log() 함수 실행한 결과를 클릭했을 때 실행하는거야. 즉 아무일도 안함
prevMonthButton.addEventListener("click", () => changeMonth(-1));
// 다음 달 버튼 이벤트 처리하자
const nextMonthButton = document.querySelector("#next-month");
nextMonthButton.addEventListener("click", () => changeMonth(1));

const chooseDate = (emotion) => {
    const chdateP = document.getElementsByClassName('chdate')[0];
    let cnt = 0;
    let chdateTeset = currentMonth + "월"
    async function Date() {
        try {
            const storageKey = 'letters';
            const data = JSON.parse(localStorage.getItem(storageKey)) || [];

            for (let item of data) {
                arrDate = item.date.split('-');
                console.log(arrDate);
                console.log(currentMonth);
                if (arrDate[1] == currentMonth) {
                    if (item.emotion_category == emotion) {
                        chdateTeset += " " + arrDate[2] + "일";
                        cnt++;
                    }
                }
            }
            chdateTeset += "에 제 감정을 선택하셨습니다.";
            chdateP.textContent = chdateTeset;
        } catch (err) {
            console.log(err);  // 오류 처리
        }
        if(cnt === 0){
            chdateP.textContent = currentMonth + "월에 제 감정을 선택하지 않으셨습니다."; 
        }
    }
    Date();
}

// 일 구하자
const setCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    currentMonth = date.getMonth() + 1;
    console.log(currentMonth);
    // 첫 날의 요일 구하자 : 이전달 뒷 날짜 쓰기 위하여
    const firstDay = new Date(year, month, 1).getDay();
    console.log(firstDay);

    // 마지막 날짜 구하자 : 요일구하기 위하여
    // 실제 마지막 날짜만 구하려면 lastDate.getDate()
    const lastDate = new Date(year, month + 1, 1 - 1); // 다음달 1일에서 1을 뺀 이번 달의 마지막 날 

    // 마지막 날의 요일 구하자 : 다음달 앞 날짜 쓰기 위하여
    const lastDay = lastDate.getDay();

    let weekNameString = "";
    const weekNamesArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`;
    })
    calendarContainerDiv.innerHTML = weekNameString;


    for (let date = lastDate.getDate() - firstDay + 1; date <= lastDate.getDate(); date++) {
        let prevMonthDateArticle = document.createElement("article");
        prevMonthDateArticle.className = "item other-month";
        let prevMonthDateDiv = document.createElement('div');
        prevMonthDateDiv.textContent = date;
        prevMonthDateArticle.appendChild(prevMonthDateDiv);
        calendarContainerDiv.appendChild(prevMonthDateArticle);
    }


    
    async function loadEmotionListCount(today) {
        try {
            const data = JSON.parse(localStorage.getItem('letters')) || [];
            let count=0;
            for (let item of data) {
                if (item.date === today){
                    count++;
                }
            }
            return count;
        } catch (err) {
            console.log(err); // 오류 처리
        }
    }


    async function loadEmotionList(today, cnt) {
        try {
            const data = JSON.parse(localStorage.getItem('letters')) || [];
            let num = 1;
            for (let item of data) {
                if (item.date === today) {
                    if(num === cnt){
                        let currentMonthDateImg = document.createElement('img');
                        // console.log(item.email);
                        console.log(item.emotion_category);
                        if (item.emotion_category != "") {
                            if (item.emotion_category === "happy") {
                                currentMonthDateImg.src = '/image/happy.png';
                            } else if (item.emotion_category === "good") {
                                currentMonthDateImg.src = '/image/good.png';
                            } else if (item.emotion_category === "soso") {
                                currentMonthDateImg.src = '/image/soso.png';
                            } else if (item.emotion_category === "bad") {
                                currentMonthDateImg.src = '/image/bad.png';
                            } else if (item.emotion_category === "sad") {
                                currentMonthDateImg.src = '/image/sad.png';
                            }
                        } else {
                            currentMonthDateImg.src = '/image/other.png'; // default 이미지 추가
                        }
                        return currentMonthDateImg; // 이미지를 반환
                    }
                    num++;
                }
            }
        } catch (err) {
            console.log(err); // 오류 처리
        }
    }

    // 다음달 앞날짜 구하자
    // 이번달 마지막 날의 요일+1 ~ 6까지 1부터 차례대로 날짜 쓰자 

    async function generateCalendar() {
        for (let date = 1; date <= lastDate.getDate(); date++) {
            let currentMonthDateArticle = document.createElement("article");
            currentMonthDateArticle.className = "item";

            let currentMonthDateDiv = document.createElement('div');
            currentMonthDateDiv.textContent = date;
            currentMonthDateArticle.appendChild(currentMonthDateDiv);

            let currentMonthDateSection = document.createElement('section');

            // `today` 값을 ISO 형식으로 생성
            let today = new Date(year, month, date + 1).toISOString().split('T')[0];

            // 이미지를 비동기적으로 로드하고 나서 추가
            const emotionCount = await loadEmotionListCount(today);
            for(let i=1; i<=emotionCount; i++){
                const emotionImg = await loadEmotionList(today, i);  // await로 loadEmotionList의 실행 완료 후 이미지 반환
                if (emotionImg) {
                    currentMonthDateSection.appendChild(emotionImg);  // 이미지 노드를 section에 추가
                }
            }

            currentMonthDateArticle.appendChild(currentMonthDateSection);
            calendarContainerDiv.appendChild(currentMonthDateArticle);
        }

        // 다음 달 추가
        for (let date = 1; date <= 6 - lastDay; date++) {
            let nextMonthDateArticle = document.createElement("article");
            nextMonthDateArticle.className = "item other-month";
            let nextMonthDateDiv = document.createElement('div');
            nextMonthDateDiv.textContent = date;
            nextMonthDateArticle.appendChild(nextMonthDateDiv);
            calendarContainerDiv.appendChild(nextMonthDateArticle);
        }
    }

    // generateCalendar 실행
    generateCalendar();

}
const chImg = (emotion) => {
    const chooseEmotionImg = document.getElementsByClassName('choose-emotion-img')[0];
    chooseEmotionImg.src = `/image/${emotion}.png`;
    chooseDate(emotion);
    console.log(emotion);
}
setCalendarHeader(currentDate);
setCalendar(currentDate);
chImg('happy')

const calendarMain = document.getElementById('calendar');
const barDiv = document.getElementsByClassName('bar')[0];
const boxDiv = document.getElementsByClassName('box')[0];

barDiv.addEventListener('click', () => {
    boxDiv.classList.toggle('barDown');
    calendarMain.classList.toggle('calendarDown');
})