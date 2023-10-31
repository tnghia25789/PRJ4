import {
  Image, ScrollView, StyleSheet, Text, TouchableOpacity, View,
  Modal, ActivityIndicator, Alert, TextInput, ToastAndroid,Dimensions
} from 'react-native'
import React, { useContext, useEffect, useState, useRef } from 'react'
import back from '../../../back/back';
import { AppContext } from '../../AppContext';

import { WebView } from 'react-native-webview';
import PaypalApi from '../../../../helpers/PaypalApi';
import SelectDropdown from 'react-native-select-dropdown';
import queryString from 'query-string';
import ProgressDialog from 'react-native-progress-dialog';
import DialogPromotion from './DialogPromotion';

const width = Dimensions.get('window').width;
const CheckOut = (props) => {
  const { navigation } = props;
  const { data } = props.route.params;
  back(navigation);
  const {
    user,
    onGetAddressByIdUser, onAddOrder,
    countAddress, onGetSubProducts,
    onUpdateOrderDetail, onUpdateIdOrderOrderDetail,
    countCart, setCountCart,setNumberChange,numberChange,
    onPostOrder,
    onGetCartByUser,
    onGetProvinces,onGetDistricts,onGetWards,
    //getOrderByIdUserAndStatus
  } = useContext(AppContext);

  const [isSelect, setIsSelect] = useState('1');

  // Paypal
  const [showGateway, setShowGateway] = useState(false);

  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [dataSend, setDataSend] = useState({});

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [total, setTotal] = useState(0);
  const [totalFinal, setTotalFinal] = useState(0);

  const [sale, setSale] = useState(0);
  const [code, setCode] = useState('');
  const [alert, setAlert] = useState(false);


  
  const [listCity, setListCity] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listProvince, setListProvince] = useState([]);

  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');


  const [apartmentNumber, setApartmentNumber] = useState('');

  useEffect(() => {
    const getData = async () => {
      getPhone();
      getTotal();

    }
    getData();
  }, [countAddress]);

  //Lay danh sach tinh thanh
  useEffect(() => {
    const getCity = async () => {
      res = await onGetProvinces();
      const list =[];
      for (let i = 0; i < res.data.length; i++) {
        const obj ={};
        obj.name = res.data[i].name;
        obj.code = res.data[i].code;
        list.push(obj);
      }
      setListCity(list);
    };
    getCity();
  }, []);

  //Lay danh sach tinh thanh
  useEffect(() => {
    const getDistrict = async () => {
      res = await onGetDistricts();
      const list =[];
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].province_code == city.code){
          const obj ={};
          obj.name = res.data[i].name;
          obj.code = res.data[i].code;
          list.push(obj);
        }
      }
      setListDistrict(list);
    };
    getDistrict();
  }, [city]);

  useEffect(() => {
    const getWard = async () => {
      res = await onGetWards();
      const list =[];
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].district_code == district.code){
          const obj ={};
          obj.name = res.data[i].name;
          obj.code = res.data[i].code;
          list.push(obj);
        }
      }
      setListProvince(list);
    };
    getWard();
  }, [district]);
  
  useEffect(() => {
    setDataSendToPaypal(totalFinal);
  }, [totalFinal]);


  //Lay data gui len server
  const setDataSendToPaypal = (totalFinal) => {
    const dataS = {
      "intent": "CAPTURE",
      "purchase_units": [
        {
          // "items": list,
          "amount": {
            "currency_code": "USD",
            "value": totalFinal.toString(),
            "breakdown": {
              "item_total": {
                "currency_code": "USD",
                "value": totalFinal.toString()
              }
            }
          }
        }
      ],
      "application_context": {
        "return_url": "https://example.com/return",
        "cancel_url": "https://example.com/cancel"
      }
    };
    setDataSend(dataS);
  };

  //Lay phone
  const getPhone = async () => {
    setPhone(user.phone);
  };

   //Lay dia chi
   const getAddress = async () => {
    let add = apartmentNumber + " " + province.name + ", " + district.name + ", " + city.name;
    setAddress(add);
  };

  //Tinh tong tien
  const getTotal = async () => {
    //Tinh tong tien
    let total2 = 0;
    let numberProduct = 0;
    for (let i = 0; i < data.listCartDetail.length; i++) {
      //Kiem tra lai gia tien
      let price = 0;
      if (data.listCartDetail[i].product.discount != 0) {
        price = data.listCartDetail[i].product.price - data.listCartDetail[i].product.price * data.listCartDetail[i].product.discount / 100;
      } else {
        price = data.listCartDetail[i].product.price;
      }
      total2 += data.listCartDetail[i].quantity * price;
      numberProduct += data.listCartDetail[i].quantity;

    };
    data.numberProduct = numberProduct;
    //console.log('numberProduct: ', numberProduct);

    setTotal(total2.toFixed(2));
    setTotalFinal(total2.toFixed(2));
    setDataSendToPaypal(total2.toFixed(2));
    setIsLoading(false);

    //Lay danh sach khuyen mai theo gia tri gio hang
    // getPromotionsByUser(total2.toFixed(2));
  };

  //Xu ly thanh toan
  const gotoSuccess = async () => {
    try {
      setIsLoading(true);

      //kiem tra lai gia tien lai gia tien
      let total2 = 0;
      for (let i = 0; i < data.listCartDetail.length; i++) {
        //Kiem tra lai gia tien
        let price = 0;
        if (data.listCartDetail[i].product.discount != 0) {
          price = data.listCartDetail[i].product.price - data.listCartDetail[i].product.price * data.listCartDetail[i].product.discount / 100;
        } else {
          price = data.listCartDetail[i].product.price;
        }
        total2 += data.listCartDetail[i].quantity * price; 
      };

      console.log('Total ----- Total2: ', total, ' ----- ', total2);

      if (total2.toFixed(2) != total) {
        Alert.alert('Price has changed');
        setIsLoading(false);

        navigation.navigate('Cart');
        return;
      }

      //Xu ly thanh toan
      if (isSelect == '2') {
        setDataSendToPaypal(totalFinal);
        await pay();
      } 
      else {
        let add = apartmentNumber + " " + province.name + ", " + district.name + ", " + city.name;
        // await getAddress();

        //Them don hang
        const resCart = await onGetCartByUser(user.email);
        if (resCart != undefined || resCart != null) {
          const resOrder = await onPostOrder(user.email,resCart.cartId,total,add,phone,user.userid);
          if (resOrder != undefined || resOrder != null) {
            setCountCart(0);
            setNumberChange(numberChange + 1);
            navigation.navigate('Success');
          } else {
            Alert.alert('Payment failed');
          }
        }
        else{
          Alert.alert('Payment failed');
        }
      }
      
    } catch (error) {
      setIsLoading(false);
      console.log("Error gotoSuccess: ", error);
    }

  };

  //Paypal
  const pay = async () => {
    try {
      setShowGateway(true);
      const access_token = await PaypalApi.generateToken();
      setToken(access_token);
      const res = await PaypalApi.createOrder(access_token, dataSend);
      //console.log("Res generateToken: ", access_token);
      //console.log("Res createOrder: ", res);

      if (res != null || res != undefined) {
        const findUrl = res.links.find(data => data?.rel === 'approve');
        console.log("findUrl: ", findUrl);
        setLink(findUrl.href);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error pay screen: ", error);
      setIsLoading(false);
      setShowGateway(false);
    }
  };

  //Dieu huong sang trang thanh toan paypal
  const onUrlChange = (webviewState) => {
    //console.log("webviewState: ", webviewState);
    if (webviewState.url.includes('https://example.com/cancel')) {
      setShowGateway(false);
      clearPaypalState();
      console.log("Payment cancelled");
    }
    if (webviewState.url.includes('https://example.com/return')) {
      setShowGateway(false);
      const urlValue = queryString.parseUrl(webviewState.url);
      console.log("UrlValue: ", urlValue);
      const id = urlValue.query.token;

      if (id != null || id != undefined) {
        paymentSuccess(id);
      }
    }
  };

  //Thanh toan paypal thanh cong
  const paymentSuccess = async (id) => {
    try {
      const res = await PaypalApi.capturePayment(id, token);
      if (res != null || res != undefined) {
        if (res.status === 'COMPLETED') {
          console.log("Payment success");
            // getAddress();
        let add = apartmentNumber + " " + province.name + ", " + district.name + ", " + city.name;
          
          //Them don hang
          const resCart = await onGetCartByUser(user.email);
          if (resCart != undefined || resCart != null) {
            const resOrder = await onPostOrder(user.email,resCart.cartId,total,add,phone,user.userid);
            if (resOrder != undefined || resOrder != null) {
              setCountCart(0);
              setNumberChange(numberChange + 1);
              navigation.navigate('Success');
            } else {
              Alert.alert('Payment failed');
            }
          }
          else{
            Alert.alert('Payment failed');
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Error paymentSuccess: ", error);
    }
  };

  const clearPaypalState = () => {
    setLink(null);
    setToken(null);
  };

  const handleSelected = (id) => {
    setIsSelect(id);
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 12, justifyContent: 'space-between', backgroundColor: 'white' }}>

      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait..."
      />


      {/* Bấm đây nhảy qua cart () */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode='cover'
            source={require('../../../../assets/images/ic_back.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>CheckOut</Text>

        </View>

        <View style={{ width: 22, height: 22 }} />
      </View>

      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Address */}
        <View style={{ justifyContent: 'space-between', marginTop: 30 }}>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Shipping Address</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#fff', borderRadius: 8, paddingVertical: 10, }]}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', borderBottomWidth: 0.5, borderBottomColor: 'grey', padding: 10 }}>
              {user.name}
            </Text>

            <View style={{}}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', marginBottom: 4,marginTop: 8 }}>Phone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone"
                  style={{width: width - 40, height: 50, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#ddd',}} />

            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', marginBottom: 4 }}>City</Text>

              <SelectDropdown
                  data={listCity}
                  defaultKey="code"
                  selectedKey="code"
                  rowValueExtractor={(item, index) => item.code}
                  labelExtractor={(item, index) => item.name}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setCity(selectedItem);
                  }}
                  defaultButtonText="Select city"
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={styleShippingAddress.dropdown1BtnStyle}
                  buttonTextStyle={styleShippingAddress.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                      return (
                          isOpened ?
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/up.png')}
                              /> :
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/down1.png')}
                              />
                      )
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styleShippingAddress.dropdown1DropdownStyle}
                  rowStyle={styleShippingAddress.dropdown1RowStyle}
                  rowTextStyle={styleShippingAddress.dropdown1RowTxtStyle}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', marginBottom: 4 }}>District</Text>

              <SelectDropdown
                  data={listDistrict}
                  defaultKey="code"
                  selectedKey="code"
                  rowValueExtractor={(item, index) => item.code}
                  labelExtractor={(item, index) => item.name}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setDistrict(selectedItem);
                  }}
                  defaultButtonText="Select city"
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={styleShippingAddress.dropdown1BtnStyle}
                  buttonTextStyle={styleShippingAddress.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                      return (
                          isOpened ?
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/up.png')}
                              /> :
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/down1.png')}
                              />
                      )
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styleShippingAddress.dropdown1DropdownStyle}
                  rowStyle={styleShippingAddress.dropdown1RowStyle}
                  rowTextStyle={styleShippingAddress.dropdown1RowTxtStyle}
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', marginBottom: 4 }}>Ward</Text>

              <SelectDropdown
                  data={listProvince}
                  defaultKey="code"
                  selectedKey="code"
                  rowValueExtractor={(item, index) => item.code}
                  labelExtractor={(item, index) => item.name}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index);
                    setProvince(selectedItem);
                  }}
                  defaultButtonText="Select city"
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.name;
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.name;
                  }}
                  buttonStyle={styleShippingAddress.dropdown1BtnStyle}
                  buttonTextStyle={styleShippingAddress.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                      return (
                          isOpened ?
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/up.png')}
                              /> :
                              <Image
                                  style={{ width: 18, height: 18, tintColor: '#000' }}
                                  source={require('../../../../assets/images/down1.png')}
                              />
                      )
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={styleShippingAddress.dropdown1DropdownStyle}
                  rowStyle={styleShippingAddress.dropdown1RowStyle}
                  rowTextStyle={styleShippingAddress.dropdown1RowTxtStyle}
              />
            </View>
            <View style={{}}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '600', marginBottom: 4,marginTop: 8 }}>Apartment number</Text>
                <TextInput
                  value={apartmentNumber}
                  onChangeText={setApartmentNumber}
                  placeholder="Apartment number"
                  style={{width: width - 40, height: 50, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#ddd',}} />

            </View>

          </View>

        </View>
        

        {/* Payment method */}
        <View style={{ justifyContent: 'space-between', marginTop: 30 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Payment method</Text>
            <View style={{ width: 20, height: 20 }} />

          </View>
          <View style={[styles.box, { borderRadius: 8, paddingVertical: 10, flexDirection: 'row', alignItems: 'center' }]}>

            <TouchableOpacity
              onPress={() => handleSelected('1')}
              style={isSelect == '1' ? styles.box1 : styles.box2}>
              <Image
                source={require('../../../../assets/images/cast2.jpg')}
                style={{ height: 50, width: 90, borderRadius: 8 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSelected('2')}
              style={isSelect == '2' ? styles.box1 : styles.box2}>
              <Image
                source={require('../../../../assets/images/paypal1.png')}
                style={{ height: 50, width: 90, borderRadius: 8 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12, }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: '80%', paddingHorizontal: 8, position: 'relative' }}
            onChangeText={text => setCode(text)}
            value={code}
            placeholder='Enter code promotion'
          />
          <TouchableOpacity onPress={() => showDialogListPromotion()}>
                <Image
                  source={require('../../../../assets/images/down1.png')}
                  style={{ width: 20, height: 20, position: 'absolute', right: 10, top: -10 }}
                />
              </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleCheckCode()}
            style={{ backgroundColor: 'black', padding: 10, borderRadius: 8, marginLeft: 10 }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Check</Text>
          </TouchableOpacity>
        </View> */}

        {
          alert == true ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
              <Text style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>Code is not correct !</Text>
            </View> : null
        }

        {/* Total price */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>Infomation & order</Text>
        </View>
        <View style={[styles.box, { padding: 10, borderRadius: 8, justifyContent: 'space-between', marginBottom: 20, }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>The number of products:</Text>
            <Text style={{ fontSize: 16, fontWeight: '300' }}>{data.numberProduct} (Product)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Total(provisional):</Text>
            <Text style={{ fontSize: 16, fontWeight: '300', color: 'black' }}>$ {total}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: '500' }}>Total:</Text>
            <Text style={{ fontSize: 16, fontWeight: '800', color: 'black' }}>$ {totalFinal}</Text>
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          onPress={() => gotoSuccess()}
          style={{ backgroundColor: '#000', height: 50, borderRadius: 30, flexDirection: 'column', justifyContent: 'center' }}>
          <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>SUBMIT ORDER</Text>
          {/* Bấm đây nhảy qua success */}
        </TouchableOpacity>

        {showGateway ? (
          <Modal
            visible={showGateway}
            onDismiss={() => setShowGateway(false)}
            onRequestClose={() => setShowGateway(false)}
            animationType={'fade'}
            transparent>
            <View style={styles.webViewCon}>
              <View style={styles.wbHead}>
                <TouchableOpacity
                  style={{ padding: 13 }}
                  onPress={() => setShowGateway(false)}>
                  {/* <Feather name={'x'} size={24} /> */}
                  <Image
                    style={{ height: 20, width: 20 }}
                    resizeMode='cover'
                    source={require('../../../../assets/images/ic_back.png')} />
                </TouchableOpacity>
                <Text
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#00457C',
                  }}>
                  PayPal GateWay
                </Text>
                <View style={{ padding: 13, opacity: 1 }}>
                  <ActivityIndicator size={24} color={'#000'} />
                </View>
              </View>
              {link != null ?
                <WebView
                  source={{ uri: link }}
                  onNavigationStateChange={onUrlChange}
                  style={{ flex: 1 }}
                /> : null
              }

            </View>
          </Modal>
        ) : null}
      </ScrollView>
    </View>

  )
}

