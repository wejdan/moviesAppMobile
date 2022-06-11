import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {useSearchContext} from '../Contexts/SearchContext';
const HeaderSearchBar = props => {
  const {setSearchTerm, searchType, setsearchType} = useSearchContext();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search here"
        onPress={() => alert('onPress')}
        onChangeText={text => setSearchTerm(text)}
      />

      <Picker
        selectedValue={searchType}
        style={styles.select}
        onValueChange={(itemValue, itemIndex) => setsearchType(itemValue)}>
        <Picker.Item label="movie" value="movie" />
        <Picker.Item label="tv" value="tv" />
      </Picker>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 0,
    borderColor: '#bbb',
    minWidth: 210,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#bbb',
  },
  select: {
    height: 50,
    width: 150,
    color: 'white',
  },
});
export default HeaderSearchBar;
