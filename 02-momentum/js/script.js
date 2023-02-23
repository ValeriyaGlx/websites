

//show time and date

let lang = 'en'

const time = document.querySelector('.time');
const date = document.querySelector('.date');



  function showTime() {
    const date = new Date().toLocaleTimeString();
    time.textContent = date;
    setTimeout(showTime, 1000);

    
    showDate(lang);
  }
showTime()

   function showDate(lang){
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    let locals;

    if(lang==='en'){
      locals = "en-US"
    } 
    if(lang==='ru'){
      locals = "ru-RU"
    }
    
    const currentDate = new Date().toLocaleDateString(locals, options);
    date.textContent = currentDate;  
   }


// add city and weather information
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


async function getWeather(lang){
     //city.value = 'Minsk'
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=5239ed5b9227a8753965552e1bdd125d&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
   
    
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${Math.ceil(data.main.temp)}°C`
    weatherDescription.textContent = data.weather[0].description;

    if(lang=='ru'){
      
      wind.textContent = `Скорость ветра: ${Math.ceil(data.wind.speed)} m/s`;
      humidity.textContent = `Влажность: ${data.main.humidity}%`;
      city.placeholder = '[Введите город]'
    } else {
      wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
    }
    
   
  
    city.value = data.name;



     // local storage 

  function setLocalStorage(){
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);
  
  function getLocalStorage(){
    if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
  }
  
  window.addEventListener('load', getLocalStorage);
  }
  
  
getWeather(lang)

// change city

city.addEventListener('change', getWeatherNew)

async function getWeatherNew(){
  const weatherError = document.querySelector('.weather-error');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=5239ed5b9227a8753965552e1bdd125d&units=metric`;
  
  const response = await fetch(url);
  const data = await response.json();

  try{
    weatherError.textContent=null;
    weatherIcon.classList.remove('hidden');

  weatherIcon.classList.add(`owf-${data.weather[0].id}`)
  temperature.textContent = `${Math.ceil(data.main.temp)}°C`
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${Math.ceil(data.wind.speed)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  
  city.value = data.name}
 
  catch(e){
    if(e.name ==='TypeError'){
    weatherError.textContent = `Error! city not found for ' ${city.value}'!`;
      temperature.textContent = null;
      weatherDescription.textContent = null;
      wind.textContent = null;
      humidity.textContent = null;
     weatherIcon.classList.add('hidden');

    }
  }

}

//add greeting

const text = document.querySelector('.name');
const greetConteiner = document.querySelector('.greeting');

let timeOfDay;

function showGreeting(lang){

const hours = new Date().getHours();

function getTimeOfDay(){

if(hours >= 0 && hours < 6){return 'night'}
if(hours >= 6 && hours < 12){return 'morning'}
if(hours >= 12 && hours < 18){return'afternoon'}
if(hours >= 18 && hours < 24){return'evening'}
}


if(lang === 'ru'){
if(hours >= 0 && hours < 6){greetConteiner.textContent = `Доброй ночи,`}
if(hours >= 6 && hours < 12){greetConteiner.textContent = `Доброе утро,`}
if(hours >= 12 && hours < 18){greetConteiner.textContent = `Добрый день,`}
if(hours >= 18 && hours < 24){greetConteiner.textContent = `Добрый вечер,`}
text.placeholder = '[Введите Имя]'
} else {
  greetConteiner.textContent = `Good ${getTimeOfDay()},`;
}



timeOfDay = getTimeOfDay();


// save name-data in local storage

function setLocalStorage(){
  localStorage.setItem('name', text.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage(){
  if(localStorage.getItem('name')) {
    text.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage);

}

showGreeting(lang);


//add quotes

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');


async function getQuotes(){
  if(lang === 'en') {
  let quotes = './data.json';
 
  const response = await fetch(quotes);
  const data = await response.json();

  let random = getRandomNumber(1,12)
  quote.textContent = data[random].text;
  author.textContent = data[random].author;
}

if(lang === 'ru') {
  let quotes = './dataRu.json';
 
  const response = await fetch(quotes);
  const data = await response.json();

  let random = getRandomNumber(1,12)
  quote.textContent = data[random].text;
  author.textContent = data[random].author;
}
}

getQuotes()

// change quote
const changeQuote = document.querySelector('.change-quote');

changeQuote.addEventListener('click', getQuotes);



//open and close settings window
const footerSettings = document.querySelector('.footer__settings');
const settings = document.querySelector('.settings__main')


footerSettings.addEventListener('click', () => {
  getLinkFromFlickr()
  //getLinkFromUnplash()
  
  if(settings.style.maxHeight){
    settings.style.padding = null;
    settings.style.maxHeight = null;
    settings.style.visibility = 'hidden';
    settings.style.opacity = 0;
  } else {
    settings.style.opacity = 1;
    settings.style.visibility = 'visible';
    settings.style.padding =  20 + 'px';
    settings.style.maxHeight = 370 + 'px';
  }


})


//open and close todo window
const todoInner = document.querySelector('.todo-p')
const todoOpen = document.querySelector('.footer__todo');
const todoList = document.querySelector('.todo__list');

const todoButton = document.querySelector('.todo__list--button');
const todoInput = document.querySelector('.todo__input');

const chatContainer = document.querySelector('.todo__task-field')
const items = chatContainer.children



todoOpen.addEventListener('click', () => {
if(items.length > 1){
  todoButton.style.visibility = 'hidden';
 
  todoInput.style.opacity = 1;
  todoInput.focus();

}

 if(todoList.style.maxHeight){
  todoList.style.padding = null;
  todoList.style.maxHeight = null;
  todoList.style.opacity = 0;

  todoInput.style.opacity = 0;
  todoButton.style.opacity = 0.8;
 } else {
  todoList.style.padding = 20 + 'px';
  todoList.style.opacity = 1;
  todoList.style.maxHeight = 260 + 'px';
 }
});


//add todo input
todoButton.addEventListener('click', () => {
  todoInput.style.opacity = 1;
  todoButton.style.opacity = 0;
  
  if(todoInput.style.opacity){
    todoInput.focus()
  }
})

//add todo task

const taskTemplate =  document.querySelector('#task-template').content;
const newTodo = taskTemplate.querySelector('.todo__task');
const taskField = document.querySelector('.todo__task-field');



todoInput.addEventListener('change', addTask);

function addTask(){

if(todoInput.value.charAt(0) === ' ') {
  todoInput.value = '';
  document.querySelector('.todo__add').textContent = 'add something interesting, honey'
}

let newTask = newTodo.cloneNode(true);
const textTodo = newTask.querySelector('.todo__task-text');

  
if(todoInput.value){
  document.querySelector('.todo__add').textContent = ''

  textTodo.textContent = todoInput.value;
  taskField.appendChild(newTask);
  todoInput.value = ''
  
  todoButton.style.opacity = 0;
  todoInner.textContent = 'Just Do It:'} else {
  document.querySelector('.todo__add').textContent = 'add something interesting, honey';
  }

  function todoChecked(item){
    let  taskCheckbox = item.querySelector('.todo__task-checkbox');
    
   taskCheckbox.addEventListener('change', () => {
    textTodo.classList.toggle('todo__check'); 
  })}

  todoChecked(newTask);
  deleteMessage(newTask);
}

function deleteMessage (item){
  let deleteButton = item.querySelector('.todo__task-delete')
  deleteButton.addEventListener('click', function () {
   item.remove()

   sayTodoEmpty ()
   })}


   function sayTodoEmpty (){
    if (taskField.children.length===1){
      todoInner.textContent = 'Add a todo to get srarted:'
    }}
      






//Change Styles of Source Buttons
const buttonSourse = document.querySelectorAll('.sourse__button');
const inputSourse = document.querySelector('.sourse__input')

buttonSourse.forEach(el => el.addEventListener('click', chooseSourse));

function chooseSourse(e){
  console.log(e.target);
  const arr = []
  buttonSourse.forEach(el => el.classList.remove('button__active'));

  arr.push(e.target)
  arr.length===1
  arr.forEach(el =>el.classList.toggle('button__active'));

  if(e.target.id==='unsplash' || e.target.id==='flickr'){
    inputSourse.style.opacity = 1; 
    inputSourse.focus()
  } else {
    inputSourse.style.opacity = 0
  }
if(e.target.id==='gitHub'){
  setBG()
}

if(e.target.id==='flickr'){
  setBG(linkFl)
}

if(e.target.id==='unsplash'){
  setBG(UPlink)
}


}

//input sourse
let theme = 'nature'
inputSourse.addEventListener('change', () => {
 
})




//get images Unsplash API

let linkFl;
let linkUP;

async function getLinkFromUnplash(){

  const url =
  `https://api.unsplash.com/photos/random?orientation=landscape&query=${theme}&client_id=lTc-IeTCFkte6_D0AMBniLBDzh4j3xtIaf0kkZiRFgU`
  const res = await fetch(url);
  const data = await res.json();

  return UPlink = data.urls.regular;
}


//get images Flickr API

async function getLinkFromFlickr(){

  const url =
  `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=c597bbd8c655208791be3acdcfcb7433&tags=${theme}&extras=url_l&format=json&nojsoncallback=1`
  const res = await fetch(url);
  const data = await res.json();
  
  return linkFl = data.photos.photo[getRandomNumber(0,20)].url_l;
  
}


  


//get images GitHub
function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max-min +1) + min)
}

let bgNum = getRandomNumber(1,20).toString().padStart(2,'0');


//change background

function setBG(src=`https://github.com/rolling-scopes-school/stage1-tasks/blob/assets/images/${timeOfDay}/${bgNum}.jpg?raw=true`){
  const img = new Image();
  img.src =  src
  img.onload = () => {      
  document.body.style.backgroundImage = 
  'url(' + src + ')'
}}

setBG()



//arrow bg


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


//AUDIOPLAYER





//change language
const buttLanguage = document.querySelectorAll('.lang__button');

buttLanguage.forEach(el => el.addEventListener('click', changeLanguage));

function changeLanguage(e){
  const arr = [];
  buttLanguage.forEach(el => el.classList.remove('button__active'));
  arr.push(e.target);
  arr.length===1
  arr.forEach(el =>el.classList.toggle('button__active'));


  if(e.target.id==='ru'){
    lang = 'ru'
    document.querySelector('.language').textContent = 'Язык:';
    document.querySelector('.sourse').textContent = 'Источник изображения:';
    document.querySelector('.article').textContent = 'Скрыть/Показать блок'

  const arr = ['Время', 'Дата', 'Приветствие', 'Погода', 'Цитаты', 'Список дел', 'Аудио'];
  const newArr = [ ...document.querySelectorAll('.settings__span')];
  newArr.map((el,i) => el.textContent=arr[i]);

  document.querySelector('.todo-p').textContent = 'Добавьте что-нибудь';



  getWeather('ru');
  getQuotes('ru');
  showDate('ru');
  showGreeting('ru')
  


   } else {
    lang = 'en'

    document.querySelector('.language').textContent = 'Language:';
    document.querySelector('.sourse').textContent = 'Image Sourсe:';
    document.querySelector('.article').textContent = 'Hide/Show Blocks:'

  const arr = ['Clock', 'Date', 'Greeting', 'Weather', 'Quotes', 'Todo', 'Audio'];

   const newArr = [ ...document.querySelectorAll('.settings__span')]

   newArr.map((el,i) => el.textContent=arr[i])

   document.querySelector('.todo-p').textContent = 'Add a todo to get srarted';

   getWeather('en');
   getQuotes('en');
   showDate('en');
   showGreeting('en');
   }

}









//hide blocks 




