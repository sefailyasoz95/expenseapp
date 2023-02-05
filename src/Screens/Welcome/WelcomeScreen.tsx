import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {getUniqueId} from 'react-native-device-info';
import {createUser} from '../../Redux/actions/userActions';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};

const WelcomeScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const {loading, isWelcomePassed} = useAppSelector(state => state.global);
  const onPress = async () => {
    const deviceId = await getUniqueId();
    dispatch(
      createUser({
        deviceId,
        dateOfBirth: new Date(),
        email: 'sefailyas1455@gmail.com',
        gender: 'male',
        isPremium: false,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Send" onPress={() => onPress()} />
      {loading && <ActivityIndicator />}
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
