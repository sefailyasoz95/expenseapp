import {
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  createRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {HomeStackParams, IActivity, ICard} from '../../Types/types';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {Colors} from '../../Constants/Colors';
import {responsive} from '../../utils/Helpers';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import Card from '../../Components/Card/Card';
import ActivityItem from '../../Components/ActivityItem/ActivityItem';
import PlusSvg from '../../Assets/Icons/PlusSvg';
import Tabs from '../../Components/Tabs/Tabs';
import AddCardModal from '../../Components/AddCardModal/AddCardModal';
import Animated, {
  Easing,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch, useAppSelector} from '../../Redux/store/store';
import {getActivitiesByDeviceId} from '../../Redux/actions/activityActions';
import Loading from '../../Components/Loading/Loading';
import {getCardsByDeviceId} from '../../Redux/actions/cardActions';
import {writeLog} from '../../Redux/actions/logActions';
import {WebsocketContext} from '../../Context/WebSocketContext';

type Props = {
  navigation: NavigationProp<HomeStackParams, 'HomeScreen'>;
  route: RouteProp<HomeStackParams, 'HomeScreen'>;
};

const HomeScreen = ({navigation, route}: Props) => {
  // const socket = useContext(WebsocketContext);
  const formater = new Intl.DateTimeFormat('tr-TR');
  const [selectedCard, setSelectedCard] = useState<ICard | undefined>(
    undefined,
  );
  const dispatch = useAppDispatch();
  const {activities, loading, cards} = useAppSelector(state => state.global);
  const [activeIndex, setActiveIndex] = useState(1);
  const [totalBalance, setTotalBalance] = useState<Number>(0);
  const scrollRef = createRef<ScrollView>();
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [ref, setRef] = useState<any>();
  useEffect(() => {
    setRef(scrollRef?.current);
  }, []);

  const getActivityItemsAndCalculateBalance = useCallback(() => {
    if (activities.length > 0) {
      let incomes = 0;
      let expenses = 0;
      activities.map((item: IActivity, index: number) => {
        if (item.type === 'expense') expenses += item.price;
        else incomes += item.price;
      });
      setTotalBalance(incomes - expenses);
    }
  }, [activities]);

  useEffect(() => {
    if (activities.length > 0) {
      let incomes = 0;
      let expenses = 0;
      activities.map((item: IActivity, index: number) => {
        if (item.type === 'expense') expenses += item.price;
        else incomes += item.price;
      });
      setTotalBalance(incomes - expenses);
    }
  }, [activities]);

  useEffect(() => {
    // socket.on('connect', () => {
    //   console.log('Connected!');
    // });
    // socket.on('onMessage', newMessage => {
    //   console.log('onMessage event received!');
    //   console.log(newMessage);
    // });
    dispatch(writeLog('app initialized'));
    navigation.addListener('focus', () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      getActivityItemsAndCalculateBalance();
      dispatch(getActivitiesByDeviceId());
      dispatch(getCardsByDeviceId());
    });

    // return () => {
    //   console.log('Unregistering Events...');
    //   socket.off('connect');
    //   socket.off('onMessage');
    // };
  }, []);

  useEffect(() => {
    ref?.scrollTo({
      x: WIDTH * (activeIndex - 1),
      animated: true,
    });
  }, [activeIndex]);

  return (
    <>
      <AddCardModal
        isOpen={addCardOpen}
        activityItems={activities}
        selectedCard={selectedCard}
        onClose={refReshCards => {
          setAddCardOpen(false);
          if (refReshCards) {
            dispatch(getCardsByDeviceId());
            getActivityItemsAndCalculateBalance();
          }
        }}
        cards={cards}
      />
      {loading && <Loading />}
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.balance}>{`${totalBalance} ₺`}</Text>
            <Text style={styles.balanceText}>Toplam Bakiye</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ActivityItemScreen', {
                cards: cards.length > 0 ? cards : [],
                activityItems: activities.length > 0 ? activities : [],
              });
            }}>
            <PlusSvg />
          </TouchableOpacity>
        </View>
        <Animated.View>
          <View style={styles.cardsHeader}>
            <Text style={styles.secondSectionTitle}>Kartlar</Text>
            <TouchableOpacity
              onPress={() => {
                if (selectedCard?.cardNumber) setSelectedCard(undefined);
                setAddCardOpen(true);
              }}>
              <PlusSvg size="24" />
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={cards}
              showsHorizontalScrollIndicator={false}
              snapToAlignment="start"
              horizontal
              snapToInterval={WIDTH * 0.8 + 10}
              decelerationRate="fast"
              style={styles.scrollViewStyle}
              renderItem={({item, index}) => (
                <Card
                  key={index}
                  card={item}
                  onCardLongPress={() => {
                    setAddCardOpen(true);
                    setSelectedCard(item);
                  }}
                />
              )}
              ListEmptyComponent={() => (
                <Text style={styles.cardsEmptyListText}>
                  Henüz bir kart eklemediniz.
                </Text>
              )}
            />
          </View>
        </Animated.View>
        <Tabs activeIndex={activeIndex} onTabChange={setActiveIndex} />
        <View style={[{flex: 1}]}>
          <ScrollView
            horizontal
            nestedScrollEnabled
            ref={scrollRef}
            snapToAlignment="start"
            snapToInterval={WIDTH}
            scrollEventThrottle={16}
            onScroll={event => {
              if (event.nativeEvent.contentOffset.x === WIDTH * 0)
                setActiveIndex(1);
              else if (
                event.nativeEvent.contentOffset.x.toFixed(2) ===
                WIDTH.toFixed(2)
              )
                setActiveIndex(2);
              else if (
                event.nativeEvent.contentOffset.x.toFixed(2) ===
                (WIDTH * 2).toFixed(2)
              )
                setActiveIndex(3);
            }}
            decelerationRate="fast">
            <Animated.FlatList
              key={'generalLook'}
              data={activities}
              snapToAlignment="start"
              // onScroll={scrollHandler}
              snapToInterval={HEIGHT * 0.1}
              decelerationRate="fast"
              contentContainerStyle={{
                width: WIDTH,
              }}
              renderItem={({item, index}) => (
                <ActivityItem
                  type={item.type}
                  key={index}
                  item={item}
                  onItemLongPress={() => {
                    navigation.navigate('ActivityItemScreen', {
                      activityItems: activities,
                      cards,
                      selectedActivityItem: item,
                    });
                  }}
                  cards={cards}
                />
              )}
              ListEmptyComponent={() => (
                <ActivityItem
                  type={'income'}
                  cards={[]}
                  onItemLongPress={() => {}}
                  item={{
                    category: 'Other',
                    date: '',
                    description: 'Henüz bir gider ya da gelir eklemediniz',
                    id: -1,
                    price: 0,
                    type: 'income',
                  }}
                />
              )}
            />
            <FlatList
              key={'expenses'}
              data={activities.filter(item => item.type === 'expense')}
              snapToAlignment="start"
              contentContainerStyle={{
                width: WIDTH,
              }}
              snapToInterval={HEIGHT * 0.1}
              decelerationRate="fast"
              renderItem={({item, index}) => (
                <ActivityItem
                  type={item.type}
                  key={index}
                  item={item}
                  onItemLongPress={() => {
                    navigation.navigate('ActivityItemScreen', {
                      activityItems: activities,
                      cards,
                      selectedActivityItem: item,
                    });
                  }}
                  cards={cards}
                />
              )}
              ListEmptyComponent={() => (
                <ActivityItem
                  type={'expense'}
                  cards={[]}
                  onItemLongPress={() => {}}
                  item={{
                    category: 'Other',
                    date: '',
                    description: 'Henüz bir gider eklemediniz',
                    id: -1,
                    price: 0,
                    type: 'expense',
                  }}
                />
              )}
            />
            <FlatList
              key={'incomes'}
              data={activities.filter(item => item.type === 'income')}
              snapToAlignment="start"
              contentContainerStyle={{
                width: WIDTH,
              }}
              snapToInterval={HEIGHT * 0.1}
              decelerationRate="fast"
              renderItem={({item, index}) => (
                <ActivityItem
                  type={item.type}
                  key={index}
                  item={item}
                  onItemLongPress={() => {
                    navigation.navigate('ActivityItemScreen', {
                      activityItems: activities,
                      cards,
                      selectedActivityItem: item,
                    });
                  }}
                  cards={cards}
                />
              )}
              ListEmptyComponent={() => (
                <ActivityItem
                  onItemLongPress={() => {}}
                  type={'income'}
                  cards={[]}
                  item={{
                    category: 'Other',
                    date: '',
                    description: 'Henüz bir gelir eklemediniz',
                    id: -1,
                    price: 0,
                    type: 'income',
                  }}
                />
              )}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  header: {
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
    marginBottom: 10,
    zIndex: 9999,
    backgroundColor: Colors.primary,
  },
  balance: {
    color: Colors.white,
    fontSize: responsive(25),
    fontWeight: '600',
  },
  balanceText: {
    color: Colors.white,
    opacity: 0.7,
  },
  scrollViewStyle: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  secondSectionTitle: {
    color: 'white',
    fontSize: 22,
    paddingHorizontal: 10,
  },
  cardsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
  },
  cardsEmptyListText: {
    textAlign: 'center',
    width: WIDTH,
    fontWeight: 'bold',
    color: Colors.lightGray,
    paddingVertical: 20,
  },
});
