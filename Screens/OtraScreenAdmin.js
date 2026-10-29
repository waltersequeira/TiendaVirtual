import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { CommonActions } from "@react-navigation/native";

export default function OtraScreenAdmin({ navigation }) {
  
  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Panel del administrador</Text>
      <TouchableOpacity style={styles.boton} onPress={cerrarSesion}>
        <Text style={styles.textoBoton}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f7f7ff",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25,
  },
  boton: {
    backgroundColor: "#7C7CFF",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});