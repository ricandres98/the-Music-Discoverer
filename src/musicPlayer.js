repeatButtonPlayer.addEventListener('click', () => {
    audioElement.loop = !audioElement.loop;
    audioElement.loop
        ? repeatButtonPlayer.classList.add('loop-on')
        : repeatButtonPlayer.classList.remove('loop-on')
});

playPauseButtonPlayer.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseIcon.src = './assets/pause.svg';
        playPauseButtonPlayer.classList.add('pause');
        progressBar();
    } else {
        audioElement.pause();
        playPauseIcon.src = './assets/Play.svg';
        playPauseButtonPlayer.classList.remove('pause');
        progressBar();
    }
});

function progressBar() {

    const interval = setInterval(() => {
        if(!audioElement.paused) {
            const duration = audioElement.duration;
            const currentTime = audioElement.currentTime;
            const progress = currentTime / duration;

            partialProgressBar.style.width = progress * 100 + '%';

            currentTimeSpan.innerHTML = convertSeconds(currentTime);
            durationSpan.innerHTML = '-' + convertSeconds(duration - currentTime);
        } else {
            clearInterval(interval);
        }

        if (audioElement.ended) {
            playPauseIcon.src = './assets/Play.svg';
            playPauseButtonPlayer.classList.remove('pause');
        }
    }, 150);

    return interval;
}

function convertSeconds(timeInSeconds) {
    const fullSecondsInput = approximate(timeInSeconds);
    let looseSeconds = fullSecondsInput;

    const minutes = Math.floor(fullSecondsInput / 60);
    looseSeconds -= (minutes * 60);

    return (looseSeconds >= 10) 
        ? `${minutes}:${looseSeconds}` 
        : `${minutes}:0${looseSeconds}`;
}

function approximate(value) {
    let valueApproximated = Math.floor(value);
    const diff = (value - valueApproximated) * 1000;

    if (diff >= 500) {
        valueApproximated += 1;
    }

    return valueApproximated;
}