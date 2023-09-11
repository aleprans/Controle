import { StyleSheet } from 'react-native';

const estilo = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#555',
    alignItems: 'center',
  },

  containerModal: {
    flex: 1,
    backgroundColor: 'rgba(100,100,100,0.8)',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  
  listItem: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#cecece',
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
    borderColor: '#f00',
    borderWidth: 1,
  },
  
  item1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    
  },
  
  item2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 3    
  },
  
  listData: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  
  listData2: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 5,
    textAlign: 'center',
    paddingHorizontal: 5,
    maxWidth: 240
  },
  
  label: {
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#000',
  },
  
  label2: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },

  textBtn: {
    color: '#444',
    fontSize: 16,
    fontWeight: 'bold',
  },

  alert: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '50%'
  },

  modal: {
    width: '80%',
    height: '25%',
    marginTop: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    backgroundColor: '#ccc',
    borderRadius: 15,
    borderColor: '#f00',
    borderStyle: 'solid',
    borderWidth: 10,
  },

  btnModal: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 35,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#999',
    borderStyle: 'solid',
    borderWidth: 2
  },

  titulo: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5
  },

  conteudo: {
    marginHorizontal: 10,
    marginVertical: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },

  viewBtnModal: {
    flexDirection: 'row',
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },

  viewTitleSheet: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fefefe'
  },

  titleSheet: {
    width: '100%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },

  textTitleSheet: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(256, 0, 0, 0.5)',
    textShadowRadius: 10
  },

  viewSheet: {
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    borderWidth: 1,
    marginVertical: 5,
    marginHorizontal: 2
  },

  textSheet: {
    fontSize: 15,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    height: 40,
    textAlign: 'center',
    paddingTop: 10,
    textShadowColor: '#ffa07a',
    textShadowRadius: 10,
    borderRadius: 15
  },

  inputSheet: {
    backgroundColor: '#fafafa',
    margin: 5,
    borderRadius: 10,
    textAlign: 'center',
    height: 50,
    fontSize: 18
  },

  inputTotalSheet: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5
  },

  viewBtnSheet: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 20
  },

  btnCloseSheet: {
    backgroundColor: '#fa8072',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  
  btnSaveSheet: {
    backgroundColor: '#7fff00',
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  textBtnSheet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowRadius: 15
  },

  logo: {
    width: 50,
    height: 50,
    marginLeft: 5
  }
})

export default estilo;