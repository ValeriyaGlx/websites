const playList = [
    {      
      title: 'Aqua Caelestis',
      src: '../assets/sounds/Aqua Caelestis.mp3',
      duration: '0:58'
    },  
    {      
      title: 'River Flows In You',
      src: '../assets/sounds/River Flows In You.mp3',
      duration: '3:50'
    },
    {      
        title: 'Summer Wind',
        src: '../assets/sounds/Summer Wind.mp3',
        duration: '1:37'
      },
    {      
        title: 'Ennio Morricone',
        src: '../assets/sounds/Ennio Morricone.mp3',
        duration: '1:50'
      }
  ]


const audio = new Audio();
const audioButt = document.querySelector('.play');
const audioName = document.querySelector('.player-name');
const length = document.querySelector('.length');
const audioRoad = document.querySelectorAll('.play-list__li');
let playNum = 0;

function playAudio() {
  audioName.textContent = playList[playNum].title;
  length.textContent = playList[playNum].duration;

  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.volume = .75;
  audio.play();
}

function pauseAudio() {
isPlay = 0
  audio.pause();
}

function toggleBtn() {
    audioButt.classList.toggle('pause');
    audioRoad[playNum].classList.add('played-list__li');

    playAudio();

    if(!audioButt.classList.contains('pause')){
        pauseAudio()
    }
  }
audioButt.addEventListener('click', toggleBtn);

//next and prev songs
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');

function nextSong(){
audioRoad[playNum].classList.remove('played-list__li');
playNum++;
console.log(playNum);
audioRoad[playNum].classList.add('played-list__li');
playAudio();

if(!audioButt.classList.contains('pause')){
    audioButt.classList.add('pause')
}
}
function prevSong(){
audioRoad[playNum].classList.remove('played-list__li');
playNum--;
    
audioRoad[playNum].classList.add('played-list__li');
playAudio();

if(!audioButt.classList.contains('pause')){
    audioButt.classList.add('pause')
}
}

playNext.addEventListener('click', nextSong);
playPrev.addEventListener('click', prevSong);

//choose loud

//mute

const volume = document.querySelector('.volume-button');
const volumeMedium = document.querySelector('.icono-volumeMedium');

function muteSound(){
volumeMedium.classList.toggle('mute')
}

volume.addEventListener('click', muteSound)


