import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../constants/colors';

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
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New List Name"
            value={listName}
            onChangeText={setListName}
          />
          <Button title="Add List" onPress={addList} 
          style={styles.addBtn}/>
      </View>
      <FlatList
        data={lists}
        // numColumns={3}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {/* <TouchableOpacity 
            style={styles.listBtn}
            onPress={() => navigation.navigate('TodoList', { listId: item.id })}
            >
                <Text>{item.name}</Text>
            </TouchableOpacity> */}
            <Button
              title={item.name}
              onPress={() => navigation.navigate('TodoList', { listId: item.id })}
            />
            
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    gap: 10,
    marginBottom: 30
  },
  input: {
    height: 40,
    width: 270,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 10,
    paddingHorizontal: 8,
  },
  addBtn:{
    height: 40
  },
  listItem: {
    marginBottom: 10,

  },
  listBtn:{
    height: 100,
    width: 100,
    backgroundColor: colors.myBlue
  }
});

