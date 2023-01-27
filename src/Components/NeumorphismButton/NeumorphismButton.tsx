import {Shadow, Fill, RoundedRect, Canvas} from '@shopify/react-native-skia';
import {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../../Constants/Colors';
import {responsive} from '../../utils/Helpers';
import Icon from '../Icon/Icon';
type Props = {
  icon?: React.ReactElement | React.ReactNode;
  height: number;
  width: number;
};

const NeumorphismButton = ({icon, width, height}: Props) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={{
        width: responsive(width),
        height: responsive(height),
      }}>
      <Canvas
        style={{
          width: responsive(width),
          height: responsive(height),
        }}>
        {/* <Fill color={'rgba(37,40,45,1)'} /> */}
        <RoundedRect
          x={responsive(10)}
          y={responsive(10)}
          width={responsive(width - 10)}
          height={responsive(height - 10)}
          r={responsive(5)}
          color={'rgba(37,40,45,1)'}>
          <Shadow
            dx={5}
            dy={5}
            blur={5}
            inner={true}
            color={selected ? '#555' : '#111'}
          />
          <Shadow
            dx={-5}
            dy={-5}
            inner={true}
            blur={5}
            color={selected ? '#111' : '#555'}
          />
        </RoundedRect>
      </Canvas>
      {icon ? (
        icon
      ) : (
        <View
          style={{
            position: 'absolute',
            left: width / 3,
            top: height / 3,
          }}>
          <Icon name="Home" selected={selected} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NeumorphismButton;
