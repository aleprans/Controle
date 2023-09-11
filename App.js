import React from "react"
import { NavigationContainer } from "@react-navigation/native"

import SQLite from "react-native-sqlite-storage"
import createTables from "./src/sql/createTables"
import Routers from './src/Routers'

global.db = SQLite.openDatabase(
  {
    name: 'Praticagem',
    location: 'default'
  },
  () => {},
  error => { console.log('error: ' + error)}
)

createTables()

export default function App() {

 
  return (
    <NavigationContainer>
      <Routers />
    </NavigationContainer>
  )
}

