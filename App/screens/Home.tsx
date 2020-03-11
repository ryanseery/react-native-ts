import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParams } from '../index';

type HomeProps = StackNavigationProp<HomeStackParams, 'Home'>;

interface IHome {
  navigation: HomeProps;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Home({ navigation }: IHome): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Get to Work.</Text>
    </View>
  );
}
