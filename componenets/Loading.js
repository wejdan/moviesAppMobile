import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
const Loading = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="small" color="#999999" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default Loading;
