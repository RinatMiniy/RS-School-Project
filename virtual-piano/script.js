const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");

window.addEventListener('keydown', function(event){
  const audio = document.querySelector(`audio[data-key="${event.code}"]`);
  const key = document.querySelector(`div[data-key="${event.code}"]`);
  if(!audio) return;
  key.classList.add('active');
  playAudio(audio)
});

piano.addEventListener('click', (event) => {
  if(event.target.classList.contains('piano-key')) {
    const key = event.target.dataset.key;
    audio = document.querySelector(`audio[data-key="${key}"]`);
    event.target.classList.add('active');
    event.target.classList.add('active::before');
    playAudio(audio);
  }   
});

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.piano-key'));
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function removeTransition (event) {
  event.target.classList.remove("active")
}