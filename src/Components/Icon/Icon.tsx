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
  else if (name === 'key:') return <FunSvg />;
  else if (name === 'Bills') return <BillSvg />;
  else if (name === 'Salary') return <SalarySvg />;
  else if (name === 'Transportation') return <TransportationSvg />;
  else if (name === 'Kitchen') return <KitchenSvg />;
  else if (name === 'Money') return <TransactionSvg />;
  else if (name === 'Extra') return <SalarySvg />;
  else if (name === 'Rent') return <RentSvg />;
  else if (name === 'CreditCard') return <CreditCardSvg />;
  else if (name === 'Credit') return <CreditCardSvg />;
  else if (name === 'Meal') return <FoodSvg />;
  else if (name === 'Gas') return <GasSvg />;
  else if (name === 'Car') return <CarSvg />;
  else return <HomeSvg selected={selected} />;
};

export default Icon;

const styles = StyleSheet.create({});
