import React, {useState, useContext, useEffect} from 'react';
import {getFavoriteMovies} from '../services/services';
import {useGlobalContext} from '../Contexts/AccountContext';

const FavContext = React.createContext();

const FavProvider = ({children}) => {
  const {account, session_id} = useGlobalContext();

  const [FavoriteMovies, setFavoriteMovies] = useState([]);
  const [FavoriteTv, setFavoriteTv] = useState([]);

  const [IsFavouriteLoaded, SetIsFavouriteLoaded] = useState(false);
  const [IsFavouriteTVLoaded, SetIsFavouriteTvLoaded] = useState(false);
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
    if (account) {
      GetUserList(getFavoriteMovies, 'movies', setFavoriteMovies).then(() => {
        SetIsFavouriteLoaded(true);
      });

      GetUserList(getFavoriteMovies, 'tv', setFavoriteTv).then(() => {
        SetIsFavouriteTvLoaded(true);
      });
    }
  }, [account]);

  return (
    <FavContext.Provider
      value={{
        FavoriteMovies,
        setFavoriteMovies,

        IsFavouriteLoaded,
        IsFavouriteTVLoaded,
        FavoriteTv,
        setFavoriteTv,
      }}>
      {children}
    </FavContext.Provider>
  );
};
// make sure use
export const useFavGlobalContext = () => {
  return useContext(FavContext);
};

export {FavContext, FavProvider};
