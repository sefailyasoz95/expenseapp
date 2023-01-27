import React, {createRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

export type IReceivedApplicationStatuses =
  | 'received'
  | 'reviewed'
  | 'replied'
  | 'closed'
  | 'hired';
export type IReceivedApplication = {
  id: number;
  candidateFullName: string;
  candidateEmail: string;
  appliedPositionId: number;
  appliedDate: Date | string;
  phoneNumber?: string;
  appliedFrom: 'LinkedIn' | 'Kariyer' | 'Indeed' | 'Other';
  resume?: any;
  status: IReceivedApplicationStatuses;
  coverLetter?: any;
};
export const DummyReceivedApplications: IReceivedApplication[] = [
  {
    id: 1,
    candidateEmail: 'sefailyasoz@gmail.com',
    candidateFullName: 'Sefa İlyas Öz',
    appliedDate: '11.10.2023',
    appliedFrom: 'Indeed',
    appliedPositionId: 1,
    status: 'hired',
  },
  {
    id: 2,
    candidateEmail: 'sonay_oz@gmail.com',
    candidateFullName: 'Sonay Öz',
    appliedDate: '11.10.2023',
    appliedFrom: 'Indeed',
    appliedPositionId: 6,
    status: 'received',
  },
  {
    id: 3,
    candidateEmail: 'aycan_gonduz@gmail.com',
    candidateFullName: 'Aycan Göndüz',
    appliedDate: '11.10.2023',
    appliedFrom: 'LinkedIn',
    appliedPositionId: 4,
    status: 'closed',
  },
  {
    id: 4,
    candidateEmail: 'abdulrezzak@gmail.com',
    candidateFullName: 'Abdül Rezzak',
    appliedDate: '11.10.2023',
    appliedFrom: 'LinkedIn',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 5,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 6,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 7,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 8,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 9,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 10,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
  {
    id: 11,
    candidateEmail: 'binhayyam@gmail.com',
    candidateFullName: 'Bin Hayyam',
    appliedDate: '11.10.2023',
    appliedFrom: 'Kariyer',
    appliedPositionId: 2,
    status: 'replied',
  },
];
const Keyboarding = () => {
  const scrollRef = createRef<ScrollView>();
  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', () => {
      scrollRef.current?.scrollToEnd({animated: true});
    });
  }, []);

  return (
    // <View style={{flex: 1}}>
    <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
      <View style={{height: 150, backgroundColor: 'lightblue'}}></View>
      <ScrollView
        style={{flexGrow: 1}}
        ref={scrollRef}
        onLayout={() => {
          scrollRef.current?.scrollToEnd({animated: true});
        }}>
        {DummyReceivedApplications.map((item, index) => (
          <View
            key={index}
            style={{
              alignSelf: index % 2 ? 'flex-start' : 'flex-end',
              backgroundColor: index % 2 ? 'black' : 'red',
              height: 75,
              width: '35%',
              borderRadius: 10,
              marginBottom:
                DummyReceivedApplications.length === index + 1 ? 20 : 0,
            }}>
            <Text style={{color: 'white'}}>{item.candidateFullName}</Text>
          </View>
        ))}
      </ScrollView>
      <TextInput
        placeholder="hello aq"
        style={{
          // height: '100%',
          borderWidth: 1,
          width: '90%',
          alignSelf: 'center',
          height: 35,
          marginBottom: 30,
        }}
      />
      {/* <View
        style={{
          borderWidth: 1,
          width: '90%',
          alignSelf: 'center',
          height: 35,
        }}> */}

      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Keyboarding;
