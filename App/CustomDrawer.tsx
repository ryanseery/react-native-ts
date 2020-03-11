import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useAuthContext } from './context';

export function CustomDrawer(props): ReactElement {
  const { signOut } = useAuthContext();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Hello</Text>
      </View>
      <DrawerItem label="Logout" onPress={() => signOut()} />
    </DrawerContentScrollView>
  );
}
