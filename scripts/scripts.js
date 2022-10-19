const html = document.querySelector('html');
const playButton = document.querySelectorAll('.play-image');
const strVideo = document.querySelector('.strategy__video');
const presentationText = document.querySelector('.presentation__text-block');
const presentationVideo = document.querySelector('.presentation__video');
const architectureTitle = document.querySelector('.architecture__title');
const architectureSubtitle = document.querySelector('.architecture__subtitle');
const architectureVideo = document.querySelector('.architecture__video');
const vrSimulatorVideos = document.querySelectorAll('.vr-simulator__video');
const menuJumpButton = document.querySelector('.menu-jump');

const vrIntegr = document.querySelector('.VR-integr');
const strategy = document.querySelector('.strategy');
const linkText = document.querySelectorAll('.link-text');
const presentation = document.querySelector('.presentation');
const orderPresent = document.querySelector('.order-present');
const architecture = document.querySelector('.architecture');
const architecturePresent = document.querySelector('.architecture-present');
const vrStudy = document.querySelector('.vrstudy');
const vrSimulator = document.querySelectorAll('.vr-simulator');
const formBlock = document.querySelector('.box');
const contactIndo = document.querySelector('.contact-info');

console.log(vrIntegr.offsetLeft);
console.log(strategy.offsetLeft);

document.querySelector('.body').addEventListener('click', (evt) => {
  if(evt.target.classList.contains('play-image')){
    evt.target.classList.add('play-image_hidden');
  };
  switch(evt.target){
    case playButton[0]: strVideo.classList.add('iframe-visible');
    setTimeout(() => strVideo.classList.add('strategy__video_visible'), 300);
    break
    case playButton[1]: presentationText.classList.add('presentation__text-block_hidden');
    presentationVideo.classList.add('iframe-visible');
    setTimeout(() => presentationVideo.classList.add('presentation__video_visible'), 300);
    break
    case playButton[2]: architectureTitle.classList.add('architecture__title_hidden');
    architectureSubtitle.classList.add('architecture__subtitle_hidden');
    architectureVideo.classList.add('iframe-visible');
    setTimeout(() => architectureVideo.classList.add('architecture__video_visible'), 300);
    break
    case playButton[3]: vrSimulatorVideos[0].classList.add('iframe-visible');
    setTimeout(() => vrSimulatorVideos[0].classList.add('vr-simulator__video_visible'), 300);
    break
    case playButton[4]: vrSimulatorVideos[1].classList.add('iframe-visible');
    setTimeout(() => vrSimulatorVideos[1].classList.add('vr-simulator__video_visible'), 300);
    break
    case playButton[5]: vrSimulatorVideos[2].classList.add('iframe-visible');
    setTimeout(() => vrSimulatorVideos[2].classList.add('vr-simulator__video_visible'), 300);
    break
  }
})

menuJumpButton.addEventListener('click', () => {
  window.scrollTo({ top:0, left:0, behavior: 'smooth'});
});

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {

    //alert("Вы используете мобильное устройство (телефон или планшет).")

} else {
  //alert("Вы используете ПК.");
  //change vertical scroll to horizontal
  document.addEventListener('wheel', (evt) => {
	//console.log(evt);
	html.scrollLeft += evt.deltaY;
});
}

let touchstartX = 0
let touchendX = 0
    
function checkDirection() {
  if (touchendX < touchstartX) alert('swiped left!')
  if (touchendX > touchstartX) alert('swiped right!')
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})