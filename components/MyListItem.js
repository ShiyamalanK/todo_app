import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../constants/colors'

export default function MyListItem(props) {
  return (
    <View>
        <TouchableOpacity
            style = {styles.MyListItem}
            onPress = {props.onPress}
        >
            <Text style={styles.MyListItemText}>{props.title.length > 14 ? `${props.title.substring(0,12)}...` : props.title}</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    MyListItem:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        padding: 12,
        height: 100,
        minWidth: 150,
        marginVertical: 5,
        backgroundColor: colors.myBlue,
        borderRadius: 5
        
    },
    MyListItemText:{
        color: colors.myWhite,
        fontWeight: 'bold'
    }
})