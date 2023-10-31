import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../../AppContext';
import ProgressDialog from 'react-native-progress-dialog';

const Processing = ({navigation, route}) => {
  //const {listProcessing} = useContext(AppContext);
  //console.log("listProcessing", listProcessing);
  //const listProcessing = [];
  const {
    onGetOrderByUser,onGetOrderDetailById,onPutOrderById,
    onUpdateOrder,
    countOrder, setCountOrder,
  } = useContext(AppContext);
  const { user } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [listProcessing, setListProcessing] = useState([]);

  useEffect(() => {
    const getOrderByIdUserAndStatus = async () => {
      try {
        setIsLoading(true);
        const resOrders = await onGetOrderByUser(user.email);
      
        let list = [];
        for (let i = 0; i < resOrders.length; i++) {
          if (resOrders[i].status == 0 || resOrders[i].status == 1) {
            const resOrderDetails = await onGetOrderDetailById(resOrders[i].ordersId);
            let normalDate = new Date(resOrders[i].orderDate)  ;
            // Định dạng giờ
            const hours = ('0' + normalDate.getHours()).slice(-2);
            const minutes = ('0' + normalDate.getMinutes()).slice(-2);

            // Định dạng ngày
            const day = ('0' + normalDate.getDate()).slice(-2);
            const month = ('0' + (normalDate.getMonth() + 1)).slice(-2);
            const year = normalDate.getFullYear();

            // Tạo định dạng cuối cùng
            const formattedDate = hours + ':' + minutes + ' ' + day + '/' + month + '/' + year;
            
            let sum = 0;
            for (let j = 0; j < resOrderDetails.length; j++) {
              sum += resOrderDetails[j].quantity;
            }
            resOrders[i].date = formattedDate;
            resOrders[i].quantity = sum;
            resOrders[i].resOrderDetails = resOrderDetails;
            list.push(resOrders[i]);
          }
        }
        setListProcessing(list);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log("Error getOrders", error);
      }
    };
    getOrderByIdUserAndStatus();
  }, [countOrder]);

  const gotoOrderDetail = (item) => {
    navigation.navigate('OrderDetail', { item });
  };

  const cancelOrder = async (item) => {
    try {
      setIsLoading(true);
      await onPutOrderById(item.ordersId);
      setCountOrder(countOrder + 1);
    } catch (error) {
      console.log('Error cancel order: ', error);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <ProgressDialog
        visible={isLoading}
        loaderColor="black"
        lable="Please wait for a moment..."
      />
      <View style={styles.container}>
        {
          listProcessing.length > 0 &&
          listProcessing.map((item) =>
            <Item
              key={item.ordersId}
              item={item}
              cancel={() => cancelOrder(item)}
              onpress={() => gotoOrderDetail(item)} />)
        }
      </View>
    </ScrollView>
  )
}

export default Processing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'white',
  },
  containerItem: {
    flexDirection: 'column',
    padding: 12,
    backgroundColor: 'white',
    shadowColor: 'grey',
    borderRadius: 4,
    elevation: 5,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    marginBottom: 6
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonDetail: {
    backgroundColor: 'black',
    width: 100,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  textDetail: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  listItemName: {
    marginStart: 20,
    width: '72%'
  },
  TextlstName: {
    fontWeight: 'normal',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 5,
    width: 150,
  },
  TextlstPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5,
  },
});

const Item = ({ item, onpress, cancel }) => (
  <View style={styles.containerItem}>
    <View style={styles.rowItem}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>Order {item.ordersId}</Text>
      <Text style={{ fontSize: 16, fontWeight: '400' }}>{item.date}</Text>
    </View>
    <View style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginVertical: 10 }}></View>
    <View style={{ flexDirection: 'column' }}>


      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Quantity: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.quantity}</Text>
        </View>
        <View style={styles.rowItem}>
          <Text style={{ fontSize: 16, fontWeight: '400' }}>Total Amount: </Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'black' }}>{item.amount.toFixed(2)}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={styles.rowItem}>
          <TouchableOpacity onPress={cancel} style={[styles.buttonDetail, {backgroundColor: 'red'}]}>
            <Text style={styles.textDetail}>Cancel</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={[styles.rowItem,]}>
          <TouchableOpacity onPress={onpress} style={styles.buttonDetail}>
            <Text style={styles.textDetail}>See more</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  </View>
);

