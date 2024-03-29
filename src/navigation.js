import {
    topSongsSection,
    playerSection,
    artistSection,
    albumInfoSection,
    searchResultsSection,
    mainTitle,
    sectionTitle,
    searchSectionTitle,
    searchQuerySpan,
    backButton,
    searchBox,
    searchInput,
    searchButton,
    playPauseButtonPlayer,
    playPauseIcon,
    audioElement,
    durationSpan,
    seeMoreAlbums,
    genericListAlbumsSection,
    genericListTracksSection,
} from './modules';

import { 
    readURL,
    getSearchResults,
    getTrackById,
    getAlbumById,
    getArtistById,
    getArtistAlbumsById,
    getPaginatedAlbumsById,
    searchPageSkeletons,
    artistPageSkeletons,
    albumPageSkeletons,
    playerSkeletons,
} from './main.js';

import {
    progressBar,
    convertSeconds
} from './musicPlayer';

export const paginationVars = {
    'itemsLeft': undefined,
    'printedItems': 0
};

let infiniteScroll;

backButton.addEventListener('click', () => {
    history.back();
});

//Evitar que al enviar el formulario este modifique la URL con su comportamiento default, 
// para así tener el control sobre esta.
document.querySelector('form').addEventListener('submit', (event)=> {
    event.preventDefault();
}, false);

searchButton.addEventListener('click', () =>{
    const query = searchInput.value.trim();
    location.hash = `search=${query}`;
}, false);

searchInput.addEventListener('keyup', (event) => {
    if(event.key === 'Enter'){
        const query = searchInput.value.trim();
    location.hash = `search=${query}`;
    }
});

// seeMoreSingles.addEventListener('click', () => {
//     const { query } = readURL();
//     location.hash = `artist-singles=${query}`;
// });

seeMoreAlbums.addEventListener('click', () => {
    const { query } = readURL();
    location.hash = `artist-albums=${query}`;
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    if (infiniteScroll) {
        window.removeEventListener('scroll', function (e) {infiniteScroll(e)}, {passive: false});
        infiniteScroll = undefined;
    }

    paginationVars.printedItems = 0;

    if (location.hash.startsWith('#player=')) {
        playerPage();
    } else if (location.hash.startsWith('#artist=')) {
        artistPage();
    } else if (location.hash.startsWith('#artist-albums=')) {
        artistAlbumsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#album=')) {
        albumPage();
    } else {
        homePage();
    }

    if (infiniteScroll) {
        window.addEventListener('scroll', function(e) {infiniteScroll(e)}, {passive: false});
    }

    document.documentElement.scrollTop = 0;
    searchInput.value = '';
}

function homePage() {
    mainTitle.classList.remove('inactive');
    sectionTitle.classList.add('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.add('inactive');
    searchBox.classList.remove('inactive');

    topSongsSection.classList.remove('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.add('inactive');
}

function playerPage() {
    mainTitle.classList.add('inactive');
    sectionTitle.classList.add('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.add('inactive');

    topSongsSection.classList.add('inactive');
    playerSection.classList.remove('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.add('inactive');

    const { query } = readURL();

    const [ id, _] = query.split('-');

    playerSkeletons();

    getTrackById(id);
    progressBar();

    audioElement.addEventListener('canplay', () => {
        audioElement.play();
        progressBar();
        
        audioElement.paused ? (
            playPauseButtonPlayer.classList.remove('pause'),
            playPauseIcon.src = './assets/Play.svg'
        )
        : (
            playPauseButtonPlayer.classList.add('pause'),
            playPauseIcon.src = './assets/pause.svg'
        );

        durationSpan.innerHTML = convertSeconds(audioElement.duration);
    })
}

function artistPage() {
    mainTitle.classList.add('inactive');
    sectionTitle.classList.add('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.add('inactive');

    topSongsSection.classList.add('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.remove('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.add('inactive');

    const { query } = readURL();

    const [ id, _ ] = query.split('-');
    
    artistPageSkeletons();
    
    getArtistById(id);     
    getArtistAlbumsById(id); 



    infiniteScroll = getPaginatedAlbumsById(id);
}

function artistAlbumsPage() {
    mainTitle.classList.add('inactive');
    sectionTitle.classList.remove('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.add('inactive');
    sectionTitle.innerText = 'Albums';

    topSongsSection.classList.add('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.remove('inactive');
    genericListTracksSection.classList.add('inactive');
}

// function artistSinglesPage() {
//     mainTitle.classList.add('inactive');
//     sectionTitle.classList.remove('inactive');
//     searchSectionTitle.classList.add('inactive');
//     backButton.classList.remove('inactive');
//     searchBox.classList.add('inactive');
//     sectionTitle.innerText = 'Singles';

//     topSongsSection.classList.add('inactive');
//     playerSection.classList.add('inactive');
//     artistSection.classList.add('inactive');
//     albumInfoSection.classList.add('inactive');
//     searchResultsSection.classList.add('inactive');
//     genericListAlbumsSection.classList.add('inactive');
//     genericListTracksSection.classList.remove('inactive');
// }

function searchPage() {
    mainTitle.classList.add('inactive');
    sectionTitle.classList.add('inactive');
    searchSectionTitle.classList.remove('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.remove('inactive');

    topSongsSection.classList.add('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.remove('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.add('inactive');

    const { query } = readURL();

    searchQuerySpan.innerHTML = query;
    
    searchPageSkeletons(10);
    getSearchResults(query);
}

function albumPage() {
    mainTitle.classList.add('inactive');
    sectionTitle.classList.add('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.add('inactive');

    topSongsSection.classList.add('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.remove('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.remove('inactive');

    const { query } = readURL();

    const [ id, _ ] = query.split('-');

    albumPageSkeletons();
    getAlbumById(id);
}

