// Sections
const topSongsSection = document.querySelector('section.top-songs');
const playerSection = document.querySelector('section.player');
const artistSection = document.querySelector('section.artist');
const albumInfoSection = document.querySelector('section.album-info-section');
const searchResultsSection = document.querySelector('section.search-results-list');

// Elements
const mainTitle = document.querySelector('h1.header__main-title');
const sectionTitle = document.querySelector('h1.header__section-title');
const searchSectionTitle = document.querySelector('h1.search-section-title');
const searchQuerySpan = document.querySelector('span.search-query');
const backButton = document.querySelector('button.header__back-button');
const searchBox = document.querySelector('.header__search');
const searchInput = document.querySelector('.header__search input');
const searchButton = document.querySelector('.header__search button');

const imgPlayer = document.querySelector('.player__image-section__container img');
const trackNamePlayer = document.querySelector('h3.player__info__track-name');
const artistNamePlayer = document.querySelector('h4.player__info__artist');
const repeatButtonPlayer = document.querySelector('.player__buttons-panel button:nth-of-type(1)');
const backButtonPlayer = document.querySelector('.player__buttons-panel button:nth-of-type(2)');
const playPauseButtonPlayer = document.querySelector('.player__buttons-panel button:nth-of-type(3)');
const nextButtonPlayer = document.querySelector('.player__buttons-panel button:nth-of-type(4)');
const randomButtonPlayer = document.querySelector('.player__buttons-panel button:nth-of-type(5)');
const playPauseIcon = document.querySelector('.player__buttons-panel button.big img');
const audioElement = document.querySelector('audio');

const artistImgProfile = document.querySelector('.artist__profile .artist-image img');
const artistNameProfile = document.querySelector('.artist__profile .artist-name');
const seeMoreSingles = document.querySelector('.artist__singles__title button');
const seeMoreAlbums = document.querySelector('.artist__albums__title button');

const albumInfoCoverImg = document.querySelector('.album-info__cover img');
const albumInfoName = document.querySelector('h1.album-info__title');
const albumInfoArtist = document.querySelector('h2.album-info__artist');

// Lists

const topSongsList = document.querySelector('.top-songs__list');

const artistSinglesList = document.querySelector('.artist__singles__list');
const artistAlbumsList = document.querySelector('.artist__albums__list');

const genericListAlbumsSection = document.querySelector('section.generic-list--albums');
const genericListTracksSection = document.querySelector('section.generic-list--tracks');

const trackSearchList = document.querySelector('.tracks-list');
const albumSearchList = document.querySelector('.albums-list');
const artistSearchList = document.querySelector('.artists-list');