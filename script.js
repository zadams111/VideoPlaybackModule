const playPauseButton = document.querySelector(".play-pause-btn");
const video = document.querySelector('video');

playPauseButton.addEventListener('click', togglePlay);


function togglePlay(){
    video.paused? video.play() : video.pause()
}