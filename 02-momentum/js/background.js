//change background

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max-min +1) + min)
  }
  
  let bgNum = getRandomNumber(1,20).toString().padStart(2,'0');
  
  function setBG(){
  
    const img = new Image();
    img.src =  `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`
    img.onload = () => {      
    document.body.style.backgroundImage = 
    'url(' + `https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true` + ')'
  }}
  
  setBG()
  
  
  const leftIcon = document.querySelector('.slide-prev');
  const rightIcon = document.querySelector('.slide-next');
  
  leftIcon.addEventListener('click', getSlidePrev);
  rightIcon.addEventListener('click', getSlideNext);
  
  function getSlidePrev(){
  
    bgNum = (Number(bgNum) - 1).toString().padStart(2,'0');
    if(bgNum === '00') bgNum = '20';
  
    setBG()
  }
  
  function getSlideNext(){
    bgNum = (Number(bgNum) + 1).toString().padStart(2,'0');
    if(bgNum === '21') bgNum = '01';
   
    setBG()
  }