import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ToastAndroid, useWindowDimensions, TextInput } from 'react-native'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { AppContext } from '../../AppContext';

// import { UserContext } from '../../../users/UserContext';

import RenderHtml from 'react-native-render-html';
import Swiper from 'react-native-swiper';
import ProgressDialog from 'react-native-progress-dialog';
import back from '../../../back/back';
import DialogChangCount from '../Dialog/DialogChangCount';


const ProductDetail = ({ route, navigation }) => {
  const { idProduct } = route.params;
  const { width } = useWindowDimensions();
  back(navigation);
  const {
    user,
    //Cart
    onGetCartByUser,
    //CartDetail
    onPostCartDetail,onPutCartDetail,onRemoveCartDetail,

    //Product
    onGetProductsById,
    //Rates
    onGetRates,
    //Favorites
    onGetFavoritesByUser,onGetFavoritesByProduct,onGetFavoritesByUserProduct,onPostFavorites,onDeleteFavorites

  } = useContext(AppContext);


  const [count, setCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId , setFavoriteId] = useState();

  const [productItem, setProductItem] = useState({});

  const source = {
    html: `${productItem.description}`
  }


  //Lay tat ca hinh anh cua san pham va mau sac , binh luan
  useEffect(() => {
    //Lay danh sach mau
    const getData = async () => {
      try {
        if (isFirstRun) {
          setIsFirstRun(false);
          setIsLoading(false);
        }
        const product = await onGetProductsById(idProduct);
        const resRating = await onGetRates();

        product.rating = await getStar(idProduct, resRating);
        //Set product
        setProductItem(product);
        checkFavorite(idProduct);
        setIsLoading(true);
      } catch (error) {
        setIsLoading(false);
        console.log("Get list color error: ", error);
      }
    };
    getData();
  }, []);


  //Lay sao tu danh gia set vao tung item
  const getStar = async (idProduct, res) => {
    let star = 0;
    let count = 0;

    if (res == null || res == undefined) {
        return 0;
    }
    const review = res;
    for (let i = 0; i < review.length; i++) {
        if (review[i].product.productId == idProduct) {
            count = count + 1;
            star += review[i].rating;
        }
    }
    if (count == 0) {
        return 0;
    } else {
        return (star / count).toFixed(1);
    }
  };
  
  //Kiem tra san pham da co trong danh sach yeu thich chua
  const checkFavorite = async (idProduct) => {
    let check = false;
    if(user =='' || user == null){
      check = false;
    }
    else{
      const resFavorite = await onGetFavoritesByUserProduct(idProduct,user.email);
      if (resFavorite.favoriteId !=null || resFavorite.favoriteId != undefined) {
        check = true;
      }
      setFavoriteId(resFavorite.favoriteId);
    }
    
    setIsFavorite(check);
  };

  //Them/xoa san pham vao gio hang / yeu thich
  const addFavoritesOrCartDetail = async (name) => {
    try {
      if(user =='' || user == null){
        ToastAndroid.show("You must login first", ToastAndroid.SHORT);
      }
      else {
        if (name == 'Favorite') {
          if(favoriteId == null || favoriteId == undefined){
            const ress = await onPostFavorites(user.id, productItem.productId);
          }
          else {
            const res = await onDeleteFavorites(favoriteId);
            
          }
          setIsFavorite(!isFavorite);
        } 
        else {
          let price = 0;
          const resCart = await onGetCartByUser(user.email);
          productItem.discount > 0 ? price = productItem.price - productItem.price * productItem.discount / 100 : price = productItem.price;
          const resCartDetail = await onPostCartDetail(1, price, resCart.cartId, productItem.productId);
          ToastAndroid.show("The product has been added to cart", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.log("Add error: ", error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <ScrollView style={{ flex: 1, position: 'relative', marginBottom: 80 ,marginTop: 20}}>

        {/* Box product - slide */}
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', height: 280 }}>
          {
            isLoading ?
              <Swiper
                style={{ height: 280}}
                autoplayTimeout={3}
                autoplay={true}
                loop={true}
                showsPagination={true}>
     
                  <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    key={productItem.productId}
                    style={{ width: 280, height: 280 }}
                    resizeMode='stretch'
                    source={{
                      uri: productItem.image,
                    }}
                  />
                </View>
    
              </Swiper> : null
          }


          <View style={{ position: "absolute", top: 20, left: 10 }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                resizeMode='cover'
                source={require('../../../../assets/images/ic_back.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>


        {/* Box information */}
        <View style={{ flex: 6, paddingHorizontal: 12 }}>
          {/* Name product */}
          <Text style={{ color: 'black', fontWeight: '800', fontSize: 24, marginTop: 16, lineHeight: 30.47 }}>{productItem.name}</Text>

          {/* View price - plus */}
          {
            productItem.discount == 0 ?
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: 'black', fontWeight: '700', fontSize: 30, marginTop: 6, flex: 3 }}>
                  $ {productItem.price}
                </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, flex: 1 }}>
                    
                  </View>
                  <Text style={{ color: 'black', fontWeight: '700', fontSize: 14, marginTop: 6 }}>(${productItem.quantity} products in stock)</Text>
                </View>
              </View> :
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: 'red', fontWeight: '700', fontSize: 30, marginTop: 6, flex: 3 }}>
                    $ {productItem.price - (productItem.price * productItem.discount / 100)}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', padding: 8, width: 60, borderRadius: 8, marginEnd: 8 }}>
                      <Text style={{ color: 'white', fontWeight: '800', fontSize: 13 }}>-{productItem.discount}%</Text>
                    </View>
                    <Text style={{ color: 'black', fontWeight: '700', fontSize: 20, marginTop: 6, flex: 3, textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                      $ {productItem.price}
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
                  </View>
                  <Text style={{ color: 'black', fontWeight: '700', fontSize: 14, marginTop: 6 }}>({productItem.quantity} products in stock)</Text>
                </View>
              </View>

          }

          {/* View rate */}
          <View style={{ flexDirection: 'row', marginTop: 6, alignItems: 'center' }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../../assets/images/ic_star.png')}
            />
            <Text style={{ color: 'black', fontWeight: '700', fontSize: 18, marginStart: 4 }}>
              {productItem.rating}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('ListReview', { productItem })}>
              <Text style={{ color: '#808080', fontWeight: '600', fontSize: 14, marginLeft: 10, textDecorationLine: 'underline' }}>
                See all reviews
              </Text>
            </TouchableOpacity>
          </View>

          {/* View description */}
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'black', fontWeight: '700', marginTop: 14, fontSize: 18 }}>Description</Text>
            {
              source.html == '' ?
                <Text>Description</Text> :
                <RenderHtml
                  contentWidth={width}
                  source={source}
                />
            }

          </View>

        </View>


      </ScrollView >


      {/* Box favorite + add to cart (absolute) */}
      <View style={styles.viewButton}>
        <View style={{ marginRight: 15 }}>
          {
            isFavorite ?
              <TouchableOpacity onPress={() => addFavoritesOrCartDetail('Favorite')} style={styles.button1}>
                <Image style={{ width: 24, height: 24 }}
                  source={require('../../../../assets/images/ic_heart512_2.png')} />
              </TouchableOpacity> :
              <TouchableOpacity onPress={() => addFavoritesOrCartDetail('Favorite')} style={styles.button1}>
                <Image style={{ width: 24, height: 24 }}
                  source={require('../../../../assets/images/ic_heart512.png')} />
              </TouchableOpacity>
          }

        </View>
        <View style={{}}>
          {
            productItem.quantity == 0 ?
              <View style={[styles.button2, {backgroundColor: '#ddd'}]}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                  Temporarily out of stock</Text>
              </View> :
              <TouchableOpacity onPress={() => addFavoritesOrCartDetail('Cart')} style={styles.button2}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
                  Add to cart</Text>
              </TouchableOpacity>
          }

        </View>
      </View>

      <ProgressDialog
        visible={!isLoading}
        loaderColor='black'
        lable="Please wait..." />
    </View>
  )

}


export default ProductDetail

const styles = StyleSheet.create({
  viewButton: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  button2: {
    backgroundColor: '#000', height: 50, width: 280,
    borderRadius: 30, flexDirection: 'column', justifyContent: 'center'
  },
  button1: {
    backgroundColor: '#F0F0F0', height: 50, width: 50,
    borderRadius: 30, justifyContent: 'center', alignItems: 'center'
  },
  boxColorSelected: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxColor: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
})