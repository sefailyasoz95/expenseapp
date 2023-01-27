import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
type Props = {};
const CreditCardSvg = (props: Props) => (
  <Svg
    data-name="Layer 1"
    viewBox="0 0 122.88 78.22"
    width="24"
    height="24"
    {...props}>
    <Path
      d="M11.24 58h17v4.1h-17V58Zm75.4-13a9.77 9.77 0 0 1 7.87 4 9.85 9.85 0 1 1 0 11.76A9.84 9.84 0 1 1 86.64 45Zm29.48 29.29a2.94 2.94 0 0 0 2.88-2.81V34H3.9v37.48a2.64 2.64 0 0 0 .82 2 2.87 2.87 0 0 0 2 .85ZM6.74 78.2a6.55 6.55 0 0 1-4.76-2 6.58 6.58 0 0 1-2-4.75V6.74A6.72 6.72 0 0 1 6.74 0h109.38a6.76 6.76 0 0 1 6.76 6.74v64.74a6.68 6.68 0 0 1-2 4.75 6.81 6.81 0 0 1-4.77 2H6.73ZM3.9 14.56H119V6.73a2.75 2.75 0 0 0-.87-2 2.81 2.81 0 0 0-2-.87H6.74a2.8 2.8 0 0 0-2 .87 2.76 2.76 0 0 0-.82 2v7.83ZM36.09 58h28.29v4.1H36.09V58Z"
      fillRule="evenodd"
    />
  </Svg>
);
export default CreditCardSvg;
