import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, alert, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../AppContext';

import ProgressDialog from 'react-native-progress-dialog';

const Cart = (props) => {
  const { navigation } = props;

  const {
    onGetCartByUser,

    user,listCartDetail, setListCartDetail,
    //Count
    countCart,numberChange,setNumberChange,

    //Cart detail
    onGetCartDetailByCartId ,onPutCartDetail,onRemoveCartDetail,

  } = useContext(AppContext);

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [listSelected, setListSelected] = useState([]);

  //Lay danh sach san pham trong gio hang
  useEffect(() => {
    const getListCart = async () => {
      try {
        setIsLoading(true);
        const resCartId = await onGetCartByUser(user.email);

        const res = await onGetCartDetailByCartId(resCartId.cartId);
        if (res == undefined) {
          setListCartDetail([]);
          setIsLoading(false);
          return;
        }
        const data = res;
        let sum = 0;

        
        for (let i = 0; i < data.length; i++) {
          data[i].isSelect = false;
          sum += data[i].quantity*(data[i].product.price - (data[i].product.price*data[i].product.discount/100));
        }
        setListSelected(data);
        setListCartDetail(data);
        setTotal(sum);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Get list cart error: ", error);
      }
    };
    getListCart();
  }, [numberChange]);


  //Cap nhat so luong san pham trong gio hang
  const updateItem = (id,check, newValue) => {
    try {
      //Cap nhat tren giao dien 
      let sum = 0;
      let listCartNew = [...listCartDetail];
      for (let i = 0; i < listCartDetail.length; i++) {
        if (listCartDetail[i].cartDetailId === id) {
          listCartDetail[i].quantity = newValue;
          listCartNew[i] = listCartDetail[i];
          sum += listCartNew[i].quantity*(listCartNew[i].product.price - (listCartNew[i].product.price*listCartNew[i].product.discount/100));

        } else {
          sum += listCartNew[i].quantity*(listCartNew[i].product.price - (listCartNew[i].product.price*listCartNew[i].product.discount/100));
        }
      };

      setTotal(sum);
      setListCartDetail(listCartNew);

      //Cap nhat tren database
      const item = listCartDetail.find(item => item.cartDetailId === id);
      updateItemCart(item.cartDetailId, newValue, newValue*(item.product.price - (item.product.price*item.product.discount/100)), item.cart.cartId, item.product.productId,check);
      
    } catch (error) {
      setIsLoading(false);
      console.log("Update item error: ", error);
    }
  };

  const updateItemCart = async (IdCartDetail, _amount, price, cartId,productId,check) => {
    try {
      if (check) {
        ToastAndroid.show("The quantity of products in the warehouse is insufficient", ToastAndroid.SHORT);
        return;
      }
      else{
        await onPutCartDetail(IdCartDetail, _amount, price, cartId, productId);
      }
      
    } catch (error) {
      console.log("Update item cart error: ", error);
    }
  };

  //Xoa nhieu san pham khoi gio hang
  const deleteItems = async () => {
    try {
      setIsLoading(true);
      for (let i = 0; i < listCartDetail.length; i++) {
        if (listCartDetail[i].isSelect) {
          await onRemoveCartDetail(listCartDetail[i].cartDetailId);
        }
      }
      setNumberChange(numberChange + 1);
    } catch (error) {
      setIsLoading(false);
      console.log("Delete cart item error: ", error);
    }
  }

  //Chon 1 san pham trong gio hang
  const itemSelected = (item) => {
    item.isSelect = !item.isSelect;
    let list = [];
    for (let i = 0; i < listCartDetail.length; i++) {
      if (listCartDetail[i].isSelect) {
        list.push(listCartDetail[i]);
      }
    }
    setListSelected(list);
    setListCartDetail([...listCartDetail]);
  }

  //Den trang thanh toan
  const goToCheckOut = () => {
    if (listCartDetail.length == 0) {
      ToastAndroid.show("Please add product to cart!", ToastAndroid.SHORT);
      return;
    }
    const data = {
      listCartDetail: listCartDetail,
    }
    navigation.navigate("CheckOut", { data: data });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', position: 'relative' }}>
      <View style={
        {
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          paddingVertical: 6, paddingHorizontal: 12, borderColor: '#ddd', borderBottomWidth: 1
        }
      }>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ width: 22, height: 22 }}
            resizeMode='cover'
            source={require('../../../../assets/images/ic_back.png')} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Cart</Text>

        </View>

        {
          listSelected.length > 0 ?
            <TouchableOpacity onPress={deleteItems}>
              <Image
                style={{ width: 26, height: 26 }}
                resizeMode='cover'
                source={require('../../../../assets/images/ic_trash1.png')} />
            </TouchableOpacity> :
            <Image
              style={{ width: 26, height: 26 }}
              resizeMode='cover'
              source={require('../../../../assets/images/ic_trash2.png')} />

        }

      </View>

      <ScrollView style={{ flex: 1, marginBottom: 20 }}>
       
        {
          listCartDetail.length > 0 ?
            listCartDetail.map((item, index) => {
              return (
                <Item
                  key={index}
                  gotoProductDetail={() => navigation.navigate('ProductDetail', { idProduct: item.product.productId })}
                  itemSelected={() => itemSelected(item)}
                  plus={() => updateItem(item.cartDetailId, item.quantity >=  item.product.quantity? true : false,item.quantity >=  item.product.quantity? item.quantity : item.quantity + 1)}
                  minus={() => updateItem(item.cartDetailId,false, item.quantity > 1 ? item.quantity - 1 : 1)}
                  item={item} />
              )
            }) :
            <View style={{ justifyContent: 'center', marginTop: 20, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', }}>No product in cart</Text>
            </View>
        }

      </ScrollView>
      {
        listCartDetail.length !== 0 ?
          <View style={{ justifyContent: 'space-between', paddingHorizontal: 12, }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 12 }}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>Total:</Text>
              <Text style={{ fontSize: 20, color: 'red' }}>$ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              onPress={() => goToCheckOut()}
              style={{ backgroundColor: '#000', height: 50, borderRadius: 30, flexDirection: 'column', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
            </TouchableOpacity>
          </View> :
          <View style={{
            backgroundColor: '#BBB', height: 50, borderRadius: 30,
            flexDirection: 'column', justifyContent: 'center',
            paddingHorizontal: 12, marginHorizontal: 12
          }}>
            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Check out</Text>
          </View>
      }

      {/* </SafeAreaView> */}


      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait..."
      />
    </View>
  )
}

export default Cart



const Item = ({ item, plus, minus, gotoProductDetail, itemSelected }) => (

  <View style={[styles.item, { position: 'relative' }]}>
    <View style={{ flexDirection: 'row', }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
        <TouchableOpacity
          onPress={itemSelected}
          style={{
            borderWidth: 1, borderColor: '#333', borderRadius: 4,
            padding: 4, marginRight: 10, width: 24, height: 24,
            justifyContent: 'center', alignItems: 'center'
          }}>
          <View style={item.isSelect ? styles.itemChange : styles.itemNoChange}></View>
        </TouchableOpacity>

        <TouchableOpacity onPress={gotoProductDetail}>
          <View style={{ borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 5, marginTop: 5 }}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: 'space-between', paddingVertical: 5, paddingStart: 10 }}>
        <View>
        {/* <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '800', color: 'black' }}>
          {item.product.name}
        </Text> */}
          <Text numberOfLines={2} style={{ fontSize: 18, fontWeight: '800', color: 'black', width: '80%' }}>{item.product.name}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 250, alignItems: 'center' }}>
            <View style={{ marginTop: 4, width: '100%' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                
                <View style={styles.qualityRange}>
                  <TouchableOpacity onPress={plus}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('../../../../assets/images/btn_plus.png')}
                    />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 18 }}>{item.quantity}</Text>
                  <TouchableOpacity onPress={minus}>
                    <Image
                      style={{ width: 25, height: 25 }}
                      source={require('../../../../assets/images/btn_minus.png')} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginTop: 4 }}>Price: </Text>
                {
                  item.product.discount > 0 ?
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'black', marginTop: 4, marginRight: 8, textDecorationLine: 'line-through' }}>
                      $ {(item.quantity*item.product.price).toFixed(2)}
                    </Text> : null
                }
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: 4 }}>$ {(item.quantity*(item.product.price-item.product.price*item.product.discount/100)).toFixed(2)}</Text>
              </View>

            </View>


          </View>

        </View>

      </View>
    </View>
    
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 6,
    //marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    paddingBottom: 5,
    marginBottom: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'gray',

  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
  },
  qualityRange:
  {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemChange: {
    width: 18,
    height: 18,
    backgroundColor: 'black',
    borderRadius: 4,
  },
  itemNoChange: {
    width: 18,
    height: 18,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  itemContainer: {
    flex: 1,
    width: '100%',
    // elevation: 5,
    // shadowColor: 'grey',
    borderRadius: 8,
    paddingBottom: 12,
    // shadowOffset: {
    //   width: 1,
    //   height: 3
    // },
    backgroundColor: '#F5F5F5',
    // shadowRadius: 5,
    // shadowOpacity: 0.3
  },
  viewSaleDam: {
    flexDirection: 'row',
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8
  },

})
