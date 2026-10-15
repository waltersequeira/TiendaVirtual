import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function AdminProductosScreen({ navigation }) {
  const [productos, setProductos] = useState([]);

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Productos"));
      const lista = [];
      querySnapshot.forEach((documento) => {
        lista.push({
          idFirestore: documento.id,
          ...documento.data()
        });
      });
      setProductos(lista);
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      obtenerProductos();
    });
    return unsubscribe;
  }, [navigation]);

  const confirmarEliminacion = (idFirestore) => {
    Alert.alert(
      "Eliminar producto",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "Productos", idFirestore));
              obtenerProductos();
            } catch (error) {
              console.error("Error al eliminar: ", error);
            }
          } 
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('FormularioProducto')}
      >
        <Text style={styles.textoBotonAgregar}>+ Agregar producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.idFirestore}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagen ? <Image source={{ uri: item.imagen }} style={styles.imagen} /> : null}
            <View style={styles.infoContainer}>
              <Text style={styles.nombre}>{item.nombre}</Text>
              <Text style={styles.texto}>Precio: ${item.precio}</Text>
              <Text style={styles.texto}>Color: {item.color}</Text>
              <Text style={styles.texto}>ID Categoría: {item.categoriaId ?? item.idCategoria ?? '1'}</Text>
              <Text style={styles.idDoc} numberOfLines={1}>ID Doc: {item.idFirestore}</Text>
              <Text style={styles.tiempo}>{item.tiempo}</Text>
            </View>
            <View style={styles.acciones}>
              <TouchableOpacity onPress={() => navigation.navigate('FormularioProducto', { producto: item })}>
                <Text style={styles.btnAccion}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => confirmarEliminacion(item.idFirestore)}>
                <Text style={styles.btnAccion}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f5f5f5' },
  botonAgregar: { backgroundColor: '#007AFF', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  textoBotonAgregar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    paddingVertical: 14,
    paddingHorizontal: 12, 
    marginBottom: 10, 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  imagen: { width: 65, height: 65, borderRadius: 6, marginRight: 12, backgroundColor: '#e1e1e1' },
  infoContainer: { flex: 1 },
  nombre: { fontWeight: 'bold', fontSize: 15, color: '#000', marginBottom: 2 },
  texto: { fontSize: 12, color: '#333' },
  idDoc: { fontSize: 10, color: '#007AFF', marginTop: 3, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontWeight: 'bold' },
  tiempo: { fontSize: 11, color: '#888', marginTop: 2 },
  acciones: { 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingLeft: 12,
    
  }, 
  btnAccion: { fontSize: 22, marginVertical: 6 }
});