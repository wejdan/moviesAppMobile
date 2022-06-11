import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {getPopularMovies} from '../services/services';
import Loading from './Loading';
import Error from './Error';
import {SliderBox} from 'react-native-image-slider-box';

const img_url = 'https://image.tmdb.org/t/p/w500';

const dimentions = Dimensions.get('screen');
const PopularMovies = ({navigation}) => {
  const [IsLoading, setLoading] = React.useState(true);
  const [IsError, setError] = React.useState(null);
  const [moviesList, setMoviesList] = React.useState([]);
  const [images, setImages] = React.useState([]);
  React.useEffect(() => {
    getPopularMovies()
      .then(result => {
        setLoading(false);

        setMoviesList(result);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  React.useEffect(() => {
    let tempList = [];
    moviesList.map(movie => {
      let img = movie.backdrop_path;
      if (img == null) {
        img = movie.poster_path;
      }
      let imgPath = img_url + img;
      tempList.push(imgPath);
    });
    setImages(tempList);
  }, [moviesList]);
  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return (
      <View style={{height: dimentions.height / 1.5}}>
        <Loading />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <SliderBox
        images={images}
        sliderBoxHeight={dimentions.height / 1.5}
        dotStyle={{
          width: 0,
          height: 0,
        }}
        autoplay={true}
        fadingEdgeLength={500}
        requiresFadingEdge="vertical"
        circleLoop={true}
        ImageComponentStyle={{borderRadius: 0}}
        onCurrentImagePressed={index => {
          navigation.navigate('Details', {
            id: moviesList[index].id,
            name: moviesList[index].original_title,
          });
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  moviesSlider: {
    flex: 1,
    flexDirection: 'row',
  },
  movieContainer: {
    marginHorizontal: 2,
  },
  poster: {
    width: 150,
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

    color: '#ddd',
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
export default PopularMovies;
