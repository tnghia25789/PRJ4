import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'

import ProgressDialog from 'react-native-progress-dialog';
import Swiper from 'react-native-swiper';

import ProductSortDialog from './ProductSortDialog';
import { AppContext } from '../../AppContext';
import back from '../../../back/back';

const ListProduct = ({ navigation, route }) => {
  back(navigation);
  const { categoryId } = route.params;
  const { onGetCategories,onGetProductsByCategoryId,onGetProducts
    // ,onGetBrandsByIdCategory, onGetProducts, onGetSubProducts, onGetReviews, objRef
 } = useContext(AppContext);
  const [listCategory,setListCategory] = useState([]);
//   const [listBrand, setListBrand] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [visibleSort, setVisibleSort] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [idSelected, setIdSelected] = useState('all');

//   const listSubProductRef = useRef([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      resCategory = await onGetCategories();
      setListCategory(resCategory);

      //Lay danh sach san pham
      
      const res = await onGetProductsByCategoryId(categoryId);

      //Loc danh sach san pham theo idCategory
      if (res !== null || res !== undefined) {
        setListProduct(res);
      }
      setIsLoading(false);
    };
    getData();
  }, []);

  //Lay danh sach san pham va idCategory
  const getProductsByIdCategory = async (idCategory) => {
    setIsLoading(true);
    setIdSelected(idCategory);
    let res = [];
    //Loc san pham theo  idCategory
    if (idCategory === 'all') {
      
      res = await onGetProducts();
    }
    else{
      res = await onGetProductsByCategoryId(idCategory);
    }
    
    if (res !== null || res !== undefined) {
      setListProduct(res);
    }
    setIsLoading(false);
  };

  //Lay danh sach theo muc gia va idCategory 
  const getProductsByPriceAndIdCategory = async (idCategory, priceStart, priceEnd) => {
    setIsLoading(true);

    console.log('idCategory: ', idCategory);
    console.log('price: ', priceStart + " ---- " + priceEnd);
    let listFilter = [];
    if (idCategory === 'all') {
      const resAll = await onGetProducts();
      for (let i = 0; i < resAll.length; i++) {
        if (resAll[i].price <= priceEnd && resAll[i].price >= priceStart) {
          listFilter.push(resAll[i]);
          console.log('listFilter: ', resAll[i].name);
        }        
      }
    } 
    else {
      const res = await onGetProductsByCategoryId(idCategory);
      for (let i = 0; i < res.length; i++) {
        if (res[i].price <= priceEnd && res[i].price >= priceStart) {
          listFilter.push(res[i]);
          console.log('listFilter: ', res[i].name);
        }
      } 
    }
    setListProduct(listFilter);
    setIsLoading(false);
    
  };


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

  const showDialogSort = () => {
    setVisibleSort(true);
  };

  const onSort = (sort) => {
    setVisibleSort(false);
    console.log(sort);
    if (sort === 'down') {
      let sortedProducts = listProduct.sort((a, b) => b.price - a.price);
      setListProduct(sortedProducts);
    } else if (sort === 'up') {
      let sortedProducts = listProduct.sort((a, b) => a.price - b.price);
      setListProduct(sortedProducts);
    }

  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait..." />

      <View style={styles.container}>

        {/* Top bar */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 22, height: 22 }}
              resizeMode='cover'
              source={require('../../../../assets/images/ic_back.png')} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 50 }}>
            {/* <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>{category.name}</Text> */}

          </View>

          {/* <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <Image
              style={{ width: 22, height: 22 }}
              resizeMode='cover'
              source={require('../../../../assets/images/ic_search.png')} />
          </TouchableOpacity> */}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Slide banner */}
          <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Swiper
              style={{ height: 150 }}
              autoplayTimeout={5}
              autoplay={true}
              loop={true}
              showsPagination={true}
            >
              <Image
                  style={{ width: '100%', height: 150 }}
                  resizeMode='stretch'
                  source={require('../../../../assets/images/banner1.png')} />
              <Image
                  style={{ width: '100%', height: 150 }}
                  resizeMode='stretch'
                  source={require('../../../../assets/images/banner2.jpg')} />
              <Image
                  style={{ width: '100%', height: 150 }}
                  resizeMode='stretch'
                  source={require('../../../../assets/images/banner3.jpg')} />
              <Image
                  style={{ width: '100%', height: 150 }}
                  resizeMode='stretch'
                  source={require('../../../../assets/images/banner4.jpg')} />
            </Swiper>
          </View>

          <ScrollView style={{ margin: 10, height: 56, }} horizontal={true} showsHorizontalScrollIndicator={false}>
            {/* All */}
            <TouchableOpacity
              style={idSelected === 'all' ? styles.itemBrandSelected : styles.itemBrand}
              onPress={() => getProductsByIdCategory('all')}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Image
                  style={{ width: 30, height: 30 }}
                  resizeMode='cover'
                  source={require('../../../../assets/images/ic_all.png')} />
                {/* <Text>All</Text> */}
              </View>
            </TouchableOpacity>
            {
              listCategory ? listCategory.map((item,index) => {
                return (
                  <TouchableOpacity
                    style={{ marginHorizontal: 3, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', padding: 5, width: 100, height: 40 }}
                                    key={index}
                                    onPress={() => getProductsByIdCategory(item.categoryId)}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                        
                                        <Text>{item.categoryName}</Text>
                                    </View>
                  </TouchableOpacity>
                )
              }) : <View />
            }
          </ScrollView>

          <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 16, }}>
            
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', marginHorizontal: 12, marginBottom: 8, }}
              onPress={() => showDialogSort()}>
              <Text style={{ color: 'black', fontWeight: '800', fontSize: 16, textDecorationLine: 'underline' }}>Sort by</Text>
            </TouchableOpacity>

            <ScrollView style={{ marginHorizontal: 12 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              <TouchableOpacity onPress={() => getProductsByPriceAndIdCategory(idSelected, 0, 500)} style={{ marginRight: 4 }}>
                <View style={{ backgroundColor: '#333', padding: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>1$-500$</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getProductsByPriceAndIdCategory(idSelected, 500, 1000)} style={{ marginRight: 4 }}>
                <View style={{ backgroundColor: '#333', padding: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>500$-1000$</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getProductsByPriceAndIdCategory(idSelected, 1000, 1500)} style={{ marginRight: 4 }}>
                <View style={{ backgroundColor: '#333', padding: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>1000$-1500$</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getProductsByPriceAndIdCategory(idSelected, 1500, 2000)} style={{ marginRight: 4 }}>
                <View style={{ backgroundColor: '#333', padding: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>1500$-2000$</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => getProductsByPriceAndIdCategory(idSelected, 2000, 999999999)} style={{ marginRight: 4 }}>
                <View style={{ backgroundColor: '#333', padding: 5, paddingHorizontal: 10, borderRadius: 12 }}>
                  <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>Over 2000$</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>

          </View>

          {
            visibleSort ? <ProductSortDialog onSort={onSort} isVisible={visibleSort} /> : null
          }

          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: 10 }}>
            {
              listProduct ?
                listProduct.map((item) =>
                  <Item key={item.productId} item={item} onPress={() => navigation.navigate('ProductDetail', { idProduct: item.productId })} />
                ) : null
            }
          </View>
        </ScrollView>

      </View>
    </View>
  )
}

export default ListProduct

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
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
  itemBrand: {
    borderRadius: 8, borderWidth: 1,
    borderColor: '#ddd', padding: 8,
    width: 56, height: 56, marginEnd: 8,
  },
  itemBrandSelected: {
    borderRadius: 8, borderWidth: 1,
    borderColor: 'black', padding: 2,
    width: 40, height: 40, marginEnd: 8,
  },
});

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={{ flexWrap: 'wrap', width: '49%', marginBottom: 10 }} onPress={onPress}>
    <View style={styles.itemContainer}>
      <View style={{ width: '100%', height: '100%' }}>
      
        <Image
          style={{ width: '100%', height: 160, position: 'relative' }}
          resizeMode='cover'
          source={{ uri: item.image }} />
        <Image
          style={{ width: 35, height: 35, position: 'absolute', right: 13, bottom: 60 }}
          resizeMode='cover'
          source={require('../../../../assets/images/ic_shop.png')} />
        <Text numberOfLines={1} style={{ height: 19, color: 'black', fontWeight: '800', fontSize: 16, marginTop: 5, marginHorizontal: 8, maxWidth: '90%' }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 8, marginTop: 5 }}>
          <Image
            style={{ width: 15, height: 15, marginEnd: 5 }}
            resizeMode='cover'
            source={require('../../../../assets/images/ic_star.png')}
          />
          <Text style={{ fontWeight: '700' }}>{item.rating}</Text>
        </View>

        {
          item != undefined && item.sale > 0 ?
            <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
              <Text style={{ height: 19, color: 'black', fontWeight: '700', fontSize: 14, lineHeight: 19.1, marginEnd: 5 }}>
                Price:
              </Text>
              <Text style={{ height: 19, color: 'black', textDecorationLine: 'line-through', fontWeight: '500', fontSize: 14, lineHeight: 19.1, }}>
                {item.price} $
              </Text>
              <Text style={{ height: 19, color: 'red', fontWeight: '700', fontSize: 14, lineHeight: 19.1, marginStart: 10 }}>
                {item.price - item.price * item.sale / 100} $
              </Text>
            </View> :
            <Text style={{ height: 19, color: 'black', fontWeight: '700', fontSize: 14, lineHeight: 19.1, paddingHorizontal: 8 }}>
              Price: {item.price} $
            </Text>
        }

        

        

      </View>
    </View>
  </TouchableOpacity>
);