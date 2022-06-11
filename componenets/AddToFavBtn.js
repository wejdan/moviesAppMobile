import {View, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useFavGlobalContext} from '../Contexts/FavContext';
import {useGlobalContext} from '../Contexts/AccountContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MarkAsFavourite} from '../services/services';
import {useTheme} from '@react-navigation/native'; // IMPORT THEMES HERE!!!

const AddToFavBtn = props => {
  const {colors} = useTheme(); // USE THIS In order to get the Current

  const {FavoriteMovies, FavoriteTv, setFavoriteTv, setFavoriteMovies} =
    useFavGlobalContext();
  const {session_id, account} = useGlobalContext();

  const [isInFav, setIsInFav] = React.useState(false);
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
    setIsInFav(isInFavourite(props.id));
  }, [FavoriteMovies, FavoriteTv, props]);

  const AddToFavourite = async id => {
    setIsInFav(true);
    if (isMovie) {
      setFavoriteMovies(prevState => [...prevState, id]);
    } else {
      setFavoriteTv(prevState => [...prevState, id]);
    }

    const result = await MarkAsFavourite(
      account,
      mediaType,
      session_id,
      id,
      true,
    );
  };
  const RemoveFromFavourite = async id => {
    if (isMovie) {
      let tempList = FavoriteMovies.filter(movieId => {
        return movieId != id;
      });
      setFavoriteMovies(tempList);
    } else {
      let tempList = FavoriteTv.filter(movieId => {
        return movieId != id;
      });
      setFavoriteTv(tempList);
    }

    const result = await MarkAsFavourite(
      account,
      mediaType,
      session_id,
      id,
      false,
    );
  };
  const isInFavourite = id => {
    if (isMovie) {
      return FavoriteMovies.includes(id);
    } else {
      return FavoriteTv.includes(id);
    }
  };
  return (
    <View>
      {isInFav ? (
        <Pressable onPress={() => RemoveFromFavourite(props.id)}>
          <Icon name="heart" size={24} color="red" style={{paddingRight: 8}} />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFavourite(props.id)}>
          <Icon
            name="heart-o"
            size={24}
            color="gray"
            style={{paddingRight: 8}}
          />
        </Pressable>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    minWidth: 250,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
export default AddToFavBtn;
