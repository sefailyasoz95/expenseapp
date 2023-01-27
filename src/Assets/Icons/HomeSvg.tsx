import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '../../Constants/Colors';
type Props = {
  selected: boolean;
};
const HomeSvg = (props: Props) => (
  <Svg width="30" height="30" viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.614 1.21a1 1 0 0 0-1.228 0l-9 7A1 1 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a1 1 0 0 0-.386-.79l-9-7ZM16 20h4V9.49l-8-6.223-8 6.222V20h4v-8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v8Zm-6 0v-7h4v7h-4Z"
      fill={props.selected ? Colors.secondary : Colors.white}
    />
  </Svg>
);
export default HomeSvg;
