import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoList from '../components/TodoList';
import colors from '../constants/colors';
import MyInput from '../components/MyInput';

export default function TodoListScreen({ route }) {
  const { listId } = route.params;
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  const addTask = async () => {
    if (taskName.trim() === '') return;
    const newTask = { name: taskName, id: Date.now().toString(), completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setTaskName('');
    await AsyncStorage.setItem(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  const loadTasks = async () => {
    const savedTasks = await AsyncStorage.getItem(`tasks_${listId}`);
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    await AsyncStorage.setItem(`tasks_${listId}`, JSON.stringify(updatedTasks));
  };

  return (
    <View style={styles.container}>
      <MyInput
        placeholder='New Task'
        value={taskName}
        onChangeText={setTaskName}
        buttonTitle = 'Add Task'
        onPress = {addTask}
      />
      <TodoList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.myWhite,
    maxWidth: 500
  },
});
