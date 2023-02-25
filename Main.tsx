import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from './src/Redux/store/store';
import AppStack from './src/Stacks/App/AppStack';
import WelcomeStack from './src/Stacks/Welcome/WelcomeStack';
import {getUserByDeviceId} from './src/Redux/actions/userActions';

type Props = {};

const Main = (props: Props) => {
  const {isWelcomePassed, error, message, user} = useAppSelector(
    state => state.global,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (error && message) {
      Alert.alert(message);
    }
  }, [error, message]);

  useEffect(() => {
    if (!user) dispatch(getUserByDeviceId());
  }, [isWelcomePassed]);

  return isWelcomePassed ? <AppStack /> : <WelcomeStack />;
};

export default Main;
