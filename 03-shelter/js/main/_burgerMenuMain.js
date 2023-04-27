//open burger menu

const menuIcon = document.querySelector('.menu__icon');
const menu = document.querySelector('.menu');

if(window.screen.width < 767.5){
    menuIcon.addEventListener('click', addMenuClass);

    //close menu on link click
    const links = document.querySelectorAll('.menu__link');
    links.forEach(el => el.addEventListener('click', closeMenu))

    //close menu on window click

    window.addEventListener('click', closeSetWindow);
    }

function addMenuClass(){
    if(document.body.classList.contains('lock')){
       closeMenu();
    } else {
        document.body.classList.add('lock');
        menu.style.transform = 'translate(0%, 0px)';
        menuIcon.style.transform = 'rotate(90deg)';
        document.querySelector('.background').style.visibility = 'visible';
    }
}

//close menu on link click

function closeMenu(){
    menu.style.transform = 'translate(100%, 0px)';
    menuIcon.style.transform = 'rotate(0deg)';
    document.body.classList.remove('lock');
    document.querySelector('.background').style.visibility = 'hidden';
}

//close menu on window click
function closeSetWindow(e){
    const modal1 = e.composedPath().includes(menu);
    const modal2 = e.composedPath().includes(menuIcon);

    if(!modal1 && !modal2){
        closeMenu();
    }
}

//export {addMenuClass, closeMenu, closeSetWindow};