import {Shadow, Fill, RoundedRect, Canvas} from '@shopify/react-native-skia';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {HEIGHT} from '../../Constants/Constants';
import {responsive} from '../../utils/Helpers';
import Icon from '../Icon/Icon';
type Props = {
  icon: React.ReactElement | React.ReactNode;
  height: number;
  width: number;
  focused: boolean;
  onPress: () => void;
};

const NeumorphismTabBarButton = ({
  icon,
  onPress,
  width,
  height,
  focused,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: responsive(width),
        height: responsive(height),
        // borderWidth: 1,
        // borderColor: 'red',
        marginLeft: -10,
      }}>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}>
        <RoundedRect
          x={responsive(10)}
          y={responsive(10)}
          width={responsive(width - 10)}
          height={responsive(height - 10)}
          r={12}
          color={'rgba(37,40,45,1)'}>
          <Shadow
            dx={5}
            // dx={-5}
            dy={5}
            blur={5}
            inner={true}
            color={!focused ? '#555' : '#111'}
          />
          <Shadow
            dx={-5}
            // dx={-5}
            dy={-5}
            inner={true}
            blur={5}
            color={!focused ? '#111' : '#555'}
          />
        </RoundedRect>
      </Canvas>
      <View
        style={{
          position: 'absolute',
          left: HEIGHT < 700 ? '33%' : '36%',
          top: HEIGHT < 700 ? '30%' : '33%',
        }}>
        {icon}
      </View>
    </TouchableOpacity>
  );
};

export default NeumorphismTabBarButton;
