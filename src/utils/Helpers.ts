import {Dimensions, PixelRatio, Platform} from 'react-native';
export const deviceHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('window');
const widthVariable = 375;

export const responsive = (value: number) => {
  let temp = value;
  if (deviceHeight != 896) {
    let temp2 = (value / 896).toFixed(4);
    temp = PixelRatio.roundToNearestPixel(deviceHeight * Number(temp2));
  }
  return temp;
};
