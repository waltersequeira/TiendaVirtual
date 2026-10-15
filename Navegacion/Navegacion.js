import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import CatalogoScreen from '../Screens/Catalogo';
import AdminProductosScreen from '../Screens/AdminProductosScreen';
import FormularioProductoScreen from '../Screens/FormularioProductoScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminProductosMain" component={AdminProductosScreen} />
      <Stack.Screen name="FormularioProducto" component={FormularioProductoScreen} />
    </Stack.Navigator>
  );
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Catálogo') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Admin Productos') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Catálogo" component={CatalogoScreen} />
        <Tab.Screen name="Admin Productos" component={AdminStack} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}