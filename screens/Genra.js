import React, {useEffect, useState, useMemo} from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {getMovesByGeners} from '../services/services';
import {FlatList, ScrollView} from '@stream-io/flat-list-mvcp';
import MovieCard from '../componenets/MovieCard';
const Genra = ({route, navigation}) => {
  const {id, type} = route.params;

  const [movies, setMovies] = useState([]);

  const [IsLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [IsError, setError] = useState(false);
  const _renderitem = ({item}) => <MovieCard movie={item} type={type} />;

  useEffect(() => {
    setLoading(true);
    getMovesByGeners(id, type, page).then(res => {
      setMovies(prevState => [...prevState, ...res]);
      setLoading(false);
    });
  }, [page]); // Or [] if effect doesn't need props or state
  if (IsError) {
    return <Error message={IsError} />;
  }

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  return (
    <View style={styles.container}>
      <FlatList
        onEndReached={fetchMoreData} // required, should return a promise
        maintainVisibleContentPosition={{
          minIndexForVisible: 1,
        }}
        style={styles.moviesSlider}
        ListFooterComponent={Loading}
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
export default Genra;
