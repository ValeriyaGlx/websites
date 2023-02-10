
//задаём анимацию бургера
const menuIcon = document.querySelector('.menu__icon');
const headerNav = document.querySelector('.header__nav');

menuIcon.addEventListener('click', addNavClass);
function  addNavClass(){
  document.body.classList.toggle('lock');
  headerNav.classList.toggle('active');
  menuIcon.classList.toggle('active');
}


//удаляем классы при клике
const headerLi = document.querySelectorAll('.header__li');

headerLi.forEach(x => x.addEventListener('click', closeMenu));

function closeMenu(){
if(headerNav.classList.contains('active')){
   document.body.classList.remove('lock');
   headerNav.classList.remove('active');
   menuIcon.classList.remove('active');
  }
  
}


//блюрим секции

const buttons = document.querySelectorAll('.service__section--header--button');
const garden = document.querySelectorAll('.garden');
const lawn = document.querySelector('.lawn');
const plant = document.querySelectorAll('.planting')
const sections = document.querySelectorAll('.service__section--section');

let array = [];
let del = [];

buttons.forEach(a => {a.addEventListener('click' , () =>{
sections.forEach(el => el.classList.add('blur'))

array.push(a);



for(let i=0; i<array.length;i++){
  if(array[i]===array[i+1]){
    del = array.splice(i,2); 
   
    del.map(a => {
     a.style.backgroundColor = null;
     a.style.color = null})
  }

  if(array.length==3 && array[i]===array[i+2]){

    array[i].style.backgroundColor = null;
    array[i].style.color = null
    
    array=[array[i+1]]
  }

  if(array.length==0){
    sections.forEach(el => el.classList.remove('blur'))
  }
}


array.forEach(a => {
  a.style.backgroundColor = '#E06733';
  a.style.color = '#fff';
})




if(array.length > 2){
 del = array.splice(0,2); 
 del.map(a => {
  a.style.backgroundColor = null;
  a.style.color = null})
}



if(array.includes(document.getElementById('button__gardens'))){
  garden.forEach(a => a.classList.remove('blur'))
  }

if(array.includes(document.getElementById('button__planting'))){
    plant.forEach(a => a.classList.remove('blur'))
    }

if(array.includes(document.getElementById('button__lawn'))){
      lawn.classList.remove('blur')
      }

})});






  //открываем аккордеон

  const section = document.querySelectorAll('.block');
  const content = document.querySelectorAll('.prices--outside')

  section.forEach(a => a.addEventListener('click', () => {
    
    const item = a.nextElementSibling;
    const blocks = document.querySelectorAll('.prices__section--left--accordeon')
    const block = a.parentNode;
    const divs = document.querySelectorAll('.div')
    const div = item.previousElementSibling.children[1]

   
    if(item.style.maxHeight){
   content.forEach(a => a.style.maxHeight = null);
   blocks.forEach(a => a.style.backgroundColor = '#EDF2EC');

   divs.forEach(a=> a.style.backgroundImage = 'url("./img/arrowClose.svg")');
   divs.forEach(a=> a.style.backgroundColor = '#D9D9D9');
  

    } else {
      blocks.forEach(a => a.style.backgroundColor = '#EDF2EC');
      divs.forEach(a=> a.style.backgroundImage = 'url("./img/arrowClose.svg")');
      divs.forEach(a=> a.style.backgroundColor = '#D9D9D9');
      
      
      content.forEach(a => a.style.maxHeight = null);
      item.style.maxHeight = 150 + 'px';
      block.style.backgroundColor = '#D6E7D2';  
      div.style.backgroundColor = '#AEA1A1';

      div.style.backgroundImage = 'url("./img/arrow.svg")'
      div.style.transform = 'rotate(0deg)';

    }

  }))




  //открываем список городов
  let switcher = 1;
  const cityBlock = document.querySelector('.contact__block');
  const accordeon = document.querySelector('.contacts--accordeon');
  const item = document.querySelector('.contact--outside');

  const arrow = document.querySelector('.contact__div')


  cityBlock.addEventListener('click', () => {
    addres.classList.add('contact__hidden')

    if(switcher==1){
      item.style.maxHeight = 230 + 'px';

      arrow.style.transform = 'rotate(0)';
      arrow.style.backgroundColor = '#8BA07E'
      switcher=2;
      accordeon.style.backgroundColor = '#C1E698'
    } else {
      item.style.maxHeight = null;
      arrow.style.transform = 'rotate(-180deg)';
      arrow.style.backgroundColor = '#AEA1A1';
      accordeon.style.backgroundColor = '#DCE9D9';
      switcher = 1;
    }
  })



  //нажимаем на город

  const city = document.querySelectorAll('.city');
  
  city.forEach(a => a.addEventListener('click', (e) => {

   
    document.querySelector('.contacts__label').innerHTML = e.target.innerHTML.replace(/\<.+/,'').trim();
    item.style.maxHeight = null;
    arrow.style.transform = 'rotate(-180deg)';
    arrow.style.backgroundColor = '#AEA1A1';

    switcher=1;


   
  changeAdress();
  
 
  setTimeout(addAdress, 200)
  }))


  
  //изменяем адрес

  const contacts = document.querySelector('.contacts__label');
  const td = document.querySelectorAll('td');
  const a = document.querySelector('a[href="tel: +1	914	678 0003"');

 const arr =[{
  City: 'Canandaigua, NY',
  Phone: '+1 585	393 0001',
  OfficeAdress: '151 Charlotte Street'
 },

 {
  City: 'Sherrill, NY',
  Phone: '+1 315	908 0004',
  OfficeAdress: '14 WEST Noyes BLVD'
 },

 {
  City: 'New York City',
  Phone: '+1 212	456 0002',
  OfficeAdress: '9 East 91st Street'
 },

 {
  City: 'Yonkers, NY',
  Phone: '+1	212	456 0003',
  OfficeAdress: '511 Warburton Ave'
 }

]



 function changeAdress(){
  for(let i = 0; i < arr.length; i++){
   
   if(arr[i].City === contacts.innerHTML){
    td[0].innerHTML = arr[i].City;
    td[1].innerHTML = arr[i].Phone;
    td[2].innerHTML = arr[i].OfficeAdress;

    a.href = `tel: ${arr[i].Phone}`;
    
   }

  }
 }




  //добавляем адрес
  const addres = document.querySelector('.contact--adress');
  

  function addAdress(){
  addres.classList.remove('contact__hidden')
  }




  
  
  

