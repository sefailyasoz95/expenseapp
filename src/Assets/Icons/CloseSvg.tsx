import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
type Props = {};
const CloseSvg = (props: Props) => (
  <Svg
    width="35"
    height="35"
    viewBox="0 0 64 64"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    fill={'#ff4444'}
    strokeMiterlimit={2}
    {...props}>
    <Path fill="none" d="M-448-64H832v800H-448z" />
    <Path d="m32.033 29.19 15.55-15.55 2.863 2.863-15.55 15.55 15.55 15.55-2.863 2.863-15.55-15.55-15.55 15.55-2.863-2.863 15.55-15.55-15.55-15.55 2.863-2.863 15.55 15.55Z" />
    <Path d="m32.033 29.19 15.55-15.55 2.863 2.863-15.55 15.55 15.55 15.55-2.863 2.863-15.55-15.55-15.55 15.55-2.863-2.863 15.55-15.55-15.55-15.55 2.863-2.863 15.55 15.55Z" />
  </Svg>
);
export default CloseSvg;
