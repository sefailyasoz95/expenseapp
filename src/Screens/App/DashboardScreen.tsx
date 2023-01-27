import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {AppStackParams} from '../../Types/types';
import {RouteProp} from '@react-navigation/native';
import {Colors} from '../../Constants/Colors';

type Props = {
  navigation: BottomTabNavigationProp<AppStackParams, 'DashboardScreen'>;
  route: RouteProp<AppStackParams, 'DashboardScreen'>;
};

const DashboardScreen = ({navigation, route}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          color: 'white',
          paddingHorizontal: 21,
          textAlign: 'center',
        }}>
        Sizin için bir sonraki versiyonda bu ekranda kullanabileceğiniz bazı
        grafikler hazırlıyoruz.
      </Text>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
