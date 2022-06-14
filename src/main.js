const api = axios.create({
    baseURL: 'https://spotify23.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },
});

// Utils

const readURL = () => {
    const params = {};

    // location.hash: category=36-History?page=1&valor2=num2&valor3=num3
    // ['category=36-History', 'page=1&valor2=num2&valor3=num3']
    const [ hash, queryParams] = location.hash.split('?');
    let [ , query ] = hash.split('='); // ['category', '36-History']
    query = query.replaceAll('%20', ' ');
    const queryParamsArray = queryParams ? queryParams.split('&') : [];
    // page=1&valor2=num2&valor3=num3 => 
    // ['page=1', 'valor2=num2', 'valor3=num3']
    
    queryParamsArray.forEach((param) => {
        const [ paramName, paramValue ] = param.split('=');
        params[paramName] = paramValue;
    });
    // params: {
    //     page: 2,
    //     valor2: algo,
    //     valor3: algo,
    // }

    let { page } = params;
    page = page ? parseInt(page) : 1;

    return {
        hash,
        page,
        params,
        query,
    };
}

function buildAlbumInfo({tracks, album, list, endpoint = '', id = ''}) {
    const fragment = new DocumentFragment();

    list.innerHTML = '';

    tracks.forEach((track) => {

        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        const trackImageContainer = document.createElement('div');
        trackImageContainer.classList.add('track-image');
        const trackImg = document.createElement('img');
        trackImg.setAttribute(
            'src',
            album.images[2].url
        );
        trackImg.setAttribute(
            'alt',
            album.name
        );
        trackImageContainer.appendChild(trackImg);
        trackItem.appendChild(trackImageContainer);

        const trackInfo = document.createElement('div');
        trackInfo.classList.add('track-info');
        const trackTitle = document.createElement('span');
        trackTitle.classList.add('track-title');
        const trackArtist = document.createElement('span');
        trackArtist.classList.add('track-artist');
        
        trackTitle.innerText = track.name;

        let artistList = [];
        track.artists.forEach(artist => artistList.push(artist.name));
        trackArtist.innerText = artistList.reduce((prev, current) =>{
            return prev.concat(', ', current);
        });

        trackItem.addEventListener('click', () => {
            location.hash = `player=${track.id}-${track.name}?${endpoint}=${id}`;
        });

        trackInfo.appendChild(trackTitle);
        trackInfo.appendChild(trackArtist);
        trackItem.appendChild(trackInfo);

        fragment.appendChild(trackItem);
    });

    list.appendChild(fragment);

    albumInfoCoverImg.setAttribute(
        'src',
        album.images[1].url
    );
    albumInfoCoverImg.setAttribute(
        'alt',
        album.name
    );

    albumInfoName.innerText = album.name;

    let artistList = [];
    album.artists.forEach(artist => artistList.push(artist.name));
    albumInfoArtist.innerText = artistList.reduce((prev, current) =>{
        return prev.concat(', ', current);
    });
}

function buildTracksElements(tracks, list, endpoint = '', query = '') {
    const fragment = new DocumentFragment();

    list.innerHTML = '';

    tracks.forEach((trackObject) => {
        const track = trackObject.data;

        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        const trackImageContainer = document.createElement('div');
        trackImageContainer.classList.add('track-image');
        const trackImg = document.createElement('img');
        trackImg.setAttribute(
            'src',
            track.albumOfTrack.coverArt.sources[1].url
        );
        trackImg.setAttribute(
            'alt',
            track.name
        );
        trackImageContainer.appendChild(trackImg);
        trackItem.appendChild(trackImageContainer);

        const trackInfo = document.createElement('div');
        trackInfo.classList.add('track-info');
        const trackTitle = document.createElement('span');
        trackTitle.classList.add('track-title');
        const trackArtist = document.createElement('span');
        trackArtist.classList.add('track-artist');
        
        trackTitle.innerText = track.name;

        let artistList = [];
        track.artists.items.forEach(item => artistList.push(item.profile.name));
        trackArtist.innerText = artistList.reduce((prev, current) =>{
            return prev.concat(', ', current);
        });

        trackItem.addEventListener('click', () => {
            location.hash = `player=${track.id}-${track.name}?${endpoint}=${query}`;
        });

        trackInfo.appendChild(trackTitle);
        trackInfo.appendChild(trackArtist);
        trackItem.appendChild(trackInfo);

        fragment.appendChild(trackItem);
    });

    list.appendChild(fragment);
}

