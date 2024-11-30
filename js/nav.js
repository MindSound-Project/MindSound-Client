
const hamburger = document.getElementById("hamburger");
const navDiv = document.getElementsByClassName('navDiv')[0];
const navItemA = document.querySelectorAll('.navItem');
const penImg = document.querySelector('.pen');

hamburger.addEventListener("click", () => {
    // 햄버거 애니메이션 활성화
    hamburger.classList.toggle("active");
    navDiv.classList.toggle('show');
    navItemA.forEach((item) => {
        item.style.width = '80%';
        item.style.paddingLeft = '7px'
    })
    
});