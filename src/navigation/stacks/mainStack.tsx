import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AppBottomTab from '../bottomTab/appBottomTab';
import VideoPlayer from '../../screens/videoPlayer';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="AppBottomTab"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AppBottomTab" component={AppBottomTab} />
        <Stack.Screen
          name="videoPlayer"
          component={VideoPlayer}
          options={{
            headerShown: false,
            presentation: 'fullScreenModal',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
