import { petsData } from "../petsData.js";

let type;

const arrowNext = document.getElementById("our-friends__arrow-next"),
  arrowPrev = document.getElementById("our-friends__arrow-prev"),
  cards = document.querySelectorAll(".our-friends__card");

window.addEventListener("resize", trackScreenSize);

function trackScreenSize() {
  if (screen.width > 832.5) {
    type = "desctop";
  }

  if (screen.width < 832.5 && screen.width > 554.5) {
    type = "tablet";
  }

  if (screen.width < 554.5) {
    type = "mobile";
  }

  console.log(type);
}

let arr;
//sort array randomly
function sortArray() {
  arr = [...petsData].sort(() => Math.random() - 0.5);
  return arr;
}

let randomlyPets = sortArray();

//update images every onload

const cardImages = document.querySelectorAll(".card--img");
const cardInfo = document.querySelectorAll(".card--info p");

let i = 3;
let i1 = 3;

let step;

/*if(type="desctop"){
    i=3;
    i1=3;
}

if(type = "tablet"){
    i=2;
    i1=2;
}

if(type = "mobile"){
    i=1;
    i1=1;
} */

function getMainImages() {
  randomlyPets.push(randomlyPets[0]);
  console.log(randomlyPets);
  getNextCards();
}
getMainImages();

//add listenner to arrows

function getNextCards() {
  if (i > 8) {
    i = 0;
    i1 = 0;

    const arr = pushElements();

    cardImages.forEach((el) => {
      el.style.backgroundImage = arr[i++].img;
    });
    cardInfo.forEach((el) => (el.textContent = arr[i1++].name));
    return;
  }
  cardImages.forEach(
    (el) => (el.style.backgroundImage = randomlyPets[i++].img)
  );
  cardInfo.forEach((el) => (el.textContent = randomlyPets[i1++].name));

  console.log(i);
}

function getPrevCards() {
  i = i - 6;
  i1 = i1 - 6;

  if (i < 0) {
    i = 6;
    i1 = 6;

    const arr = unshiftElements();

    cardImages.forEach((el) => (el.style.backgroundImage = arr[i++].img));
    cardInfo.forEach((el) => (el.textContent = arr[i1++].name));
    return;
  }
  console.log(i);

  cardImages.forEach(
    (el) => (el.style.backgroundImage = randomlyPets[i++].img)
  );
  cardInfo.forEach((el) => (el.textContent = randomlyPets[i1++].name));
}

//get random number

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let random1 = getRandomNumber(3, 4);
let random2 = getRandomNumber(5, 6);
let random3 = getRandomNumber(7, 8);

let random4 = getRandomNumber(0, 1);
let random5 = getRandomNumber(3, 4);
let random6 = getRandomNumber(5, 6);

//unshift el to array
function unshiftElements() {
  let a = [...randomlyPets];
  a.unshift(
    randomlyPets[random3],
    randomlyPets[random1],
    randomlyPets[random2]
  );
  return a;
}

function pushElements() {
  let a = [...randomlyPets];
  a.push(randomlyPets[random4], randomlyPets[random6], randomlyPets[random5]);
  return a;
}

arrowNext.addEventListener("click", sliderRight);
arrowPrev.addEventListener("click", sliderLeft);

function sliderRight() {
  cards.forEach((el) => (el.style.animation = "right .4s normal"));

  setTimeout(getNextCards, 200);
  setTimeout(deleteAnimation, 500);
}

function sliderLeft() {
  cards.forEach((el) => (el.style.animation = "left .4s normal"));

  setTimeout(getPrevCards, 200);
  setTimeout(deleteAnimation, 500);
}

function deleteAnimation() {
  cards.forEach((el) => (el.style.animation = null));
}

//popup

let petsJSON = randomlyPets;

const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup--content");

const petName = document.querySelectorAll(".card--info p");

cards.forEach((el) => el.addEventListener("click", openPopup));

function openPopup(e) {
  let number = e.target.parentNode.id * 1;

  const current = randomlyPets.find((el) => {
    return el.name === petName[number].outerText;
  });

  document.querySelector(".popup--content-right h3").textContent = current.name;
  document.querySelector(".popup--content-left").style.backgroundImage =
    current.img;
  document.querySelector(
    ".popup--content-right h4"
  ).textContent = `${current.type} - ${current.breed}`;
  document.querySelector(".popup--content-right p").textContent = current.description;
  document.querySelector(".Inoculations").textContent = current.inoculations;
  document.querySelector(".Diseases").textContent = current.diseases;
  document.querySelector(".Parasites").textContent = current.parasites;

  popup.style.visibility = "visible";
  popupContent.style.opacity = "1";

  document.querySelector(".popup-close").style.opacity = "1";

  document.body.classList.add("lock");
}

window.addEventListener("click", closePopup);

function closePopup(e) {
  const modal1 = e.composedPath().includes(document.querySelector(".popup"));
  const modal2 = e
    .composedPath()
    .includes(document.querySelector(".popup--content"));

  if (modal1 && !modal2) {
    popupContent.style.opacity = "0";
    document.querySelector(".popup-close").style.opacity = "0";
    popup.style.visibility = "hidden";
    document.body.classList.remove("lock");
  }
}
