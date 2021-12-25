import React, {memo, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import type {Node} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
const SearchBar: () => Node = ({fetchWeatherCityName}) => {
  const [cityName, setCityName] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor="rgba(236,236,236,0.9)"
        style={{color: '#fff', fontWeight: 'bold', flex: 1}}
        onChangeText={value => setCityName(value)}
        value={cityName}
        placeholder={'Enter city name'}
      />
      <TouchableOpacity>
        <Icon
          onPress={() => fetchWeatherCityName(cityName)}
          name={'search'}
          size={28}
          color={'#fff'}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    paddingVertical: 2,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0)',
    width: Dimensions.get('screen').width - 20,
    borderColor: '#fff',
  },
});
export default memo(SearchBar);
