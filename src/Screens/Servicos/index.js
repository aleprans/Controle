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


export default function Servicos() {

  const navigation = useNavigation()
  const [dados, setDados] = useState([])
  const [loading, setLoading] = useState(false)
  const [visivel, setVisivel] = useState('normal')
  const [data, setData] = useState('')
  const [lancha, setLancha] = useState('')
  const [equipamento, setEquipamento] = useState('')
  const [servico, setServico] = useState('')
  const [horimetro, setHorimetro] = useState('')
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
      await selectAllServicos()
    })
    return unsubscribe
  },[navigation])

  function clearSheet() {
    setEdit('')
    setData('')
    setLancha('')
    setEquipamento('')
    setServico('')
    setHorimetro('')
  }

  async function selectAllServicos() {
    setLoading(true)
    const resultQuery = await ExecuteQuery('SELECT * FROM servicos ORDER BY data')
    let temp = []
    for( let i = 0; i < resultQuery.rows.length; i++) {
      temp.push(resultQuery.rows.item(i))
    }
    setDados([...temp])
    setLoading(false)
  }

  async function SelectServico(dados) {
    setEdit(dados.id)
    setData(dados.data)
    setLancha(dados.embarcacao)
    setEquipamento(dados.equipamento)
    setServico(dados.descricao)
    setHorimetro(dados.horimetro)
  }

  async function salvar() {
      setLoading(true)
      let result 
      if(edit > 0) {
        result = await 
          ExecuteQuery(
            "UPDATE servicos SET data = ?, embarcacao = ?, equipamento = ?, descricao = ?, horimetro = ? WHERE id = ?",
              [data, lancha, equipamento, servico, horimetro, edit])
      } else {
       result = await 
          ExecuteQuery(
            "INSERT INTO servicos (data, embarcacao, equipamento, descricao, horimetro) VALUES (?, ?, ?, ?, ?)",
              [data, lancha, equipamento, servico, horimetro]
          )
      }
      if(result.rowsAffected > 0) {
        ToastAndroid.show('Dados salvos com sucesso!', ToastAndroid.LONG)
        clearSheet()
      }else {
        ToastAndroid.show('Erro ao salvar dados!', ToastAndroid.LONG)
      }
      setLoading(false)
      CloseBottomSheet()
      setVisivel('normal')
      selectAllServicos()
  }

  function verify() {

    if(data === '' || data.length < 8 ) {
      Alert.alert('Data de execução inválida!', 'Modelo válido     "01-01-01"')
    }else if(lancha === '') {
      Alert.alert('Embarcação inválida')
    }else if(equipamento === '') {
      Alert.alert('Equipamento inválido!')
    }else if(servico === '') {
      Alert.alert('Descrição inválida!')
    }else if(horimetro === '') {
      Alert.alert('Horimetro inválido!')
    }else {
      salvar()
    }
  }

  async function deleteItem() {
  
    setLoading(true)
    const selectQuery = await ExecuteQuery("DELETE FROM servicos WHERE id = ?",[confDel])
    if(selectQuery.rowsAffected > 0) {
      ToastAndroid.show('Serviço deletado com sucesso!', ToastAndroid.LONG)
    }else {
      ToastAndroid.show('Erro ao deletar Serviço!', ToastAndroid.LONG)
    }
    setLoading(false)
    selectAllServicos()
  }

  function ListItem({ dados }){
    
    return(
      <TouchableOpacity
        style={estilo.listItem}
        onPress={()=>{
          SelectServico(dados)
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
              <Text style={estilo.conteudo}>Confirma exclusão do Serviço?</Text>
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
            <Text style={estilo.label}>Embarcação</Text>
            <Text style={estilo.listData}>{dados.embarcacao}</Text>
          </View>
          <View>
            <Text style={estilo.label}>Equipamento</Text>
            <Text style={estilo.listData}>{dados.equipamento}</Text>
          </View>
          
        </View>
        <View style={estilo.item2}>
          <View>
            <Text style={estilo.label2}>Horimetro</Text>
            <Text style={estilo.listData2}>{dados.horimetro}</Text>
          </View>
          <View>
            <Text style={estilo.label2}>Descrição</Text>
            <Text numberOfLines={null} style={estilo.listData2}>{dados.descricao}</Text>
          </View>
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
          <Image source={Logo} style={estilo.logo}/>
          <Text style={estilo.title}>SERVIÇOS</Text>
          <Pressable
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
                <Text style={estilo.textTitleSheet}>Cadastro de Serviços</Text>
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
                <Text style={estilo.textSheet}>EMBARCAÇÃO</Text>
                <BottomSheetTextInput
                  placeholder="ex. P12"
                  style={estilo.inputSheet}
                  value={lancha}
                  onChangeText={setLancha}
                />
              </BottomSheetView>

              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>Equipamento</Text>
                <BottomSheetTextInput
                  placeholder="ex. Motor"
                  style={estilo.inputSheet}
                  value={equipamento}
                  onChangeText={setEquipamento}
                />
              </BottomSheetView>

              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>Horimetro</Text>
                <BottomSheetTextInput
                  placeholder="ex. 555.1"
                  keyboardType="numeric"
                  style={estilo.inputSheet}
                  value={horimetro}
                  onChangeText={setHorimetro}
                />
              </BottomSheetView>

              <BottomSheetView style={estilo.viewSheet}>
                <Text style={estilo.textSheet}>Descrição</Text>
                <BottomSheetTextInput
                  placeholder="ex. Troca da turbina do motor de BB"
                  style={estilo.inputSheet}
                  value={servico}
                  onChangeText={setServico}
                />
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
          contentContainerStyle={{marginHorizontal: 10}}
          data={dados}
          keyExtractor={ item => String(item.id)}
          renderItem={({ item }) => <ListItem dados={item}/>}
          ListEmptyComponent={<Text style={estilo.alert}>Nenhum Serviço Encontrado</Text>}
        />
        </>
      }
    </View>
  )
}