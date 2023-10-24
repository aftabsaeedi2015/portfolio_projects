import React from 'react'
import {TextInput,StyleSheet,View,TouchableOpacity} from 'react-native'
import { useTheme } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';


function SearchBar({ placeholder, value, onChangeText,handleSearch,navigation }) {
   const theme = useTheme()
   const [isFocused, setIsFocused] = React.useState(false);
   const styles = StyleSheet.create({
    input: {
        padding: 5,
        width: '90%',
    },
    searchButton: {

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: isFocused ? 'transparent': 1,
        borderBottomColor: isFocused ? theme.colors.border : 'red',
        paddingLeft: 10,
        paddingRight: 10

    },

})
  return (
    <View style = {styles.container}>
        <Icon
        name="search"
        size={20}
        style={styles.icon}
        />
        <TextInput
        inlineImageLeft=''
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        style={styles.input}
        onFocus={()=>setIsFocused(true)}
        onBlur = {()=>setIsFocused(false)}
      />
      <TouchableOpacity
      style = {styles.searchButton}
      onPress={ handleSearch}>
        <Icon
        name="arrow-right"
        size={20} style={styles.icon}
        onPress={()=>navigation.navigate('SearchResult',{category: value})}
        />
      </TouchableOpacity>
    </View>

  )
}

export default SearchBar
