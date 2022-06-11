import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
const Error = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.message}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Error;
