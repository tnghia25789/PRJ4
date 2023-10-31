import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../../AppContext';

const Profile = (props) => {
  const { navigation } = props;
  const { user } = useContext(AppContext);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: 'white', paddingTop: 30 }}>
        {/* Body */}
        <View>

          {/* Profile */}
          <TouchableOpacity>
            <View style={styles.viewProfile}>
              <View style={styles.viewImgProfile0}>
                <Image
                  style={[styles.iconTopBar, { borderRadius: 80, width: 80, height: 80 }]}
                  resizeMode='cover'
                  source={{ uri: user.image }} />
                <View style={styles.viewInfo}>
                    <Text style={styles.textName}>Welcome back</Text>
                  <Text style={[styles.textName, { color: 'black', }]}>{user.name}</Text>
                  <Text style={styles.textStatus}>My profile</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* My orders */}
          <View style={styles.viewOption}>
            <View style={styles.viewImgProfile}>
              <View style={styles.viewInfo}>
                <Text style={styles.textName}>My orders</Text>
                <Text style={styles.textStatus}>See all your orders</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Order')}>
                <Image
                  style={styles.iconTopBar}
                  resizeMode='cover'
                  source={require('../../../../assets/images/next2.png')} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Shippng address */}
          {/* <View style={styles.viewOption}>
            <View style={styles.viewImgProfile}>
              <View style={styles.viewInfo}>
                <Text style={styles.textName}>Shipping Addresses</Text>
                <Text style={styles.textStatus}>See all your addresses</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ShippngAdress')}>
                <Image
                  style={styles.iconTopBar}
                  resizeMode='cover'
                  source={require('../../../../assets/images/next2.png')} />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Voucher */}
          {/* <View style={styles.viewOption}>
            <View style={styles.viewImgProfile}>
              <View style={styles.viewInfo}>
                <Text style={styles.textName}>Vouchers</Text>
                <Text style={styles.textStatus}>Your promotion code</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ListPromotion')}>
                <Image
                  style={styles.iconTopBar}
                  resizeMode='cover'
                  source={require('../../../../assets/images/next2.png')} />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Setting */}
          <View style={styles.viewOption}>
            <View style={styles.viewImgProfile}>
              <View style={styles.viewInfo}>
                <Text style={styles.textName}>Setting</Text>
                <Text style={styles.textStatus}>Infomation, Password, Contact</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
                <Image
                  style={styles.iconTopBar}
                  resizeMode='cover'
                  source={require('../../../../assets/images/next2.png')} />
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'white'
  },
  textProfile: {
    textAlign: 'center',
    color: 'black',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 12
  },
  topBarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#aeea00'
  },
  marginTopBar: {
    padding: 10
  },
  iconTopBar: {
    width: 24, height: 24,
    marginRight: 10
  },
  nameText: {
    fontWeight: '500',
    marginStart: 10,
    fontSize: 16,
    color: '#000000'
  },
  viewProfile: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  viewOption: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: 'grey',
    borderRadius: 4,
    shadowOffset: {
      width: 1,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.3
  },
  viewImgProfile0: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  viewImgProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  viewInfo: {
    marginStart: 10
  },
  textName: {
    maxHeight: 25,
    fontWeight: '900',
    fontSize: 16,
  },
  textStatus: {
    maxHeight: 25,
    fontWeight: '400',
    fontSize: 13,
  },
})