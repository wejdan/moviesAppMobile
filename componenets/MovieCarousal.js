import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {getPopular} from '../services/services';
import Loading from './Loading';
import Error from './Error';
import {useNavigation} from '@react-navigation/native';
const img_url = 'https://image.tmdb.org/t/p/w500';

const MovieCoursal = ({type, name, display}) => {
  const [IsLoading, setLoading] = React.useState(true);
  const [IsError, setError] = React.useState(null);
  const [moviesList, setMoviesList] = React.useState([]);
  const navigation = useNavigation();
  const goToDetails = movie => {
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
  const renderItem = ({item, index, separators}) => {
    let img = item.backdrop_path;
    if (img == null) {
      img = item.poster_path;
    }
    let imgPath = img_url + img;
    return (
      <TouchableOpacity
        style={styles.movieContainer}
        onPress={() => {
          goToDetails(item);
        }}>
        <Image
          resizeMode="cover"
          source={{uri: imgPath}}
          style={styles.poster}
        />
        <Text style={styles.movieText}>
          {type == 'tv' ? item.name : item.original_title}
        </Text>
      </TouchableOpacity>
    );
  };
  React.useEffect(() => {
    getPopular(type, name)
      .then(result => {
        setMoviesList(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (IsError) {
    return <Error message={IsError} />;
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate('TopGenra', {name, type, title: display});
        }}>
        <Text style={styles.generaTitle}>{display}</Text>
      </Pressable>
      {IsLoading ? (
        <View style={{height: 200}}>
          <Loading />
        </View>
      ) : (
        <FlatList
          horizontal={true}
          data={moviesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
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
    marginHorizontal: 5,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieText: {
    position: 'absolute',
    color: 'white',

    textAlign: 'center',
    width: 100,
    marginHorizontal: 2,
  },
  poster: {
    width: 120,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,

    color: '#ccc',
    marginBottom: 10,

    paddingHorizontal: 10,
  },
});
export default MovieCoursal;
