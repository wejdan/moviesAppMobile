import React, {useState, useContext, useEffect} from 'react';
import {getWatchlist} from '../services/services';

import {useGlobalContext} from '../Contexts/AccountContext';

const WatchListContext = React.createContext();

const WatchListProvider = ({children}) => {
  const {account, session_id} = useGlobalContext();

  const [Watchlist, setWatchList] = useState([]);
  const [WatchlistTv, setWatchListTv] = useState([]);

  const [IsWatchListLoaded, SetIsWatchListLoaded] = useState(false);
  const [IsWatchListTvLoaded, SetIsWatchListTvLoaded] = useState(false);

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
      GetUserList(getWatchlist, 'movies', setWatchList).then(() => {
        SetIsWatchListLoaded(true);
      });
      GetUserList(getWatchlist, 'tv', setWatchListTv).then(() => {
        SetIsWatchListTvLoaded(true);
      });
    }
  }, [account]);

  return (
    <WatchListContext.Provider
      value={{
        Watchlist,
        setWatchList,

        IsWatchListLoaded,
        IsWatchListTvLoaded,
        WatchlistTv,
        setWatchListTv,
      }}>
      {children}
    </WatchListContext.Provider>
  );
};
// make sure use
export const useWatchListContext = () => {
  return useContext(WatchListContext);
};

export {WatchListContext, WatchListProvider};
