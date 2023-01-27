import {StyleSheet, View} from 'react-native';
import React from 'react';
import {HEIGHT, WIDTH} from '../../Constants/Constants';
import Tab from './Tab';

type Props = {
  onTabChange: (activeIndex: number) => void;
  activeIndex: number;
};

const Tabs = ({onTabChange, activeIndex}: Props) => {
  return (
    <View style={[styles.container]}>
      <Tab
        text="Genel Bakış"
        isActive={activeIndex === 1}
        index={1}
        onPress={onTabChange}
      />
      <Tab
        text="Giderler"
        isActive={activeIndex === 2}
        index={2}
        onPress={onTabChange}
      />
      <Tab
        text="Gelirler"
        isActive={activeIndex === 3}
        index={3}
        onPress={onTabChange}
      />
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.95,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  animated: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 50,
    width: WIDTH * 0.3,
    height: HEIGHT * 0.05,
  },
  tab: {
    width: WIDTH * 0.3,
    borderRadius: 50,
    zIndex: 999,
    borderWidth: 1,
    backgroundColor: 'white',
    height: HEIGHT * 0.05,
  },
});
