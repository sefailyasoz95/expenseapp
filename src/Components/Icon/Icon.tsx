import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeSvg from '../../Assets/Icons/HomeSvg';
import SettingsSvg from '../../Assets/Icons/SettingsSvg';
import ChartSvg from '../../Assets/Icons/ChartSvg';
import FunSvg from '../../Assets/Icons/FunSvg';
import BillSvg from '../../Assets/Icons/BillSvg';
import SalarySvg from '../../Assets/Icons/SalarySvg';
import TransportationSvg from '../../Assets/Icons/TransportationSvg';
import KitchenSvg from '../../Assets/Icons/KitchenSvg';
import TransactionSvg from '../../Assets/Icons/TransactionSvg';
import RentSvg from '../../Assets/Icons/RentSvg';
import CreditCardSvg from '../../Assets/Icons/CreditCardSvg';
import FoodSvg from '../../Assets/Icons/FoodSvg';
import GasSvg from '../../Assets/Icons/GasSvg';
import CarSvg from '../../Assets/Icons/CarSvg';

type Props = {
  selected: boolean;
  name: string;
};

const Icon = ({name, selected}: Props) => {
  if (name === 'Home') return <HomeSvg selected={selected} />;
  else if (name === 'Settings') return <SettingsSvg selected={selected} />;
  else if (name === 'Dashboard') return <ChartSvg selected={selected} />;
  else if (name === 'Eğlence') return <FunSvg />;
  else if (name === 'Faturalar') return <BillSvg />;
  else if (name === 'Maaş') return <SalarySvg />;
  else if (name === 'Ulaşım') return <TransportationSvg />;
  else if (name === 'Mutfak') return <KitchenSvg />;
  else if (name === 'Para') return <TransactionSvg />;
  else if (name === 'Ek') return <SalarySvg />;
  else if (name === 'Kira') return <RentSvg />;
  else if (name === 'Kredi Kartı') return <CreditCardSvg />;
  else if (name === 'Kredi') return <CreditCardSvg />;
  else if (name === 'Yemek') return <FoodSvg />;
  else if (name === 'Benzin') return <GasSvg />;
  else if (name === 'Araba') return <CarSvg />;
  else return <HomeSvg selected={selected} />;
};

export default Icon;

const styles = StyleSheet.create({});
