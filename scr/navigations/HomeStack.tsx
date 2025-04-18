import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeStackParamList } from './HomeStackParamList'
import Home from '../screens/home/Home';
import Nutrition from '../screens/home/Nutrition';
import Water from '../screens/home/Water';
import DailySteps from '../screens/home/DailySteps';

const Stack = createStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Nutrition' component={Nutrition} />
        <Stack.Screen name='Water' component={Water} />
        <Stack.Screen name='DailySteps' component={DailySteps} />
    </Stack.Navigator>
  )
}