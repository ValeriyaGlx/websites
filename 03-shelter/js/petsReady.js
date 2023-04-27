import { petsData } from "./petsData.js";
//PETS

//open burger menu
const menuIcon = document.querySelector(".menu__icon");
const menu = document.querySelector(".PETS-menu");

window.addEventListener("resize", trackScreenSizeforBurger);

function trackScreenSizeforBurger() {
  if (screen.width > 767.5 && screen.width < 773.5) {
    location.reload();
  }
}

if (window.screen.width < 767.5) {
  menuIcon.addEventListener("click", addMenuClass);

  //close menu on link click
  const links = document.querySelectorAll(".PETS-menu__link");
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
//add pages
let pages = [1, 2, 3, 4, 5, 6];
let type;
let i = 0;

if (screen.width >= 1111) {
  type = "desctop";
  pages = [1, 2, 3, 4, 5, 6];
}

if (screen.width < 1110.5 && screen.width > 740) {
  type = "tablet";
  pages = [1, 2, 3, 4, 5, 6, 7, 8];
}

if (screen.width < 740.5) {
  type = "mobile";
  pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
}

window.addEventListener("resize", trackScreenSize);

function trackScreenSize() {
  if (screen.width > 1110.5) {
    if (type !== "desctop") {
      pages = [1, 2, 3, 4, 5, 6];
      number.textContent = pages[i];
      moveToStart();
      showStartPage();
      type = "desctop";
    }
  }

  if (screen.width < 1110.5 && screen.width > 592.5) {
    if (type !== "tablet") {
      pages = [1, 2, 3, 4, 5, 6, 7, 8];
      number.textContent = pages[i];
      moveToStart();
      showStartPage();
      type = "tablet";
    }
  }

  if (screen.width < 592.5) {
    if (type !== "mobile") {
      pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
      number.textContent = pages[i];
      moveToStart();
      showStartPage();
      type = "mobile";
    }
  }
}

const number = document.querySelector(".number"),
  onePageNext = document.querySelector(".one--page__right"),
  onePagePrev = document.querySelector(".one--page__left");
const cards = document.querySelectorAll(".PETS-our-friends__card");

number.textContent = pages[i];

onePageNext.addEventListener("click", nextPage);
onePagePrev.addEventListener("click", prevPage);

function nextPage() {
  if (pages[i] > 0) {
    unlockLeftButtons();
  }

  i++;
  number.textContent = pages[i];

  if (pages[i] === pages.slice(-1)[0]) {
    lockRightButtons();
  }
}

function prevPage() {
  if (pages[i] < pages.slice(-1)[0] + 1) {
    unlockRightButtons();
  }

  i--;
  number.textContent = pages[i];

  if (pages[i] === 1) {
    lockLeftButtons();
  }
}

function unlockRightButtons() {
  document.querySelectorAll(".right").forEach((el) => {
    el.style.color = "#292929";
    el.classList.remove("noHover");
  });
  document
    .querySelectorAll(".right")
    .forEach((el) => (el.style.borderColor = "#FDDCC4"));
  onePageNext.disabled = false;
}

function lockRightButtons() {
  document.querySelectorAll(".right").forEach((el) => {
    el.style.color = "#CDCDCD";
    el.classList.add("noHover");
  });
  document
    .querySelectorAll(".right")
    .forEach((el) => (el.style.borderColor = "#CDCDCD"));
  onePageNext.disabled = true;
}

function unlockLeftButtons() {
  document.querySelectorAll(".left").forEach((el) => {
    el.style.color = "#292929";
    el.classList.remove("noHover");
  });

  document
    .querySelectorAll(".left")
    .forEach((el) => (el.style.borderColor = "#FDDCC4"));
  onePagePrev.disabled = false;
}

function lockLeftButtons() {
  document.querySelectorAll(".left").forEach((el) => {
    el.style.color = "#CDCDCD";
    el.classList.add("noHover");
  });
  document
    .querySelectorAll(".left")
    .forEach((el) => (el.style.borderColor = "#CDCDCD"));
  onePagePrev.disabled = true;
}
lockLeftButtons();

//add start and finish buttons

const finishPage = document.querySelector(".full--right"),
  startPage = document.querySelector(".full--left");

finishPage.addEventListener("click", moveToFinish);
startPage.addEventListener("click", moveToStart);

function moveToFinish() {
  i = pages.slice(-1)[0] - 1;
  number.textContent = pages[i];
  lockRightButtons();
  unlockLeftButtons();
}

function moveToStart() {
  i = 0;
  number.textContent = pages[i];
  lockLeftButtons();
  unlockRightButtons();
}

//add data in the cards

const images = document.querySelectorAll(".card--img");
const names = document.querySelectorAll(".card--info p");

let j = 0;
let j1 = 0;

//sort array randomly
let arr;
function sortArray() {
  arr = [...petsData].sort(() => Math.random() - 0.5);
  return [...arr];
}

let randomlyPets = sortArray();
const finallyArray = generateArray(randomlyPets);
addInfoCards();

//generate 48-length array

function generateArray(arr) {
  return arr.concat(
    sortArray(),
    sortArray(),
    sortArray(),
    sortArray(),
    sortArray()
  );
}

//add click listeren on one-page buttons
onePageNext.addEventListener("click", addInfoCards);
onePagePrev.addEventListener("click", showPrevImages);

function addInfoCards() {
  const arrayImages = [...images];
  const arrayNames = [...names];

  if (screen.width < 1110.5 && screen.width > 740.5) {
    arrayImages.length = 6;
    arrayNames.length = 6;
  }

  if (screen.width < 740.5) {
    arrayImages.length = 3;
    arrayNames.length = 3;
  }

  arrayImages.forEach(
    (el) => (el.style.backgroundImage = finallyArray[j++].img)
  );
  arrayNames.forEach((el) => (el.textContent = finallyArray[j1++].name));
}

function showPrevImages() {
  if (screen.width > 1110.5) {
    j = j - 16;
    j1 = j1 - 16;
  }

  if (screen.width < 1110.5 && screen.width > 740.5) {
    j = j - 12;
    j1 = j1 - 12;
  }

  if (screen.width < 740.5) {
    j = j - 6;
    j1 = j1 - 6;
  }
  addInfoCards();
}

finishPage.addEventListener("click", showLastPage);
startPage.addEventListener("click", showStartPage);

function showStartPage() {
  j = 0;
  j1 = 0;

  addInfoCards();
}

function showLastPage() {
  if (screen.width > 1110.5) {
    j = 40;
    j1 = 40;
  }

  if (screen.width < 1110.5 && screen.width > 740.5) {
    j = 42;
    j1 = 42;
  }

  if (screen.width < 740.5) {
    j = 42;
    j1 = 42;
  }

  addInfoCards();
}

//popup

const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup--content");
const petName = document.querySelectorAll(".card--info p");

cards.forEach((el) => el.addEventListener("click", openPopup));

function openPopup(e) {
  document.body.classList.add("locker");

  let number = e.target.parentNode.id * 1;

  const current = finallyArray.find((el) => {
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
}

window.addEventListener("click", closePopup);
document
  .querySelector(".popup-close")
  .addEventListener("click", closePopupCross);

function closePopupCross() {
  popupContent.style.opacity = "0";
  document.querySelector(".popup-close").style.opacity = "0";
  popup.style.visibility = "hidden";
  document.body.classList.remove("locker");
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
    document.body.classList.remove("locker");
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
