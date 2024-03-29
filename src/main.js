import {
    imgPlayer,
    trackNamePlayer,
    artistNamePlayer,
    currentTimeSpan,
    durationSpan,
    artistImgProfile,
    artistNameProfile,
    albumInfoCoverImg,
    albumInfoName,
    albumInfoArtist,
    artistSinglesList,
    artistAlbumsList,
    genericListTracksSection,
    trackSearchList,
    albumSearchList,
    artistSearchList,
    artistPictureSourceProfile,
    albumInfoCoverDiv
} from './modules'

import { paginationVars } from "./navigation";

import { musicPlayer } from "./musicPlayer";

import axios from "axios";

export const api = axios.create({
    baseURL: 'https://spotify23.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Key': process.env.API_KEYA,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    },

});

console.log(process.env.API_KEYA);
// Utils

export const readURL = () => {
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

const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

export function setDefaultImage(target) {
    target.src = './assets/default.jpg';
    target.alt = 'default image';
}

export function buildAlbumInfo({tracks, album, list, endpoint = '', id = ''}) {
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
        trackArtist.innerText = artistList.join(', ');

        trackItem.addEventListener('click', () => {
            location.hash = `player=${track.id}-${track.name}?${endpoint}=${id}`;
        });

        trackInfo.appendChild(trackTitle);
        trackInfo.appendChild(trackArtist);
        trackItem.appendChild(trackInfo);

        fragment.appendChild(trackItem);
    });
    list.appendChild(fragment);

    albumInfoCoverDiv.classList.remove('skeleton')
    albumInfoCoverImg.classList.remove('inactive');
    albumInfoCoverImg.setAttribute(
        'src',
        album.images[1].url
    );
    albumInfoCoverImg.setAttribute(
        'alt',
        album.name
    );

    albumInfoName.innerText = album.name;
    albumInfoArtist.innerText = album.artists.map(artist => artist.name).join(', ');
}

export function buildTracksElements(tracks, list, endpoint = '', query = '') {
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
            'data-img',
            track.albumOfTrack.coverArt.sources[1].url
        );
        trackImg.setAttribute(
            'alt',
            track.name
        );

        lazyLoader.observe(trackImg);

        trackImg.addEventListener('error', (e) => setDefaultImage(e.target));

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
        trackArtist.innerText = artistList.join(', ');

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

