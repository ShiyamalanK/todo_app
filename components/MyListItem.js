import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../constants/colors'

export default function MyListItem(props) {
  return (
    <View style={styles.MyListItemContainer}>
        <TouchableOpacity
            style = {styles.MyListItem}
            onPress = {props.onPress}
            onLongPress={props.onEdit}
        >
            <Text style={styles.MyListItemText}>{props.title.length > 40 ? `${props.title.substring(0,36)}...` : props.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
           onPress={props.onDelete}>
            <Icon name="delete" size={24} color={colors.myWhite} />
        </TouchableOpacity>
        {/* <TouchableOpacity 
           onPress={props.onEdit}>
            <Icon name="edit" size={24} color={colors.myWhite} />
        </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
    MyListItemContainer:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      minHeight: 100,
      backgroundColor: colors.myBlue,
      borderRadius: 5,
      paddingHorizontal: 25,
      marginVertical: 5
    },
    MyListItem:{
        display: 'flex',
        justifyContent: 'center',
        alignItems:'left',
        // height: 100,
        // minWidth: 150,
        width: '70%',
        marginVertical: 5,
        // padding: 20,
        
    },
    MyListItemText:{
        color: colors.myWhite,
        fontWeight: 'bold',
        // textAlign:'left'
    },
    deleteButton: {
        // position: 'absolute',
        // top: -2,
        // right: -2,
        backgroundColor: colors.myRed, // Adjust color as needed
        borderRadius: 20,
        borderWidth: 1,
        padding: 5,
        // width: 30,
        // height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      deleteButtonText: {
        color: colors.myWhite,
        fontWeight: 'bold',
      },
})