class Player {
    constructor({
        currentTrack = {},
        playlist = [],
        audioElement,
    }) {
        this._currentTrack = currentTrack;
        this.playlist = playlist;
        this.audioElement = audioElement;
        this.playingIndex = 1;
    }

    async setPlaylist() {
        const { params } = readURL();
        
        if(Object.keys(params)[0] === 'album') {
            const { data } = await api('albums/', {
                params: {
                    ids: params.album,
                }
            });
            
            const tracks = data.albums[0].tracks.items;
            console.log(tracks);
            this.playlist = tracks;
            
        } else if(Object.keys(params)[0] === 'search') {
            const { data } = await api('search/', {
                params: {
                    type: 'tracks',
                    q: decodeURI(params.search),
                    limit: 10,
                }
            });
            
            const tracks = data.tracks.items;
            this.playlist = [];
            tracks.forEach((track) => this.playlist.push(track.data));
            console.log(tracks);
        }

        this.playingIndex = this.playlist.indexOf(
            this.playlist.find((item) => item.id === this._currentTrack.id)
        );
    }
    
    set currentTrack(track) {
        this._currentTrack = track;
        this.audioElement.setAttribute(
        'src',
        track.preview_url
        );
    
        if (Object.keys(readURL().params).length) {
            this.setPlaylist();
        }
    }     

    nextTrack() {
        if (this.playingIndex < this.playlist.length) {
            const { params } = readURL();
            this.playingIndex += 1;
    
            let paramsString = '';
            const paramsArray = Object.entries(params).map((param) => `${param[0]}=${param[1]}`);
            paramsString = paramsArray.reduce((prev, current) => {
                return prev.concat('&', current);
            });
    
            const id = this.playlist[this.playingIndex].id
            location.hash = `#player=${id}?${paramsString}`;
        }
    }

    previousTrack() {
        if(this.playingIndex > 0) {
            const { params } = readURL();
            this.playingIndex -= 1;

            let paramsString = '';
            const paramsArray = Object.entries(params).map((param) => `${param[0]}=${param[1]}`);
            paramsString = paramsArray.reduce((prev, current) => {
                return prev.concat('&', current);
            });

            const id = this.playlist[this.playingIndex].id
            location.hash = `#player=${id}?${paramsString}`;
        }
    }

    playPause() {
        if (this.audioElement.paused) {
            this.audioElement.play();
            playPauseIcon.src = './assets/pause.svg';
            playPauseButtonPlayer.classList.add('pause');
            progressBar();
        } else {
            this.audioElement.pause();
            playPauseIcon.src = './assets/Play.svg';
            playPauseButtonPlayer.classList.remove('pause');
            progressBar();
        }
    }

    toggleLoop (button) {
        this.audioElement.loop = !this.audioElement.loop;
        
        this.audioElement.loop
            ? button.classList.add('loop-on')
            : button.classList.remove('loop-on');
    }
}
    
const musicPlayer = new Player({audioElement});

repeatButtonPlayer.addEventListener('click', () => musicPlayer.toggleLoop(repeatButtonPlayer));
playPauseButtonPlayer.addEventListener('click', () => musicPlayer.playPause());
nextButtonPlayer.addEventListener('click', () => musicPlayer.nextTrack());
backButtonPlayer.addEventListener('click', () => musicPlayer.previousTrack());

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

// async function setTrack(track) {
//     const { params } = readURL();

//     audioElement.setAttribute(
//         'src',
//         track.preview_url
//     );

//     if(Object.keys(params)[0] === 'album') {

//     } else if(Object.keys(params)[0] === 'search') {

//     }
// }