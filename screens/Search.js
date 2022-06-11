import React, {useEffect, useState, useMemo} from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import axios from 'axios';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {getMovesBySearch} from '../services/services';
import {FlatList, ScrollView} from '@stream-io/flat-list-mvcp';
import {useSearchContext} from '../Contexts/SearchContext';
import MovieCard from '../componenets/MovieCard';

const Search = ({route, navigation}) => {
  const {setSearchTerm, searchTerm, searchType} = useSearchContext();

  const [movies, setMovies] = useState([]);

  const [noResults, setNoResults] = useState(false);
  const [page, setPage] = useState(1);

  const [IsError, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        setSearchTerm('');
      }),
    [navigation],
  );

  useEffect(() => {
    if (searchTerm) {
      getMovesBySearch(searchTerm, searchType, page).then(res => {
        if (page == 1) {
          setMovies(res);
          if (res.length == 0) {
            setHasMore(false);
            setNoResults(true);
          }
        } else {
          if (res.length > 0) {
            setMovies(prevState => [...prevState, ...res]);
          } else {
            setHasMore(false);
          }
        }
      });
    }
  }, [page, searchTerm, searchType]);
  useEffect(() => {
    setMovies([]);
    setHasMore(true);
  }, [searchType]);
  useEffect(() => {
    if (searchTerm.length > 0) {
      setHasMore(true);
      setNoResults(false);
      setPage(1);
    } else {
      setMovies([]);
      setHasMore(false);
    }
  }, [searchTerm, searchType]);

  if (IsError) {
    return <Error message={IsError} />;
  }
  const _renderitem = ({item}) => <MovieCard movie={item} type={searchType} />;

  const fetchMoreData = () => {
    setPage(page + 1);
  };
  const renderFooter = () => {
    if (hasMore) {
      return <Loading />;
    } else if (noResults) {
      return (
        <Text style={{color: 'gray'}}>
          {' '}
          No Results Found Matching {searchTerm}
        </Text>
      );
    } else if (searchTerm) {
      return (
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: 'gray'}}>No more Results</Text>
        </View>
      );
    } else {
      return <Text></Text>;
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={fetchMoreData} // required, should return a promise
        maintainVisibleContentPosition={{
          minIndexForVisible: 1,
        }}
        style={styles.moviesSlider}
        ListFooterComponent={renderFooter}
        data={movies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={_renderitem}></FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    alignItems: 'center',
  },
  moviesSlider: {
    flex: 1,
  },
  movieContainer: {
    margin: 10,
    backgroundColor: 'red',
  },
  poster: {
    width: 300,
    height: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generaTitle: {
    fontSize: 25,
    fontWeight: 'bold',

    color: 'black',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
export default Search;
