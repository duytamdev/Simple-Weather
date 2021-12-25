import React, {useCallback, useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import SearchBar from './src/components/SearchBar';
import moment from './src/utils/moment';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Geolocation from '@react-native-community/geolocation';

const API_KEY = 'fa35117d770d7d31b1c47517abaf575b';
const API_KEY_LOCATION = 'pk.f6c9d4dce6ce135100181df61831fc31';
const SectionData = ({title, nameIcon, value}) => {
  return (
    <View style={styles.sectionWind}>
      <FeatherIcon
        style={{padding: 10}}
        name={nameIcon}
        color={'#fff'}
        size={25}
      />
      <View>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
    </View>
  );
};
const App: () => Node = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('Ho Chi Minh');
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setModalVisible(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=vi`,
      )
      .then(res => {
        setWeatherData(res.data);
        setModalVisible(false);
      })
      .catch(e => {
        setModalVisible(false);
        Alert.alert('ERROR 404', 'Không tìm thấy vị trí', [
          {text: 'OK', onPress: () => ''},
        ]);
      });
  }, [cityName]);
  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      const lat = info.coords.latitude;
      const long = info.coords.longitude;
      const API = `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY_LOCATION}&lat=${lat}&lon=${long}&format=json`;
      axios
        .get(API)
        .then(res => {
          setCityName(res.data.address.city);
        })
        .catch(e => console.error(e));
    });
  }, []);
  const fetchWeatherCityName = useCallback(name => {
    setCityName(name);
  }, []);
  return (
    <View style={styles.sectionContainer}>
      {modalVisible && (
        <Modal transparent={true}>
          <ActivityIndicator
            style={{flex: 1, backgroundColor: 'rgba(218,218,218,0.38)'}}
            size={36}
            color={'"#fff"'}
          />
        </Modal>
      )}
      <SearchBar fetchWeatherCityName={fetchWeatherCityName} />

      {weatherData && (
        <>
          <View style={styles.weatherContainer}>
            <Image
              style={styles.logo}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`,
              }}
            />
            <Text style={styles.temp}>{`${Math.round(
              weatherData.main.temp,
            )}${'\u00b0'}C`}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.text,
                  {fontWeight: 'bold'},
                ]}>{`${weatherData.name} | ${weatherData.weather[0].description}`}</Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 16,
              borderBottomColor: '#e3e3e3',
              borderBottomWidth: 1,
            }}
          />
          <View style={styles.locationContainer}>
            <View style={styles.sectionRow}>
              <SectionData
                title={'Mặt trời mọc'}
                nameIcon={'sunrise'}
                value={`${moment.unix(weatherData.sys.sunrise).format('H:mm')}`}
              />
              <SectionData
                title={'Mặt trời lặn'}
                nameIcon={'sunset'}
                value={`${moment.unix(weatherData.sys.sunset).format('H:mm')}`}
              />
            </View>
            <View style={styles.sectionRow}>
              <SectionData
                title={'Độ ẩm'}
                nameIcon={'feather'}
                value={`${weatherData.main.humidity} %`}
              />
              <SectionData
                title={'Gió'}
                nameIcon={'navigation'}
                value={`${(weatherData.wind.speed * 3.6).toFixed(2)} km/h`}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
  sectionContainer: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#4293D7',
  },
  logo: {
    width: 150,
    height: 150,
  },
  weatherContainer: {
    flex: 2,
    padding: 16,
    alignItems: 'center',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  locationContainer: {
    flex: 1,
    padding: 16,
  },
  sectionWind: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default App;
