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

seeMoreSingles.addEventListener('click', () => {
    const { query } = readURL();
    location.hash = `artist-singles=${query}`;
});

seeMoreAlbums.addEventListener('click', () => {
    const { query } = readURL();
    location.hash = `artist-albums=${query}`;
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    if (location.hash.startsWith('#player=')) {
        playerPage();
    } else if (location.hash.startsWith('#artist=')) {
        artistPage();
    } else if (location.hash.startsWith('#artist-albums=')) {
        artistAlbumsPage();
    } else if (location.hash.startsWith('#artist-singles=')) {
        artistSinglesPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#album=')) {
        albumPage();
    } else {
        homePage();
    }
}

function homePage() {
    console.log('home');

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
    console.log('player');

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
    console.log('artist');

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

    const [ id, _] = query.split('-');
 
    getArtistById(id);    
    getArtistSinglesById(id);    
    // getArtistAlbumsById(id);    
}

function artistAlbumsPage() {
    console.log('artistAlbums');

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

function artistSinglesPage() {
    console.log('ArtistSingles');

    mainTitle.classList.add('inactive');
    sectionTitle.classList.remove('inactive');
    searchSectionTitle.classList.add('inactive');
    backButton.classList.remove('inactive');
    searchBox.classList.add('inactive');
    sectionTitle.innerText = 'Singles';

    topSongsSection.classList.add('inactive');
    playerSection.classList.add('inactive');
    artistSection.classList.add('inactive');
    albumInfoSection.classList.add('inactive');
    searchResultsSection.classList.add('inactive');
    genericListAlbumsSection.classList.add('inactive');
    genericListTracksSection.classList.remove('inactive');
}

function searchPage() {
    console.log('Search');

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

    getSearchResults(query);
}

function albumPage() {
    console.log('album');

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

    const [ id, _] = query.split('-');

    getAlbumById(id);
}

