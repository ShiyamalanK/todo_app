import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TodoItem from './TodoItem';
import colors from '../constants/colors';

export default function TodoList({ tasks, onToggle, onDelete }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            onToggle={() => onToggle(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.myWhite
  },
});
