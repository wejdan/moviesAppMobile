import React, {useMemo, useState} from 'react';
import {Text, View, Image, StyleSheet, Switch} from 'react-native';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {getFavoriteMovies} from '../services/services';
import {FlatList} from '@stream-io/flat-list-mvcp';
import {useFavGlobalContext} from '../Contexts/FavContext';
import {useGlobalContext} from '../Contexts/AccountContext';
import MovieCard from '../componenets/MovieCard';
import {useNavigation} from '@react-navigation/native';

const Favourite = ({media}) => {
  const {FavoriteMovies, FavoriteTv} = useFavGlobalContext();
  const {session_id, account} = useGlobalContext();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [IsError, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const navigation = useNavigation();
  const _renderitem = ({item}) => <MovieCard movie={item} type={media} />;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPage(1);
      setHasMore(true);
    });

    return unsubscribe;
  }, [navigation]);
  React.useEffect(() => {
    getFavoriteMovies(page, media, session_id, account).then(res => {
      if (page == 1) {
        if (res.length) {
          setMovies(res);
        } else {
          setHasMore(false);
        }
      } else {
        if (res.length) {
          setMovies(prevState => [...prevState, ...res]);
        } else {
          setHasMore(false);
        }
      }
    });
  }, [page, FavoriteMovies, FavoriteTv, navigation]);
  React.useEffect(() => {
    setPage(1);
  }, [FavoriteMovies, FavoriteTv]);
  if (IsError) {
    return <Error message={IsError} />;
  }

  const fetchMoreData = () => {
    setPage(page + 1);
  };
  const renderFooter = () => {
    if (hasMore) {
      return <Loading />;
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
export default Favourite;
