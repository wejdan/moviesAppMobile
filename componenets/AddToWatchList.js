import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useGlobalContext} from '../Contexts/AccountContext';
import {useWatchListContext} from '../Contexts/WatchListContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AddToWatch} from '../services/services';
import {useTheme} from '@react-navigation/native'; // IMPORT THEMES HERE!!!

const AddToWatchList = props => {
  const {colors} = useTheme(); // USE THIS In order to get the Current

  const {session_id, account} = useGlobalContext();
  const {Watchlist, WatchlistTv, setWatchListTv, setWatchList} =
    useWatchListContext();
  const [isInWatchList, setInWatchList] = React.useState(false);

  const [isMovie, setIsMovie] = React.useState(false);
  const [mediaType, setMediaType] = React.useState('');

  React.useEffect(() => {
    if (props.type == 'tv') {
      setIsMovie(false);
      setMediaType('tv');
    } else {
      setIsMovie(true);
      setMediaType('movie');
    }
  }, [props]);
  React.useEffect(() => {
    setInWatchList(isInWatchListMovies(props.id));
  }, [Watchlist, WatchlistTv, props]);

  const isInWatchListMovies = id => {
    if (isMovie) {
      return Watchlist.includes(id);
    } else {
      return WatchlistTv.includes(id);
    }
  };
  const AddToWatchLater = async id => {
    if (isMovie) {
      setWatchList(prevState => [...prevState, id]);
    } else {
      setWatchListTv(prevState => [...prevState, id]);
    }

    const result = await AddToWatch(account, mediaType, session_id, id, true);
  };
  const RemoveWatchList = async id => {
    if (isMovie) {
      let tempList = Watchlist.filter(movieId => {
        return movieId != id;
      });
      setWatchList(tempList);
    } else {
      let tempList = WatchlistTv.filter(movieId => {
        return movieId != id;
      });
      setWatchListTv(tempList);
    }

    const result = await AddToWatch(account, mediaType, session_id, id, false);
  };
  return (
    <View>
      {isInWatchList ? (
        props.inCard ? (
          <Pressable onPress={() => RemoveWatchList(props.id)}>
            <Icon
              name="bookmark"
              size={24}
              color="tomato"
              style={{marginRight: 10}}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.container}
            onPress={() => RemoveWatchList(props.id)}>
            <Icon name="minus" size={14} color="black" />
          </Pressable>
        )
      ) : props.inCard ? (
        <Pressable onPress={() => AddToWatchLater(props.id)}>
          <Icon
            name="bookmark-o"
            size={24}
            color="gray"
            style={{marginRight: 10}}
          />
        </Pressable>
      ) : (
        <Pressable
          style={styles.container}
          onPress={() => AddToWatchLater(props.id)}>
          <Icon name="plus" size={14} color="black" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: 'tomato',

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
});

export default AddToWatchList;
