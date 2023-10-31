import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
// import { UserContext } from '../../../users/UserContext';
import { AppContext } from '../../AppContext';

import Swiper from 'react-native-swiper';
import ProgressDialog from 'react-native-progress-dialog';

const Home = (props) => {
    const { navigation } = props;
    // const { user } = useContext(UserContext);
    const { onGetProducts,onGetProductsBestSeller,onGetProductsLasted,onGetProductsRated,
            onGetProductsSuggest,onGetProductsByCategoryId,onGetProductsById,
            onGetCategories,onGetCategoriesById,
            onGetCartByUser,onGetCartDetailByCartId,onGetCartDetailById,
            onGetOrderById,onGetOrderByUser,onGetOrderDetailById,
            onGetRates,onGetRatesByOrderDetailId,onGetRatesByProductId

    } = useContext(AppContext);

    const [listCategory, setListCategory] = useState([]);
    const [ListSale, setListSale] = useState([]);
    const [ListLated, setListLated] = useState([]);
    const [ListRated, setListRated] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);

    //const [refreshing, setRefreshing] = useState(false);

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const res = await onGetNotifications(user._id);
    //             const resCart = await onGetOrderDetailByIdOrder(user.idCart);
    //             const resFavorite = await onGetOrderDetailByIdOrder(user.idFavorite);
    //             if (resCart.data) {
    //                 let sum = 0;
    //                 for (let i = 0; i < resCart.data.length; i++) {
    //                     sum += resCart.data[i].quantity;
    //                 }
    //                 setNumberCart(sum);
    //             }
    //             if (resFavorite.data) {
    //                 setNumberFavorite(resFavorite.data.length);
    //             }
    //             if (res.data) {
    //                 let sum = 0;
    //                 const notifications = res.data;
    //                 for (let i = 0; i < notifications.length; i++) {
    //                     if (notifications[i].isCheck == false) {
    //                         sum++;
    //                     }
    //                 }
    //                 //console.log("sum: ", sum);
    //                 setNumBerNotification(sum);
    //             }
    //         } catch (error) {
    //             console.log("Error getData", error);
    //         }
    //     };
    //     getData();
    // }, [countNotification]);
    // khi noti thay đổi sẽ gọi và chạy lại

    //Lay danh sach category
    // useEffect(() => {
    //     getData();
    // });

    useEffect(() => {
        
        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);
        // khi true mới bật ProgressDialog
        try {     
            const resCategory = await onGetCategories();     
            const resBestSaling = await onGetProductsBestSeller();
            const resLated = await onGetProductsLasted();
            const resRated = await onGetProductsRated();

            const resRating = await onGetRates();

            //Them sao  vao tung item
            let list1 = [];
            let list2 = [];
            let list3 = [];
            const listBestSaling = resBestSaling;
            let count = 0;
            listBestSaling.map(async (item, index) => {
                item.rating = await getStar(item.productId, resRating);
                // thêm thuộc tính rating
                (index < 10 ) && list1.push(item);
            });

            const listLated = resLated;
            listLated.map(async (item, index) => {
                item.rating = await getStar(item.productId, resRating);
                // thêm thuộc tính rating
                (index < 10 ) && list2.push(item);
           
            });

            const listRated = resRated;
            listRated.map(async (item, index) => {
                item.rating = await getStar(item.productId, resRating);
                // thêm thuộc tính rating
                (index < 10 ) && list3.push(item);
           
            });
            
            //await getOrderByIdUserAndStatus(user);

            setListSale(list1);
            setListLated(list2);
            setListRated(list3);
            setListCategory(resCategory);
            setIsLoading(false);
        } catch (error) {
            console.log("Error home screen: ", error);
        }
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

    // điều hướng
    const nextScreen = (categoryId) => {
        navigation.navigate('ListProduct', { categoryId });
    };

    const gotoListProduct = (idCategory) => {
        const category = listCategory.filter((item) => item._id == idCategory);
        navigation.navigate('ListProduct', { category: category[0] });
    };

    const goToProductDetail = (idProduct) => {
        navigation.navigate('ProductDetail', { idProduct });
    };

    return (
        <View style={styles.container}>
            <ProgressDialog
                visible={isLoading}
                loaderColor="black"
                lable="Please wait..." />

            {/* Top bar */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#fcb800' }}>
                <TouchableOpacity onPress={() => getData()}>
                    <Image
                    style={{ width: 22, height: 22, marginRight: 8 }}
                    resizeMode='cover'
                    source={require('../../../../assets/images/ic_home.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                    <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Smart</Text>
                    <Image
                    style={{ width: 30, height: 35, marginHorizontal: 5 }}
                    resizeMode='cover'
                    source={require('../../../../assets/images/logo.png')} />
                    <Text style={{ color: 'black', fontWeight: '800', fontSize: 18 }}>Shop</Text>
                </View>
                <View style={{ width: 22 }}></View>
                </View>

            {/* Body */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                // refreshControl={
                //     <RefreshControl refreshing={refreshing} onRefresh={() => getData()} />}
            >

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

                {/* Category */}
                <ScrollView style={{ marginTop: 20, marginHorizontal: 3, height: 60 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        listCategory.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={{ marginHorizontal: 3, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', padding: 5, width: 100, height: 40 }}
                                    key={index}
                                    onPress={() => nextScreen(item.categoryId)}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                                        
                                        <Text>{item.categoryName}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>

                {/* Banner 1 */}
                <Image
                    style={{ width: '100%', height: 70 }}
                    resizeMode='cover'
                    source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/10/638193122057042546_F-H5_1200x200.png' }} />

                {/* Hot Sale */}
                <View style={{ padding: 4, paddingBottom: 10 }}>
                    {/* Hot Sale */}
                    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image
                            style={{ width: 32, height: 32, marginRight: 10 }}
                            resizeMode='cover'
                            source={require('../../../../assets/images/ic_fire.png')}
                        />
                        <Text style={{ fontSize: 20, fontWeight: '800', color: 'red' }}>Trending Products</Text>
                    </View>

                    <FlatList
                        data={ListRated}
                        // initialNumToRender={2} // Giới hạn số lượng phần tử hiển thị ban đầu
                        // maxToRenderPerBatch={1} // Giới hạn số lượng phần tử render mỗi lần
                        renderItem={({ item }) => <Item onPress={() => goToProductDetail(item.productId)} item={item} />}
                        keyExtractor={item => item.productId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />

                    {/* <TouchableOpacity onPress={() => gotoListProduct('645cfd060405a873dbcdda9c')}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '800', textDecorationLine: 'underline' }}>See more &gt;</Text>
                    </TouchableOpacity> */}
                </View>

                {/* Banner 2 */}
                <Image
                    style={{ width: '100%', height: 70 }}
                    resizeMode='cover'
                    source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/1/638184972894739287_F-H5_1200x200.png' }} />

                {/* Featered phone */}
                <View style={{ padding: 4, paddingBottom: 10 }}>
                    {/* Text */}
                    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image
                            style={{ width: 32, height: 32, marginRight: 10 }}
                            resizeMode='cover'
                            source={require('../../../../assets/images/ic_fire.png')}
                        />
                        <Text style={{ fontSize: 20, fontWeight: '800', color: 'red' }}>Best-Selling Products</Text>
                    </View>

                    <FlatList
                        data={ListSale}
                        renderItem={({ item }) => <Item onPress={() => goToProductDetail(item.productId)} item={item} />}
                        keyExtractor={item => item.productId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    {/* <TouchableOpacity onPress={() => gotoListProduct('645cfd060405a873dbcdda9c')}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '800', textDecorationLine: 'underline' }}>See more &gt;</Text>
                    </TouchableOpacity> */}
                </View>

                {/* Banner 3 */}
                <Image
                    style={{ width: '100%', height: 70 }}
                    resizeMode='cover'
                    source={{ uri: 'https://images.fpt.shop/unsafe/fit-in/1200x200/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/5/10/638193122057042546_F-H5_1200x200.png' }} />

                {/* Featured laptop */}
                <View style={{ padding: 4, paddingBottom: 10 }}>
                    {/* Hot Sale */}
                    <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
                        <Image
                            style={{ width: 32, height: 32, marginRight: 10 }}
                            resizeMode='cover'
                            source={require('../../../../assets/images/ic_fire.png')}
                        />
                        <Text style={{ fontSize: 20, fontWeight: '800', color: 'red' }}>New Products</Text>
                    </View>

                    {/* List item */}
                    {/* {
                        ListLaptop.length > 0 ?
                            <FlatList
                                data={ListLaptop}
                                renderItem={({ item }) => <Item onPress={() => goToProductDetail(item._id)} item={item} />}
                                keyExtractor={item => item._id}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false} /> :
                            <View style={{ width: 160, height: 200, alignItems: 'center' }}></View>
                    } */}
                    <FlatList
                        data={ListLated}
                        renderItem={({ item }) => <Item onPress={() => goToProductDetail(item.productId)} item={item} />}
                        keyExtractor={item => item.productId}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                    {/* <TouchableOpacity onPress={() => gotoListProduct('645cfcd60405a873dbcdda9a')}>
                        <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '800', textDecorationLine: 'underline' }}>See more &gt;</Text>
                    </TouchableOpacity> */}
                </View>


            </ScrollView>

        </View>


    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        backgroundColor: 'white'
    },
    itemContainer: {
        flex: 1,
        width: '100%',
        // elevation: 5,
        // shadowColor: 'grey',
        borderRadius: 8,
        paddingBottom: 12,
        // shadowOffset: {
        //     width: 1,
        //     height: 3
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
        backgroundColor: 'red',
        width: '100%',
        borderTopEndRadius: 8,
        borderTopStartRadius: 8
    }
});

const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 3, minHeight: 200 }}>
        {
            item == null || item == undefined ? <View style={{ width: 160, height: 200, alignItems: 'center' }}></View> :
                <View style={styles.itemContainer}>
                    <View style={{ width: 160, height: '100%' }}>

                        <Image
                            style={{ width: '100%', height: 160, position: 'relative' }}
                            resizeMode='cover'
                            source={{ uri: item.image }} />
                        <Text style={{ height: 19, color: 'black', fontWeight: '800', fontSize: 14, marginTop: 5, paddingHorizontal: 8, maxWidth: 130 }}>
                            {item.name}</Text>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                            <Image
                                style={{ width: 15, height: 15, marginEnd: 5 }}
                                resizeMode='cover'
                                source={require('../../../../assets/images/ic_star.png')}
                            />
                            <Text style={{ fontWeight: '700' }}>{item.rating}</Text>
                        </View>

                        {
                            item.discount > 0 ?
                                <View style={{ flexDirection: 'row', paddingHorizontal: 8 }}>
                                    <Text style={{ height: 19, color: 'black', fontWeight: '700', fontSize: 14, lineHeight: 19.1, marginEnd: 5 }}>
                                        Price:
                                    </Text>
                                    <Text style={{ height: 19, color: 'black', textDecorationLine: 'line-through', fontWeight: '500', fontSize: 14, lineHeight: 19.1, }}>
                                        {item.price} $
                                    </Text>
                                    <Text style={{ height: 19, color: 'red', fontWeight: '700', fontSize: 14, lineHeight: 19.1, marginStart: 10 }}>
                                        {item.price - item.price * item.discount / 100} $
                                    </Text>
                                </View> :
                                <Text style={{ height: 19, color: 'black', fontWeight: '700', fontSize: 14, lineHeight: 19.1, paddingHorizontal: 8 }}>
                                    Price: {item.price} $
                                </Text>
                        }

                    </View>
                </View>
        }

    </TouchableOpacity>
);




