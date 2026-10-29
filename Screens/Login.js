import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const iniciarSesion = async () => {
    // Validamos que los campos no estén vacíos
    if (!usuario.trim() || !contrasena) {
      Alert.alert("Campos vacíos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    try {
      // 1. Validar credenciales con Firebase Authentication
      const credencial = await signInWithEmailAndPassword(
        auth,
        usuario.trim(),
        contrasena
      );
      const user = credencial.user;

      // 2. Consultar el documento del usuario en Firestore usando su UID
      const referencia = doc(db, "Usuarios", user.uid);
      const resultado = await getDoc(referencia);

      if (resultado.exists()) {
        const datos = resultado.data();

        // 3. Redirigir según el rol almacenado en la base de datos
        if (datos.rol === "administrador") {
          navigation.replace("AdminTabs");
        } else if (datos.rol === "cliente") {
          navigation.replace("ClienteTabs");
        } else {
          Alert.alert("Error de rol", "El usuario no tiene un rol válido asignado.");
        }
      } else {
        Alert.alert("Error", "No se encontraron los datos de este usuario en la base de datos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Acceso denegado", "Correo o contraseña incorrectos.");
    }
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>IKY</Text>
      <Text style={styles.subtitulo}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={usuario}
        onChangeText={setUsuario}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={styles.boton} onPress={iniciarSesion}>
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#f7f7ff",
  },
  titulo: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: "#7C7CFF",
  },
  subtitulo: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
    color: "#555",
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#7C7CFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});