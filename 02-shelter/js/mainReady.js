import { petsData } from "./petsData.js";

//burger
//open burger menu

const menuIcon = document.querySelector(".menu__icon");
const menu = document.querySelector(".menu");
const links = document.querySelectorAll(".menu__link");

window.addEventListener("resize", trackScreenSizeforBurger);

function trackScreenSizeforBurger() {
  if (screen.width > 767.5 && screen.width < 773.5) {
    location.reload();
  }

  if (screen.width > 1105 && screen.width < 1120) {
    location.reload();
  }

  if (screen.width < 767.5) {
    menuIcon.addEventListener("click", addMenuClass);
    links.forEach((el) => el.addEventListener("click", closeMenu));
  }
}

if (screen.width < 767.5) {
  menuIcon.addEventListener("click", addMenuClass);

  //close menu on link click

  links.forEach((el) => el.addEventListener("click", closeMenu));

  //close menu on window click

  window.addEventListener("click", closeSetWindow);
}

function addMenuClass() {
  if (document.body.classList.contains("lock")) {
    closeMenu();
  } else {
    document.body.classList.add("lock");
    menu.style.transform = "translate(0%, 0px)";
    menuIcon.style.transform = "rotate(90deg)";
    document.querySelector(".background").style.visibility = "visible";
  }
}

//close menu on link click

function closeMenu() {
  menu.style.transform = "translate(100%, 0px)";
  menuIcon.style.transform = "rotate(0deg)";
  document.body.classList.remove("lock");
  document.querySelector(".background").style.visibility = "hidden";
}

//close menu on window click
function closeSetWindow(e) {
  const modal1 = e.composedPath().includes(menu);
  const modal2 = e.composedPath().includes(menuIcon);

  if (!modal1 && !modal2) {
    closeMenu();
  }
}

let type;
let number;

let arr;
//sort array randomly
function sortArray() {
  arr = [...petsData].sort(() => Math.random() - 0.5);
  return arr;
}

const randomlyPets = sortArray();

const arrowNext = document.getElementById("our-friends__arrow-next"),
  arrowPrev = document.getElementById("our-friends__arrow-prev"),
  cards = document.querySelectorAll(".our-friends__card");

//update images every onload

const cardImages = document.querySelectorAll(".card--img");
const cardInfo = document.querySelectorAll(".card--info p");

const screenCards = [...cardImages];
const screenInfo = [...cardInfo];
const spredArray = [...randomlyPets];
spredArray.push(spredArray[0]);
const screenArray = spredArray;

if (screen.width > 1110.5) {
  type = "desctop";
  number = [0, 1, 2];
  screenCards.length = 3;
  screenInfo.length = 3;
}

if (screen.width < 1110.5 && screen.width > 740.5) {
  type = "tablet";
  number = [0, 1];
  screenCards.length = 2;
  screenInfo.length = 2;
}

if (screen.width < 740.5) {
  type = "mobile";
  number = [0];
  screenCards.length = 1;
  screenInfo.length = 1;
}

window.addEventListener("resize", trackScreenSize);

function trackScreenSize() {
  if (screen.width > 1110.5) {
    if (type !== "desctop") {
      type = "desctop";
      number = [0, 1, 2];
      screenCards.length = 3;
      screenInfo.length = 3;
      newCards();
    }
  }

  if (screen.width < 1110.5 && screen.width > 740.5) {
    if (type !== "tablet") {
      type = "tablet";
      number = [0, 1];
      screenCards.length = 2;
      screenInfo.length = 2;
      newCards();
    }
  }

  if (screen.width < 740.5) {
    if (type !== "mobile") {
      type = "mobile";
      number = [0];
      screenCards.length = 1;
      screenInfo.length = 1;
      newCards();
    }
  }
}

//add listenner to arrows

function getMainCards() {
  screenCards.forEach((el, i) => {
    el.style.backgroundImage = screenArray[number[i]].img;
  });
  screenInfo.forEach((el, i) => (el.textContent = screenArray[number[i]].name));
}
getMainCards();

function getNextCards() {
  const rand = getRandomNumber(0, cardImages.length);
  screenCards.forEach((el, i) => {
    el.style.backgroundImage = newCards()[i + rand].img;
  });
  screenInfo.forEach((el, i) => (el.textContent = newCards()[i + rand].name));
}

//get random number

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const petName = document.querySelectorAll(".card--info p");

function getCurrentCards() {
  const arr = [];
  petName.forEach((el) => arr.push(el.outerText));

  return arr;
}

let currentCards = getCurrentCards().slice(0, screenInfo.length);

function newCards() {
  currentCards = getCurrentCards().slice(0, screenInfo.length);

  let newCards = screenArray.filter((element) => {
    return !currentCards.includes(element.name);
  });

  return newCards;
}

newCards();

arrowNext.addEventListener("click", sliderRight);
arrowPrev.addEventListener("click", sliderLeft);

function sliderRight() {
  cards.forEach((el) => (el.style.animation = "right .4s normal"));

  setTimeout(getNextCards, 200);
  setTimeout(deleteAnimation, 500);
}

function sliderLeft() {
  cards.forEach((el) => (el.style.animation = "left .4s normal"));

  setTimeout(getNextCards, 200);
  setTimeout(deleteAnimation, 500);
}

function deleteAnimation() {
  cards.forEach((el) => (el.style.animation = null));
}

//popup

const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup--content");

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
  document.querySelector(".popup--content-right p").textContent =
    current.description;
  document.querySelector(".Inoculations").textContent = current.inoculations;
  document.querySelector(".Diseases").textContent = current.diseases;
  document.querySelector(".Parasites").textContent = current.parasites;

  popup.style.visibility = "visible";
  popupContent.style.opacity = "1";

  document.querySelector(".popup-close").style.opacity = "1";

  document.body.classList.add("locker2");
}

window.addEventListener("click", closePopup);
document
  .querySelector(".popup-close")
  .addEventListener("click", closePopupCross);

function closePopupCross() {
  popupContent.style.opacity = "0";
  document.querySelector(".popup-close").style.opacity = "0";
  popup.style.visibility = "hidden";
  document.body.classList.remove("locker2");
}

function closePopup(e) {
  const modal1 = e.composedPath().includes(document.querySelector(".popup"));
  const modal2 = e
    .composedPath()
    .includes(document.querySelector(".popup--content"));

  if (modal1 && !modal2) {
    popupContent.style.opacity = "0";
    document.querySelector(".popup-close").style.opacity = "0";
    popup.style.visibility = "hidden";
    document.body.classList.remove("locker2");
  }
  window.addEventListener("mousemove", addClassButton);
}

function addClassButton(e) {
  const modal1 = e.composedPath().includes(document.querySelector(".popup"));
  const modal2 = e
    .composedPath()
    .includes(document.querySelector(".popup--content"));

  if (modal1 && !modal2) {
    document.querySelector(".popup-close").style.backgroundColor = "#FDDCC4";
  }

  if (modal1 && modal2) {
    document.querySelector(".popup-close").style.backgroundColor = null;
  }
}
