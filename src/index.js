const axios = require('axios').default;
import './navigation.js';
import './musicPlayer.js';

import { 
    readURL, 
    getSearchResults,
    getTrackById,
    getAlbumById,
    getArtistById,
    getArtistSinglesById,
    getArtistAlbumsById
} from './main';