import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import {ActivityCategoryNames} from '../../Constants/Dummy';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {responsive} from '../../utils/Helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {
  createActivity,
  deleteActivity,
  updateActivity,
} from '../../Redux/actions/activityActions';
import {getUniqueId} from 'react-native-device-info';
import Loading from '../../Components/Loading/Loading';
import Icon from '../../Components/Icon/Icon';

type Props = {
  navigation: NavigationProp<HomeStackParams, 'ActivityItemScreen'>;
  route: RouteProp<HomeStackParams, 'ActivityItemScreen'>;
};

const ActivityItemScreen = ({navigation, route}: Props) => {
  const formater = new Intl.DateTimeFormat('tr-TR');
  const dispatch = useAppDispatch();
  const {loading} = useAppSelector(state => state.global);
  const categoryBottomSheetRef = useRef<BottomSheet>(null);
  const cardBottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '40%'], []);
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<IActivity>({
    id: -1,
    category: ActivityCategoryNames[0].value,
    date: formater.format(new Date()),
    description: '',
    price: 0,
    type: 'expense',
    cardId: undefined,
  });
  console.log('route.params: ', route.params.selectedActivityItem);
  useEffect(() => {
    if (route.params.selectedActivityItem) {
      setFormValues(route.params.selectedActivityItem);
    }
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
      Alert.alert('Açıklama ve Tutar alanları zorunludur!');
    } else {
      const deviceId = await getUniqueId();
      if (route.params.selectedActivityItem) {
        console.log('here?');

        let dataTobeSend = {
          ...formValues,
          userEmail: 'sefailyas1455@gmail.com',
          deviceId,
        };
        dispatch(
          updateActivity({
            id: route.params.selectedActivityItem.id,
            data: dataTobeSend,
          }),
        );
      } else {
        const {id, ...rest} = formValues;
        let dataTobeSend = {
          ...rest,
          userEmail: 'sefailyas1455@gmail.com',
          deviceId,
        };

        dispatch(createActivity(dataTobeSend));
      }
      navigation.navigate('HomeScreen');
    }
  };
  const handleDelete = async () => {
    dispatch(deleteActivity(route.params.selectedActivityItem!.id));
    navigation.navigate('HomeScreen');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ActivityItem
        item={formValues}
        type={formValues.type}
        cards={route.params.cards}
        onItemLongPress={() => {}}
      />
      {loading && <Loading />}
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
            value={formValues.description}
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
            value={formValues.price.toString()}
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
                    .cardDisplayNumber.split(' ')[3] + ' ile biten kart'
                : ''
            }
            label="Kart"
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={[styles.bottomButton, {borderColor: 'white'}]}
          onPress={navigation.goBack}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: responsive(20),
            }}>
            İptal
          </Text>
        </TouchableOpacity>
        {route.params.selectedActivityItem && (
          <TouchableOpacity
            style={[styles.bottomButton, {borderColor: '#ff4444'}]}
            onPress={handleDelete}>
            <Text
              style={{
                color: '#ff4444',
                fontWeight: 'bold',
                fontSize: responsive(20),
              }}>
              Sil
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.bottomButton, {borderColor: '#00cc00'}]}
          onPress={handleSave}>
          <Text
            style={{
              color: '#00cc00',
              fontWeight: 'bold',
              fontSize: responsive(20),
            }}>
            Kaydet
          </Text>
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
              key={index}
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
              <Icon key={index * 20} selected={false} name={item.value} />
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
          style={[styles.closeIcon, {left: 15, right: 0}]}>
          <Text>❌</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFormValues({...formValues, cardId: undefined});
          }}
          style={styles.closeIcon}>
          <Text style={{color: Colors.white}}>Temizle</Text>
        </TouchableOpacity>
        <FlatList
          data={route.params.cards}
          style={{marginVertical: 20}}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
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
                {item.cardDisplayNumber.split(' ')[3] + ' ile biten kart'}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryItemText: {
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 5,
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
  bottomButton: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
