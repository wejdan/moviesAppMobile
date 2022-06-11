import axios from 'axios';
const img_url = 'https://image.tmdb.org/t/p/w500';
const APP_KEY = '3a09d1aaa11cd72ec6615fa67198c6e2';
export async function getPopularMovies() {
  // You can await here

  const res = await axios(
    'https://api.themoviedb.org/3/movie/popular?api_key=3a09d1aaa11cd72ec6615fa67198c6e2&language=en-US&page=1',
  );

  return res.data.results;

  // ...
}
export async function getPopular(type, name) {
  // You can await here

  const res = await axios(
    `https://api.themoviedb.org/3/${type}/${name}?api_key=3a09d1aaa11cd72ec6615fa67198c6e2&language=en-US&page=1`,
  );

  return res.data.results;

  // ...
}
export async function getCast(id) {
  const credits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APP_KEY}`;
  const res = await fetch(credits);
  const data = await res.json();

  let cast = [];
  if (data.cast) {
    for (let i = 0; i < 5; i++) {
      if (data.cast[i].name) {
        cast.push(data.cast[i].name);
      }
    }
    return cast.toString();
  }
}

export async function getVideos(id, mediaType) {
  const videos = `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${APP_KEY}`;
  const res = await fetch(videos);
  const data = await res.json();

  let maxClips = data.results.length < 7 ? data.results.length : 5;
  return data.results;
}

export async function getRecommendations(id, type) {
  const recommendations = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${APP_KEY}`;
  const res = await fetch(recommendations);
  const data = await res.json();
  return data.results;
}
export async function getMovieDetails(id, mediaType) {
  // You can await here
  const res = await axios(
    `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=3a09d1aaa11cd72ec6615fa67198c6e2&language=en-US`,
  );

  res.data.backdrop_path = img_url + res.data.backdrop_path;

  return res.data;

  // ...
}
export async function getMovesBySearch(search_word, searchType, page) {
  const search_url = `https://api.themoviedb.org/3/search/${searchType}?query=${search_word}&api_key=${APP_KEY}&page=${page}`;
  const response = await fetch(search_url);
  const results = await response.json();
  return results.results;
}
export async function getMovesByGeners(id, media, page) {
  if (!page) {
    page = Math.floor(Math.random() * 3) + 1;
  }
  let movie_genres_http = `https://api.themoviedb.org/3/discover/${media}?with_genres=${id}&api_key=${APP_KEY}&page=${page}`;

  const response = await fetch(movie_genres_http);
  const results = await response.json();

  return results.results;
}

export async function getAllGeners(media) {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${media}/list?api_key=${APP_KEY}`,
  );
  const results = await response.json();
  return results.genres;
}

export async function AddToWatch(
  account_id,
  media_type,
  session_id,
  movie_id,
  isAdd,
) {
  let FavoriteMovies_url = `https://api.themoviedb.org/3/account/${account_id}/watchlist?session_id=${session_id}&api_key=${APP_KEY}`;
  const data = {
    media_type: media_type,
    media_id: movie_id,
    watchlist: isAdd,
  };

  const results = await axios.post(FavoriteMovies_url, data);
  return results.data;
}

export async function MarkAsFavourite(
  account_id,
  media_type,
  session_id,
  movie_id,
  isAdd,
) {
  let FavoriteMovies_url = `https://api.themoviedb.org/3/account/${account_id}/favorite?session_id=${session_id}&api_key=${APP_KEY}`;
  const data = {
    media_type: media_type,
    media_id: movie_id,
    favorite: isAdd,
  };

  const results = await axios.post(FavoriteMovies_url, data);
  return results.data;
}
export async function getFavoriteMovies(page, media, session_id, account) {
  let FavoriteMovies_url = `https://api.themoviedb.org/3/account/${account}/favorite/${media}?session_id=${session_id}&api_key=${APP_KEY}&page=${page}`;
  const response = await fetch(FavoriteMovies_url);
  const results = await response.json();

  return results.results;
}

export async function getWatchlist(page, media, session_id, account) {
  let FavoriteMovies_url = `https://api.themoviedb.org/3/account/${account}/watchlist/${media}?session_id=${session_id}&api_key=${APP_KEY}&page=${page}`;

  const response = await fetch(FavoriteMovies_url);
  const results = await response.json();

  return results.results;
}

export async function requsetToken() {
  let requset_token_url = `https://api.themoviedb.org/3/authentication/token/new?api_key=${APP_KEY}`;

  const response = await fetch(requset_token_url);
  const results = await response.json();

  return results.request_token;
}

export async function Auth(token) {
  let requset_token_url = `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${APP_KEY}`;
  const data = {
    username: 'judy22',
    password: '12345678',
    request_token: token,
  };

  const results = await axios.post(requset_token_url, data);
  return results.data.request_token;
}
export async function getAccountId(session_id) {
  let FavoriteMovies_url = `https://api.themoviedb.org/3/account?api_key=${APP_KEY}&session_id=${session_id}`;
  const response = await fetch(FavoriteMovies_url);
  const results = await response.json();
  return results.id;
}
export async function createSession(token) {
  let requset_token_url = ` https://api.themoviedb.org/3/authentication/session/new?api_key=${APP_KEY}`;
  const data = {
    request_token: token,
  };

  const results = await axios.post(requset_token_url, data);
  return results.data.session_id;
}