export function buildSinglesElements(tracks, list, endpoint = '', query = '') {
    const fragment = new DocumentFragment();

    list.innerHTML = '';

    tracks.forEach((trackObject) => {
        const track = trackObject;

        const trackItem = document.createElement('div');
        trackItem.classList.add('track-item');

        const trackImageContainer = document.createElement('div');
        trackImageContainer.classList.add('track-image');
        const trackImg = document.createElement('img');
        trackImg.setAttribute(
            'src',
            track.coverArt.sources[1].url
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

        // let artistList = [];
        // track.artists.items.forEach(item => artistList.push(item.profile.name));
        // trackArtist.innerText = artistList.join(', ');

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

export function buildAlbumElements(albums, list, {nestedData= true, clear = true}) {
    const fragment = new DocumentFragment();

    if (clear) {
        list.innerHTML = "";
    }

    albums.forEach((albumObject) => {
        
        const album = (nestedData) ? albumObject.data: albumObject;

        const albumItem = document.createElement('div');
        albumItem.classList.add('album-item');
        
        const albumCoverContainer = document.createElement('div');
        albumCoverContainer.classList.add('album-cover');

        const albumImg = document.createElement('img');
        albumImg.setAttribute(
            'data-img',
            album.coverArt.sources[0]?.url
        );
        albumImg.setAttribute(
            'alt',
            album.name
        );

        lazyLoader.observe(albumImg);

        albumImg.addEventListener('error', (e) => setDefaultImage(e.target));
        
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

export function buildArtistElements(artists, list) {
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
            'data-img',
            artist.visuals.avatarImage?.sources[1].url
        );
        artistImg.setAttribute(
            'alt',
            artist.profile.name
        );

        lazyLoader.observe(artistImg);

        artistImg.addEventListener('error', (e) => setDefaultImage(e.target));
        
        artistImgContainer.appendChild(artistImg);
        artistItem.appendChild(artistImgContainer);

        const artistNameSpan = document.createElement('span');
        artistNameSpan.classList.add('artist-name');
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

export function UpdatePlayerInfo(track, fromPlayer = false) {
    imgPlayer.setAttribute(
        'src',
        track.album.images[1].url
    );
    imgPlayer.setAttribute(
        'alt',
        track.name
    );
    imgPlayer.classList.remove('default');
    imgPlayer.classList.remove('skeleton');
    
    imgPlayer.addEventListener('error', ()=>{
        imgPlayer.classList.add('default');
        imgPlayer.setAttribute(
            'src',
            './assets/corchea.svg'
        );
    })

    trackNamePlayer.innerText = track.name;

    trackNamePlayer.classList.remove('skeleton');
    artistNamePlayer.classList.remove('skeleton');
    currentTimeSpan.classList.remove('skeleton');
    durationSpan.classList.remove('skeleton');

    currentTimeSpan.innerHTML = '0:00';

    artistNamePlayer.innerText = track.artists.map(artist => artist.name).join(', ');

    musicPlayer.currentTrack = track;
}

export function UpdateArtistInfo(artist) {
    artistImgProfile.setAttribute(
        'src',
        artist.images.filter(image => image.height < 300)[0].url
    );
    artistImgProfile.setAttribute(
        'alt',
        artist.name
    );

    artistPictureSourceProfile.setAttribute(
        'srcset',
        artist.images.filter(image => image.height > 500)[0].url
    );
    artistImgProfile.classList.remove('skeleton');

    artistNameProfile.innerText = artist.name;
}

// API calls

export async function getSearchResults(query) {
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
    buildAlbumElements(albums, albumSearchList, {nestedData: true});
    buildArtistElements(artists, artistSearchList);
}

export async function getTrackById(id) {
    const { data } = await api('tracks/', {
        params: {
            'ids': id,
        }
    });

    const track = data.tracks[0];
    
    console.log(track);
    UpdatePlayerInfo(track);
}

export async function getAlbumById(id) {
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

export async function getArtistById(id) {
    const { data } = await api('artists/', {
        params: {
            'ids': id,
        }
    });

    console.log(data);
    const artist = data.artists[0];
   
    UpdateArtistInfo(artist);
}

export async function getArtistSinglesById(id) {
    const { data, status } = await api('artist_singles/', {
        params: {
            id: id,
            offset: 0,
            limit: 10,
        }
    });
    console.log(data, status);
    const singles = data.data.artist.discography.singles.items.map(item => item.releases.items[0]);
    console.log(singles)
    const endpoint = 'artist'
    const { query } = readURL();
    buildSinglesElements(singles, artistSinglesList, endpoint, query);
}   

export async function getArtistAlbumsById(id, offset = 0) {
    const { data } = await api('artist_albums/', {
        params: {
            id: id,
            offset: offset,
            limit: 10,
        }
    });

    console.log(data);

    const albums = data.data.artist.discography.albums.items.map((item) => item.releases.items[0]);
    const totalAlbums = data.data.artist.discography.albums.totalCount;
    paginationVars.printedItems = albums.length;
    paginationVars.itemsLeft = totalAlbums - paginationVars.printedItems;

    console.log(albums);
    buildAlbumElements(albums, artistAlbumsList, {nestedData: false});
}

// Infinite Scroll functions

export function getPaginatedAlbumsById(id) {
    let offset = 0;
    return async function(event) {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

        const scrollIsBottom = scrollTop + clientHeight >= (scrollHeight - 5);
        
        if (scrollIsBottom) {
            console.log('asas');
            // debugger;
            if (paginationVars.itemsLeft > 0) {
                offset += 10;

                const { data } = await api('artist_albums/', {
                    params: {
                        id: id,
                        offset: offset,
                        limit: 10,
                    }
                });
                console.log(data);
        
                const albums = data.data.artist.discography.albums.items.map((item) => item.releases.items[0]);
                const totalAlbums = data.data.artist.discography.albums.totalCount;
                paginationVars.printedItems += albums.length;
                paginationVars.itemsLeft = totalAlbums - paginationVars.printedItems;
                debugger;
                console.log(albums);
                buildAlbumElements(albums, artistAlbumsList, {nestedData: false, clear: false});
                event.stopPropagation();
            }
        }
    }
}

// Skeletons 

export function albumSkeletons(quantity, list) {
    const albumSkeleton = 
                        `<div class="album-item">
                            <div class="album-cover skeleton"></div>
                            <span class="album-title skeleton"></span>
                        </div>`;

    list.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        list.innerHTML += albumSkeleton;
    }
}

export function trackSkeletons(quantity, list) {
    const trackSkeleton = `<div class="track-item skeleton"></div>`;

    list.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        list.innerHTML += trackSkeleton;
    }
}

export function artistCardSkeletons(quantity, list) {
    const artistSkeleton = 
                        `<div class="artist-item">
                            <div class="artist-avatar skeleton"></div>
                            <span class="artist-name skeleton"></span>
                        </div>`;

    list.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        list.innerHTML += artistSkeleton;
    }
}

export function searchPageSkeletons(quantity) {
    trackSkeletons(quantity, trackSearchList);
    albumSkeletons(quantity, albumSearchList);
    artistCardSkeletons(quantity, artistSearchList);
}

export function artistPageSkeletons() {
    artistImgProfile.classList.add('skeleton');

    artistImgProfile.setAttribute('src','./assets/corchea.svg');
    artistImgProfile.setAttribute('alt','');
    artistPictureSourceProfile.setAttribute('srcset','');
    artistNameProfile.innerText = '';

    albumSkeletons(10, artistAlbumsList);
}

export function albumPageSkeletons() {
    albumInfoCoverDiv.classList.add('skeleton');
    albumInfoCoverImg.classList.add('inactive');
    albumInfoCoverImg.setAttribute('src','');
    albumInfoCoverImg.setAttribute('alt','');
    
    albumInfoName.innerHTML = '';
    albumInfoArtist.innerHTML = '';

    trackSkeletons(10, genericListTracksSection);
}

export function playerSkeletons() {
    trackNamePlayer.classList.add('skeleton');
    artistNamePlayer.classList.add('skeleton');

    trackNamePlayer.innerHTML = '';
    artistNamePlayer.innerHTML = '';
    currentTimeSpan.innerHTML = '';
    durationSpan.innerHTML = '';
    
    imgPlayer.setAttribute('src','./assets/corchea.svg');
    imgPlayer.classList.add('skeleton');
    imgPlayer.classList.add('default');
}


/*
{
    setDefaultImage
    buildAlbumInfo
    buildTracksElements
    buildSinglesElements
    buildAlbumElements
    buildArtistElements
    UpdatePlayerInfo
    UpdateArtistInfo
    getSearchResults
    getTrackById
    getAlbumById
    getArtistById
    getArtistSinglesById
    getArtistAlbumsById
    getPaginatedAlbumsById
    albumSkeletons
    trackSkeletons
    artistCardSkeletons
    searchPageSkeletons
    artistPageSkeletons
    albumPageSkeletons
    playerSkeletons
}
*/