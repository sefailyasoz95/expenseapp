import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../Constants/Constants';

type Props = {};

const Loading = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color="white" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
  },
});