export default CheckOut

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'grey',
    borderRadius: 4,
    shadowOffset: {
      width: 1,
      height: 3
    },
    marginHorizontal: 1,
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  box1: {
    padding: 10, borderColor: '#333', borderRadius: 8, borderWidth: 1, marginLeft: 10
  },
  box2: {
    padding: 10, borderColor: '#ddd', borderRadius: 8, borderWidth: 1, marginLeft: 10
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
})
const styleShippingAddress = StyleSheet.create({
  // container
  container: {
      display: 'flex',
      backgroundColor: 'white',
      width: '100%',
      height: '100%'
  },

  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
  },

  icBack: {
      width: 20,
      height: 20,
  },

  DetailTxt: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
      width: '70%'
  },

  //body
  body: {
      backgroundColor: '#F5F5F5',
      height: '100%',
      width: '100%'
  },

  input: {
      width: '90%',
      height: 150,
      marginLeft: 20,
      marginTop: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      justifyContent: 'center'
  },

  txt01: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
  },

  txt02: {
      marginTop: 10,
  },

  txt1: {
      fontWeight: '500',
      color: 'black'
  },

  txt2: {
      color: 'red',
      marginLeft: 10
  },

  //CheckBOx
  checkbox: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center'
  },

  Box: {
      width: 25,
      height: 25,
      header: 25,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
      marginRight: 5
  },

  BoxChecked: {
      width: 25,
      height: 25,
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 5,
      marginRight: 5,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center'
  },

  color1: {
      backgroundColor: 'black',
      width: 15,
      height: 15,
  },
  color2: {
      backgroundColor: 'white',
      width: 15,
      height: 15,
  },

  BoxText: {
      marginLeft: 20,
      color: 'black'
  },

  //FloatBox
  floatBox: {
      marginTop: 50,
      alignItems: 'center',
      marginLeft: 320,
  },

  icAdd: {
      width: 50,
      height: 50,
  },

  dropdown1BtnStyle: {
    width: width - 40,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
});


