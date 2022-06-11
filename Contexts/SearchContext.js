import React, {useState, useContext} from 'react';

const SearchContext = React.createContext();

const SearchProvider = ({children}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setsearchType] = useState('movie');

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,

        searchType,
        setsearchType,
      }}>
      {children}
    </SearchContext.Provider>
  );
};
// make sure use
export const useSearchContext = () => {
  return useContext(SearchContext);
};

export {SearchContext, SearchProvider};
