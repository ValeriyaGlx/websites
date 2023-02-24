const playList = [
    {      
      title: 'Aqua Caelestis',
      src: './assets/sounds/Aqua Caelestis.mp3',
      duration: '0:39'
    },  
    {      
      title: 'River Flows In You',
      src: './assets/sounds/River Flows In You.mp3',
      duration: '1:37'
    },
    {      
        title: 'Summer Wind',
        src: './assets/sounds/Summer Wind.mp3',
        duration: '1:50'
      },
    {      
        title: 'Ennio Morricone',
        src: './assets/sounds/Ennio Morricone.mp3',
        duration: '1:37'
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
if(playNum===3){
  playNum = 0
} else {
  playNum++;
}

audioRoad[playNum].classList.add('played-list__li');
playAudio();

if(!audioButt.classList.contains('pause')){
    audioButt.classList.add('pause')
}
}
function prevSong(){
audioRoad[playNum].classList.remove('played-list__li');
if(playNum===0){
  playNum = 3;
} else{
  playNum--;
}
    
audioRoad[playNum].classList.add('played-list__li');
playAudio();

if(!audioButt.classList.contains('pause')){
    audioButt.classList.add('pause')
}
}

playNext.addEventListener('click', nextSong);
playPrev.addEventListener('click', prevSong);

//choose loud

//mute img
let volumeScore = .75;

const volume = document.querySelector('.volume-button');
const volumeMedium = document.querySelector('.icono-volumeMedium');
const volumePercentage = document.querySelector('.volume-percentage');

function muteSound(){
volumeMedium.classList.toggle('mute');

audio.muted = true;
volumePercentage.style.width = '0%'
if(!volumeMedium.classList.contains('mute')){
  audio.muted = false;
  volumePercentage.style.width = '75%';
}
}

volume.addEventListener('click', muteSound);

//current time

const current = document.querySelector('.current');
const progress = document.querySelector('.progress');

audio.addEventListener('timeupdate', () => {
  const currentTime = Math.floor(audio.currentTime);
  
  if(currentTime<60){
    current.textContent = `0:${currentTime.toString().padStart(2,'0')}`;
  }
  if(currentTime>=60){
  current.textContent = `1:${(currentTime - 60).toString().padStart(2,'0')}`;
  }

  if(audio.currentTime === audio.duration){
    nextSong()
  }
  
}, false);


//running audio percentage
setInterval(()=>{ progress.style.width = audio.currentTime / audio.duration * 100 + "%"}, 300)

//click on volume slider
const volumeSlider = document.querySelector('.volume-slider')

volumeSlider.addEventListener('click', (e) =>{
  audio.muted = false;

  if(volumeMedium.classList.contains('mute')){
    volumeMedium.classList.remove('mute');
  }

  volumePercentage.style.width = e.offsetX + '%';
  audio.volume = e.offsetX/100

  if(e.offsetX>=100){
    audio.volume = 1
  }

  if(e.offsetX<=1){
    audio.muted = true;
    volumeMedium.classList.add('mute');
  }
  return volumeScore = audio.volume/100
})

console.log(volumeScore);

//click on audio persentage
const timeline = document.querySelector('.timeline');

timeline.addEventListener('click', (e) => {
  const timeToSeek = e.offsetX / 200 * audio.duration;
  audio.currentTime = timeToSeek;
})