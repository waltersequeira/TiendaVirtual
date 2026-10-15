import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function FormularioProductoScreen({ route, navigation }) {
  const productoEditar = route.params?.producto;

  // Estados para los campos, incluyendo el identificador/ID del producto
  const [idPersonalizado, setIdPersonalizado] = useState(productoEditar ? (productoEditar.idProducto || productoEditar.id || '') : '');
  const [nombre, setNombre] = useState(productoEditar ? productoEditar.nombre : '');
  const [precio, setPrecio] = useState(productoEditar ? productoEditar.precio.toString() : '');
  const [color, setColor] = useState(productoEditar ? productoEditar.color : '');
  const [categoriaId, setCategoriaId] = useState(productoEditar ? productoEditar.categoriaId?.toString() : '');
  const [tiempo, setTiempo] = useState(productoEditar ? productoEditar.tiempo : 'Just now');
  const [imagen, setImagen] = useState(productoEditar ? productoEditar.imagen : '');

  const guardarProducto = async () => {
    if (!nombre || !precio || !color || !categoriaId) {
      Alert.alert("Atención", "Por favor completa los campos requeridos.");
      return;
    }

    try {
      if (productoEditar) {
        const productoRef = doc(db, "Productos", productoEditar.idFirestore);
        await updateDoc(productoRef, {
          idProducto: idPersonalizado,
          nombre,
          precio: Number(precio),
          color,
          categoriaId: Number(categoriaId),
          tiempo,
          imagen
        });
        Alert.alert("Éxito", "Producto actualizado correctamente");
      } else {
        await addDoc(collection(db, "Productos"), {
          idProducto: idPersonalizado,
          nombre,
          precio: Number(precio),
          color,
          categoriaId: Number(categoriaId),
          tiempo,
          imagen: imagen || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
        });
        Alert.alert("Éxito", "Producto agregado correctamente");
      }
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el producto: ", error);
      Alert.alert("Error", "No se pudo guardar el producto en la base de datos.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>{productoEditar ? "Editar Producto" : "Nuevo Producto"}</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ID del producto:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. prod-001" 
          placeholderTextColor="#999"
          value={idPersonalizado} 
          onChangeText={setIdPersonalizado} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. Sputnik 1" 
          placeholderTextColor="#999"
          value={nombre} 
          onChangeText={setNombre} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Precio ($):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. 741" 
          placeholderTextColor="#999"
          keyboardType="numeric" 
          value={precio} 
          onChangeText={setPrecio} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Color (Hex):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. #ABE865" 
          placeholderTextColor="#999"
          value={color} 
          onChangeText={setColor} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>ID de Categoría (Numérico):</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. 6" 
          placeholderTextColor="#999"
          keyboardType="numeric" 
          value={categoriaId} 
          onChangeText={setCategoriaId} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Tiempo:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Ej. Just now" 
          placeholderTextColor="#999"
          value={tiempo} 
          onChangeText={setTiempo} 
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>URL de la Imagen:</Text>
        <TextInput 
          style={styles.input} 
          placeholder="https://..." 
          placeholderTextColor="#999"
          value={imagen} 
          onChangeText={setImagen} 
        />
      </View>

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarProducto}>
        <Text style={styles.textoBoton}>{productoEditar ? "Actualizar Producto" : "Guardar Producto"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#222' },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: '#333' },
  botonGuardar: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 15, marginBottom: 40, elevation: 2 },
  textoBoton: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});