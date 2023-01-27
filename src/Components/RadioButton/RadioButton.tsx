import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {WIDTH} from '../../Constants/Constants';

type Props = {
  text: string;
  isSelected: boolean;
};

const RadioButton = ({text, isSelected}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.25,
    paddingVertical: 20,
    borderRadius: 14,
    borderWidth: 1,
  },
});
