import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

// Importaciones adaptadas a la carpeta Navegacion/
import Login from "../Screens/Login";
import Catalogo from "../Screens/Catalogo";
import AdminProductosScreen from "../Screens/AdminProductosScreen";
import FormularioAdd from "../Screens/FormularioProductoScreen";
import OtraScreenCliente from "../Screens/OtraScreenCliente";
import OtraScreenAdmin from "../Screens/OtraScreenAdmin";

const RootStack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



function AdminStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminProductos"
        component={AdminProductosScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FormularioAdd"
        component={FormularioAdd}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function ClienteTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Catalogo"
        component={Catalogo}
        options={{
          title: "Catálogo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="OtraScreenCliente"
        component={OtraScreenCliente}
        options={{
          title: "Mi perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#7C7CFF",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="ProductosTab"
        component={AdminStack}
        options={{
          title: "Productos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="OtraScreenAdmin"
        component={OtraScreenAdmin}
        options={{
          title: "Mi perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navegacion() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="ClienteTabs" component={ClienteTabs} />
        <RootStack.Screen name="AdminTabs" component={AdminTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}