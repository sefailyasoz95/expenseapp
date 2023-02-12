import {Shadow, RoundedRect, Canvas} from '@shopify/react-native-skia';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {HEIGHT, WIDTH} from '../../Constants/Constants';

type Props = {
  text: string;
  isActive: boolean;
  onPress: (activeIndex: number) => void;
  index: number;
};

const Tab = ({isActive, text, onPress, index}: Props) => {
  return (
    <Pressable onPress={() => onPress(index)} style={[styles.container]}>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}>
        <RoundedRect
          x={0}
          y={0}
          width={WIDTH * 0.3}
          height={HEIGHT * 0.05}
          r={12}
          color={'rgba(37,40,45,1)'}>
          <Shadow
            dx={5}
            // dx={-5}
            dy={5}
            blur={5}
            inner={true}
            color={!isActive ? '#555' : '#111'}
          />
          <Shadow
            dx={-5}
            // dx={-5}
            dy={-5}
            inner={true}
            blur={5}
            color={!isActive ? '#111' : '#555'}
          />
        </RoundedRect>
      </Canvas>
      <View style={styles.content}>
        <Text
          style={{
            color: isActive ? Colors.secondary : Colors.lightGray,
            fontWeight: '700',
          }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: WIDTH * 0.3,
    height: HEIGHT * 0.05,
  },
  content: {
    position: 'absolute',
    top: HEIGHT < 700 ? '20%' : '30%',
    alignSelf: 'center',
  },
});
export default Tab;
