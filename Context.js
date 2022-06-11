import React, {useState, useContext, useEffect} from 'react';
import {
  requsetToken,
  createSession,
  Auth,
  getAccountId,
  getFavoriteMovies,
  getWatchlist,
} from './services/services';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setsearchType] = useState('movie');

  const [session_id, setSession_id] = useState('');
  const [account, setAccount] = useState(null);
  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const [FavoriteTv, setFavoriteTv] = useState([]);

  const [Watchlist, setWatchList] = useState([]);
  const [WatchlistTv, setWatchListTv] = useState([]);

  const [IsLoading, SetLoading] = useState(true);

  const [IsFavouriteLoaded, SetIsFavouriteLoaded] = useState(false);
  const [IsFavouriteTvLoaded, SetIsFavouriteTvLoaded] = useState(false);

  const [IsWatchListLoaded, SetIsWatchListLoaded] = useState(false);
  const [IsWatchListTvLoaded, SetIsWatchListTvLoaded] = useState(false);

  const [IsMoviesListLoaded, SetIsMoviesListLoaded] = useState(false);

  const Login = async () => {
    const token = await requsetToken();
    const session = await Auth(token);
    const session_id = await createSession(session);
    const accountDetails = await getAccountId(session_id);
    setSession_id(session_id);
    setAccount(accountDetails);
    SetLoading(false);
  };
  const GetUserList = async (getList, media, stateupdate) => {
    let page = 1;
    let tempList = [];
    while (true) {
      const res = await getList(page, media, session_id, account);
      if (res && res.length) {
        const moviesIds = res.map(movie => {
          return movie.id;
        });
        tempList = [...tempList, ...moviesIds];
        page = page + 1;
      } else {
        stateupdate(tempList);
        break;
      }
    }
  };
  useEffect(() => {
    Login();
  }, []);
  useEffect(() => {
    if (account) {
      GetUserList(getFavoriteMovies, 'movies', setFavoriteMovies).then(() => {
        SetIsFavouriteLoaded(true);
      });

      GetUserList(getFavoriteMovies, 'tv', setFavoriteTv).then(() => {
        SetIsFavouriteTvLoaded(true);
      });
      GetUserList(getWatchlist, 'movies', setWatchList).then(() => {
        SetIsWatchListLoaded(true);
      });
      GetUserList(getWatchlist, 'tv', setWatchListTv).then(() => {
        SetIsWatchListTvLoaded(true);
      });
    }
  }, [account]);

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        session_id,
        account,
        Watchlist,
        setWatchList,
        FavoriteMovies,
        setFavoriteMovies,
        IsLoading,
        IsFavouriteLoaded,
        IsWatchListLoaded,
        IsMoviesListLoaded,
        SetIsMoviesListLoaded,
        searchType,
        setsearchType,
        WatchlistTv,
        setWatchListTv,
        FavoriteTv,
        setFavoriteTv,
      }}>
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export {AppContext, AppProvider};
