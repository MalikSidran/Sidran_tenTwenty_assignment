import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MovieDetail from '../../screens/movieDetail';
import WatchSearch from '../../screens/search';
import WatchMain from '../../screens/watchMain';

const VideoStack = createNativeStackNavigator();

export const VideoStackScreens = () => (
  <VideoStack.Navigator>
    <VideoStack.Screen
      name="watchmain"
      component={WatchMain}
      options={{headerShown: false}}
    />
    <VideoStack.Screen
      name="watchSearch"
      component={WatchSearch}
      options={{headerShown: false}}
    />
    <VideoStack.Screen
      name="movieDetail"
      component={MovieDetail}
      options={{headerShown: false}}
    />
  </VideoStack.Navigator>
);
