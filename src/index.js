const tag = document.createElement('script');
const form = document.getElementById("formQuestion");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
let formShown = false; 

function onYouTubeIframeAPIReady(){
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'Atpj2UsF65M',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

const onPlayerReady = (event) =>{
  event.target.playVideo();
}

let done = false;
const onPlayerStateChange = (event) =>{
  console.log(event.target);
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setInterval(seekProgress, 500)
  }
}

const seekProgress = () =>{
  let progress = Math.round(player.getCurrentTime())
  if (progress == 70 && !formShown) { 
    pauseVideo();
    showQuestion();
    formShown = true; 
  }
}

const pauseVideo = () =>{
  player.pauseVideo();
}

const showQuestion = () =>{
  document.getElementById('formQuestion').style.display = 'block';
}

const hideQuestion = () =>{
  document.getElementById('formQuestion').style.display = 'none';
}

const btnConfirm = document.getElementById("btn");
btnConfirm.addEventListener("click", (event) => {
  event.preventDefault();
  const radios = document.querySelectorAll(".question");
  let responseSelected = "";

  radios.forEach((radio) => {
    if (radio.checked) {
      responseSelected = radio.value;
    }
  });

  if (responseSelected === "correcta") {
    hideQuestion();
    player.playVideo();
  } else if (responseSelected === "incorrecta") {
    errorAlert();
  } else {
  nullAlert()
  }
});



const errorAlert = () => {
  const alert = `
    <div class="alert alert-danger" role="alert">
      Respuesta incorrecta
    </div>
  `;
  document.getElementById('alertContainer').innerHTML = alert;
}

const nullAlert = () => {
  const alert = `
    <div class="alert alert-info" role="alert">
      Selecciona una opción
    </div>
  `;
  document.getElementById('alertContainer').innerHTML = alert;
}