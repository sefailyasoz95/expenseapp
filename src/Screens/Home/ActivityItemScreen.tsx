import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Colors} from '../../Constants/Colors';
import SInput from '../../Components/SInput/SInput';
import ActivityItem from '../../Components/ActivityItem/ActivityItem';
import {HomeStackParams, IActivity, ICategory} from '../../Types/types';
import {WIDTH} from '../../Constants/Constants';
import Tab from '../../Components/Tabs/Tab';
import DatePicker from 'react-native-date-picker';
import InputTrigger from '../../Components/InputTrigger/InputTrigger';
import BottomSheet from '@gorhom/bottom-sheet';
import {ActivityCategoryNames, DummyCards} from '../../Constants/Dummy';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {responsive} from '../../utils/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NavigationProp<HomeStackParams, 'ActivityItemScreen'>;
  route: RouteProp<HomeStackParams, 'ActivityItemScreen'>;
};

const ActivityItemScreen = ({navigation, route}: Props) => {
  const formater = new Intl.DateTimeFormat('tr-TR');
  const categoryBottomSheetRef = useRef<BottomSheet>(null);
  const cardBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '40%'], []);
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<IActivity>({
    id: route.params.activityItems.length + 1,
    category: ActivityCategoryNames[0].value,
    date: formater.format(new Date()),
    description: '',
    price: 0,
    type: 'expense',
    cardId: undefined,
  });
  useEffect(() => {
    return () => {
      Keyboard.dismiss();
    };
  }, []);
  const handleCategoryBottomSheetChange = (activeIndex: number) => {
    if (activeIndex === 0) {
      categoryBottomSheetRef.current?.close();
    }
  };
  const handleCardBottomSheetChange = (activeIndex: number) => {
    if (activeIndex === 0) {
      cardBottomSheetRef.current?.close();
    }
  };
  const handleSave = async () => {
    if (!formValues.description || !formValues.price) {
      Alert.alert('Açıkalama ve Tutar alanlarını doldurmak zorundasın!');
    } else {
      let dataToBeSaved = route.params.activityItems;
      dataToBeSaved.push(formValues);
      await AsyncStorage.setItem(
        'activityItems',
        JSON.stringify(dataToBeSaved),
      );
      navigation.navigate('HomeScreen');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ActivityItem
        item={formValues}
        type={formValues.type}
        cards={route.params.cards}
        onItemLongPress={() => {}}
      />
      <KeyboardAvoidingView style={{flex: 1, width: WIDTH}}>
        <ScrollView style={{flex: 1}} automaticallyAdjustKeyboardInsets>
          <View style={styles.tabs}>
            <Tab
              index={2}
              isActive={formValues.type === 'expense'}
              onPress={() => {
                setFormValues({...formValues, type: 'expense'});
              }}
              text="Gider"
            />
            <Tab
              index={1}
              isActive={formValues.type === 'income'}
              onPress={() => {
                setFormValues({...formValues, type: 'income'});
              }}
              text="Gelir"
            />
          </View>
          <SInput
            placeholder={`Açıklama * (${50 - formValues.description.length})`}
            name="description"
            onTextChanged={(field: string, value: string) => {
              setFormValues({...formValues, description: value});
            }}
            inputStyle={styles.inputStyle}
            corner="rounded"
            style={styles.input}
            characterLimit={50}
          />
          <SInput
            placeholder="Tutar *"
            name="price"
            onTextChanged={(field: string, value: string) => {
              setFormValues({...formValues, price: Number(value)});
            }}
            inputStyle={styles.inputStyle}
            corner="rounded"
            style={styles.input}
            keyboardType="decimal-pad"
          />
          <InputTrigger
            isModalOpen={isOpen}
            onModalOpen={() => setIsOpen(true)}
            value={formValues.date}
            label="Tarih *"
          />
          <InputTrigger
            isModalOpen={true}
            onModalOpen={() => {
              categoryBottomSheetRef.current?.snapToIndex(1);
            }}
            value={formValues.category}
            label="Kategori *"
          />
          <InputTrigger
            isModalOpen={true}
            onModalOpen={() => {
              cardBottomSheetRef.current?.snapToIndex(1);
            }}
            value={
              formValues.cardId
                ? route.params.cards
                    .filter(item => item.id === formValues.cardId)[0]
                    .cardNumber.split(' ')[3] + ' ile biten kart'
                : ''
            }
            label="Kart"
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={{fontSize: responsive(35)}}>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSave()}>
          <Text style={{fontSize: responsive(35)}}>✅</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal
        open={isOpen}
        date={new Date()}
        mode="date"
        onConfirm={date => {
          setIsOpen(false);
          setFormValues({...formValues, date: formater.format(date)});
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
      <BottomSheet
        ref={categoryBottomSheetRef}
        style={styles.bottomSheet}
        backgroundStyle={{
          backgroundColor: Colors.primary,
        }}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleCategoryBottomSheetChange}
        animateOnMount
        enablePanDownToClose={true}>
        <TouchableOpacity
          onPress={() => categoryBottomSheetRef.current?.close()}
          style={styles.closeIcon}>
          <Text>❌</Text>
        </TouchableOpacity>
        <FlatList
          data={ActivityCategoryNames}
          style={{marginVertical: 20}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setFormValues({
                  ...formValues,
                  category: item.value,
                });
                categoryBottomSheetRef.current?.close();
              }}
              style={[
                styles.categoryItem,
                {
                  borderColor:
                    formValues.category === item.value
                      ? Colors.secondary
                      : Colors.white,
                  backgroundColor:
                    formValues.category === item.value
                      ? Colors.secondary
                      : 'transparent',
                },
              ]}>
              <Text style={[styles.categoryItemText]}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
      </BottomSheet>
      <BottomSheet
        ref={cardBottomSheetRef}
        style={styles.bottomSheet}
        backgroundStyle={{
          backgroundColor: Colors.primary,
        }}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleCardBottomSheetChange}
        animateOnMount
        enablePanDownToClose={true}>
        <TouchableOpacity
          onPress={() => cardBottomSheetRef.current?.close()}
          style={styles.closeIcon}>
          <Text>❌</Text>
        </TouchableOpacity>
        <FlatList
          data={route.params.cards}
          style={{marginVertical: 20}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setFormValues({
                  ...formValues,
                  cardId: item.id,
                });
                cardBottomSheetRef.current?.close();
              }}
              style={[
                styles.categoryItem,
                {
                  borderColor:
                    formValues.cardId === item.id
                      ? Colors.secondary
                      : Colors.white,
                  backgroundColor:
                    formValues.cardId === item.id
                      ? Colors.secondary
                      : 'transparent',
                },
              ]}>
              <Text style={[styles.categoryItemText]}>
                {item.cardNumber.split(' ')[3] + ' ile biten kart'}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => (
            <Text style={styles.cardsEmptyListText}>
              Henüz bir kart eklemediniz.
            </Text>
          )}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};

export default ActivityItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  input: {
    borderColor: Colors.white,
    alignSelf: 'center',
  },
  inputStyle: {
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomSheet: {
    shadowColor: '#aaa',
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  categoryItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
  },
  categoryItemText: {
    fontWeight: 'bold',
    color: Colors.white,
  },
  cardsEmptyListText: {
    textAlign: 'center',
    width: WIDTH,
    fontWeight: 'bold',
    color: Colors.lightGray,
    paddingVertical: 20,
  },
  bottomButtons: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },
  closeIcon: {position: 'absolute', right: 15, top: 0, zIndex: 109123},
});
