import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, CheckBox, Switch} from 'react-native';
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
    marginBottom: 10,
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
