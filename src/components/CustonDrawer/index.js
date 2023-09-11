import React, { useState }from 'react'
import { Image, StyleSheet, Text, View} from 'react-native'
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/Ionicons'
import Logo from '../../assets/logo.png'
export default function Drawer(props) {

  const [servFocus, setServFocus] = useState(true)
  const [horaFocus, setHoraFocus] = useState(false)
  const [configFocus, setConfigFocus] = useState(false)

  return (
    <DrawerContentScrollView {...props} >
      <View style={estilo.header}>
        <Image source={Logo} style={estilo.logo}/>
        <View style={estilo.viewTextHeader}>
          <Text style={estilo.textHeader}>Praticagem</Text>
          <Text>São Sebastião</Text>
        </View>
      </View>
      <View style={estilo.separador} />
      <DrawerItem 
        style={[estilo.item, {borderColor: servFocus ? '#f00' : '#000'}]}
        label={({ focused, color }) => 
          <Text 
            style={{
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: focused ? 18 : 15
            }}
            >
              Serviços
            </Text>}
        onPress={() => {
          props.navigation.navigate('Servicos')
          setServFocus(true)
          setHoraFocus(false)
          setConfigFocus(false)
        }}
        focused={servFocus}
        icon={({ focused, color, size }) => 
          <Icon 
            name={focused ? 'construct' : 'construct-outline'} 
            size={size} 
            color={color} 
          />
        }
        activeBackgroundColor='#aaa'
        activeTintColor='#000'
      />
      <DrawerItem 
        style={[estilo.item, {borderColor: horaFocus ? '#f00' : '#000'}]}
        label={({ focused, color }) => 
          <Text 
            style={{
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: focused ? 18 : 15,
              padding: 0,
              margin: 0,
              width: 120,
            }}
          >
            Horas Extras
          </Text>}
        onPress={() => {
          props.navigation.navigate('HrExtras')
          setServFocus(false)
          setHoraFocus(true)
          setConfigFocus(false)
        }}
        focused={horaFocus}
        icon={({ focused, color, size }) => 
          <Icon 
            name={focused ? 'cash': 'cash-outline'} 
            size={size} 
            color={color} 
          />
        }
        activeBackgroundColor='#aaa'
        activeTintColor='#000'
      />

      <View style={estilo.separador} />

      <DrawerItem 
        style={[estilo.item, {borderColor: configFocus ? '#f00' : '#000'}]}
        label={({ focused, color }) => 
          <Text 
            style={{
              fontWeight: focused ? 'bold' : 'normal',
              fontSize: focused ? 18 : 14,
              padding: 0,
              margin: 0,
              width: 120
            }}
          >
            Configurações
          </Text>}
        onPress={() => {
          props.navigation.navigate('Relatorios')
          setServFocus(false)
          setHoraFocus(false)
          setConfigFocus(true)
        }}
        focused={configFocus}
        icon={({ focused, color, size }) => 
          <Icon 
            name={focused ? 'settings': 'settings-outline'} 
            size={size} 
            color={color} 
          />
        }
        activeBackgroundColor='#aaa'
        activeTintColor='#000'
      />

    </DrawerContentScrollView>
  )
}

const estilo = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    height: 80
  },

  item: {
    borderStyle: 'solid', 
    borderWidth: 1,
    borderRadius: 15
    },

  logo: {
    width: 80,
    height: 80
  },

  separador: {
    width: '90%', 
    height: 2, 
    marginHorizontal: 10,
    marginVertical: 20, 
    backgroundColor: '#000'
  },

  viewTextHeader: {
    flex: 1,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },

  textHeader: {
    fontSize: 18,
    fontWeight: 'bold'
  }
})