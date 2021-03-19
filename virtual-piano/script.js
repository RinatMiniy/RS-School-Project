const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const btn__notes = document.querySelector(".btn-notes");
const btn__letters = document.querySelector(".btn-letters");
const btn__fullscreen = document.querySelector(".fullscreen");

let allowed = true;

// btn

btn__letters.addEventListener("click", function (event){
  if (event.target.classList.contains("btn-active")) return
  event.target.classList.add("btn-active")
  btn__notes.classList.remove("btn-active")
  pianoKeys.forEach((elem) => {
    console.log(elem)
    elem.classList.add("letter")
  })
});

btn__notes.addEventListener("click", function (event){
  if (event.target.classList.contains("btn-active")) return
  event.target.classList.add("btn-active")
  btn__letters.classList.remove("btn-active")
  pianoKeys.forEach((elem) => {
    console.log(elem)
    elem.classList.remove("letter")
  })
});

btn__fullscreen.addEventListener("click", fullscreen)

function fullscreen() {
  console.log("sdsd")
  if (document.fullscreenElement == null) {
    document.documentElement.requestFullscreen()
  }
  document.exitFullscreen()
}

// mouse

const startSound = (event) => {
  event.target.classList.add("piano-key-active");
  const key = event.target.dataset.key;
  audio = document.querySelector(`audio[data-key="${key}"]`);
  playAudio(audio);
}

const stopSound = (event) => {
  event.target.classList.remove("piano-key-active");
}

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
    const key = event.target.dataset.key;
    audio = document.querySelector(`audio[data-key="${key}"]`);
    playAudio(audio);
  }

  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", startSound)
    elem.addEventListener("mouseout", stopSound)
  });
}

const stopCorrespondOver = () => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.removeEventListener("mouseover", startSound)
    elem.removeEventListener("mouseout", stopSound)
  });
}

document.addEventListener("mousedown", startCorrespondOver, false);
document.addEventListener("mouseup", stopCorrespondOver)

// keyboard

window.addEventListener('keydown', function(event){
  const audio = document.querySelector(`audio[data-key="${event.code}"]`);
  const key = document.querySelector(`div[data-key="${event.code}"]`);
  if(!audio) return;
  if (event.repeat != undefined) {
    allowed = !event.repeat;
  }
  if (!allowed) return;
  allowed = false;
  key.classList.add('piano-key-active');
  playAudio(audio)
});

window.addEventListener('keyup', function(event) {
  const key = document.querySelector(`div[data-key="${event.code}"]`);
  key.classList.remove('piano-key-active');
  allowed = true;
});

// piano.addEventListener('click', (event) => {
//   if(event.target.classList.contains('piano-key')) {
//     const key = event.target.dataset.key;
//     audio = document.querySelector(`audio[data-key="${key}"]`);
//     event.target.classList.add('piano-key-active');
//     event.target.classList.add('active::before');
//     playAudio(audio);
//   }   
// });

// const keys = Array.from(document.querySelectorAll('.piano-key'));
//   keys.forEach(key => key.addEventListener('transitionend', removeTransition));

// function removeTransition (event) {
//   event.target.classList.remove("piano-key-active")
// }


