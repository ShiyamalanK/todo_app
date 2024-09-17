import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, Switch} from 'react-native';
import { colors , colorList, listColors} from '../constants/colors';
// import { CheckBox } from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colorKeys = Object.keys(listColors);
const colorArray = colorKeys.map(key => listColors[key]);
export default function TodoItem({ task, onToggle, onDelete, index }) {
  return (
    <View style={[styles.container, {backgroundColor: getBackgroundColor(index)}]}>
      <Switch
        value={task.completed}
        onValueChange={onToggle}
        // style={styles.switch}
        trackColor={{false: colors.myTrackColor, true: colors.myTrackColor}}
        thumbColor={colors.mySwitchThumbColor}
      />
      <Text style={[styles.text, task.completed && styles.completed]}>{task.name.length > 50 ? `${task.name.substring(0,48)}...` : task.name}</Text>
      <TouchableOpacity onPress={onDelete}>
        {/* <Text style={styles.delete}>DELETE</Text> */}
        <Icon name="delete" size={24} color={colors.myWhite} />
      </TouchableOpacity>
    </View>
  );
}

const getBackgroundColor = (index) => {
  console.log(index);
  return colorArray[index % colorArray.length];
};

const styles = StyleSheet.create({
  // container: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   gap: 10,
  //   height:60,
  //   marginVertical: 8,
  //   paddingRight: 15,
  //   borderWidth: 0.3,
  //   borderColor: colors.myBlack,
  //   borderRadius: 5
  // },
  // text: {
  //   flex: 1,
  //   fontSize: 18,
  // },
  // completed: {
  //   textDecorationLine: 'line-through',
  // },
  // delete: {
  //   color: 'red',
  //   marginLeft: 10,
  //   fontWeight: 'bold'
  // },
  container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    height:80,
    marginVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.myWhite
  },
  completed: {
    textDecorationLine: 'line-through',
    opacity: 0.5
  },
  delete: {
    color: 'red',
    marginLeft: 10,
    fontWeight: 'bold'
  },
  switch: {
    
  }
});
