import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppStackParams} from '../../Types/types';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../Constants/Colors';
type Props = {
  navigation: BottomTabNavigationProp<AppStackParams, 'SettingsScreen'>;
  route: RouteProp<AppStackParams, 'SettingsScreen'>;
};
const SettingsScreen = ({navigation, route}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Settings Screen</Text>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
});
