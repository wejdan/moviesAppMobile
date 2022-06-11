import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {getVideos} from '../services/services';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {useNavigation} from '@react-navigation/native';
import {WebView} from 'react-native-webview';
const img_url = 'https://image.tmdb.org/t/p/w500';

const Videos = props => {
  const navigation = useNavigation();
  const [videosList, setVideosList] = useState([]);
  const [IsError, setError] = useState(false);
  const [IsLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getVideos(props.id)
      .then(result => {
        setVideosList(result);
      })
      .catch(err => {
        setError(err.message);
      });

    setLoading(false);
  }, []); // Or [] if effect doesn't need props or state

  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.generaTitle}>Videos</Text>
      <ScrollView style={styles.moviesSlider} horizontal={true}>
        {videosList.map((video, index) => {
          return (
            <View key={index} style={styles.cardRounded}>
              <WebView
                mediaPlaybackRequiresUserAction={true}
                style={{
                  height: 240,
                  width: 320,
                  alignSelf: 'center',
                  alignContent: 'center',
                  marginHorizontal: 10,
                }}
                source={{
                  uri: `https://www.youtube.com/embed/${video.key}`,
                }}
              />
            </View>
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
  cardRounded: {
    paddingEnd: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingStart: 0,
    padding: 0,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#555',
    flex: 0,
    height: 240,
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
export default Videos;
