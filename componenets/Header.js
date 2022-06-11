import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    color: 'white',
    fontSize: 50,
  },
});
export default Header;
