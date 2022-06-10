playPauseButtonPlayer.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseIcon.src = './assets/pause.svg';
    } else {
        audioElement.pause();
        playPauseIcon.src = './assets/Play.svg';
    }
});