import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../Constants/Colors';
type Props = {
  selected: boolean;
};
const ChartSvg = (props: Props) => (
  <Svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M13 21a1 1 0 1 0 2 0V3a1 1 0 1 0-2 0v18ZM5 21a1 1 0 1 0 2 0V11a1 1 0 1 0-2 0v10ZM10 22a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v8a1 1 0 0 1-1 1ZM17 21a1 1 0 1 0 2 0V7a1 1 0 1 0-2 0v14Z"
      fill={props.selected ? Colors.secondary : Colors.white}
    />
  </Svg>
);
export default ChartSvg;
