import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import axios from 'axios';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {getPopularMovies, getAllGeners} from '../services/services';
import PopularMovies from '../componenets/PopularMovies';

const img_url = 'https://image.tmdb.org/t/p/w500';
import MovieCoursal from '../componenets/MovieCarousal';

const Popular = ({navigation}) => {
  const [IsLoading, setLoading] = useState(false);
  const [IsError, setError] = useState(false);

  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieCoursal type="movie" name="upcoming" display="Upcoming Movies" />

        <MovieCoursal
          type="movie"
          name="top_rated"
          display="Top Rated Movies"
        />

        <MovieCoursal
          type="movie"
          name="now_playing"
          display="Now Playing Movies"
        />

        <MovieCoursal type="movie" name="popular" display="Popular Movies" />

        <MovieCoursal
          type="tv"
          name="on_the_air"
          display="On The Air TV Shows"
        />

        <MovieCoursal type="tv" name="top_rated" display="Top Rated TV Shows" />

        <MovieCoursal
          type="tv"
          name="airing_today"
          display="Airing Today TV Shows"
        />

        <MovieCoursal type="tv" name="popular" display="Popular TV Shows" />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieContainer: {
    marginVertical: 10,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  generaTitle: {
    backgroundColor: 'maroon',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 10,
  },
});
export default Popular;
