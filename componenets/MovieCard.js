import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AddToFavBtn from './AddToFavBtn';
import AddToWatchList from './AddToWatchList';
import {useTheme} from '@react-navigation/native'; // IMPORT THEMES HERE!!!
const img_url = 'https://image.tmdb.org/t/p/w500';
const stringTruncate = function (str, length) {
  var dots = str.length > length ? '...' : '';
  return str.substring(0, length) + dots;
};
const MovieCard = ({movie, type}) => {
  const {colors} = useTheme(); // USE THIS In order to get the Current
  const navigation = useNavigation();
  const goToDetails = () => {
    if (type == 'tv') {
      navigation.navigate('DetailsTv', {
        id: movie.id,
        name: movie.name,
      });
    } else {
      navigation.navigate('Details', {
        id: movie.id,
        name: movie.original_title,
      });
    }
  };
  let img = movie.backdrop_path;
  if (img == null) {
    img = movie.poster_path;
  }

  let imgPath = img_url + img;

  if (!movie.poster_path && !movie.backdrop_path) {
    imgPath =
      'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
  }
  return (
    <Pressable
      style={{
        ...styles.movieContainer,
        backgroundColor: '#222',
      }}
      key={movie.id}
      onPress={() => {
        goToDetails();
      }}>
      <Image source={{uri: imgPath}} style={styles.poster} />
      <View style={styles.details}>
        <Text style={{...styles.title, color: colors.text}}>
          {type == 'tv' ? movie.name : movie.original_title}
        </Text>
        <Text style={{...styles.text, color: 'gray'}}>
          {stringTruncate(movie.overview, 80)}
        </Text>
      </View>
      <View style={styles.actions}>
        <AddToWatchList inCard={true} id={movie.id} type={type} />
        <AddToFavBtn id={movie.id} type={type} />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  moviesSlider: {
    flex: 1,
  },
  movieContainer: {
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    height: 300,
  },
  poster: {
    width: '100%',
    height: 150,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  actions: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  text: {
    marginTop: 4,
  },
  details: {paddingHorizontal: 20},
});
export default MovieCard;
