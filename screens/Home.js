import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import axios from 'axios';
import Loading from '../componenets/Loading';
import Error from '../componenets/Error';
import {getAllGeners} from '../services/services';
import Category from '../componenets/Category';
const img_url = 'https://image.tmdb.org/t/p/w500';

const Home = ({navigation}) => {
  const [categories, setCategories] = useState([]);

  const [IsLoading, setLoading] = useState(true);
  const [IsError, setError] = useState(false);
  const componentMounted = useRef(true); // (3) component is mounted

  useEffect(() => {
    setLoading(true);
    getAllGeners('movie').then(res => {
      if (componentMounted.current) {
        setCategories(res);
        setLoading(false);
      }
    });
    return () => {
      // This code runs when component is unmounted
      componentMounted.current = false; // (4) set it to false when we leave the page
    };
  }, []); // Or [] if effect doesn't need props or state  <PopularMovies navigation={navigation} />
  if (IsError) {
    return <Error message={IsError} />;
  }
  if (IsLoading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((genera, index) => {
          return (
            <Category
              {...genera}
              navigation={navigation}
              key={genera.id}
              type="movie"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieContainer: {
    marginVertical: 10,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: 350,
    height: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  generaTitle: {
    backgroundColor: 'maroon',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: 10,
  },
});
export default Home;
