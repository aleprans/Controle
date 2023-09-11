import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"

import DrawerCustom from '../components/CustonDrawer'

import Servicos from '../Screens/Servicos'
import HrExtras from '../Screens/HrExtras'
import Relatorios from '../Screens/Relatorios'

export default function Drawer() {
  
  const Drawer = createDrawerNavigator()

  return (
    <Drawer.Navigator 
    initialRouteName="Servicos"
    backBehavior="none"
    screenOptions={{
      drawerHideStatusBarOnOpen: false,
      headerShown: false,
      drawerStyle: {backgroundColor: '#ccc', width: 220}
     }}

    drawerContent={(props) => <DrawerCustom {...props} />}
    >
      <Drawer.Screen name="Servicos" component={Servicos} />
      <Drawer.Screen name="HrExtras" component={HrExtras} />
      <Drawer.Screen name="Relatorios" component={Relatorios} />
    </Drawer.Navigator>
  )
}