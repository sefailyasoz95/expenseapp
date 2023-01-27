import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ICard} from '../../Types/types';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import {Colors} from '../../Constants/Colors';

import {
  Canvas,
  Rect,
  LinearGradient,
  Skia,
  Shader,
  vec,
  RoundedRect,
  Shadow,
} from '@shopify/react-native-skia';
import {responsive} from '../../utils/Helpers';

type Props = {
  card: ICard;
  onCardLongPress: () => void;
};

const Card = ({card, onCardLongPress}: Props) => {
  return (
    <Pressable style={styles.container} onLongPress={onCardLongPress}>
      <Canvas style={styles.card}>
        <RoundedRect
          x={0}
          y={0}
          r={14}
          width={WIDTH * 0.8}
          height={HEIGHT < 700 ? HEIGHT * 0.23 : HEIGHT * 0.2}>
          <Shadow dx={3} dy={3} blur={10} inner color={'rgba(136,98,199,1)'} />
          <Shadow dx={-5} dy={-5} blur={10} inner color={'rgba(20,20,20,1)'} />
          <LinearGradient
            start={vec(60, 60)}
            end={vec(190, 190)}
            colors={[
              'rgba(136,98,199,1)',
              'rgba(112,91,176,1)',
              'rgba(160,100,182,1)',
            ]}
          />
        </RoundedRect>
      </Canvas>
      <View style={styles.cardContent}>
        {/* <Text>{card.cardType}</Text> */}
        <View />
        <Text style={styles.cardNumber}>{card.cardDisplayNumber}</Text>
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.labels}>Kart Sahibi</Text>
            <Text style={styles.bottomValues}>{card.cardHolder}</Text>
          </View>
          <View style={styles.bottomRight}>
            <View>
              <Text style={styles.labels}>Tarih</Text>
              <Text style={styles.bottomValues}>{card.validThru}</Text>
            </View>
            <View>
              <Text style={styles.labels}>CVV</Text>
              <Text style={styles.bottomValues}>{card.cvv}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.8,
    marginHorizontal: 5,
    // height: HEIGHT < 700 ? HEIGHT * 0.23 : HEIGHT * 0.2,
  },
  card: {
    width: WIDTH * 0.8,
    height: HEIGHT < 700 ? HEIGHT * 0.23 : HEIGHT * 0.2,
  },
  cardContent: {
    justifyContent: 'space-between',
    position: 'absolute',
    width: WIDTH * 0.72,
    height: HEIGHT < 700 ? HEIGHT * 0.22 : HEIGHT * 0.19,
    alignSelf: 'center',
    paddingVertical: 5,
  },
  bottomValues: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  labels: {color: '#ccc'},
  cardNumber: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    marginTop: 15,
  },
  bottomRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '30%',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
