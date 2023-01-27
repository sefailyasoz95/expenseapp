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

type Props = TextInputProps & {
  placeholder: string;
  required?: boolean;
  hasError?: boolean;
  corner?: 'cornered' | 'curved' | 'rounded' | 'circle';
  type?: 'input' | 'textarea';
  onTextChanged: (field: string, value: string) => void;
  name: string;
  inputStyle?: StyleProp<TextStyle>;
  placeHolderColor?: string;
  characterLimit?: number;
  isForCardDate?: boolean;
};

const SInput: React.FC<Props> = ({
  placeholder,
  placeHolderColor = '#aaa',
  hasError = false,
  required = false,
  corner = 'curved',
  type = 'input',
  onTextChanged,
  name,
  style,
  inputStyle,
  characterLimit,
  isForCardDate,
  ...props
}) => {
  const [inputError, setInputError] = useState(false);
  const placeholderRef = useRef(
    new Animated.Value(type === 'input' ? 0 : -30),
  ).current;
  const [cardNumberValue, setCardNumberValue] = useState('');
  const inputRef = useRef<TextInput | null>(null);
  const [value, setValue] = useState(props.value ?? '');
  const handleInputValue = (text: string | number) => {
    if (!text) {
      type === 'input'
        ? Animated.timing(placeholderRef, {
            useNativeDriver: true,
            easing: Easing.elastic(1),
            duration: 200,
            toValue: 0,
          }).start()
        : movePlaceOlderUp();
    }
    onTextChanged(name, `${text}`);
  };
  useEffect(() => {
    if (props.value) {
      movePlaceOlderUp();
    }
  }, [props.value]);

  const movePlaceOlderUp = () => {
    Animated.timing(placeholderRef, {
      useNativeDriver: true,
      easing: Easing.elastic(1),
      duration: 200,
      toValue: -30,
    }).start();
  };
  return (
    <View
      style={[
        styles.inputContainer,
        inputContainerStyleHelper(type, corner, inputError, hasError, required),
        style,
      ]}
      onTouchEnd={inputRef.current?.focus}
      testID="inputContainer">
      <Animated.Text
        style={[
          styles.placeholder,
          {transform: [{translateY: placeholderRef}], color: placeHolderColor},
        ]}>
        {placeholder}
      </Animated.Text>
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyleHelper(type), inputStyle]}
        multiline={type === 'textarea'}
        value={props.value || value}
        onChangeText={val => {
          if (characterLimit) {
            if (val.length <= characterLimit) {
              if (isForCardDate) {
                let manipulated = val.length === 2 ? val + '/' : val;
                handleInputValue(manipulated);
                setValue(manipulated);
              } else {
                handleInputValue(val);
                setValue(val);
              }
            }
          } else {
            handleInputValue(val);
            setValue(val);
          }
          if (val.length === 1) {
            movePlaceOlderUp();
          }
        }}
        onBlur={e => {
          if (e.nativeEvent.text === '')
            Animated.timing(placeholderRef, {
              useNativeDriver: true,
              easing: Easing.elastic(1),
              duration: 200,
              toValue: 0,
            }).start();
        }}
        onFocus={() => {
          type === 'input'
            ? movePlaceOlderUp()
            : Animated.timing(placeholderRef, {
                useNativeDriver: true,
                easing: Easing.ease,
                duration: 200,
                toValue: -50,
              }).start();
        }}
        {...props}
      />
    </View>
  );
};

export default SInput;

const styles = StyleSheet.create({
  inputContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: '95%',
    justifyContent: 'center',
    marginTop: 20,
  },
  input: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  placeholder: {
    color: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    marginLeft: 10,
    fontSize: 12,
  },
});
