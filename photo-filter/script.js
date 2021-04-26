const inputs = document.querySelectorAll('.filters input');
let btn__fullscreen = document.querySelector(".fullscreen");
let btn__reset = document.querySelector(".btn-reset");
let btn__next = document.querySelector(".btn-next");
let main__img = document.querySelector("img");
let btn = document.querySelectorAll(".btn");
let btn__load = document.querySelector(".btn-load")
const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
let i = 0;
let base;
let now = new Date();
now = Number(now.getHours());
const fileInput = document.querySelector('input[type="file"]');
const imageContainer = document.querySelector('.img__container');


if (now >= 6 && now < 12) base = 'https://raw.githubusercontent.com/rinatminiy/stage1-tasks/assets/images/morning/';
else if (now >= 12 && now < 18) base = 'https://raw.githubusercontent.com/rinatminiy/stage1-tasks/assets/images/day/';
else if (now >= 0 && now < 6) base = 'https://raw.githubusercontent.com/rinatminiy/stage1-tasks/assets/images/night/';
else base = 'https://raw.githubusercontent.com/rinatminiy/stage1-tasks/assets/images/evening/';

function rangeUpdate() {
  const suffix = this.dataset.sizing;
  let next = this.nextElementSibling;
  next.innerHTML = this.value;
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}


inputs.forEach(input => input.addEventListener("input", rangeUpdate));

fileInput.addEventListener('change', function(e) {
  btn.forEach(elem => {
    if (elem.classList.contains("btn-active")) elem.classList.remove("btn-active")
  })
  btn__load.classList.add("btn-active")
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    imageContainer.innerHTML = "";
    imageContainer.append(img);
  }
  reader.readAsDataURL(file);
});


btn__fullscreen.addEventListener("click", fullscreen)

function fullscreen() {
  if (document.fullscreenElement == null) {
    document.documentElement.requestFullscreen()
  }
  document.exitFullscreen()
}

btn__reset.addEventListener("click", reset)

function reset() {
  btn.forEach(elem => {
    if (elem.classList.contains("btn-active")) elem.classList.remove("btn-active")
  })
  this.classList.add("btn-active")
  inputs.forEach(elem => {
    const suffix = elem.dataset.sizing;
    let next = elem.nextElementSibling;
    elem.value = elem.defaultValue;
    next.innerHTML = elem.value;
    document.documentElement.style.setProperty(`--${elem.name}`, elem.value + suffix);
  })
}

btn__next.addEventListener("click", getImage);

function getImage() { 
  btn.forEach(elem => {
    if (elem.classList.contains("btn-active")) elem.classList.remove("btn-active")
  })
  this.classList.add("btn-active")
  const index = i % images.length;
  const imageSrc = base + images[index];
  viewImage(imageSrc);
  i++;
  // btn__next.disabled = true;
  // setTimeout(function() { btn__next.disabled = false }, 1000);
} 

function viewImage(src) {  
  let main__img = document.querySelector("img");
  const img = new Image();
  img.src = src;
  img.onload = () => {   
    main__img.src = `${src}`;
  }; 
}