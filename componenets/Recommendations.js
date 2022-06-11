import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {getRecommendations} from '../services/services';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {useNavigation} from '@react-navigation/native';
const img_url = 'https://image.tmdb.org/t/p/w500';

const Recommendations = props => {
  const navigation = useNavigation();
  const [moviesList, setMovieList] = useState([]);
  const [IsError, setError] = useState(false);
  const [IsLoading, setLoading] = useState(false);
  const goToDetails = movie => {
    if (props.type == 'tv') {
      navigation.push('DetailsTv', {
        id: movie.id,
        name: movie.name,
      });
    } else {
      navigation.push('Details', {
        id: movie.id,
        name: movie.original_title,
      });
    }
  };
  useEffect(() => {
    setLoading(true);
    getRecommendations(props.id, props.type)
      .then(result => {
        setMovieList(result);
      })
      .catch(err => {
        setError(err.message);
      });

    setLoading(false);
  }, [props.id]); // Or [] if effect doesn't need props or state

  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.generaTitle}>More Like This</Text>
      <ScrollView style={styles.moviesSlider} horizontal={true}>
        {moviesList.map(movie => {
          let img = movie.backdrop_path;
          if (img == null) {
            img = movie.poster_path;
          }
          let imgPath = img_url + img;
          return (
            <Pressable
              style={styles.movieContainer}
              key={movie.id}
              onPress={() => {
                goToDetails(movie);
              }}>
              <Image source={{uri: imgPath}} style={styles.poster} />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
  moviesSlider: {
    flex: 1,
    flexDirection: 'row',
  },
  movieContainer: {
    marginHorizontal: 2,
  },
  poster: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generaTitle: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black',
    marginBottom: 10,

    paddingHorizontal: 10,
  },
});
export default Recommendations;
