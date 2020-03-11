import React, { ReactElement } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { View, StyleSheet, Button } from 'react-native';
import { AuthStackParam } from '../index';
import { useAuthContext } from '../context';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

type SignInProps = StackNavigationProp<AuthStackParam, 'SignIn'>;

interface ISignIn {
  navigation: SignInProps;
}

export function SignIn({ navigation }: ISignIn): ReactElement {
  const { signIn } = useAuthContext();

  return (
    <View style={styles.container}>
      <Button title="Sign In" onPress={() => signIn(`TEST_TOKEN`)} />
      <Button title="Sign Up" onPress={() => navigation.push('SignUp')} />
    </View>
  );
}
