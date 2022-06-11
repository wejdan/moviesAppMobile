import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
const SplashScreen = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="red" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default SplashScreen;
