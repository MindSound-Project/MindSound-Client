// 달력
const calendarContainerDiv = document.querySelector("#calendar-container");
// 현재 날짜 구하자
let currentDate = new Date();

const setCalendarHeader = (date) => {
    // 연도 구하자
    const year = date.getFullYear();
    // 달 구하자
    const month = date.getMonth()+1;
    titleString = `${month}월`;
    const calendarHeaderH1 = document.querySelector("#calendar-header h1");
    calendarHeaderH1.innerHTML = titleString;
}

const changeMonth = (delta) => {
    currentDate.setMonth(currentDate.getMonth()+delta);
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

const addTest = () => {
    for(let x=0; x<7; x++){
        let test = document.createElement("div"); // <div></div>
        test.className = "test item"; // <div class="item"></div>
        test.textContent = "😁"; // <div class="item">1</div>
        calendarContainerDiv.appendChild(test);
    }
}

// 일 구하자
const setCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    // 첫 날의 요일 구하자 : 이전달 뒷 날짜 쓰기 위하여
    const firstDay = new Date(year, month, 1).getDay(); 
    console.log(firstDay);
    
    // 마지막 날짜 구하자 : 요일구하기 위하여
    // 실제 마지막 날짜만 구하려면 lastDate.getDate()
    const lastDate = new Date(year, month+1, 1-1); // 다음달 1일에서 1을 뺀 이번 달의 마지막 날 

    // 마지막 날의 요일 구하자 : 다음달 앞 날짜 쓰기 위하여
    const lastDay = lastDate.getDay();
    
    let weekNameString = "";
    const weekNamesArray = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekNamesArray.forEach((weekName) => {
        weekNameString += `<div class="item week-name">${weekName}</div>`;
    })
    calendarContainerDiv.innerHTML = weekNameString;

    let cnt = 0;
    // 이전 달 뒷날짜 구하자
    // 0~1까지 마지막 날짜 - n개 부터 차례로 날짜 쓰자. n: 마지막 날짜 - 이번달 1일의 요일 + 1
    // 0~이번달 1일의 요일 -1까지 이전달 마ㅣㅈ막 날짜 - 이버낟ㄹ 1일의 요일 + 1(시작날짜)부터 + 1 해서 쓰자 
    for (let date = lastDate.getDate() - firstDay + 1; date <= lastDate.getDate(); date++) {
        let prevMonthDateDiv = document.createElement("div");   // <div></div>
        prevMonthDateDiv.className = "item other-month";     // <div class="item other-month"></div>
        prevMonthDateDiv.textContent = date;                 // <div class="item other-month">1</div>
        calendarContainerDiv.appendChild(prevMonthDateDiv);  // <div id="calendar-container"><div class="item other-month">1</div></div>
        cnt++;
        if(cnt%7===0 && cnt!=0){
            addTest();
        }
    }
    
    

    // 이번달 날짜들 쓰자 : 1~30 : 1~lastDate.getDate()
    //div 요소 만들자, class에 item 넣자, text에 날짜 넣자. calendarContainerDiv의 자식으로 붙이자
    for (let date = 1; date <= lastDate.getDate(); date++){
        let currentMonthDateDiv = document.createElement("div"); // <div></div>
        currentMonthDateDiv.className = "item"; // <div class="item"></div>
        currentMonthDateDiv.textContent = date; // <div class="item">1</div>
        calendarContainerDiv.appendChild(currentMonthDateDiv); // <div id="calendar-container"><div class="item">1</div></div>
        cnt++;
        if(cnt%7===0 && cnt!=0){
            addTest();
        }
    }
    
    
    // 다음달 앞날짜 구하자
    // 이번달 마지막 날의 요일+1 ~ 6까지 1부터 차례대로 날짜 쓰자 
    for (let date = 1; date <= 6 - lastDay; date++) {
        let nextMonthDateDiv = document.createElement("div");   // <div></div>
        nextMonthDateDiv.className = "item other-month";     // <div class="item other-month"></div>
        nextMonthDateDiv.textContent = date;                 // <div class="item other-month">1</div>
        calendarContainerDiv.appendChild(nextMonthDateDiv);  // <div id="calendar-container"><div class="item other-month">1</div></div>
        cnt++;
        if(cnt%7===0 && cnt!=0){
            addTest();
        }
    }


}
setCalendarHeader(currentDate);
setCalendar(currentDate);