import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from '@shopify/react-native-skia';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import {IActivity, ICard} from '../../Types/types';
import {Colors} from '../../Constants/Colors';
import Icon from '../Icon/Icon';

type Props = {
  item: IActivity;
  type: 'expense' | 'income';
  cards: ICard[];
  onItemLongPress: () => void;
};

const ActivityItem = ({item, type, cards, onItemLongPress}: Props) => {
  const formater = new Intl.DateTimeFormat('tr-TR');
  return (
    <Pressable style={styles.container} onLongPress={onItemLongPress}>
      <Canvas style={styles.card}>
        <RoundedRect
          x={0}
          y={0}
          r={14}
          width={WIDTH * 0.95}
          height={HEIGHT < 700 ? HEIGHT * 0.11 : HEIGHT * 0.095}>
          <Shadow
            dx={3}
            dy={3}
            blur={10}
            inner
            color={'#333'}
            // color={type === 'expense' ? '#ff3333' : '#22cc22'}
          />
          <Shadow dx={-5} dy={-5} blur={10} inner color={'#000'} />
          <LinearGradient
            start={vec(60, 10)}
            end={vec(120, 150)}
            colors={['#000', '#333', '#000']}
            // colors={type === 'expense' ? ['#ff1111'] : ['#44cc44']}
          />
        </RoundedRect>
      </Canvas>
      <View style={styles.content}>
        <View style={styles.row}>
          <Icon name={item.category} selected={false} />
          <Text style={[styles.description, {width: '60%'}]}>
            {item.description}
          </Text>
          <Text style={styles.description}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.description, {fontStyle: 'italic'}]}>
            {item.card
              ? item.card.cardDisplayNumber.split(' ')[3] + ' ile biten kart'
              : ''}
          </Text>
          <Text
            style={[
              styles.description,
              {
                color: type === 'expense' ? '#ff5555' : '#44cc44',
              },
            ]}>
            {type === 'expense' ? '-' : '+'} {Number(item.price).toFixed(2)} ₺
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  card: {
    width: WIDTH * 0.95,
    height: HEIGHT < 700 ? HEIGHT * 0.11 : HEIGHT * 0.095,
    alignSelf: 'center',
  },
  content: {
    position: 'absolute',
    paddingVertical: 5,
    width: '95%',
    justifyContent: 'space-between',
    height: HEIGHT < 700 ? HEIGHT * 0.105 : HEIGHT * 0.095,
  },
  description: {
    color: Colors.lightGray,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    marginVertical: 10,
    width: WIDTH * 0.95,
    alignSelf: 'center',
    height: HEIGHT < 700 ? HEIGHT * 0.11 : HEIGHT * 0.095,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    marginLeft: 5,
  },
});
