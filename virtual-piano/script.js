const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
window.addEventListener('keydown', function(e){
  const audio = document.querySelector(`audio[data-key="${e.code}"]`)
  if(!audio) return;
  playAudio(audio)
});

piano.addEventListener('click', (event) => {
  if(event.target.classList.contains('piano-key')) {
    playAudio(src);
  }   
});

function playAudio(audio) {
  audio.currentTime = 0;
  audio.play();
}