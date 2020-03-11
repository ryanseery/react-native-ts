import React, { ReactElement } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthStackParam } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

type SignUpProps = StackNavigationProp<AuthStackParam, 'SignUp'>;

interface ISignUp {
  navigation: SignUpProps;
}

export function SignUp({ navigation }: ISignUp): ReactElement {
  return (
    <View style={styles.container}>
      <Text>Create a Sign Up flow.</Text>
      <Button title="Sign In" onPress={() => navigation.push('SignIn')} />
    </View>
  );
}
