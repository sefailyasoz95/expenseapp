import {
  ActivityIndicator,
  Alert,
  Animated,
  Button,
  Dimensions,
  Easing,
  Image,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {getUniqueId} from 'react-native-device-info';
import {createUser} from '../../Redux/actions/userActions';
import Carousel, {
  CarouselProperties,
  Pagination,
} from 'react-native-snap-carousel';
import {Colors} from '../../Constants/Colors';
import {responsive} from '../../utils/Helpers';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import SInput from '../../Components/SInput/SInput';
import Tab from '../../Components/Tabs/Tab';
import DatePicker from 'react-native-date-picker';
import InputTrigger from '../../Components/InputTrigger/InputTrigger';

type Props = {};

const WelcomeScreen = (props: Props) => {
  const dispatch = useAppDispatch();
  const carouselRef = useRef<any>(null);
  const data = [
    {
      image: require('../../Assets/Images/HomeScreen.png'),
    },
    {
      image: require('../../Assets/Images/ActivityScreen.png'),
    },
    {
      image: require('../../Assets/Images/HomeScreen2.png'),
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const {width} = Dimensions.get('window');
  const {loading, isWelcomePassed} = useAppSelector(state => state.global);
  const [formValues, setFormValues] = useState({
    email: '',
    gender: '',
    dateOfBirth: new Date('2007-01-01'),
  });
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const onPress = async () => {
    if (!formValues.dateOfBirth || !formValues.email || !formValues.gender) {
      Alert.alert('Bütün alanları doldurman gerekiyor!');
    } else {
      const deviceId = await getUniqueId();
      dispatch(
        createUser({
          deviceId,
          dateOfBirth: formValues.dateOfBirth,
          email: formValues.email,
          gender: formValues.gender,
          isPremium: false,
        }),
      );
    }
  };
  const nextSlide = (index: number) => setActiveSlide(index);
  useEffect(() => {
    if (activeSlide === 2) {
      Animated.parallel([
        Animated.timing(opacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 300,
          delay: 500,
          easing: Easing.ease,
        }),
        Animated.timing(scale, {
          useNativeDriver: true,
          toValue: 1,
          duration: 300,
          delay: 500,
          easing: Easing.ease,
        }),
      ]).start();
    }
  }, [activeSlide]);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator />}
      {activeSlide === 2 && (
        <Animated.View style={[styles.modal, {transform: [{scale}], opacity}]}>
          <View style={styles.modalContent}>
            <SInput
              placeholder="Email"
              name="email"
              onTextChanged={(field, email) =>
                setFormValues({...formValues, email})
              }
              style={{
                borderColor: 'white',
              }}
              inputStyle={{
                color: 'white',
              }}
            />
            <InputTrigger
              isModalOpen={isOpen}
              onModalOpen={() => {
                Keyboard.dismiss();
                setIsOpen(true);
              }}
              value={formValues.dateOfBirth.toDateString()}
              label="Doğum Tarihi"
            />
            <View style={styles.genders}>
              <Tab
                index={1}
                text="Erkek"
                isActive={formValues.gender === 'male'}
                onPress={() => {
                  Keyboard.dismiss();
                  setFormValues({...formValues, gender: 'male'});
                }}
              />
              <Tab
                index={2}
                text="Kadın"
                isActive={formValues.gender === 'female'}
                onPress={() => {
                  Keyboard.dismiss();
                  setFormValues({...formValues, gender: 'female'});
                }}
              />
              <Tab
                index={3}
                text="Diğer"
                isActive={formValues.gender === 'other'}
                onPress={() => {
                  Keyboard.dismiss();
                  setFormValues({...formValues, gender: 'other'});
                }}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
              {loading ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={styles.buttonText}>Kaydet</Text>
              )}
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
      <Carousel
        ref={carouselRef}
        sliderWidth={width}
        itemWidth={width}
        data={data}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => {
              carouselRef.current?.snapToNext();
            }}
            style={styles.imgContainer}>
            <Image
              key={index}
              resizeMode="contain"
              source={item.image}
              style={styles.renderItem}
            />
          </Pressable>
        )}
        onSnapToItem={nextSlide}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.pagination}
        dotStyle={styles.dots}
        inactiveDotStyle={styles.inactiveDots}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      <DatePicker
        modal
        open={isOpen}
        date={new Date('2007-01-01')}
        maximumDate={new Date('2007-01-31')}
        mode="date"
        onConfirm={date => {
          setIsOpen(false);
          setFormValues({...formValues, dateOfBirth: date});
        }}
        onCancel={() => {
          setIsOpen(false);
        }}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
  pagination: {
    position: 'absolute',
    bottom: responsive(12),
    alignSelf: 'center',
  },
  dots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  inactiveDots: {
    backgroundColor: Colors.lightGray,
  },
  renderItem: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: responsive(50),
    resizeMode: 'contain',
  },
  modal: {
    width: WIDTH,
    height: HEIGHT,
    position: 'absolute',
    alignItems: 'center',
    zIndex: 99999,
  },
  modalContent: {
    backgroundColor: '#0c0c0c',
    borderRadius: 10,
    width: WIDTH * 0.95,
    position: 'absolute',
    zIndex: 999999,
    alignItems: 'center',
    paddingVertical: responsive(20),
    top: responsive(175),
  },
  genders: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: responsive(15),
  },
  button: {
    paddingHorizontal: 15,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    paddingVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: responsive(16),
  },
  imgContainer: {
    width: '95%',
    height: '95%',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
