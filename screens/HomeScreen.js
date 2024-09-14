import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';
import MyListItem from '../components/MyListItem';
import MyInput from '../components/MyInput';

export default function HomeScreen({ navigation }) {
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);

  const addList = async () => {
    if (listName.trim() === '') return;
    const newList = { name: listName, id: Date.now().toString() };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    setListName('');
    await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
  };

  const loadLists = async () => {
    const savedLists = await AsyncStorage.getItem('lists');
    if (savedLists) setLists(JSON.parse(savedLists));
  };

  React.useEffect(() => {
    loadLists();
  }, []);

  return (
    <View style={styles.container}>
      <MyInput
        placeholder = "New List"
        value = {listName}
        onChangeText = {setListName}
        buttonTitle = 'Add List'
        onPress = {addList}
      />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {lists.map(item=>(
            <View key={item.id} style={styles.listItem}>
                <MyListItem
                    title={item.name}
                    onPress={() => navigation.navigate('TodoList', { listId: item.id })}/>
            </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.myWhite,
    maxWidth: 500,
},
listContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
listItem:{
    width: '48%',
}
  
});