function buildAlbumElements(albums, list) {
    const fragment = new DocumentFragment();

    list.innerHTML = "";

    albums.forEach((albumObject) => {
        const album = albumObject.data;

        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        
        const albumCoverContainer = document.createElement('div');
        albumCoverContainer.classList.add('album-cover');

        const albumImg = document.createElement('img');
        albumImg.setAttribute(
            'src',
            album.coverArt.sources[0].url
        );
        albumImg.setAttribute(
            'alt',
            album.name
        );
        
        albumCoverContainer.appendChild(albumImg);
        albumItem.appendChild(albumCoverContainer);

        const albumTitleSpan = document.createElement('span');
        albumTitleSpan.classList.add('album-title');
        albumTitleSpan.innerText = album.name;
        
        const [ _, __, id ] = album.uri.split(':')

        albumItem.addEventListener('click', () => {
            location.hash = `album=${id}-${album.name}`;
        });

        albumItem.appendChild(albumTitleSpan);
        fragment.appendChild(albumItem);
    });

    list.appendChild(fragment);
}

function buildArtistElements(artists, list) {
    const fragment = new DocumentFragment();

    list.innerHTML = "";

    artists.forEach((artistObject) => {
        const artist = artistObject.data;

        const artistItem = document.createElement('div');
        artistItem.classList.add('artist-item');
        
        const artistImgContainer = document.createElement('div');
        artistImgContainer.classList.add('artist-avatar');

        const artistImg = document.createElement('img');
        artistImg.setAttribute(
            'src',
            artist.visuals.avatarImage?.sources[1].url
        );
        artistImg.setAttribute(
            'alt',
            artist.profile.name
        );
        
        artistImgContainer.appendChild(artistImg);
        artistItem.appendChild(artistImgContainer);

        const artistNameSpan = document.createElement('span');
        artistNameSpan.classList.add('album-name');
        artistNameSpan.innerText = artist.profile.name;
        
        const [ _, __, id ] = artist.uri.split(':')

        artistItem.addEventListener('click', () => {
            location.hash = `artist=${id}-${artist.profile.name}`;
        });

        artistItem.appendChild(artistNameSpan);
        fragment.appendChild(artistItem);
    });

    list.appendChild(fragment);
}

function UpdatePlayerInfo(track, fromPlayer = false) {
    imgPlayer.setAttribute(
        'src',
        track.album.images[1].url
    );
    imgPlayer.setAttribute(
        'alt',
        track.name
    );
    imgPlayer.classList.remove('default');

    trackNamePlayer.innerText = track.name;

    let artistList = [];
    track.artists.forEach(artist => artistList.push(artist.name));
    artistNamePlayer.innerText = artistList.reduce((prev, current) =>{
        return prev.concat(', ', current);
    });

    musicPlayer.currentTrack = track;
    // audioElement.setAttribute(
    //     'src',
    //     track.preview_url
    // )
}

function UpdateArtistInfo(artist) {
    artistImgProfile.setAttribute(
        'src',
        artist.images[1].url
    );
    artistImgProfile.setAttribute(
        'alt',
        artist.name
    );

    artistNameProfile.innerText = artist.name;
}

// API calls

async function getSearchResults(query) {
    const { data } = await api('search/', {
        params: {
            type: 'multi',
            q: query,
            limit: 10,
        }
    });

    const artists = data.artists.items;
    const albums = data.albums.items;
    const tracks = data.tracks.items;

    const endpoint = 'search';

    console.table("artists:", artists,"albums:", albums,"tracks:", tracks);
    buildTracksElements(tracks, trackSearchList, endpoint, query);
    buildAlbumElements(albums, albumSearchList);
    buildArtistElements(artists, artistSearchList);
}

async function getTrackById(id) {
    const { data } = await api('tracks/', {
        params: {
            'ids': id,
        }
    });

    const track = data.tracks[0];
    
    console.log(track);
    UpdatePlayerInfo(track);
}

async function getAlbumById(id) {
    const { data } = await api('albums/', {
        params: {
            'ids': id,
        }
    });

    console.log(data);
    const album = data.albums[0];
    const tracks = album.tracks.items;
    const endpoint = 'album'
    
    buildAlbumInfo({
        tracks: tracks,
        album: album,
        list: genericListTracksSection,
        endpoint: endpoint,
        id: id,
        });
}

async function getArtistById(id) {
    const { data } = await api('artists/', {
        params: {
            'ids': id,
        }
    });

    console.log(data);
    const artist = data.artists[0];
   
    UpdateArtistInfo(artist);
}

async function getArtistSinglesById(id){
    const { data, status } = await api('artist_singles/', {
        params: {
            'id': id,
        }
    });

    console.log(data, status);
}   

async function getArtistAlbumsById(id){

}
