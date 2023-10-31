import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ToastAndroid ,ScrollView} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import { AppContext } from '../../AppContext';

import ProgressDialog from 'react-native-progress-dialog';

const Favorite = (props) => {
  const { navigation } = props;

  const {
    user,
    onGetOrderDetailByIdOrder,
    //Count
    countFavorite, setCountFavorite,
    //Product
    onGetFavoritesByUser,onGetFavoritesByProduct,onGetFavoritesByUserProduct,onPostFavorites,onDeleteFavorites,setCountCart,setNumberChange,numberChange,

    numberFavorite,
    onGetCartByUser,onPostCartDetail,onUpateCartFromFavorite,
    //Order detail
    onAddOrderDetail, onDeleteOrderDetail, 
  } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [listSelected, setListSelected] = useState([]);
  const [listFavorite, setListFavorite] = useState([]);
  

  //Lay danh sach san phma trong gio hang
  useEffect(() => {
    const getListfavorite = async () => {
      try {

        setIsLoading(true);

        const res = await onGetFavoritesByUser(user.email);
        for (let i = 0; i < res.length; i++) {
          res[i].isSelect = false;
        }
        setListFavorite(res);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Get list favorite error: ", error);
      }
    };
    getListfavorite();
  }, [countFavorite]);

  //
  //Xoa nhieu san pham khoi gio hang
  const deleteItems = async () => {
    try {
      setIsLoading(true);
      for (let i = 0; i < listFavorite.length; i++) {
        if (listFavorite[i].isSelect) {
          await onDeleteFavorites(listFavorite[i].favoriteId);
        }
      }
      setIsLoading(false);
      // setNumberFavorite(numberFavorite + 1);
    } catch (error) {
      setIsLoading(false);
      console.log("Delete cart item error: ", error);
    }
  }

  //Chon 1 san pham trong gio hang
  const itemSelected = (item) => {
    item.isSelect = !item.isSelect;
    let list = [];
    for (let i = 0; i < listFavorite.length; i++) {
      if (listFavorite[i].isSelect) {
        list.push(listFavorite[i]);
      }
    }
    setListSelected(list);
    setListFavorite([...listFavorite]);
  }

  //


  //Them tat ca san pham yeu thich vao gio hang
  const addAllToCart = async () => {
    try {
      setIsLoading(true);
      if(listFavorite.length<=0){
        ToastAndroid.show("There are no products in favorites", ToastAndroid.SHORT);
      }
      else
      {
        const selectedList = listFavorite.filter(item => item.isSelect === true);
        if(selectedList.length <=0)
        {
          ToastAndroid.show("There are no products selected", ToastAndroid.SHORT);
          
        }
        else{
          const resCart = await onGetCartByUser(user.email);
          for (let i = 0; i < listFavorite.length; i++) {
            if (listFavorite[i].isSelect) {
              let price = 0;
              
              // listFavorite[i].product.discount > 0 ? price = listFavorite[i].product.price - listFavorite[i].product.price * listFavorite[i].product.discount / 100 : price = listFavorite[i].product.price;
              const res = await onUpateCartFromFavorite(listFavorite[i].favoriteId,1, price, resCart.cartId, listFavorite[i].product.productId);
              // await onDeleteFavorites(listFavorite[i].favoriteId);
            }
          }
          const resF = await onGetFavoritesByUser(user.email);
          setCountFavorite(resF.length);
          setCountCart(resCart.length);
          setNumberChange(numberChange + 1);
        }
      }
      setIsLoading(false);
      // setNumberFavorite(numberFavorite + 1);
    } catch (error) {
      setIsLoading(false);
      console.log("Add to cart error: ", error);
    }
  };


  return (
    <View style={{ position: 'relative', flex: 1, backgroundColor: 'white' }}>
      {/* Top bar */}
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
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Favorite</Text>

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
          listFavorite.length > 0 ?
          listFavorite.map((item, index) => {
              return (
                <Item
                  key={index}
                  gotoProductDetail={() => navigation.navigate('ProductDetail', { idProduct: item.product.productId })}
                  itemSelected={() => itemSelected(item)}
                  item={item} />
              )
            }) :
            <View style={{ justifyContent: 'center', marginTop: 20, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', }}>No product in Favorite</Text>
            </View>
        }

      </ScrollView>

      {
        listFavorite && listFavorite.length !== 0 ?
          <TouchableOpacity onPress={() => addAllToCart()} style={styles.button}>
            <Text style={styles.buttonText}>Add to my cart</Text>
          </TouchableOpacity> :
          <View style={[styles.button, { backgroundColor: '#BBB' }]}>
            <Text style={styles.buttonText}>Add to my cart</Text>
          </View>
      }

      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait..."
      />

    </View>

  )
}

export default Favorite


const Item = ({ item, gotoProductDetail, itemSelected }) => (

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
                  
                </View>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'black', marginTop: 4 }}>Price: </Text>
                {
                  item.product.discount > 0 ?
                    <Text style={{ fontSize: 16, fontWeight: '400', color: 'black', marginTop: 4, marginRight: 8, textDecorationLine: 'line-through' }}>
                      $ {(item.product.price).toFixed(2)}
                    </Text> : null
                }
                <Text style={{ fontSize: 16, fontWeight: '600', color: 'red', marginTop: 4 }}>$ {(item.product.price-item.product.price*item.product.discount/100).toFixed(2)}</Text>
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
  button: {
    position: 'absolute',
    width: '80%',
    alignItems: 'center',
    bottom: 10,
    backgroundColor: 'black',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600'
  },

})
