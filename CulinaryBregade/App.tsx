import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableHighlight, 
  FlatList, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Define the MenuItem type
interface MenuItem {
  name: string;
  description: string;
  price: number;
  course: string;
}

const Stack = createStackNavigator();

export default function App() {
  // State variables
  const [mName, setMName] = useState<string>('');
  const [mDescription, setMDescription] = useState<string>('');
  const [mPrice, setMPrice] = useState<string>('');
  const [mCourse, setMCourse] = useState<string>('');
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  // Course list
  const courseList = [
    { id: 1, name: 'Hors D Oeuvre' },
    { id: 2, name: 'Amuse-Bouche' },
    { id: 3, name: 'Soup' },
    { id: 4, name: 'Salad' },
    { id: 5, name: 'Appetiser' },
    { id: 6, name: 'Fish' },
    { id: 7, name: 'Main Course' },
    { id: 8, name: 'Palate Cleanser' },
    { id: 9, name: 'Second Main Course' },
    { id: 10, name: 'Cheese' },
    { id: 11, name: 'Dessert' },
    { id: 12, name: 'Mignardise' },
  ];

  // Login handler
  const handleLogin = () => {
    if (username === 'CHEF CHRISTOFFEL') {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Error', 'Incorrect username. Please try again.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Save menu item handler
  const handleSaveMenuItem = () => {
    if (!mName || !mDescription || !mPrice || !mCourse) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const parsedPrice = parseFloat(mPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    const newMenuItem: MenuItem = {
      name: mName,
      description: mDescription,
      price: parsedPrice,
      course: mCourse,
    };

    const updatedMenuList = [...menuList, newMenuItem];
    setMenuList(updatedMenuList);
    setTotal(updatedMenuList.length);

    // Reset fields
    setMName('');
    setMDescription('');
    setMPrice('');
    setMCourse('');

    Alert.alert('Success', 'Menu item added successfully.');
    setIsAdding(false);
  };

  // Menu Item Component
  const MenuItemComponent: React.FC<MenuItem> = ({ name, description, price, course }) => (
    <View style={styles.menuContainer}>
      <Text style={styles.menuName}>{name}</Text>
      <Text style={styles.menuDescription}>{description}</Text>
      <Text style={styles.menuPrice}>R{price}</Text>
      <Text style={styles.menuCourse}>{course}</Text>
    </View>
  );

  // Render login screen
  const renderLoginScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>LOGIN</Text>
      </View>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        style={styles.input}
        placeholderTextColor="#fff"
      />
      <TouchableHighlight onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>LOGIN</Text>
 </TouchableHighlight>

      <View style={styles.clientButtonsContainer}>
        <TouchableHighlight onPress={() => Alert.alert('Client 1')} style={styles.smallButton}>
          <Text style={styles.buttonText}>Client 1</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => Alert.alert('Client 2')} style={styles.smallButton}>
          <Text style={styles.buttonText}>Client 2</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  // Render menu screen
  const renderMenuScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>COURSE</Text>
      </View>
      <View style={styles.centeredContent}>
        <View style={styles.statsContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.statsText}>TOTAL ITEMS</Text>
            <Text style={styles.statsNumber}>{total}</Text>
          </View>
        </View>
        <FlatList
          data={menuList}
          renderItem={({ item }) => (
            <MenuItemComponent
              name={item.name}
              description={item.description}
              price={item.price}
              course={item.course}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={styles.emptyMessage}>Empty Menu</Text>}
        />
        <TouchableHighlight onPress={() => setIsAdding(true)} style={styles.smallButton}>
          <Text style={styles.buttonText}>ADD MENU ITEM</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={handleLogout} style={styles.smallButton}>
          <Text style={styles.buttonText}>BACK TO LOGIN</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  // Render add item screen
  const renderAddItemScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>ADD MENU ITEM</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          onChangeText={setMName}
          value={mName}
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Description"
          onChangeText={setMDescription}
          value={mDescription}
          multiline={true}
          style={styles.inputDescr}
          placeholderTextColor="#fff"
        />
        <TextInput
          placeholder="Price"
          onChangeText={setMPrice}
          value={mPrice}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#fff"
        />
        <Picker
          selectedValue={mCourse}
          style={styles.picker}
          onValueChange={(itemValue) => setMCourse(itemValue as string)}
        >
          <Picker.Item label="Select Course" value="" />
          {courseList.map((item) => (
            <Picker.Item 
              label={item.name} 
              value={item.name} 
              key={item.id.toString()} 
            />
          ))}
        </Picker>
        <TouchableHighlight onPress={handleSaveMenuItem} style={styles.smallButton}>
          <Text style={styles.buttonText}>SAVE ITEM</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setIsAdding(false)} style={styles.smallButton}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  // Main render
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={renderLoginScreen} />
        <Stack.Screen name="Menu" component={renderMenuScreen} />
        <Stack.Screen name="AddMenuItem" component={renderAddItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ab9588',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Poppins, sans-serif',
    color: '#fff',
  },
  statsContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize : 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  statsNumber: {
    fontSize: 24,
    color: '#32cd32',
    fontFamily: 'Poppins, sans-serif',
  },
  menuContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuName: {
    fontSize: 20,
    fontFamily: 'Poppins, sans-serif',
    color: '#ffd700',
  },
  menuDescription: {
    fontSize: 14,
    color: '#32cd32',
    fontFamily: 'Poppins, sans-serif',
  },
  menuPrice: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  menuCourse: {
    fontSize: 16,
    color: '#f1f1f1',
    fontFamily: 'Poppins, sans-serif',
  },
  inputContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#ffd700',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    color: '#fff',
  },
  inputDescr: {
    height: 80,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    color: '#fff',
  },
  smallButton: {
    backgroundColor: '#32cd32',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  clientButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#f1f1f1',
    fontSize: 18,
    fontFamily: 'Poppins, sans-serif',
  },
  centeredContent: {
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    color: '#fff',
  },
});