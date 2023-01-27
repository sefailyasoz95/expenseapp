import * as React from 'react';
import Svg, {G, Path, Circle} from 'react-native-svg';
import {Colors} from '../../Constants/Colors';
type Props = {
  selected: boolean;
};
const SettingsSvg = (props: Props) => (
  <Svg width="30" height="30" viewBox="0 0 24 24" {...props}>
    <G fill="none" fillRule="evenodd">
      <Path d="M0 0h24v24H0z" />
      <Circle
        stroke={props.selected ? Colors.secondary : Colors.white}
        strokeWidth={2}
        strokeLinecap="round"
        cx={12}
        cy={12}
        r={3}
      />
      <Path
        d="M10.069 3.363c.646-1.817 3.216-1.817 3.862 0a2.05 2.05 0 0 0 2.811 1.164c1.742-.828 3.559.99 2.73 2.731a2.05 2.05 0 0 0 1.165 2.811c1.817.646 1.817 3.216 0 3.862a2.05 2.05 0 0 0-1.164 2.811c.828 1.742-.99 3.559-2.731 2.73a2.05 2.05 0 0 0-2.811 1.165c-.646 1.817-3.216 1.817-3.862 0a2.05 2.05 0 0 0-2.811-1.164c-1.742.828-3.559-.99-2.73-2.731a2.05 2.05 0 0 0-1.165-2.811c-1.817-.646-1.817-3.216 0-3.862a2.05 2.05 0 0 0 1.164-2.811c-.828-1.742.99-3.559 2.731-2.73a2.05 2.05 0 0 0 2.811-1.165Z"
        stroke={props.selected ? Colors.secondary : Colors.white}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </G>
  </Svg>
);
export default SettingsSvg;
