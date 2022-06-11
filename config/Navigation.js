import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Button, Pressable, Image} from 'react-native';
import HomeTabs from '../screens/HomeTabs';
import Details from '../screens/Details';
import Genra from '../screens/Genra';
import Search from '../screens/Search';
import DetailsTv from '../screens/DetailsTv';
import SplashScreen from '../screens/SplashScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchBar from '../componenets/SearchBar';
import FavouritesTabs from '../screens/FavouritesTabs';
import WatchLaterTabs from '../screens/WatchLaterTabs';
import TopGenra from '../screens/TopGenra';
// react-native-vector-icons/Ionicons otherwise.
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddToFavBtn from '../componenets/AddToFavBtn';
import Loading from '../componenets/Loading';

import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {useFavGlobalContext} from '../Contexts/FavContext';
import {useWatchListContext} from '../Contexts/WatchListContext';
const navTheme = DefaultTheme;
const MyTheme = {
  dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    notification: 'rgb(255, 69, 58)',
  },
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const FavStack = createNativeStackNavigator();
const WatchLaterStack = createNativeStackNavigator();

const FavScreenStack = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen
        options={({route}) => ({
          headerShown: false,
        })}
        name="favourite"
        component={FavouritesTabs}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          title: route.params.name,
          headerRight: () => <AddToFavBtn id={route.params.id} />,
        })}
      />
    </Stack.Navigator>
  );
};

const WatchLaterScreenStack = () => {
  return (
    <Stack.Navigator>
      <Tab.Screen
        name="WatchLater"
        options={({route}) => ({
          headerShown: false,
        })}
        component={WatchLaterTabs}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          title: route.params.name,
          headerRight: () => <AddToFavBtn id={route.params.id} />,
        })}
      />
    </Stack.Navigator>
  );
};
const HomeScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeTabs}
        options={({route, navigation}) => ({
          // get reference to navigation
          headerTransparent: false,
          title: 'Movies',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Image
              style={{width: 25, height: 25}}
              source={require('../assets/film.png')}
            />
          ),
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('Search')}>
              <Icon
                name="search"
                size={24}
                color="gray"
                style={{paddingRight: 8}}
              />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="Genra"
        component={Genra}
        options={({route, navigation}) => ({
          title: route.params.name,
        })}
      />
      <Stack.Screen
        name="TopGenra"
        component={TopGenra}
        options={({route, navigation}) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={({route}) => ({
          headerTransparent: false,
          title: route.params.name,
          headerRight: () => <AddToFavBtn id={route.params.id} type="movie" />,
        })}
      />
      <Stack.Screen
        name="DetailsTv"
        component={DetailsTv}
        options={({route}) => ({
          headerTransparent: false,
          title: route.params.name,
          headerRight: () => <AddToFavBtn id={route.params.id} type="tv" />,
        })}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: props => <SearchBar />,
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const {IsFavouriteLoaded, IsFavouriteTVLoaded} = useFavGlobalContext();
  const {IsWatchListTvLoaded, IsWatchListLoaded} = useWatchListContext();
  if (
    IsFavouriteLoaded &&
    IsWatchListLoaded &&
    IsWatchListTvLoaded &&
    IsFavouriteTVLoaded
  ) {
    return (
      <NavigationContainer theme={DarkTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'HomeScreenStack') {
                iconName = 'home';
              } else if (route.name === 'FavScreenStack') {
                iconName = 'heart';
              } else if (route.name == 'WatchLaterScreenStack') {
                iconName = 'bookmark';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="HomeScreenStack"
            options={({}) => ({title: 'Home', headerShown: false})}
            component={HomeScreenStack}
          />
          <Tab.Screen
            options={({}) => ({title: 'Favourite', headerShown: false})}
            n
            name="FavScreenStack"
            component={FavScreenStack}
          />
          <Tab.Screen
            options={({}) => ({title: 'WatchLater', headerShown: false})}
            n
            name="WatchLaterScreenStack"
            component={WatchLaterScreenStack}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return <SplashScreen />;
  }
};
