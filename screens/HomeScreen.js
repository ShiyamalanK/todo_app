import React, { useState } from 'react';
import { View, Alert, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveData, loadData } from '../utils/storage';
import { colors , colorList} from '../constants/colors';
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
    await saveData('lists', JSON.stringify(updatedLists));
  };

  const loadLists = async () => {
    const savedLists = await loadData('lists');
    if (savedLists) setLists(JSON.parse(savedLists));
  };

  React.useEffect(() => {
    loadLists();
  }, []);

  const deleteList = async (id) => {
    const updatedLists = lists.filter(item => item.id !== id);
    setLists(updatedLists);
    await saveData('lists', JSON.stringify(updatedLists));
  };

  const handleLongPress = (id) => {
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteList(id),
        },
      ]
    );
  };

  const handleEdit = (id) => {
    const listToEdit = lists.find(list => list.id === id);
    if (!listToEdit) return;
  
    Alert.prompt(
      'Edit List',
      'Enter new list name:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: (newName) => {
            if (newName.trim() === '') return; // Avoid saving empty names
            const updatedLists = lists.map(list => {
              if (list.id === id) {
                return { ...list, name: newName };
              }
              return list;
            });
            setLists(updatedLists);
            AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
          },
        },
      ],
      'plain-text',
      listToEdit.name
    );
  };

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
                    onPress={() => navigation.navigate('TodoList', { listId: item.id })}
                    onDelete={() => handleLongPress(item.id)}
                    onEdit={() => handleEdit(item.id)}
                    index={lists.indexOf(item)}
                    />
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
    // maxWidth: 500,
},
listContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
listItem:{
  // width: '100%'
    // width: '48%',
}
  
});

