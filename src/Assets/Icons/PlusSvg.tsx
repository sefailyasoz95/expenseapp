import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
type Props = {
  size?: string;
};
const PlusSvg = (props: Props) => (
  <Svg
    width={props.size ?? '30'}
    height={props.size ?? '30'}
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M13 11h7a1 1 0 0 1 0 2h-7v7a1 1 0 0 1-2 0v-7H4a1 1 0 0 1 0-2h7V4a1 1 0 0 1 2 0v7z"
      fill={'#fff'}
    />
  </Svg>
);
export default PlusSvg;
