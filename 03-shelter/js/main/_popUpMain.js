//poup

let petsJSON = petsData;

const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup--content')
const cards = document.querySelectorAll('.our-friends__card');

const petName = document.querySelectorAll('.card--info p');


cards.forEach(el => el.addEventListener('click', openPopup))

function openPopup(e){
    let number = e.target.parentNode.id*1;
    console.log(number);
    document.querySelector('.popup--content-right h3').textContent = petsJSON[number].name;
    document.querySelector('.popup--content-left').style.backgroundImage = petsJSON[number].img;
    document.querySelector('.popup--content-right h4').textContent = `${petsJSON[number].type} - ${petsJSON[number].breed}`;
    document.querySelector('.popup--content-right p').textContent = petsJSON[number].description;
    document.querySelector('.Inoculations').textContent = petsJSON[number].inoculations;
    document.querySelector('.Diseases').textContent = petsJSON[number].diseases;
    document.querySelector('.Parasites').textContent = petsJSON[number].parasites;

    popup.style.visibility = 'visible';
    popupContent.style.opacity = '1';

    document.querySelector('.popup-close').style.opacity = '1';

    document.body.classList.add('lock');
}

window.addEventListener('click', closePopup);

function closePopup(e){
    const modal1 = e.composedPath().includes(document.querySelector('.popup'));
    const modal2 = e.composedPath().includes(document.querySelector('.popup--content'));

    if(modal1 && !modal2){
        popupContent.style.opacity = '0';
        document.querySelector('.popup-close').style.opacity = '0';
        popup.style.visibility = 'hidden';
        document.body.classList.remove('lock');
    }
}
