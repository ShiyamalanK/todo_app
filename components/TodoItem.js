import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, Switch} from 'react-native';
import colors from '../constants/colors';
// import { CheckBox } from '@react-native-community/checkbox';

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      {/* <CheckBox value={task.completed} onValueChange={onToggle} /> */}
      <Switch value={task.completed} onValueChange={onToggle} />
      <Text style={[styles.text, task.completed && styles.completed]}>{task.name}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    height:60,
    marginVertical: 8,
    paddingRight: 15,
    borderWidth: 0.3,
    borderColor: colors.myBlack,
    borderRadius: 5
  },
  text: {
    flex: 1,
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  delete: {
    color: 'red',
    marginLeft: 10,
  },
});
