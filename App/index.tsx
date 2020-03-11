import React, { useReducer, useEffect, useMemo } from 'react';
import { TouchableHighlight, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext, NavState, ACTIONS, Action, Constants } from './context';
import { CustomDrawer } from './CustomDrawer';
import { SignIn, SignUp, Home } from './screens';
import { Splash } from './components';

export type AuthStackParam = {
  SignIn: undefined;
  SignUp: undefined;
};

export type HomeStackParams = {
  Home: undefined;
};

const Stack = createStackNavigator<HomeStackParams>();
const MainScreen = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        title: 'Home',
        headerLeft: () => (
          <TouchableHighlight style={{ marginLeft: 20 }} onPress={() => navigation.toggleDrawer()}>
            <View>
              <Ionicons name="ios-menu" size={32} color="black" />
            </View>
          </TouchableHighlight>
        ),
      }}
    />
  </Stack.Navigator>
);

const DrawerNav = createDrawerNavigator<HomeStackParams>();
const Drawer = () => (
  <DrawerNav.Navigator drawerContent={props => <CustomDrawer {...props} />}>
    <DrawerNav.Screen name="Home" component={MainScreen} />
  </DrawerNav.Navigator>
);

const AuthStack = createStackNavigator<AuthStackParam>();
const Auth = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} options={{ title: 'Sign In', headerShown: false }} />
    <AuthStack.Screen name="SignUp" component={SignUp} options={{ title: 'Sign Up' }} />
  </AuthStack.Navigator>
);

interface IRoot {
  userToken: string;
}

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }: IRoot) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={Drawer}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={Auth}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [state, dispatch] = useReducer(
    (prevState: NavState, action: Action) => {
      const { type, token } = action;
      switch (type) {
        case ACTIONS.RESTORE_TOKEN: {
          return {
            ...prevState,
            userToken: token,
            isLoading: false,
          };
        }
        case ACTIONS.SIGN_IN:
          return {
            ...prevState,
            isSignout: false,
            userToken: token,
          };
        case ACTIONS.SIGN_OUT:
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
        default:
          console.log('reducerDefault');
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem(Constants.USER_TOKEN);
      } catch (e) {
        console.error(`userTokenFetchErr: ${e}`);
      }
      dispatch({ type: ACTIONS.RESTORE_TOKEN, token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signUserIn: async (token: string) => dispatch({ type: ACTIONS.SIGN_IN, token }),
      signUserOut: () => dispatch({ type: ACTIONS.SIGN_OUT }),
      signUp: async (token: string) => dispatch({ type: ACTIONS.SIGN_IN, token }),
    }),
    [],
  );

  if (state.isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={state.userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
