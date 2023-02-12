import {
  Alert,
  Animated,
  Button,
  Easing,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import CloseSvg from '../../Assets/Icons/CloseSvg';
import SInput from '../SInput/SInput';
import {IActivity, ICard} from '../../Types/types';
import {Colors} from '../../Constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '../../Redux/store/store';
import {
  createCard,
  deleteCard,
  updateCard,
} from '../../Redux/actions/cardActions';

type Props = {
  isOpen: boolean;
  onClose: (refReshCards: boolean) => void;
  cards: ICard[];
  selectedCard?: ICard;
  activityItems: IActivity[];
};
const defaultState = {
  cardHolder: '',
  cardNumber: '',
  cvv: '',
  id: 0,
  validThru: '',
  cardDisplayNumber: '',
};

const AddCardModal = ({
  isOpen,
  onClose,
  cards,
  selectedCard,
  activityItems,
}: Props) => {
  const scale = useRef(new Animated.Value(0)).current;
  const dispatch = useAppDispatch();
  const [cardValues, setCardValues] = useState<ICard>(defaultState);
  useEffect(() => {
    if (selectedCard?.id) {
      setCardValues({
        cardHolder: selectedCard.cardHolder,
        cardNumber: selectedCard.cardNumber
          .replace(' ', '')
          .replace(' ', '')
          .replace(' ', ''),
        cvv: selectedCard.cvv,
        id: selectedCard.id,
        validThru: selectedCard.validThru,
        cardDisplayNumber: selectedCard.cardDisplayNumber,
      });
    } else {
      setCardValues({
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        id: cards.length + 1,
        validThru: '',
        cardDisplayNumber: '',
      });
    }
  }, [selectedCard]);

  const handleSave = async () => {
    let part4 = cardValues.cardNumber.slice(12, 16);
    let manipulated: ICard = {
      cardNumber: cardValues.cardNumber,
      cardHolder: cardValues.cardHolder,
      cvv: cardValues.cvv,
      validThru: cardValues.validThru,
      id: cardValues.id,
      cardType: cardValues.cardType,
      cardDisplayNumber: `**** **** **** ${part4}`,
    };
    if (selectedCard?.id) {
      dispatch(
        updateCard({
          id: selectedCard!.id,
          data: {...manipulated, userEmail: 'sefailyas1455@gmail.com'},
        }),
      );
      onClose(true);
      setCardValues(defaultState);
    } else {
      if (
        !cardValues.cardHolder ||
        !cardValues.cardNumber ||
        !cardValues.cvv ||
        !cardValues.validThru
      )
        Alert.alert('Bütün alanların doldurulması zorunludur!!');
      else {
        const {id, ...rest} = manipulated;
        dispatch(createCard({...rest, userEmail: 'sefailyas1455@gmail.com'}));
        onClose(true);
        setCardValues(defaultState);
      }
      // cards.push(manipulated);
    }
    // await AsyncStorage.setItem('cards', JSON.stringify(cards));
  };

  useEffect(() => {
    if (isOpen) {
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
        easing: Easing.elastic(1),
      }).start();
    } else {
      Animated.timing(scale, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
        easing: Easing.elastic(0),
      }).start();
    }
  }, [isOpen]);
  const handleDelete = async () => {
    dispatch(deleteCard(selectedCard!.id));
    onClose(true);
  };
  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{scale}],
          zIndex: isOpen ? 99999 : -9999,
        },
      ]}>
      <View style={styles.content}>
        <View style={{alignItems: 'center'}}>
          <SInput
            placeholder="Kart Sahibi"
            name="cardHolder"
            onTextChanged={(field, value) => {
              setCardValues({...cardValues, [field]: value});
            }}
            corner="rounded"
            style={{borderColor: 'white'}}
            inputStyle={{color: 'white'}}
            value={cardValues.cardHolder}
          />
          <SInput
            placeholder="Kart Numarası"
            name="cardNumber"
            characterLimit={16}
            inputStyle={{color: 'white'}}
            style={{borderColor: 'white'}}
            onTextChanged={(field, value) => {
              setCardValues({...cardValues, cardNumber: value});
            }}
            corner="rounded"
            keyboardType="decimal-pad"
            value={cardValues.cardNumber}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <SInput
              placeholder="Ay/Yıl"
              name="cardDate"
              onTextChanged={(_, value) => {
                setCardValues({...cardValues, validThru: value});
              }}
              style={{width: '46%', marginRight: 10, borderColor: 'white'}}
              corner="rounded"
              keyboardType="decimal-pad"
              inputStyle={{color: 'white'}}
              isForCardDate={true}
              characterLimit={5}
              value={cardValues.validThru}
            />
            <SInput
              placeholder="CVV"
              style={{width: '46%', borderColor: 'white'}}
              name="cardNumber"
              keyboardType="decimal-pad"
              onTextChanged={(_, value) => {
                setCardValues({...cardValues, cvv: value});
              }}
              inputStyle={{color: 'white'}}
              corner="rounded"
              characterLimit={3}
              value={cardValues.cvv}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                onClose(false);
              }}
              style={[styles.button, {borderColor: '#ff4444'}]}>
              <Text style={[styles.btnText, {color: '#ff4444'}]}>İptal</Text>
            </TouchableOpacity>
            {selectedCard?.id && (
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => handleDelete()}>
                <Text>❌</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                handleSave();
              }}
              style={[styles.button, {borderColor: '#00cc00'}]}>
              <Text style={[styles.btnText, {color: '#00cc00'}]}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View />
    </Animated.View>
  );
};

export default AddCardModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'space-evenly',
    flex: 1,
    height: HEIGHT,
    width: WIDTH,
  },
  close: {
    position: 'absolute',
    right: 0,
    top: 10,
  },
  content: {
    borderWidth: 1,
    backgroundColor: Colors.black,
    width: '90%',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '35%',
    borderRadius: 14,
    height: 35,
    alignItems: 'center',
    marginHorizontal: 10,
    justifyContent: 'center',
    borderWidth: 1,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
