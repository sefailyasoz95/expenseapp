import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  inputContainerStyleHelper,
  inputStyleHelper,
} from '../../Helpers/StyleHelpers/InputStyleHelper';
import {Colors} from '../../Constants/Colors';

type Props = {
  value: string;
  onModalOpen: (val: boolean) => void;
  isModalOpen: boolean;
  label: string;
};

const InputTrigger: React.FC<Props> = ({
  value,
  onModalOpen,
  isModalOpen,
  label,
}) => {
  const placeholderRef = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput | null>(null);

  const movePlaceOlderUp = () => {
    Animated.timing(placeholderRef, {
      useNativeDriver: true,
      easing: Easing.elastic(1),
      duration: 200,
      toValue: -30,
    }).start();
  };
  useEffect(() => {
    if (!isModalOpen) {
      Animated.timing(placeholderRef, {
        useNativeDriver: true,
        easing: Easing.elastic(1),
        duration: 200,
        toValue: 0,
      }).start();
    }
    if (value) {
      movePlaceOlderUp();
    }
  }, [isModalOpen]);

  return (
    <View
      style={[
        styles.inputContainer,
        inputContainerStyleHelper('input', 'rounded', false, false, true),
      ]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {transform: [{translateY: placeholderRef}]},
        ]}>
        {label}
      </Animated.Text>
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyleHelper('input')]}
        value={value}
        editable={false}
        onPressOut={() => {
          movePlaceOlderUp();
          onModalOpen(true);
        }}
      />
    </View>
  );
};

export default InputTrigger;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: Colors.white,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    color: Colors.white,
  },
  placeholder: {
    color: '#aaa',
    position: 'absolute',
    marginLeft: 10,
    fontSize: 12,
  },
});
