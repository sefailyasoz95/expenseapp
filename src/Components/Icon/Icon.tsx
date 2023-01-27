import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeSvg from '../../Assets/Icons/HomeSvg';
import SettingsSvg from '../../Assets/Icons/SettingsSvg';
import ChartSvg from '../../Assets/Icons/ChartSvg';

type Props = {
  selected: boolean;
  name: string;
};

const Icon = ({name, selected}: Props) => {
  if (name === 'Home') return <HomeSvg selected={selected} />;
  else if (name === 'Settings') return <SettingsSvg selected={selected} />;
  else if (name === 'Dashboard') return <ChartSvg selected={selected} />;
  else return <HomeSvg selected={selected} />;
};

export default Icon;

const styles = StyleSheet.create({});
