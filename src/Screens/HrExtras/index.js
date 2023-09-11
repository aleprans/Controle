import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { View, Text, FlatList, Modal, Pressable, ToastAndroid, Alert, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import BottomSheet, { 
  BottomSheetView, 
  useBottomSheetSpringConfigs, 
  BottomSheetBackdrop, 
  BottomSheetScrollView, 
  TouchableOpacity, 
  BottomSheetTextInput 
} from '@gorhom/bottom-sheet'

import ExecuteQuery from '../../sql'
import Loading from '../../components/loading'
import Icon from 'react-native-vector-icons/Ionicons'
import Logo from '../../assets/logo.png'

import estilo from './styles'


export default function HrExtras() {

  const navigation = useNavigation()
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [visivel, setVisivel] = useState('normal')
  const [data, setData] = useState('')
  const [hrInicial, setHrInicial] = useState('')
  const [hrFinal, setHrFinal] = useState('')
  const [hrTotal, setHrTotal] = useState('0')
  const [edit, setEdit] = useState('')
  const [del, setDel] = useState(false)
  const [confDel, setConfDel] = useState(0)

  const BottomSheetRef = useRef(null)
  const CloseBottomSheet = () => BottomSheetRef.current?.close()
  const OpenBottomSheet = () => BottomSheetRef.current?.expand()
  const snapPoints = useMemo(() => ["25%","90%"], [])

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 13,
    overshootClamping: false,
    restDisplacentThreshold: 0.1,
    restSpeedThreshold: 1,
    stiffnes: 5
  })

  useEffect(()=> {
    const unsubscribe = navigation.addListener('focus', async() => {
      setDados([])
      await selectAllHrExtras()
    })
    return unsubscribe
  },[navigation])

  useEffect(() => {
    let total = duracao(hrInicial, hrFinal)
    if(total > 0) {
      let horas = Math.floor(total / 60)
      let minutos = total - (horas * 60)
      setHrTotal(`${horas}.${minutos}`)
    }
  }, [hrInicial, hrFinal])

  function clearSheet() {
    setEdit('')
    setHrInicial('')
    setHrFinal('')
    setHrTotal(0)
    setData('')
  }

  async function selectAllHrExtras() {
    setLoading(true)
    const resultQuery = await ExecuteQuery('SELECT * FROM hrextras ORDER BY data')
    let temp = []
    for( let i = 0; i < resultQuery.rows.length; i++) {
      temp.push(resultQuery.rows.item(i))
    }
    setDados([...temp])
    setLoading(false)
  }

  async function SelectHr(dados) {
    setEdit(dados.id)
    setData(dados.data)
    setHrInicial(dados.hrinicial)
    setHrFinal(dados.hrfinal)
    setHrTotal(dados.hrtotal)
  }

  function convTime(horario){
    if(horario.indexOf('.') > 0){
      var [hora, minuto] = horario.split('.').map(v => parseInt(v))
    }else if(horario.indexOf(':') > 0){ 
      var [hora, minuto] = horario.split(':').map(v => parseInt(v))
    }
    if (!minuto) { // para o caso de não ter os minutos
        minuto = 0
    }
    return minuto + (hora * 60)
  }

  function duracao(hrI, hrF) {
    return (convTime(hrF) - convTime(hrI))
  }

  async function salvar() {
      setLoading(true)
      let result 
      if(edit > 0) {
        result = await 
          ExecuteQuery(
            "UPDATE hrextras SET data = ?, hrinicial = ?, hrfinal = ?, hrtotal = ? WHERE id = ?",
              [data, hrInicial, hrFinal, hrTotal, edit])
      } else {
       result = await 
          ExecuteQuery(
            "INSERT INTO hrextras (data, hrinicial, hrfinal, hrtotal) VALUES (?, ?, ?, ?)",
              [data, hrInicial, hrFinal, hrTotal]
          )
      }
      if(result.rowsAffected > 0) {
        ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
        clearSheet()
      }else {
        ToastAndroid.show('Erro ao salvar dados!', ToastAndroid.LONG)
      }
      setLoading(false)
      CloseBottomSheet
      setVisivel('normal')
      selectAllHrExtras()
  }

  function verify() {

    if(data === '' || data.length < 8 ) {
      Alert.alert('Data de execução inválida!', 'Modelo válido     "01-01-01"')
    }else if(hrInicial === '' || hrInicial.length < 5) {
      Alert.alert('Hora Inicial inválida', 'Modelo válido     "01.01"')
    }else if(hrFinal === '' || hrFinal.length < 5) {
      Alert.alert('Hora Final inválida', 'Modelo válido    "01.01"')
    }else {
      salvar()
    }
  }

  async function deleteItem() {
  
    setLoading(true)
    const selectQuery = await ExecuteQuery("DELETE FROM hrextras WHERE id = ?",[confDel])
    if(selectQuery.rowsAffected > 0) {
      ToastAndroid.show('Hora deletada com sucesso!', ToastAndroid.LONG)
    }else {
      ToastAndroid.show('Erro ao deletar Hora!', ToastAndroid.LONG)
    }
    setLoading(false)
    selectAllHrExtras()
  }

  function ListItem({ dados }){
    
    return(
      <TouchableOpacity
        style={estilo.listItem}
        onPress={()=>{
          SelectHr(dados)
          setVisivel('none')
          OpenBottomSheet()
        }}
        onLongPress={()=>{
          setDel(true)
          setConfDel(dados.id)
        }}
      >
      
        <Modal
          animationType="fade"
          transparent={false}
          visible={del}
        >
          <View style={estilo.containerModal}>
            <View style={estilo.modal}>
              <Text style={estilo.titulo}>Confirmação</Text>
              <Text style={estilo.conteudo}>Confirma exclusão das Horas?</Text>
              <View style={estilo.viewBtnModal}>
                <Pressable
                  style={estilo.btnModal}
                  onPress={()=>{
                    deleteItem()
                    setDel(false)
                  }}
                >
                  <Text style={estilo.textBtn}>OK</Text>
                </Pressable>
                <Pressable
                  style={estilo.btnModal}
                  onPress={()=>{setDel(false)}}
                >
                  <Text style={estilo.textBtn}>Cancelar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <View style={estilo.item1}>
          <View>
            <Text style={estilo.label}>DATA</Text>
            <Text style={estilo.listData}>{dados.data}</Text>
          </View>
          <View>
            <Text style={estilo.label}>Hora inicial.</Text>
            <Text style={estilo.listData}>{dados.hrinicial}</Text>
          </View>
          <View>
            <Text style={estilo.label}>Hora final.</Text>
            <Text style={estilo.listData}>{dados.hrfinal}</Text>
          </View>
        </View>
        <View style={estilo.item2}>
          <Text style={estilo.label2}>Total de Horas.</Text>
          <Text style={estilo.listData2}>{dados.hrtotal}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={"close"}
      />
    ),
    []
  );

  return (
    <View style={estilo.container}>
      {loading ? <Loading loading={loading}/> : 
      <>
        <View style={estilo.viewTitleSheet}>
          <Image source={Logo} style={estilo.logo} />
          <Text style={estilo.title}>HORAS EXTRAS</Text>
          <Pressable
            style={estilo.btn}
            onPress={() => {
              OpenBottomSheet()
              setVisivel('none')
            }}
          >
            <Icon name='add-circle-outline' size={45} color={'#00ff00'} />
          </Pressable>
        </View>
        <BottomSheet
            ref={BottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            animationConfigs={animationConfigs}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetScrollView>
              {loading ? <Loading loading /> : <>
              <BottomSheetView style={estilo.titleSheet}>
                <Text style={estilo.textTitleSheet}>Cadastro de Horas Extras</Text>
              </BottomSheetView>

              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>DATA DA EXECUÇÃO</Text>
                <BottomSheetTextInput
                  placeholder="ex. 01-01-01"
                  keyboardType="numeric"
                  style={estilo.inputSheet}
                  value={data}
                  onChangeText={setData}
                />
              </BottomSheetView>
              
              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>HORA DE INICIO</Text>
                <BottomSheetTextInput
                  placeholder="ex. 01.01"
                  keyboardType="numeric"
                  style={estilo.inputSheet}
                  value={hrInicial}
                  onChangeText={setHrInicial}
                />
              </BottomSheetView>

              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>HORA DE TERMINO</Text>
                <BottomSheetTextInput
                  placeholder="ex. 01.01"
                  keyboardType="numeric"
                  style={estilo.inputSheet}
                  value={hrFinal}
                  onChangeText={setHrFinal}
                />
              </BottomSheetView>
              
              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}> TOTOAL DE HORAS</Text>
                <Text style={estilo.inputTotalSheet}>{hrTotal}</Text>
              </BottomSheetView>
              </>}

              <BottomSheetView style={estilo.viewBtnSheet}>
                <TouchableOpacity
                  style={estilo.btnCloseSheet}
                  onPress={() => {
                    clearSheet()
                    CloseBottomSheet()
                    setVisivel('normal')
                  }}
                >
                  <Text style={estilo.textBtnSheet}>FECHAR</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={estilo.btnSaveSheet}
                  onPress={() => {
                    verify()
                  }}
                >
                  <Text style={estilo.textBtnSheet}>SALVAR</Text>
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheetScrollView>
        </BottomSheet>

        <FlatList
          maxToRenderPerBatch = {20}
          removeClippedSubviews={true}
          extraData={dados}
          style={{marginTop: 10, width: '100%', display: visivel}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{marginHorizontal: 20}}
          data={dados}
          keyExtractor={ item => String(item.id)}
          renderItem={({ item }) => <ListItem dados={item}/>}
          ListEmptyComponent={<Text style={estilo.alert}>Nenhuma Hora Extra Encontrada</Text>}
        />
 
        </>
      }
    </View>
  )
}