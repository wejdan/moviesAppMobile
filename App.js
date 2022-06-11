import React from 'react';

import RootNavigation from './config/Navigation';
import {AccountProvider} from './Contexts/AccountContext';
import {FavProvider} from './Contexts/FavContext';
import {WatchListProvider} from './Contexts/WatchListContext';
import {SearchProvider} from './Contexts/SearchContext';

const App = () => {
  return (
    <AccountProvider>
      <FavProvider>
        <WatchListProvider>
          <SearchProvider>
            <RootNavigation />
          </SearchProvider>
        </WatchListProvider>
      </FavProvider>
    </AccountProvider>
  );
};

export default App;
