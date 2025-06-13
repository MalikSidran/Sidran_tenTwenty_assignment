import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, SafeAreaView, View} from 'react-native';
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {VideoStackScreens} from '../stacks/appStack';
import {DefaultText} from '../../utils/GlobalStyles/GlobalStyles';

const Tab = createBottomTabNavigator();

const Library = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DefaultText>Library</DefaultText>
    </View>
  );
};
const More = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DefaultText>More</DefaultText>
    </View>
  );
};
const Dashboard = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <DefaultText>Dashboard</DefaultText>
    </View>
  );
};

const AppBottomTab = () => {
  return (
    <>
      {/* <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} /> */}
      <Tab.Navigator
        initialRouteName="Watch"
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',

          // tabBarAllowFontScaling:true,

          tabBarItemStyle: {
            height: responsiveScreenHeight(6.5),
            borderTopWidth: 0,
            top: responsiveScreenHeight(1),
          },
          tabBarStyle: {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            height: responsiveScreenHeight(8),
            overflow: 'hidden',
            borderBottomWidth: 0,
            borderWidth: 0,
            backgroundColor: 'black',
          },
          tabBarLabelStyle: {
            fontSize: responsiveScreenFontSize(1.6),
          },
        }}
        sceneContainerStyle={{backgroundColor: 'white'}}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image
                  source={require('../../assets/images/demoDashboard.png')}
                />
              ) : (
                <Image
                  source={require('../../assets/images/demoDashboard.png')}
                />
              ),
          }}
        />
        <Tab.Screen
          name="Watch"
          component={VideoStackScreens}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image source={require('../../assets/images/demoWatch.png')} />
              ) : (
                <Image source={require('../../assets/images/demoWatch.png')} />
              ),
          }}
        />
        <Tab.Screen
          name="Media Library"
          component={Library}
          options={{
            tabBarIcon: ({focused}) => (
              <Image
                // style={{ width: 25, height: 25 }}
                source={require('../../assets/images/mlib.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="More"
          component={More}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? (
                <Image source={require('../../assets/images/List.png')} />
              ) : (
                <Image source={require('../../assets/images/List.png')} />
              ),
          }}
        />
      </Tab.Navigator>
      {/* <SafeAreaView style={{ backgroundColor: "black" }} /> */}
      <SafeAreaView style={{backgroundColor: 'black', flex: 0}} />
    </>
  );
};

export default AppBottomTab;
