import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getMovieDetails, getCast, getVideos} from '../services/services';
import StarRating from 'react-native-star-rating';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import Recommendations from '../componenets/Recommendations';

import AddToWatchList from '../componenets/AddToWatchList';
import {useTheme} from '@react-navigation/native'; // IMPORT THEMES HERE!!!
import PlayButton from '../componenets/PlayButton';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Fontisto';
const img_url = 'https://image.tmdb.org/t/p/w500';
const dimentions = Dimensions.get('screen');

const Details = ({route, navigation}) => {
  const {colors} = useTheme(); // USE THIS In order to get the Current
  const styles = makeStyles(colors);
  const {id} = route.params;
  const mediaType = route.params.type ? route.params.type : 'movie';

  const [Movie, setMovie] = useState({});
  const [IsLoading, setLoading] = useState(true);
  const [IsError, setError] = useState(false);
  const [cast, setCast] = useState('');
  const [videos, setVideos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [Traller, setTraller] = useState(null);

  const playMovie = () => {
    setModalVisible(true);
  };
  useEffect(() => {
    setLoading(true);
    getMovieDetails(id, 'movie')
      .then(result => {
        if (!result.poster_path && !result.backdrop_path) {
          result.backdrop_path =
            'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png';
        }
        setMovie(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
      });
    getCast(id).then(res => {
      setCast(res);
    });

    getVideos(id, 'movie')
      .then(result => {
        if (result.length > 0) {
          setTraller(result[0].key);
        }
      })
      .catch(err => {
        setError(err.message);
      });
  }, [id]); // Or [] if effect doesn't need props or state

  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return <Loading />;
  }
  return (
    <View style={{flex: 1}}>
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{backgroundColor: 'black', flex: 1}}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}>
            <Icon name="close" size={24} color="white" />
          </Pressable>
          <View style={{flex: 1}}>
            {Traller && (
              <WebView
                style={{alignSelf: 'stretch'}}
                allowsFullscreenVideo={true}
                scalesPageToFit={true}
                javaScriptEnabled={true}
                source={{
                  uri: `https://www.youtube.com/embed/${Traller}?rel=0&autoplay=1&showinfo=0&controls=1&fullscreen=1`,
                }}
              />
            )}
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.container}>
        <View style={styles.posterContainer}>
          <Image
            resizeMode="cover"
            source={{uri: Movie.backdrop_path}}
            style={styles.poster}
          />
          {Traller && (
            <View style={styles.play}>
              <PlayButton playMovie={playMovie} />
            </View>
          )}
        </View>

        <View style={styles.movieDetail}>
          <Text style={styles.title}>{Movie.original_title}</Text>

          <Text style={styles.subtitle}>{Movie.tagline}</Text>
          {Movie.genres && (
            <View style={styles.genraContainer}>
              {Movie.genres.map(genra => {
                return (
                  <Text style={styles.genraItem} key={genra.id}>
                    {genra.name}
                  </Text>
                );
              })}
            </View>
          )}
          {Movie.vote_average != '0' && (
            <View style={{marginVertical: 10}}>
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={24}
                containerStyle={{justifyContent: 'center'}}
                rating={Movie.vote_average / 2}
                fullStarColor={'yellow'}
              />
            </View>
          )}
          <Text style={styles.overview}>{Movie.overview} </Text>
          <Text style={styles.date}>Release Date : {Movie.release_date}</Text>
        </View>
        <Recommendations id={id} type="movie" />
      </ScrollView>
      <View style={styles.fixedView}>
        <AddToWatchList id={id} />
      </View>
    </View>
  );
};
const makeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    fixedView: {
      position: 'absolute',
      right: 5,
      bottom: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    play: {
      position: 'absolute',
      right: 5,
      bottom: -25,
    },
    posterContainer: {
      position: 'relative',
    },
    movieDetail: {
      padding: 24,
      flex: 1,
    },
    overview: {
      color: 'gray',
      marginVertical: 10,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
      color: colors.text,
    },
    subtitle: {
      textAlign: 'center',
      color: '#ccc',
    },
    poster: {
      height: dimentions.height / 2,
    },
    genraContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    genraItem: {
      color: 'gray',
      marginRight: 10,
      marginVertical: 10,
    },
    text: {
      marginVertical: 8,
      color: 'gray',
      textAlign: 'center',
    },
    date: {
      textAlign: 'center',
      color: 'gray',
      fontWeight: 'bold',
    },
  });

export default Details;
