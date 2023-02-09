import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './src/Redux/store/store';
import AppStack from './src/Stacks/App/AppStack';
import WelcomeStack from './src/Stacks/Welcome/WelcomeStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsWelcomePassed} from './src/Redux/reducers/reducers';

type Props = {};
// 1232 3124 5435 4651
const Main = (props: Props) => {
  const {isWelcomePassed, error, message} = useAppSelector(
    state => state.global,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error && message) {
      Alert.alert(message);
    }
  }, [error, message]);

  useEffect(() => {
    AsyncStorage.getItem('welcomePassed').then(value => {
      if (value) {
        dispatch(setIsWelcomePassed(true));
      }
    });
  }, []);

  return isWelcomePassed ? <AppStack /> : <WelcomeStack />;
};

export default Main;

const styles = StyleSheet.create({});
