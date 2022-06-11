import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import WatchLater from './WatchLater';
const FirstRoute = () => <WatchLater media="movies" />;

const SecondRoute = () => <WatchLater media="tv" />;

const renderScene = SceneMap({
  movies: FirstRoute,
  tv: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'movies', title: 'movies'},
    {key: 'tv', title: 'tv'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar {...props} style={{backgroundColor: 'black'}} />
      )} // <-- add this line
    />
  );
}
