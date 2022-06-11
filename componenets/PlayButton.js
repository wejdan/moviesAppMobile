import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

const PlayButton = props => {
  return (
    <Pressable style={styles.container} onPress={props.playMovie}>
      <Icon name="play" size={24} color="white" />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#4481fc',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    padding: 10,
  },
});
export default PlayButton;
