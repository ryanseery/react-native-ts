import { createContext, useContext } from 'react';
import { AsyncStorage } from 'react-native';

export interface NavState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

export interface Context {
  signUserIn: (token: string) => Promise<void>;
  signUserOut: () => void;
  signUp: (token: string) => Promise<void>;
}

export enum ACTIONS {
  RESTORE_TOKEN = 'RESTORE_TOKEN',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface Action {
  type: ACTIONS.RESTORE_TOKEN | ACTIONS.SIGN_IN | ACTIONS.SIGN_OUT;
  token?: string;
}

export const AuthContext = createContext({} as Context);

export enum Constants {
  USER_TOKEN = '@userToken',
}

export function useAuthContext() {
  const { signUserIn, signUserOut, signUp } = useContext(AuthContext);

  async function signIn(token: string) {
    try {
      await AsyncStorage.setItem(Constants.USER_TOKEN, `${token}`);

      signUserIn(token);
    } catch (err) {
      console.log(`signInErr: ${err}`);
      return false;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem(Constants.USER_TOKEN);
      signUserOut();
    } catch (err) {
      console.log(`signOutErr: ${err}`);
      return false;
    }
  }

  return {
    signIn,
    signOut,
    signUp,
  };
}
