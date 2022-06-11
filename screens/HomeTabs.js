import * as React from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import Home from './Home';
import HomeTv from './HomeTv';
import Popular from './Popular';
const FirstRoute = () => <Home />;

const SecondRoute = () => <HomeTv />;
const thirdRoute = () => <Popular />;

const renderScene = SceneMap({
  popular: thirdRoute,
  movies: FirstRoute,
  tv: SecondRoute,
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'popular', title: 'popular'},

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
