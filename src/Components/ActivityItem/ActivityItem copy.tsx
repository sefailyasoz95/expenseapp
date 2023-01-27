import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Canvas,
  LinearGradient,
  RoundedRect,
  Shadow,
  vec,
} from '@shopify/react-native-skia';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import {IActivity} from '../../Types/types';
import {DummyCards} from '../../Constants/Dummy';

type Props = {
  item: IActivity;
  type: 'expense' | 'income';
};

const ActivityItem = ({item, type}: Props) => {
  return (
    <View
      style={[
        styles.container,
        // {borderColor: type === 'expense' ? '#ff5555' : '#44cc44'},
      ]}>
      {/* <Canvas style={styles.card}>
        <RoundedRect
          x={0}
          y={0}
          r={14}
          width={WIDTH * 0.95}
          height={HEIGHT < 700 ? HEIGHT * 0.095 : HEIGHT * 0.085}>
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
            start={vec(50, 30)}
            end={vec(120, 150)}
            colors={['#333', '#555', '#333']}
            // colors={type === 'expense' ? ['#ff1111'] : ['#44cc44']}
          />
        </RoundedRect>
      </Canvas> */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.description}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>
            {item.cardId
              ? DummyCards.find(it => it.id === item.cardId)?.cardNumber.split(
                  ' ',
                )[3] + ' ile biten kart'
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
    </View>
  );
};

export default ActivityItem;

const styles = StyleSheet.create({
  card: {
    width: WIDTH * 0.95,
    height: HEIGHT < 700 ? HEIGHT * 0.095 : HEIGHT * 0.085,
    alignSelf: 'center',
  },
  content: {
    paddingVertical: 5,
    width: '95%',
    justifyContent: 'space-between',
    height: HEIGHT < 700 ? HEIGHT * 0.09 : HEIGHT * 0.08,
  },
  description: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    marginVertical: 8,
    width: WIDTH * 0.95,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    // borderWidth: 3,
    borderRadius: 12,
    backgroundColor: 'rgba(75,75,75,0.75)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
